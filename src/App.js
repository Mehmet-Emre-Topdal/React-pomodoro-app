import "./App.css";
import TimerComponent from "./Components/Timer/TimerComponent";
import TodoComponent from "./Components/Todo/TodoComponent";
import { AppContextProvider } from "./store/app-context";

function App() {
  return (
  
      <AppContextProvider>

        <TimerComponent></TimerComponent>
        <TodoComponent></TodoComponent>
        
      </AppContextProvider>

  );
}

export default App;

