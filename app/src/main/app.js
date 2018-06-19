const electron = require('electron');
const { app, protocol, BrowserWindow } = electron;
const Datastore = require('nedb');
const path = require('path');
const url = require('url');
const fs = require('fs');

const userDataPath = app.getPath('userData');

function createWindow() {
  let mainWindow;
  fs.readFile(path.resolve(userDataPath, 'app.db'), 'utf-8', (err, data) => {
    if(err){
        console.log("An error ocurred reading the file :" + err.message);
        fs.writeFile(path.resolve(userDataPath, 'app.db'), {}, (err) => {
          if(err){
            console.log("An error ocurred creating the file "+ err.message)
          }
                      
          console.log("The file has been succesfully saved");
      });
        return;
    }

    // Change how to handle the file content
    // console.log("The file content is : " + data);
  });
  
  let db = new Datastore(path.resolve(userDataPath, 'app.db'));
  db.loadDatabase();

  mainWindow = new BrowserWindow({ width: 1366, height: 768 });

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  protocol.registerStringProtocol('project', (request, callback) => {
    const METHOD = request.method;
    
    switch(METHOD) {
      case 'GET': getProjects(request, callback, db); break;
      case 'POST': saveProject(request, callback, db); break;
      case 'PUT': addTask(request, callback, db); break;
      case 'PATCH': changeTask(request, callback, db); break;
      case 'DELETE': removeProject(request, callback, db); break;
      default: break;
    };
  }, (error) => {
    if (error) console.error('Failed to register protocol => project')
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

function getProjects(request, callback, db) {
  db.find({}).sort({ index: 1 }).exec((err, projects) => {
    if(err) console.log('db err find: ',err);
    console.log(projects);
    
    callback(JSON.stringify(projects));
  });
};

function saveProject(request, callback, db) {
  const data = request.url.substr(10);
  const parsedData = JSON.parse(data);

  db.insert(parsedData, function (err, newDocs) {
    if(err) console.log('db err insert: ', err);    
    callback(JSON.stringify(newDocs));
  });
};

function addTask(request, callback, db) {
  const data = request.url.substr(10);
  const parsedData = JSON.parse(data);
  
  if(parsedData.change_order) {
    parsedData.projects.map(project => {
      if(project.index === parsedData.projects.length) {
        db.update({ _id: project._id }, { index: project.index, name: project.name, tasks: project.tasks }, {}, function (err) {
          if(err) console.log('db err change order: ', err);
          getProjects(request, callback, db);
          console.log('end of map')
        });
      } else {
        db.update({ _id: project._id }, { index: project.index, name: project.name, tasks: project.tasks }, {}, function (err) {
          if(err) console.log('db err change order: ', err);
          console.log('map')
        });
      }
    })
  } else {
    const task = {
      task_id: parsedData.id + Math.floor(Math.random() * 101),
      title: parsedData.task.title,
      priority: parsedData.task.priority,
      priority_title: parsedData.task.priority_title
    }
  
    db.update({ _id: parsedData.id }, { $push: { tasks: task } }, {}, function (err) {
      if(err) console.log('db err remove: ', err);
      getProjects(request, callback, db);
    });
  }
};

function changeTask(request, callback, db) {
  const data = request.url.substr(10);
  const parsedData = JSON.parse(data);
  const task = {
    task_id: parsedData.task.task_id,
    title: parsedData.task.title,
    priority: parsedData.task.priority,
    priority_title: parsedData.task.priority_title
  }
  
  if(parsedData.edit) {
    parsedData.tasks.map((task, i) => {
      if(task.task_id === parsedData.task.task_id) {
        task.title = parsedData.task.title;
        task.priority = parsedData.task.priority;
        task.priority_title = parsedData.task.priority_title;
      }
    });
    
    db.update({ _id: parsedData.id }, { $unset: { tasks: true } }, { upsert: true }, function (err, i) {
      if(err) console.log('db err edit task: ', err);
      db.update({ _id: parsedData.id }, { $set: { tasks: parsedData.tasks }}, {}, function(err, i) {
        if(err) console.log('db err edit task: ', err);
        getProjects(request, callback, db);
      });
    });
  } else {
    db.update({ _id: parsedData.id }, { $pull: { tasks: task } }, {}, function (err, ik) {
      if(err) console.log('db err remove task: ', err);
      getProjects(request, callback, db);
    });
  }
};

function removeProject(request, callback, db) {
  const id = request.url.substr(10);
  
  db.remove({ _id: id }, {}, function (err) {
    if(err) console.log('db err remove: ', err);
    getProjects(request, callback, db);
  });
};
