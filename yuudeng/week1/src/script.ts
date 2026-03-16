const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

type Todo = {
  id: number;
  text: string;
};

let todos: Todo[] = [];
let done: Todo[] = [];

const renderTask = (): void => {
  todoList.innerHTML = "";
  doneList.innerHTML = "";

  todos.forEach((todo): void => {
    const li = createTodoElement(todo, false);
    todoList.appendChild(li);
  });

  done.forEach((todo): void => {
    const li = createTodoElement(todo, true);
    doneList.appendChild(li);
  });
};

const getTodoText = (): string => {
  return todoInput.value.trim();
};

const addTodo = (text: string): void => {
  todos.push({ id: Date.now(), text });
  todoInput.value = "";
  renderTask();
};

const complete = (todo: Todo): void => {
  todos = todos.filter((t): boolean => t.id !== todo.id);
  done.push(todo);
  renderTask();
};

const remove = (todo: Todo): void => {
  done = done.filter((t): boolean => t.id !== todo.id);
  renderTask();
};

const createTodoElement = (todo: Todo, isDone: boolean): HTMLLIElement => {
  const li = document.createElement("li");
  li.classList.add("render-container__item");
  li.textContent = todo.text;
  const button = document.createElement("button");
  button.classList.add("render-container__button");
  if (isDone) {
    button.textContent = "삭제";
    button.style.backgroundColor = "#dc3545";
  } else {
    button.textContent = "완료";
    button.style.backgroundColor = "#28a745";
  }

  button.addEventListener("click", (): void => {
    if (isDone) {
      remove(todo);
    } else {
      complete(todo);
    }
  });

  li.appendChild(button);
  return li;
};

todoForm.addEventListener("submit", (e: Event): void => {
  e.preventDefault();
  const text = getTodoText();
  if (text) {
    addTodo(text);
  }
});

renderTask();
