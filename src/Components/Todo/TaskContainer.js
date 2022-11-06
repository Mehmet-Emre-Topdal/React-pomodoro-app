import { Box, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import EditTaskForm from "./EditTaskForm";
import Task from "./Task";

const TaskContainer = (props) => {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const openEditFormHandler = () => {
    setIsEditFormOpen(true);
  };

  const closeEditFormHandler = () => {
    setIsEditFormOpen(false);
  };

  const data = props.taskData;

  return (
    <React.Fragment>
      {isEditFormOpen ? (
        <EditTaskForm onCloseForm={closeEditFormHandler} taskData={data}/>
      ) : (
        <Task onOpenForm={openEditFormHandler} taskData={data}/>
      )}
    </React.Fragment>
  );
};

export default TaskContainer;
