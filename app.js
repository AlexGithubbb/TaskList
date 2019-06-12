//form
const form = document.querySelector('form');
//input
const taskInput = document.querySelector('#task');
//ul
const taskList = document.querySelector('.collection');
//clear btn
const clearBtn = document.querySelector('.clear-tasks');
// filter
const filter = document.querySelector('#filter');

// Load all events listeners
loadEventListeners();

// Create all events listeners
function loadEventListeners(){

  /////////////////// DOM Load Event //////////////////////////

  document.addEventListener('DOMContentLoaded', loadTasks);

  /////////////////// Add Task Event //////////////////////////

  form.addEventListener('submit', addTask);

  /////////////////// Remove Task Event //////////////////////////
  taskList.addEventListener('click', removeTask);

  /////////////////// Remove Tasks Event //////////////////////////
  clearBtn.addEventListener('click', clearTasks);

  /////////////////// Filter Tasks Event //////////////////////////
  filter.addEventListener('keyup', filterTasks);
}

////////// Get Tasks from LS /////////////
function loadTasks(){
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // Create a new item
    const li = document.createElement('li');
    // add class
    li.className = "collection-item";
    // append textNote and append to item
    li.appendChild(document.createTextNode(task));
    // item.appendChild(document.createTextNode(`${e.target[0].value}`));
    // create link
    const link = document.createElement('a');
    // joint the icon into link
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Add Class
    link.className = "delete-item secondary-content";
    // append link into list
    li.appendChild(link);

    // append item into ul
    taskList.appendChild(li);
  })
}


////////// Add Task /////////////

function addTask(e) {
  if(taskInput.value === ''){
    alert("Add a Task");
  }else{
    // Create a new item
    const li = document.createElement('li');
    // add class
    li.className = "collection-item";
    // append textNote and append to item
    li.appendChild(document.createTextNode(taskInput.value));
    // item.appendChild(document.createTextNode(`${e.target[0].value}`));
    // create link
    const link = document.createElement('a');
    // joint the icon into link
    link.innerHTML = '<i class="fa fa-remove"></i>';
    link.className = "delete-item secondary-content";
    // append link into list
    li.appendChild(link);

    // append item into ul
    taskList.appendChild(li);

    // Store LS
    storeTaskInLocalStorage(taskInput.value);

    // clear input
    taskInput.value = '';
  }
  e.preventDefault();
}

////////// Store task in local storage /////////////

function storeTaskInLocalStorage(task){
  let tasks;
  if (localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  // push onto that variable
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  // console.log(task);
}

////////// Remove Task /////////////

function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are You Sure?')){
      e.target.parentElement.parentElement.remove();
      // e.target.parentElement.parentElemen shows the <li>...</li> node

      ////////// Remove Task form LS /////////////
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove Task from JS
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    // if the <li></li> textContent === task from LS tasks
    if(taskItem.textContent === task){
      // remove it from the LS tasks
      tasks.splice(index, 1);
    }
  });
  // set LS again
  localStorage.setItem('tasks', JSON.stringify(tasks));
}



////////// Remove All Tasks /////////////
function clearTasks(){
  // innetHTML way
  // taskList.innerHTML = '';

  // faster
  confirm("Are You Sure Remove all the tasks?");
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);

    // jsperf.com/

    // Clear all tasks from LS
    clearTasksFromLocalStorage();
  }
}

////////// Remove All Tasks from LS /////////////
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

////////// Filter Tasks /////////////
function filterTasks(e){
  // get the filter input
  const text = e.target.value.toLowerCase();
  console.log(text);

 document.querySelectorAll('.collection-item').forEach(
   (task) => {
     const item = task.firstChild.textContent;
     console.log(item);
     // if they don't mathch each other, the item.indexOf(text) = -1;
     if (item.toLowerCase().indexOf(text) != -1 ){
       task.style.display = 'block';
     }else{
       task.style.display = 'none';
     }
   }
  );
}

