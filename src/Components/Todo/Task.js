import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import FlagIcon from "@mui/icons-material/Flag";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AppContext from "../../store/app-context";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";

const Task = (props) => {
  const data = props.taskData;

  const ctx = useContext(AppContext);

  const onDeleteHandler = () => {
    ctx.deleteTask(data.id);
  };


  const deactivateTaskHandler = () => {
    const index = ctx.taskList.findIndex((item) => item.id === data.id);

    const newTaskList = [...ctx.taskList];
    newTaskList[index].isActive = false;
    ctx.setActiveTaskId(null);
  };

  const activateTaskHandler = () => {
    const index = ctx.taskList.findIndex((item) => item.id === data.id);

    const newTaskList = [...ctx.taskList];

    newTaskList.forEach((val) => (val.isActive = false));
    newTaskList[index].isActive = true;
    ctx.setActiveTaskId(newTaskList[index].id);

    ctx.setTaskList([...newTaskList]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        p: 1,
        border: 1,
        borderRadius: 1,
        my: 1,
      }}
    >
      <Box sx={{ display: "flex", gap: 1 }}>
        {data.isActive ? (
          <FlagIcon color="error" onClick={deactivateTaskHandler}/>
        ) : (
          <FlagOutlinedIcon onClick={activateTaskHandler} />
        )}

        <Typography>{data.name}</Typography>
        <Typography>
          {" "}
          {data.completed} / {data.estimated}{" "}
        </Typography>
      </Box>

      <Box>
        <DeleteIcon
          data-icontype="delete"
          onClick={onDeleteHandler}
          sx={{ cursor: "pointer", mr: 1 }}
          color="error"
        />
        <EditIcon
          data-icontype="edit"
          onClick={props.onOpenForm}
          sx={{ cursor: "pointer" }}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default Task;
