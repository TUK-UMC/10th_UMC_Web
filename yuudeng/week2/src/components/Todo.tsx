import { useTodo } from "../contexts/TodoContext";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const Todo = () => {
  const context = useTodo();

  return (
    <>
      <div className="todo-container">
        <h1 className="todo-container__header">Todo List</h1>
        <TodoForm />
        <div className="render-container">
          <TodoList
            title="할 일"
            todos={context.todos}
            buttonLabel="완료"
            buttonColor="green"
            onClick={context.completeTodo}
          />
          <TodoList
            title="완료"
            todos={context.doneTodos}
            buttonLabel="삭제"
            buttonColor="red"
            onClick={context.deleteTodo}
          />
        </div>
      </div>
    </>
  );
};

export default Todo;
