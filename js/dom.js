
// constant untuk menampung id elemen Todo yang belum selesai

const UNCOMPLETED_LIST_TODO_ID = "todos";
const COMPLETED_LIST_TODO_ID = "completed-todos";
const TODO_ITEMID = "itemId"


// menambahhkan item ke todolist

function addTodo() {
  const uncompletedTODOList = document.getElementById(UNCOMPLETED_LIST_TODO_ID);

  const textTodo = document.getElementById("title").value;
  const timestamp = document.getElementById("date").value;
  console.log("todo" + textTodo);
  console.log("timestamp" + timestamp);

  const todo = makeTodo(textTodo, timestamp);

  // berfungsi untuk menyimpan objek task yang kita buat ke dalam variabel todos yang telah dibuat sebelumnya.
  const todoObject = composeTodoObject(textTodo, timestamp, false);

  todo[TODO_ITEMID] = todoObject.id;
  todos.push(todoObject);

  uncompletedTODOList.append(todo);
  updateDataToStorage();
}

// membuat sebuah tombol untuk menandai bahwa todo sudah selesai dilakukan

function createButton(buttonTypeClass, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}


function addTaskToCompleted(taskElement) {
  taskElement.remove();
}

function createCheckButton() {
  return createButton("check-button", function (event) {
    addTaskToCompleted(event.target.parentElement);
  });
}


// membuat item untuk mengisi container

function makeTodo(data, timestamp, isCompleted) {

  const textTitle = document.createElement("h2");
  textTitle.innerText = data;

  const textTimestamp = document.createElement("p");
  textTimestamp.innerText = timestamp;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner")
  textContainer.append(textTitle, textTimestamp);

  const container = document.createElement("div");
  container.classList.add("item", "shadow")
  container.append(textContainer);

  if (isCompleted) {
    container.append(
      createUndoButton(),
      createTrashButton()
    );
  } else {
    container.append(createCheckButton());
  }

  return container;
}


// menampilkan todo yang sudah ditandai sebagai todo yang telah selesai.

function addTaskToCompleted(taskElement) {
  const taskTitle = taskElement.querySelector(".inner > h2").innerText;
  const taskTimestamp = taskElement.querySelector(".inner > p").innerText;

  const newTodo = makeTodo(taskTitle, taskTimestamp, true);
  const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);

  const todo = findTodo(taskElement[TODO_ITEMID]);
  todo.isCompleted = true;
  newTodo[TODO_ITEMID] = todo.id;

  listCompleted.append(newTodo);
  taskElement.remove();

  updateDataToStorage();

}


// untuk menghapus elemen todo yang sudah selesai.

function removeTaskFromCompleted(taskElement /* HTMLELement */) {

  const todoPosition = findTodoIndex(taskElement[TODO_ITEMID]);
  todos.splice(todoPosition, 1);

  taskElement.remove();
  updateDataToStorage();
}


// untuk membuat button hapus todo

function createTrashButton() {
  return createButton("trash-button", function (event) {
    removeTaskFromCompleted(event.target.parentElement);
  });
}


// untuk mengembalikan todo yang sudah selesai ke todo yang belum selesai.

function undoTaskFromCompleted(taskElement) {
  const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
  const taskTitle = taskElement.querySelector(".inner > h2").innerText;
  const taskTimestamp = taskElement.querySelector(".inner > p").innerText;

  const newTodo = makeTodo(taskTitle, taskTimestamp, false);

  const todo = findTodo(taskElement[TODO_ITEMID]);
  todo.isCompleted = false;
  newTodo[TODO_ITEMID] = todo.id;

  listUncompleted.append(newTodo);
  taskElement.remove();

  updateDataToStorage();
}


// fungsi untuk membuat button undo

function createUndoButton() {
  return createButton("undo-button", function (event) {
    undoTaskFromCompleted(event.target.parentElement);
  });
}