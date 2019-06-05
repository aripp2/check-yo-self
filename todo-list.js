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
  updateTask() {
    
  }
  deleteFromStorage() {

  }
  updateToDo () {

  }
  
}