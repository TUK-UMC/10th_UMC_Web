import "./App.css";
import Todo from "./components/Todo";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TodoProvider } from "./contexts/TodoContext";

function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <Todo />
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
