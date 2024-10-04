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
  const priority = document.getElementById('priority').value;
  const deadline = document.getElementById('deadline').value;

  // Create a new task object
  const task = {
    name: name,
    content: content,
    completed: false,
    timestamp: new Date().toLocaleString(),
    priority: priority,
    deadline: deadline || null
  };

  // Add the new task to the array and save it
  tasks.push(task); // Missing: Pushing the new task to the array
  localStorage.setItem('tasks', JSON.stringify(tasks)); // Missing: Saving the updated tasks to localStorage

  // Clear the form fields
  document.getElementById('contributor-name').value = ''; // Clear the contributor name field
  document.getElementById('task-content').value = ''; // Clear the task content field
  document.getElementById('deadline').value = ''; // Clear the deadline field


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
    taskContent.textContent = `${task.content} [${task.priority}]`; // Display priority
    //taskContent.textContent = task.content;
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
    
    tasksContainer.appendChild(taskElement);

    // Display the deadline if it's provided
    if (task.deadline) {
      const deadlineElement = document.createElement('p');
      deadlineElement.textContent = `Deadline: ${task.deadline}`;
      deadlineElement.className = 'deadline';
      taskElement.appendChild(deadlineElement);
    }
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
// Function to sort tasks based on the selected option
function sortTasks() {
  const sortOption = document.getElementById('sort-dropdown').value;

  if (sortOption === 'priority') {
    // Sort by priority
    tasks.sort((a, b) => {
      const priorities = { 'High': 3, 'Medium': 2, 'Low': 1 };
      return priorities[b.priority] - priorities[a.priority];
    });
  } else if (sortOption === 'time-newest') {
    // Sort by time (newest first)
    tasks.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  } else if (sortOption === 'time-oldest') {
    // Sort by time (oldest first)
    tasks.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }

  renderTasks(); // Re-render the tasks after sorting
}

// Event listener for the dropdown menu
document.getElementById('sort-dropdown').addEventListener('change', 