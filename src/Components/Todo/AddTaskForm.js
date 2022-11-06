import CloseIcon from "@mui/icons-material/Close";
import { Typography, Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import AppContext from "../../store/app-context";

const AddTaskForm = (props) => {

  const [newTaskName, setNewTaskName] = useState("")
  const [newTaskEstimated, setNewTaskEstimated] = useState("")

  const ctx = useContext(AppContext);

  const taskNameChangeHandler = (event) => {
    setNewTaskName(event.target.value)
  }

  const taskEstimatedChangeHandler = (event) => {
    setNewTaskEstimated(event.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const taskName = newTaskName, estimated = +newTaskEstimated;
    ctx.addTask(taskName, estimated)
    props.onCloseForm();

    /**Burdan korkkuyorum, temizleme işlemi ile task ekleme işlemi aynı anda gelirse ne yapıcam */
    setNewTaskEstimated("");
    setNewTaskName("");
  } 

  return (
    <Box sx={{ border: 1, borderRadius: 2, p: 1 }} >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>Add Task</Typography>
        <CloseIcon sx={{cursor: "pointer"}} onClick={props.onCloseForm}/>

      </Box>
      <form onSubmit={submitHandler}>
      <Box sx={{ borderTop: 0.5, p: 2 }}>
      
        <TextField
          fullWidth
          id="taskname"
          label="Task Name"
          variant="standard"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{mb:2}}
          onChange={taskNameChangeHandler}
          required
          value={newTaskName}
        />

        <TextField
          id="pomodoro-number"
          label="Estimated Pomodoros"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          variant="standard"
          onChange={taskEstimatedChangeHandler}
          required
          value={newTaskEstimated}
        />
      
      </Box>

      <Box sx={{pt:1, display:"flex", justifyContent:"flex-end"}}>

        <Button onClick={props.onCloseForm} size="small">cancel</Button>
        <Button type="submit" variant="contained" size="small">Add</Button>
      </Box>
      </form>
    </Box>

    
  );
};

export default AddTaskForm;
