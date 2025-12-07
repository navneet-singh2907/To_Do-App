const addTodoBtn = document.getElementById('addTodoBtn');
const inputTag = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const remaining = document.getElementById('remainingCount');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const filterContainer = document.querySelector('.filter-container'); 

let currentFilter = 'all'; // Tracks which filter button is active: 'all', 'active', or 'completed'
let todoText; // Variable to store the todo text when add button is clicked 
let todos = []; // Array to store todo items
//if we have the todos in the local storage then we will read them
let todoString = localStorage.getItem('todos');
if (todoString) {
    todos = JSON.parse(todoString);
    remaining.innerHTML = todos.filter(todo => !todo.isCompleted).length;
}

const populateTodos = () => {
    let string = "";
    let todosToRender = todos.filter(todo => {
        if (currentFilter === 'active') {
            return !todo.isCompleted;
        } else if (currentFilter === 'completed') {
            return todo.isCompleted;
        }
        return true; // 'all' filter
    });
     remaining.innerHTML = todos.filter(todo => !todo.isCompleted).length;

    for (const todo of todosToRender) {

        string += `<li id="${todo.id}" class="todo-item ${todo.isCompleted ? 'completed' : ''}">
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
                    if ((todo.id) == element.parentNode.id) {
                        return { ...todo, isCompleted: true }
                    }
                    else {
                        return todo;
                    }
                });
                remaining.innerHTML = todos.filter(todo => !todo.isCompleted).length;
                localStorage.setItem('todos', JSON.stringify(todos));
            }
            else {
                e.target.parentElement.classList.remove('completed');
                todos = todos.map((todo) => {
                    if ((todo.id) == element.parentNode.id) {
                        return { ...todo, isCompleted: false }
                    }
                    else {
                        return todo;
                    }
                });
                remaining.innerHTML = todos.filter(todo => !todo.isCompleted).length;
                localStorage.setItem('todos', JSON.stringify(todos));
            }

        })

    });
    //clear completed button logic
    clearCompletedBtn.addEventListener('click', () => {
        todos = todos.filter((todo) => {    
            if (todo.isCompleted == false) {
                return todo;
            }
        });
        remaining.innerHTML = todos.filter(todo => !todo.isCompleted).length;
        localStorage.setItem('todos', JSON.stringify(todos));
        populateTodos();
    });

    // delete button logic

    let deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach((element) => {
        element.addEventListener('click', (e) => {
            const confirmation = confirm("Are you sure you want to delete this todo?");
            if (confirmation) {
            todos = todos.filter((todo) => {
                return (todo.id) !== (e.target.parentNode.id);
            });
            remaining.innerHTML = todos.filter(todo => !todo.isCompleted).length;
            localStorage.setItem('todos', JSON.stringify(todos));
            populateTodos();
            }

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
            id:  Date.now(),
            title: "" + todoText,
            description: "This is a todo item",

            isCompleted: false
        };
        todos.push(todo);
        remaining.innerHTML = todos.filter(todo => !todo.isCompleted).length;

        localStorage.setItem('todos', JSON.stringify(todos));
        populateTodos();
    });
    populateTodos();
    remaining.innerHTML = todos.filter(todo => !todo.isCompleted).length;

    // --- Event Listener for Filter Buttons ---
filterContainer.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('filter-btn')) {
        const newFilter = target.getAttribute('data-filter');

        if (newFilter === currentFilter) return; 

        currentFilter = newFilter;

        // Update 'active' class visually
        filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        target.classList.add('active');

        populateTodos();
    }
});
