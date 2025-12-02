const addTodoBtn = document.getElementById('addTodoBtn');
const inputTag = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
let todoText; // Variable to store the todo text when add button is clicked

let todos = []; // Array to store todo items
//if we have the todos in the local storage then we will read them
let todoString = localStorage.getItem('todos');
if (todoString) {
    todos = JSON.parse(todoString);
}

const populateTodos = () => {
    let string = "";
    for (let item of todos) {
        string += `<li class="todo-item" ${item.isCompleted ? 'completed' : ''}>
                    <input type="checkbox" class="todo-checkbox" ${item.isCompleted ? 'checked' : ''}/>
                    <span class="todo-text">${item.title}</span>
                    <button class="delete-btn">×</button>
                </li>`
    }
    todoList.innerHTML = todoList.innerHTML + string;
}

        addTodoBtn.addEventListener('click', () => {
            console.log('Hey I just clicked')
            todoText = inputTag.value;
            console.log(todoText);
            inputTag.value = '';

            let todo = {
                title: "" + todoText,
                description: "This is a todo item",

                isCompleted: false
            };
            todos.push(todo);
            localStorage.setItem('todos', JSON.stringify(todos));
        });


        populateTodos();