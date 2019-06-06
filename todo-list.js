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
  updateTask(taskIndex) {
    this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
    this.saveToStorage(allToDos);
  }
  deleteFromStorage(cardIndex) {
    allToDos.splice(cardIndex, 1);
    this.saveToStorage(allToDos)
  }
  updateToDo () {

  }
  
}