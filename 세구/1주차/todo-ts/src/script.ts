// DOM 요소를 가져올 때 정확한 타입을 단언(Type Assertion, 'as') 해줍니다.
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const addBtn = document.getElementById('add-btn') as HTMLButtonElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const completedList = document.getElementById('completed-list') as HTMLUListElement;

// 1. 할 일 추가 함수 (반환값이 없으므로 void)
function addTodo(): void {
    const text: string = todoInput.value.trim();
    if (text === '') {
        alert('할 일을 입력해주세요!');
        return;
    }

    // 새로운 리스트 아이템(li) 생성 및 타입 지정
    const li: HTMLLIElement = document.createElement('li');
    const span: HTMLSpanElement = document.createElement('span');
    span.textContent = text;

    // 완료 버튼 생성 및 타입 지정
    const completeBtn: HTMLButtonElement = document.createElement('button');
    completeBtn.textContent = '완료';
    completeBtn.className = 'complete-btn';
    
    // 완료 버튼을 누르면 '완료 목록'으로 이동시키는 이벤트
    completeBtn.addEventListener('click', () => {
        moveToCompleted(li, text);
    });

    li.appendChild(span);
    li.appendChild(completeBtn);
    todoList.appendChild(li);

    // 입력창 초기화
    todoInput.value = '';
    todoInput.focus();
}

// 2. 완료 목록으로 이동 함수 (매개변수 타입 지정)
function moveToCompleted(oldLi: HTMLLIElement, text: string): void {
    oldLi.remove(); // 왼쪽(할 일) 목록에서 제거

    // 오른쪽(완료) 목록용 새로운 아이템 생성
    const li: HTMLLIElement = document.createElement('li');
    const span: HTMLSpanElement = document.createElement('span');
    span.textContent = text;

    // 삭제 버튼 생성
    const deleteBtn: HTMLButtonElement = document.createElement('button');
    deleteBtn.textContent = '삭제';
    deleteBtn.className = 'delete-btn';

    // 삭제 버튼을 누르면 완전히 지우는 이벤트
    deleteBtn.addEventListener('click', () => {
        li.remove(); 
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    completedList.appendChild(li);
}

// 3. 버튼 클릭 및 엔터키 이벤트 연결
addBtn.addEventListener('click', addTodo);

// 이벤트 객체(e)가 키보드 이벤트임을 명시합니다.
todoInput.addEventListener('keypress', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});