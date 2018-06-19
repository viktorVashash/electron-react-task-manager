import React from 'react';
import { FaArrowCircleUp, FaArrowCircleDown } from 'react-icons/lib/fa';
import { MdPerson, MdWatchLater } from 'react-icons/lib/md';
import GoIssueOpened from 'react-icons/lib/go/issue-opened';

const PriorityIcon = ({ priority }) => {
  switch(priority) {
    case 1:
      return <GoIssueOpened size={ 25 } color="red" />
    case 2:
      return <FaArrowCircleUp size={ 25 } color="orange" />
    case 3:
      return <MdWatchLater size={ 25 } color="#f0c143" />
    case 4:
      return <FaArrowCircleDown size={ 25 } color="green" />
    case 5:
      return <MdPerson size={ 25 } color="green" />
    default:
      null;
  }
};

export default PriorityIcon;
