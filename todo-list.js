class ToDoList {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.tasks = obj.tasks || [];
    this.urgency = obj.urgency || false;

  }
  saveToStorage(toDoList) {
    var allTasks = JSON.stringify(toDoList);
    localStorage.setItem('toDos', allTasks);
  }
  deleteFromStorage() {

  }
  updateToDo () {

  }
  updateTask() {
    
  }
  // instanciateTask(tasks) {
  //   for (var i = 0; i < tasks.length; i++)
  //   this.tasks.push(tasks);
  // console.log('here ', taskList);
  // }
}