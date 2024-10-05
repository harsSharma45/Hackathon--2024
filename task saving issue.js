// Add the new task to the array and save it
 tasks.push(task);
 localStorage.setItem('tasks', JSON.stringify(tasks));

 // Clear the form fields
document.getElementById('contributor-name').value = '';
document.getElementById('task-content').value = '';