function TaskSchema({ title, priority, priority_title }) {
  this.title = title;
  this.priority = priority;
  this.priority_title = priority_title;
};
  
function ProjectSchema({ name, tasks }) {
  this.name = name;
  this.tasks = this.setTasks(tasks);
  console.log(tasks);
  this.setTasks(tasks);
};

ProjectSchema.prototype.setTasks = function(tasks) {
  var self = this;
  for(var i = 0; i < tasks.lenght; i++) {
    console.log(tasks);
    self.tasks[i] = new TaskSchema(tasks[i]);
  }
}

export default ProjectSchema;
