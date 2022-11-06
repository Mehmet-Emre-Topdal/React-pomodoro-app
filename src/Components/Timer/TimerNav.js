import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import AppContext from "../../store/app-context";
import FormDialog from "./Setttings";

/** Timer Modes
 * 0 - pomodoro
 * 1- short break
 * 2- long break
 */

const TimerNav = (props) => {
  const ctx = useContext(AppContext);
  const {isTimerActive} = props;

  const timerModChangeHandler = (id) => {
    ctx.setActiveTimerMod(id);
    props.onModeChangeSetSeconds(ctx.timerModes[id].duration * 60);

    if(isTimerActive) props.setIsTimerActive(false)
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
      <Button onClick={() => timerModChangeHandler(0)}>Pomodoro</Button>
      <Button onClick={() => timerModChangeHandler(1)}>Short break</Button>
      <Button onClick={() => timerModChangeHandler(2)}>Long break</Button>
      <FormDialog
        onModeChangeSetSeconds={props.onModeChangeSetSeconds}
      ></FormDialog>
    </Box>
  );
};

export default TimerNav;
