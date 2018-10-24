// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask); // 1stparam: the event to listen for, 2ndparam: the function to call when it happens
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter event
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from Local Storage
function getTasks() {

  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){

    // Create li element
    const li = document.createElement('li');
    // Add class to the li
    li.className = 'collection-item';
    // Create text node with entered text from the input and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) { // this is an event handler so it takes in the e object
  
  // alert user to add a task if they try to submit with nothing
  if (taskInput.value === '') {
    alert('Add a task');
  }

  // Create li element
  const li = document.createElement('li');
  // Add class to the li
  li.className = 'collection-item';
  // Create text node with entered text from the input and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);

  // Store in Local Storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  // stop regular behavior of a link
  e.preventDefault();
}

// Store in Local Storage
function storeTaskInLocalStorage(task) {

    let tasks;

    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

    console.log(tasks);

}

// Remove Task
function removeTask(e) {

  // check for icon's parent class, which is the link element
  if (e.target.parentElement.classList.contains('delete-item')) {

    if (confirm('Are you sure?')) {
      // looks for the parent of the parent of the icon, which is the li, and removes it
      e.target.parentElement.parentElement.remove();
      // Remove from Local Storage
      removeTaskfromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from Local Storage when Deleted
function removeTaskfromLocalStorage(taskItem) {

  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {

  // taskList.innerHTML = '';  // could do this

  // Faster
  // while there is still a firstChild, remove it until all are gone
  while (taskList.firstChild) {
    // remove the child, specifying the first one
    taskList.removeChild(taskList.firstChild);
  }

  // Clear tasks from Local Storage
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {

  // variable for text entered into this input field on each keyup
  const text = e.target.value.toLowerCase();

  // looks at the text entered and sees if it matches any in the list
  document.querySelectorAll('.collection-item').forEach(
    function(task){

      const item = task.firstChild.textContent;

      // if it finds something rather than nothing, which would be -1
      if (item.toLowerCase().indexOf(text) != -1) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
  });
}