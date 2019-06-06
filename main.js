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
titleInput.addEventListener('keyup', enableAddTaskList)
addedTaskItem.addEventListener('click', deleteTask);
addedTaskItem.addEventListener('click', enableAddTaskList);
cardArea.addEventListener('click', cardAreaHandler);
window.addEventListener('load', mapLocalStorage);

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

function enableAddTaskList() {
  if (titleInput.value !== '' && addedTaskItem.innerHTML !== '') {
  makeListBtn.disabled = false;
  }
};

function disableAddTaskList() {
  makeListBtn.disabled = true;
};

function clearFields() {
  titleInput.value = '';
  taskInput.value = '';
  addedTaskItem.innerHTML = '';
  disableClearAll();
  disableAddBtn();
  disableAddTaskList();
};

function addTaskItem(task) {
  var id = Date.now();
  addedTaskItem.insertAdjacentHTML('beforeend', `
    <li class="task-to-add" data-id=${id}><img class="delete-list-item" src="images/delete-list-item.svg" alt="circle with x">${taskInput.value}</li>
      `);
  taskInput.value = '';
  enableAddTaskList();
  disableAddBtn();
};


function deleteTask(event) {
  if (event.target.closest('.delete-list-item')) {
    event.target.closest('.task-to-add').remove();
  };
};

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
  appendCard(newToDoList);
  appendTaskList(obj.tasks);
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
  appendCard(newToDoList);
  allToDos.push(newToDoList);
  newToDoList.saveToStorage(allToDos);
  clearFields();
  disableAddBtn();
};

function mapLocalStorage() {
  var listOfToDos = allToDos.map(function(obj) {
    return  obj = new ToDoList(obj); 
  });
  allToDos = listOfToDos; 
  populateCards(allToDos);
};

function generateTasks(obj) {
  var listItems = `<ul class="appended-tasks">`
  for (var i = 0; i < obj.tasks.length; i++) {
  var isCompleted = obj.tasks[i].completed ? 'completed-item' : 'card-list-item';
  var checkImg = obj.tasks[i].completed ? 'checkbox-active.svg' : 'checkbox.svg';
    listItems +=    
    `
    <li class="card-list-item" data-id="${obj.tasks[i].taskId}"><img class="check" src="images/${checkImg}" alt="circle"><p class="${isCompleted}">${obj.tasks[i].taskName}</p></li>
      `
  }
  return listItems;
};

function populateCards(array) {
  for (var i = 0; i < array.length; i++) {
    appendCard(array[i]);
  }
};

function appendCard(toDoList) {
  cardPrompt.classList.add('hidden');
  var listItems = generateTasks(toDoList);
  cardArea.insertAdjacentHTML('afterbegin',`<article id="card" data-id="${toDoList.id}">
          <header class="card-header">
            <h2 id="title-output">${toDoList.title}</h2>
          </header>
          <main class="task-output"> 
            ${listItems}
            </ul>
          </main> 
          </header>
          <footer>
            <div class="footer-item">
              <img class="urgent" src="images/urgent.svg" alt="blue lightning bolt">
              <p>URGENT</p>
            </div>
            <div class="footer-item">
              <img class="delete" src="images/delete.svg" alt="circle with x">
              <p>DELETE</p>
            </div>
          </footer>
        </article>`);
};

function cardAreaHandler(event) {
  updateCompleted(event);
};

function getCardId(event) {
 if (event.target.closest('article')) {
  console.log('clicked on a card')
  return event.target.closest('#card').getAttribute('data-id');
 }
};

function getCardIndex(id) {
 return allToDos.findIndex(function(obj) {
   return obj.id == parseInt(id);
 });
};

function updateCompleted(event) {
  if (event.target.classList.contains('card-list-item') || event.target.classList.contains('check')) {
  var index = getCardIndex(getCardId(event));
  var taskId = event.target.closest('.card-list-item').getAttribute('data-id');
  var taskIndex = getTaskIndex(taskId, index);
  allToDos[index].updateTask(taskIndex);
  }
};

// function toggleChecked(event) {
//   var checkedStatus = document.querySelector('.check');
//   var checkStyle = document.querySelector('.list-text');
//   checkedStatus = toToggle ? 'checkbox-active.svg' : 'checkbox.svg';
//   checkStyle = toToggle ? 'completed-item' : 'card-list-item';
// }



function getTaskIndex(id, cardIndex) {
  return allToDos[cardIndex].tasks.findIndex(function(taskObj) {
    return taskObj.taskId == parseInt(id);
  })
};



  




