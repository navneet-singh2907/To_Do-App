 To-Do App (Vanilla JavaScript & Local Storage)

This project is a clean, single-page application (SPA) built entirely with Vanilla JavaScript, HTML, and CSS. It was developed as a hands-on weekend project to solidify core front-end JavaScript concepts, particularly data persistence and efficient DOM manipulation.

✨ Features Implemented

Persistence: All tasks are saved directly in the browser using the Local Storage API, ensuring data remains available even after the browser is closed and reopened.

CRUD Operations: Full functionality for Create, Read, Update (Toggle), and Delete tasks.

Filtering: Users can filter the task list to view:

All tasks.

Active (uncompleted) tasks.

Completed tasks.

Task Management:

One-click toggle to mark tasks as complete/incomplete.

"Clear Completed" button to purge all finished tasks.

Active Item Count in the footer.

UI/UX: Responsive design, ensuring usability across desktop and mobile devices.

🛠️ Key Technical Concepts

The application was built by focusing on high-efficiency, native JavaScript patterns:

1. Event Delegation

To manage interactions efficiently (checkbox clicks, delete buttons, etc.), a single event listener is placed on the parent <ul> element (todoList). 

 This prevents the need to attach hundreds of listeners to individual task items, which would be inefficient and create memory leaks.
 <img width="3998" height="2352" alt="image" src="https://github.com/user-attachments/assets/7f85c102-1b2d-4900-9ae8-10417592298f" />


2. Data Immutability

All task creation, updating, and deletion operations maintain data integrity by treating the todos array as immutable. Instead of modifying objects directly, new state arrays are created using methods like Array.prototype.filter() and Array.prototype.map().

3. Local Storage Management

The application demonstrates serialization and deserialization of JavaScript objects for persistent storage:

Saving: JSON.stringify(todos) converts the JavaScript array to a storable string.

Loading: JSON.parse(localStorage.getItem('todos')) converts the string back into a functional array.

🚀 Getting Started

Clone the repository:

git clone [Your GitHub Repository URL]


Navigate to the project directory:

cd To_Do-App


Open index.html in your web browser.

No server or build tools are required—just open the file and start organizing your tasks!
