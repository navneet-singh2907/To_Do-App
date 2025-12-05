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
    for (const todo of todos) {

        string += `<li id="todo-${todo.id}" class="todo-item ${todo.isCompleted ? 'completed' : ''}">
                    <input type="checkbox" class="todo-checkbox" ${todo.isCompleted ? 'checked' : ''}/>
                    <span class="todo-text">${todo.title}</span>
                    <button class="delete-btn">×</button>
                </li>`
    }
    todoList.innerHTML = string;

    //add checkbox logic to populated todos
    const todoCheckboxes = document.querySelectorAll('.todo-checkbox');

    todoCheckboxes.forEach((element) => {
        element.addEventListener('click', (e) => {
            if (e.target.checked) {
                element.parentElement.classList.add('completed');


                todos = todos.map((todo) => {
                    if (("todo-" + todo.id) == element.parentNode.id) {
                        return { ...todo, isCompleted: true }
                    }
                    else {
                        return todo;
                    }
                });
                localStorage.setItem('todos', JSON.stringify(todos));
            }
            else {
                e.target.parentElement.classList.remove('completed');
                todos = todos.map((todo) => {
                    if (("todo-" + todo.id) == element.parentNode.id) {
                        return { ...todo, isCompleted: false }
                    }
                    else {
                        return todo;
                    }
                });
                localStorage.setItem('todos', JSON.stringify(todos));
            }

        })

    });
    let deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach((element) => {
        element.addEventListener('click', (e) => {
            todos = todos.filter((todo) => {
                return ("todo-" + todo.id) !== (e.target.parentNode.id);
            });
            localStorage.setItem('todos', JSON.stringify(todos));
            populateTodos();

        })
    });

}
    addTodoBtn.addEventListener('click', () => {
        
        todoText = inputTag.value;
        //chwck if the length of todo is greater than 3
        if (todoText.trim().length < 3) {
            alert("Todo text must be at least 3 characters long.");
            return;
        }   
        inputTag.value = '';

        let todo = {
            id: "todo-" + Date.now(),
            title: "" + todoText,
            description: "This is a todo item",

            isCompleted: false
        };
        todos.push(todo);

        localStorage.setItem('todos', JSON.stringify(todos));
        populateTodos();
    });
    populateTodos();


