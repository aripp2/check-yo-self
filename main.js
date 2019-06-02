var titleInput = document.getElementById('title-input');
var taskInput = document.getElementById('task-input');
var addTaskBtn = document.getElementById('add-task-btn');
var makeListBtn = document.getElementById('make-list-btn');
var clearBtn = document.getElementById('clear-btn');
var addedTaskItem = document.getElementById('added-task-item');
var cardArea = document.getElementById('card-area');
var cardPrompt = document.getElementById('card-prompt');

var allToDos = JSON.parse(localStorage.getItem('toDos')) || [];

titleInput.addEventListener('keyup', enableClearAll);
taskInput.addEventListener('keyup', enableClearAll);
clearBtn.addEventListener('click', clearFields);
taskInput.addEventListener('keyup', enableAddBtn);
addTaskBtn.addEventListener('keyup', enableAddBtn);
addTaskBtn.addEventListener('click', addTaskItem);
makeListBtn.addEventListener('click', addTaskList);
window.addEventListener('load', mapLocalStorage(allToDos));

function enableClearAll() {
  if (titleInput.value !== '' || taskInput.value !== '') {
    clearBtn.disabled = false;
  }
};

function disableClearAll() {
  clearBtn.disabled = true;
};

function clearFields() {
  titleInput.value = '';
  taskInput.value = '';
  disableClearAll();
};

function enableAddBtn() {
  if (taskInput.value !== '')
    addTaskBtn.disabled = false;
};

function disableAddBtn() {
  addTaskBtn.disabled = true;
}

function addTaskItem(task) {
  addedTaskItem.insertAdjacentHTML('afterbegin', `
    <ul>
    <li><img id="delete-list-item" src="images/delete-list-item.svg" alt=""><p id="task-to-add">${taskInput.value}</p></li>
    </ul>`);

  taskInput.value = '';
  disableAddBtn();
  createTaskList(task);
  // console.log('lets see ' taskList);
};


function createTaskList(tasks) {
   var taskList = [];
   for(var i = 0; i < tasks.length; i++) {
    taskList.push();
    console.log('lets see ', taskList);
   }
};


// function deleteTask(task) {
//   if (event.target.closest('#delete-list-item')) {

//   }
// };

function createToDoList(obj) {
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
  console.log('hi' , newToDoList )
  appendCard(newToDoList);
  return newToDoList;
}

function addTaskList() {
  event.preventDefault();
  var newToDoList = new ToDoList({
    id: Date.now(), 
    title: titleInput.value, 
    tasks: taskInput.value, 
    urgency: false
  });
  console.log('two ', newToDoList)
  createToDoList(newToDoList);
  allToDos.push(newToDoList);
  newToDoList.saveToStorage(allToDos);
  clearFields();
  disableAddBtn();
};

function mapLocalStorage(savedLists) {
  var refreshLists = savedLists.map(function(lists) {
    return createToDoList(lists);
  });
  allToDos = refreshLists;
};

function appendCard(toDoList) {
  cardPrompt.classList.add('hidden');
  cardArea.insertAdjacentHTML('afterbegin',`<article id="card" data-id="${toDoList.id}">
          <header class="card-header">
            <h2 id="title-output">${toDoList.title}</h2>
          </header>
          <main class="task-output"> 
            <img src="images/checkbox.svg" alt="">
            <img src="images/checkbox-active.svg" alt="">
          </main> 
          </header>
          <footer>
            <div class="footer-item">
              <img id="urgent" src="images/urgent.svg" alt="">
              <p>URGENT</p>
            </div>
            <div class="footer-item">
              <img id="delete" src="images/delete.svg" alt="">
              <p>DELETE</p>
            </div>
          </footer>
        </article>`);
}

