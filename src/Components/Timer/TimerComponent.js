import React, { useContext, useEffect, useState } from "react";
import { Card, Typography, Button } from "@mui/material";
import TimerNav from "./TimerNav";
import AppContext from "../../store/app-context";

const TimerComponent = () => {
  const ctx = useContext(AppContext);

  const [seconds, setSeconds] = useState(
    ctx.timerModes[ctx.activeTimerMod].duration * 60
  );

  const [isTimerActive, setIsTimerActive] = useState(false);

  const toggle = () => {
    setIsTimerActive((prev) => !prev);
  };

  useEffect(() => {
    let interval = null;

    /**3 tane durumn var:
     * -Sayaç aktif çalışıyor 
     * -Sayaç ders çalışma modunda aktif task varken tamamlandı
     * -Sayaç aktif task yokken durdu
     */

    if (seconds === 0) {
      //SAYAÇ DURDU
      //burda setstateler birbirine girmiyor mu ya
      //aktif task yoksa ekstra işleme gerek yok, sayacı default konuma getirmen yeterli
      clearInterval(interval);
      setSeconds(ctx.timerModes[ctx.activeTimerMod].duration * 60);
      toggle(); //burayı setIsActive ile de yapabilirsin

      console.log(ctx.taskList)
      if (ctx.activeTaskId && ctx.activeTimerMod === 0) {
        // Sayaç ders çalışma modunda aktif task varken durdu
        const index = ctx.taskList.findIndex(
          (item) => item.id === ctx.activeTaskId
        );

        const newTaskList = [...ctx.taskList];
        newTaskList[index].completed++;

        if (newTaskList[index].completed === newTaskList[index].estimated) {
          //Bir task tamamen bitti ve silinecek
          newTaskList.splice(index, 1);
          ctx.setActiveTaskId(null); //artık aktif bir task yok
        }

        ctx.setTaskList([...newTaskList]);
      }
    }

    //SAYAÇ AKTİF ÇALIŞIYOR
    if (isTimerActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerActive, seconds]);

  return (
    <Card
      sx={{
        my: 4,
        mx: "auto",
        width: {xs: "80%",
                sm:"70%",
                md: "50%"},
        p: 4,
      }}
    >
      <TimerNav onModeChangeSetSeconds={setSeconds} isTimerActive={isTimerActive} setIsTimerActive={setIsTimerActive}/>

      <Typography variant="h2" align="center" color="primary" sx={{ py: 6 }}>
        {`${String(Math.floor(seconds / 60)).padStart(2, 0)} :
         ${String(seconds % 60).padStart(2, 0)}`}
      </Typography>

      <Button
        variant="contained"
        size="large"
        sx={{ display: "block", mx: "auto" }}
        onClick={toggle}
      >
        {isTimerActive ? "Pause" : "Start"}
      </Button>
    </Card>
  );
};

export default TimerComponent;
