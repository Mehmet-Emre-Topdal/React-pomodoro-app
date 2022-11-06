import React, { useEffect, useState } from "react";

const AppContext = React.createContext();

export const AppContextProvider = (props) => {
  const [taskList, setTaskList] = useState([]);

  const [activeTaskId, setActiveTaskId] = useState(null);
  const [timerModes, setTimerMods] = useState([
    { modeName: "pomodoro", duration: 25 },
    { modeName: "shortBreak", duration: 5 },
    { modeName: "longBreak", duration: 15 },
  ]);
  const [activeTimerMod, setActiveTimerMod] = useState(0);
  const [taskId, setTaskId] = useState(1);

  const addTaskHandler = (taskName, taskEstimated) => {
    const newTask = {
      name: taskName,
      estimated: +taskEstimated,
      id: taskId,
      completed: 0,
      isActive: false,
    };
    setTaskId((prev) => prev + 1);
    setTaskList((prev) => [...prev, newTask]);
  };

  const deleteTaskHandler = (id) => {
    const index = taskList.findIndex((item) => item.id === id);
    const newTaskList = [...taskList];
    newTaskList.splice(index, 1);
    setTaskList([...newTaskList]);
  };

  const updateTaskHandler = (id, newName, newEstimated) => {
    const index = taskList.findIndex((item) => item.id === id);
    const newTaskList = [...taskList];
    newTaskList[index].name = newName;
    newTaskList[index].estimated = newEstimated;
    setTaskList([...newTaskList]);
  };

  const clearList = () => {
    setTaskList([]);
  };

  return (
    <AppContext.Provider
      value={{
        taskList: taskList,
        activeTaskId: activeTaskId,
        timerModes: timerModes,
        activeTimerMod: activeTimerMod,

        addTask: addTaskHandler,
        deleteTask: deleteTaskHandler,
        updateTask: updateTaskHandler,
        clear: clearList,

        setTaskList: setTaskList,
        setActiveTaskId: setActiveTaskId,
        setTimerMods: setTimerMods,
        setActiveTimerMod: setActiveTimerMod,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
