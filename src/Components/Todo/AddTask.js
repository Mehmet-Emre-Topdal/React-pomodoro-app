import React from "react";
import { Box } from "@mui/system";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const AddTask = (props) => {

    return (
      <Box onClick={props.onOpenForm} sx={{border: 1,p:1,display:"flex", justifyContent: "center",  borderRadius: 1, mt:2}}>
        <AddCircleOutlineIcon/>Add New Task
      </Box>
    );
}

export default AddTask