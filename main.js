const dateDay = document.querySelector('.todo__date-day')
const dateMonth = document.querySelector('.todo__date-month')
const dateWeekday = document.querySelector('.todo__date-weekday')
const todoList = document.querySelector('.todo__list');
const todoInput = document.querySelector('.todo__input');
const addButton = document.querySelector('.fa-plus')
const panicButton = document.querySelector('#panic-button')
const organizeButton = document.querySelector('#organize-button')


panicButton.addEventListener('click', cleanList)
organizeButton.addEventListener('click', renderOrganizeList)
addButton.addEventListener('click', addItemList)

function addItemList() {
  if (todoInput.value != '') {
    const todoItem = document.createElement('li');
    const todoText = document.createElement('p');

    todoItem.classList.add('todo__item');
    todoText.classList.add('todo__text');

    todoText.innerText = todoInput.value;

    todoItem.appendChild(addCompleteButton())
    todoItem.appendChild(todoText);
    todoItem.appendChild(addDeleteButton())
    todoList.prepend(todoItem);
  }
  todoInput.value = ''
}


function addDeleteButton () {
  const deletebutton = document.createElement('i');
  deletebutton.classList.add('fa');
  deletebutton.classList.add('fa-trash');

  deletebutton.addEventListener('click', (e) => {
    const item = e.target.parentElement;
    todoList.removeChild(item)
  })
  return deletebutton;
}

function addCompleteButton () {
  const completeTaskButton = document.createElement('i');
  completeTaskButton.classList.add('fa');
  completeTaskButton.classList.add('fa-check');
  completeTaskButton.classList.add('border-radius');
  
  completeTaskButton.addEventListener('click', (e) => {
    const item = e.target.nextElementSibling;
    const listItem = e.target.parentElement;

    listItem.classList.toggle('taskDone')
    item.classList.toggle('task-completed')

    completeTaskButton.classList.toggle('border-radius-on')
  })
  return completeTaskButton;
}

function cleanList () {
  todoList.textContent = ''
}

function organizeList() {
  const taskDone = []
  const taskToDo = []

  todoList.childNodes.forEach(listItem => {
    if(listItem.classList.contains('taskDone')) {
      taskDone.push(listItem)
    } else {
      taskToDo.push(listItem)
    }
  })
  return [...taskToDo, ...taskDone]
}

function renderOrganizeList() {
  organizeList().forEach(listItem => todoList.appendChild(listItem))
}

const setDate = () => {
  const date = new Date()
  dateDay.textContent = date.toLocaleString('en', { day: 'numeric' });
  dateMonth.textContent = date.toLocaleString('en', { month: 'short' });
  dateWeekday.textContent = date.toLocaleString('en', { weekday: 'long' });
}

setDate();