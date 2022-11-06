import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SettingsIcon from "@mui/icons-material/Settings";
import AppContext from "../../store/app-context";

export default function FormDialog(props) {
  const ctx = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [newPomodoroTime, setNewPomodoroTime] = useState(
    ctx.timerModes[0].duration
  );
  const [newShortBreakTime, setNewShortBreakTime] = useState(
    ctx.timerModes[1].duration
  );
  const [newLongBreakTime, setNewLongBreakTime] = useState(
    ctx.timerModes[2].duration
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onPomoChangehandler = (e) => {
    setNewPomodoroTime(e.target.value);
  };

  const onShortChangeHandler = (e) => {
    setNewShortBreakTime(e.target.value);
  };

  const onLongChangeHandler = (e) => {
    setNewLongBreakTime(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newPomo = +newPomodoroTime;
    const newShort = +newShortBreakTime,
      newLong = +newLongBreakTime;

    const newModesList = [...ctx.timerModes];
    newModesList[0].duration = newPomo;
    newModesList[1].duration = newShort;
    newModesList[2].duration = newLong;
    ctx.setTimerMods([...newModesList]);

    props.onModeChangeSetSeconds(
      ctx.timerModes[ctx.activeTimerMod].duration * 60
    );
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <SettingsIcon /> Settings
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Timer Modes</DialogTitle>
        <form onSubmit={onSubmitHandler}>
          <DialogContent>
            <DialogContentText>
              You can enter the pomodoro, short break and long break times in
              minutes below.
            </DialogContentText>

            <TextField
              id="pomodoro-time"
              label="Pomodoro duration"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              variant="standard"
              onChange={onPomoChangehandler}
              required
              value={newPomodoroTime}
            />

            <TextField
              id="short-break-time"
              label="Short break duration"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ my: 2 }}
              fullWidth
              variant="standard"
              onChange={onShortChangeHandler}
              required
              value={newShortBreakTime}
            />

            <TextField
              id="long-break-time"
              label="Long break duration"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              variant="standard"
              onChange={onLongChangeHandler}
              required
              value={newLongBreakTime}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={handleClose}>
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
