var titleInput = document.getElementById('title-input');
var taskInput = document.getElementById('task-input');
var addTaskBtn = document.getElementById('add-task-btn');
var makeListBtn = document.getElementById('make-list-btn');
var clearBtn = document.getElementById('clear-btn');
var addedTaskItem = document.getElementById('added-task-item');



titleInput.addEventListener('keyup', enableClearAll);
taskInput.addEventListener('keyup', enableClearAll);
clearBtn.addEventListener('click', clearFields);
taskInput.addEventListener('keyup', enableAddBtn);
addTaskBtn.addEventListener('keyup', enableAddBtn);
addTaskBtn.addEventListener('click', addTaskItem);


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

function addTaskItem(task) {
  addedTaskItem.insertAdjacentHTML('afterbegin', `
    <ul>
    <li><img id="delete-list-item" src="images/delete-list-item.svg" alt=""><p id="task-to-add">${taskInput.value}</p></li>
    </ul>`);
  clearFields();
  addTaskBtn.disabled = true;
};

function deleteTask(task) {
  

}



