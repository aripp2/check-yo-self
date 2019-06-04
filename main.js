var titleInput = document.getElementById('title-input');
var taskInput = document.getElementById('task-input');
var addTaskBtn = document.getElementById('add-task-btn');
var makeListBtn = document.getElementById('make-list-btn');
var clearBtn = document.getElementById('clear-btn');
var addedTaskItem = document.getElementById('added-task-item');
var cardArea = document.getElementById('card-area');
var cardPrompt = document.getElementById('card-prompt');
var deleteListItem = document.querySelector('.delete-list-item');

var allToDos = JSON.parse(localStorage.getItem('toDos')) || [];

titleInput.addEventListener('keyup', enableClearAll);
taskInput.addEventListener('keyup', enableClearAll);
clearBtn.addEventListener('click', clearFields);
taskInput.addEventListener('keyup', enableAddBtn);
addTaskBtn.addEventListener('keyup', enableAddBtn);
addTaskBtn.addEventListener('click', addTaskItem);
makeListBtn.addEventListener('click', addTaskList);
addedTaskItem.addEventListener('click', deleteTask);
// makeListBtn.addEventListener('keyup', enableAddTaskList);
window.addEventListener('load', mapLocalStorage(allToDos));
// window.addEventListener('load', mapLocalStorage(taskItems));

function enableClearAll() {
  if (titleInput.value !== '' || taskInput.value !== '') {
    clearBtn.disabled = false;
  }
};

function disableClearAll() {
  clearBtn.disabled = true;
};

function enableAddBtn() {
  if (taskInput.value !== '')
    addTaskBtn.disabled = false;
};

function disableAddBtn() {
  addTaskBtn.disabled = true;
};

// function enableAddTaskList() {
//   if (taskTitle.value !== '') 
//   makeListBtn.disabled = false;
// };

function disableAddTaskList() {
  makeListBtn.disabled = true;
};

function clearFields() {
  titleInput.value = '';
  taskInput.value = '';
  addedTaskItem.innerHTML = '';
  disableClearAll();
  disableAddBtn();
  // disableAddTaskList();
};

function addTaskItem(task) {
  var id = Date.now();
  addedTaskItem.insertAdjacentHTML('beforeend', `
    <li class="task-to-add" data-id=${id}><img class="delete-list-item" src="images/delete-list-item.svg" alt="circle with x">${taskInput.value}</li>
      `);
  disableAddBtn();
  taskInput.value = '';
  // enableAddTaskList();
};


function deleteTask(event) {
  if (event.target.closest('.delete-list-item')) {
    event.target.closest('.task-to-add').remove();
  };
};

function createToDoList(obj, taskListArray) {
  var uniqueId = obj.id;
  var taskTitle = obj.title;
  var tasks = obj.tasks;
  var urgency = obj.urgency;
  var newToDoList = new ToDoList({
    id: uniqueId,
    title: taskTitle,
    tasks: tasks,
    urgency: urgency
  })
  appendCard(newToDoList);
  appendTaskList(taskListArray);
  return newToDoList;
};

function createTaskItems() {
  var domTasks = document.querySelectorAll('.task-to-add');
  var taskItems = [];
  domTasks.forEach(function(task) {
  var taskItem = {
    taskId: task.dataset.id,
    taskName: task.innerText,
    completed: false
    }
    taskItems.push(taskItem);
  });
  return taskItems;
};

function addTaskList(event) {
  event.preventDefault();
  var taskListArray = createTaskItems();
  var newToDoList = new ToDoList({
    id: Date.now(), 
    title: titleInput.value, 
    tasks: taskListArray, 
    urgency: false
  });
  createToDoList(newToDoList, taskListArray);
  allToDos.push(newToDoList);
  newToDoList.saveToStorage(allToDos);
  clearFields();
  disableAddBtn();
};

function mapLocalStorage(savedLists) {
  var listOfToDos = savedLists.map(function(obj) {
    return listOfToDos
  });
  allToDos = listOfToDos;
  createToDoList(allToDos);  
};

function appendCard(toDoList) {
  cardPrompt.classList.add('hidden');
  cardArea.insertAdjacentHTML('afterbegin',`<article id="card" data-id="${toDoList.id}">
          <header class="card-header">
            <h2 id="title-output">${toDoList.title}</h2>
          </header>
          <main class="task-output"> 
            <ul class="appended-tasks">
            </ul>
          </main> 
          </header>
          <footer>
            <div class="footer-item">
              <img class="urgent" src="images/urgent.svg" alt="">
              <p>URGENT</p>
            </div>
            <div class="footer-item">
              <img class="delete" src="images/delete.svg" alt="">
              <p>DELETE</p>
            </div>
          </footer>
        </article>`);
};

function appendTaskList(taskListArray) {
  var listItems = document.querySelector('.appended-tasks');
  taskListArray.forEach(task => {
    listItems.insertAdjacentHTML('beforeend',
      `
    <li class="task-to-add card-list-item"><img class="check" src="images/checkbox.svg" alt="">${task.taskName}</li>
      `);
  }) 
  addedTaskItem.innerHTML = '';
};


// function appendTaskList(taskListArray) {
//   var listItems = document.querySelector('.appended-tasks');
//   taskListArray.forEach(function(task) {
//     listItems.insertAdjacentHTML('beforeend',
//       `
//     <li class="task-to-add card-list-item"><img class="check" src="images/checkbox.svg" alt="">${task.taskName}</li>
//       `);
//   }) 
//   addedTaskItem.innerHTML = '';
// };

// <img src="images/checkbox-active.svg" alt="">

