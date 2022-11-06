import React, { useContext, useState } from "react";
import { Card, Box, Typography, Button } from "@mui/material";
import AddTask from "./AddTask";
import AddTaskForm from "./AddTaskForm";
import AppContext from "../../store/app-context";
import TaskContainer from "./TaskContainer";

const TodoComponent = () => {
  const [isAddTask, setIsAddTask] = useState(true);
  
  const ctx = useContext(AppContext)

  const openFormHandler = () => {
    setIsAddTask(false);
  }

  const closeFormHandler = () => {
    setIsAddTask(true);
  }

  return (
    <Card
      sx={{
        mx: "auto",
        width: {xs: "80%",
        sm:"70%",
        md: "50%"},
        p: 4,
      }}
    >
      <Box /**Burada neden CardHeader kullanamıyorum ya*/
        sx={{
          borderBottom: 1,
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          alignItems: "center",
        }}
      >
        <Typography variant="body1"> Task List </Typography>
        <Button color="error" onClick={ctx.clear}>Clear All</Button>
      </Box>

      {ctx.taskList.map(task => <TaskContainer taskData={task} key={task.id} onDeleteTask={ctx}/>)}

      {isAddTask ? <AddTask onOpenForm={openFormHandler}/> 
      : <AddTaskForm onCloseForm={closeFormHandler}/>}
    </Card>
  );
};

export default TodoComponent;
