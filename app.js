// Array to store tasks
let tasks = [];

// Load existing tasks from localStorage on page load
window.onload = function() {
  if(localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    renderTasks();
  }
};

// Handle form submission
document.getElementById('todo-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get contributor name and task content
  const name = document.getElementById('contributor-name').value;
  const content = document.getElementById('task-content').value;

  // Create a new task object
  const task = {
    name: name,
    content: content,
    completed: false,
    timestamp: new Date().toLocaleString()
  };

  // Add the new task to the array and save it
  

  // Clear the form fields


  // Re-render tasks
  renderTasks();
});

// Function to render tasks on the page
function renderTasks() {
  const tasksContainer = document.getElementById('tasks-container');
  tasksContainer.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskElement = document.createElement('div');
    taskElement.className = 'task';
    
    const taskContent = document.createElement('p');
    taskContent.textContent = task.content;
    if (task.completed) {
      taskContent.classList.add('completed');
    }

    const contributor = document.createElement('p');
    contributor.textContent = `Contributed by ${task.name} on ${task.timestamp}`;
    contributor.className = 'contributor';

    const actions = document.createElement('div');
    actions.className = 'actions';

    const completeButton = document.createElement('button');
    completeButton.textContent = task.completed ? 'Undo' : 'Complete';
    completeButton.className = 'complete-btn';
    completeButton.addEventListener('click', () => toggleComplete(index));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', () => deleteTask(index));

    actions.appendChild(completeButton);
    actions.appendChild(deleteButton);
    
    taskElement.appendChild(taskContent);
    taskElement.appendChild(contributor);
    taskElement.appendChild(actions);
    tasksContainer.appendChild(taskElement);
  });
}

// Function to toggle task completion
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}
