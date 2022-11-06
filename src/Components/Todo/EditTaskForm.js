import CloseIcon from "@mui/icons-material/Close";
import { Typography, Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import AppContext from "../../store/app-context";

const EditTaskForm = (props) => {
  const ctx = useContext(AppContext);
  const {taskData} = props;

  const [newTaskName, setNewTaskName] = useState(taskData.name);
  const [newTaskEstimated, setNewTaskEstimated] = useState(taskData.estimated);

  const taskNameChangeHandler = (event) => {
    setNewTaskName(event.target.value);
  };

  const taskEstimatedChangeHandler = (event) => {
    setNewTaskEstimated(event.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const taskName = newTaskName,
      estimated = +newTaskEstimated;
    ctx.updateTask(taskData.id,taskName, estimated);
    props.onCloseForm();
  };

  return (
    <Box sx={{ border: 1, borderRadius: 2, p: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>Edit Task</Typography>
        <CloseIcon sx={{ cursor: "pointer" }} onClick={props.onCloseForm} />
      </Box>
      <form onSubmit={submitHandler}>
        <Box sx={{ borderTop: 0.5, p: 2 }}>
          <TextField
            fullWidth
            id="edit-form-taskname"
            label="Task Name"
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2 }}
            onChange={taskNameChangeHandler}
            required
            value={newTaskName}
          />

          <TextField
            id="edit-form-pomodoro-number"
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

        <Box sx={{ pt: 1, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={props.onCloseForm} size="small">
            cancel
          </Button>
          <Button type="submit" variant="contained" size="small">
            save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditTaskForm;
