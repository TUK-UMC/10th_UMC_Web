const input = document.getElementById("todoInput") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const todoList = document.getElementById("todoList") as HTMLUListElement;
const doneList = document.getElementById("doneList") as HTMLUListElement;

addBtn.addEventListener("click", () => {
  const text = input.value.trim();

  if (text === "") return;

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.innerText = text;

  const completeBtn = document.createElement("button");
  completeBtn.innerText = "완료";
  completeBtn.className = "todo__button--complete";

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "삭제";
  deleteBtn.className = "todo__button--delete";

  completeBtn.addEventListener("click", () => {
    doneList.appendChild(li);
    completeBtn.remove();
  });

  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(span);
  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);

  todoList.appendChild(li);

  input.value = "";
});