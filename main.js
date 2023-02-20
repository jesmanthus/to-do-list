const dateDay = document.querySelector('.todo__date-day')
const dateMonth = document.querySelector('.todo__date-month')
const dateWeekday = document.querySelector('.todo__date-weekday')
const todoList = document.querySelector('.todo__list');
const todoInput = document.querySelector('.todo__input');
const addButton = document.querySelector('.material-symbols-outlined')
const panicButton = document.querySelector('#panic-button')
const cleanListCompletedButton = document.querySelector('#clearCompleted-button')
const organizeButton = document.querySelector('#organize-button')
const emptyListItem = document.querySelector('#empty')
const numberPendingItems = document.querySelector('#number-pending-items')
let items = []

/* Calls */
setDate();

/* Events */
panicButton.addEventListener('click', cleanList)

cleanListCompletedButton.addEventListener('click', () => {
  if(todoList.lastElementChild !== emptyListItem) cleanListCompleted()
})

organizeButton.addEventListener('click', () => {
  if(todoList.lastElementChild !== emptyListItem) organizeList()
})

addButton.addEventListener('click', () => {
  if (todoInput.value != '') {
    items.push(addItemList())
    addItemStorage()    
  }
  changeNumberPendingItems()
})

todoInput.addEventListener('keyup', () => {
  if (event.which === 13 && todoInput.value != '') {
    items.push(addItemList())
    addItemStorage()
  }
  changeNumberPendingItems()
})

document.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem('items') !== null) {
    items = JSON.parse(localStorage.getItem('items'))
  }
  items.forEach(item => {
    if(item.taskDone === true) {
      todoInput.value = item.taskName
      addItemListCompleted()
    } else {
      todoInput.value = item.taskName
      addItemList()
    }
  })
  changeNumberPendingItems()
})

/* Functions */
function addItemList() {
  if (todoList.lastElementChild === emptyListItem) {
    todoList.removeChild(emptyListItem)
  }

  const todoItem = document.createElement('li');
  const todoText = document.createElement('p');


  todoItem.classList.add('todo__item');
  todoText.classList.add('todo__text');

  todoText.innerText = todoInput.value;

  todoItem.appendChild(addCompleteButton())
  todoItem.appendChild(todoText);
  todoItem.appendChild(addDeleteButton())
  todoList.prepend(todoItem);

  todoInput.value = ''
  
  const taskObj = {
    taskName: todoText.innerText,
    taskDone: false
  }

  return taskObj
}

function addItemListCompleted() {
  if (todoList.lastElementChild === emptyListItem) {
    todoList.removeChild(emptyListItem)
  }

  const todoItem = document.createElement('li');
  const todoText = document.createElement('p');


  todoItem.classList.add('todo__item');
  todoItem.classList.add('taskDone')
  todoText.classList.add('todo__text');

  todoText.innerText = todoInput.value;

  todoItem.appendChild(addCompleteButton())
  todoItem.appendChild(todoText);
  todoItem.appendChild(addDeleteButton())

  todoItem.firstElementChild.innerText = 'radio_button_checked'
  todoItem.firstElementChild.nextElementSibling.classList.add('task-completed')
  

  todoList.prepend(todoItem);

  

  todoInput.value = ''
  
  const taskObj = {
    taskName: todoText.innerText,
    taskDone: true
  }

  return taskObj
}

function addDeleteButton () {
  const deletebutton = document.createElement('span');
  deletebutton.classList.add('material-symbols-outlined')
  deletebutton.innerText = 'delete'

  deletebutton.addEventListener('click', (e) => {
    const item = e.target.parentElement;
    todoList.removeChild(item)

    if(todoList.childElementCount === 0) {
      todoList.appendChild(emptyListItem)
    }

    items = []

    for(let i=0; document.querySelectorAll('.todo__text').length > i; i++) {
      
      const objectTask = {
        taskName: todoList.children[i].firstElementChild.nextElementSibling.innerText,
        taskDone: todoList.children[i].classList.contains('taskDone')
      }

      items.push(objectTask)
    }

    items = items.reverse()

    addItemStorage()
    changeNumberPendingItems()
  })
  return deletebutton;
}

function addCompleteButton () {
  const completeTaskButton = document.createElement('span');
  completeTaskButton.classList.add('material-symbols-outlined');
  
  completeTaskButton.innerText = 'radio_button_unchecked'

  completeTaskButton.addEventListener('click', (e) => {
    if(completeTaskButton.innerText === 'radio_button_unchecked') {
      completeTaskButton.innerText = 'radio_button_checked'
    } else {
      completeTaskButton.innerText = 'radio_button_unchecked'
    }

    const item = e.target.nextElementSibling;
    const listItem = e.target.parentElement;
    listItem.classList.toggle('taskDone')
    item.classList.toggle('task-completed')

    items = []

    for(let i=0; todoList.children.length > i; i++) {
      
      const objectTask = {
        taskName: todoList.children[i].firstElementChild.nextElementSibling.innerText,
        taskDone: todoList.children[i].classList.contains('taskDone')
      }

      items.push(objectTask)
    }

    items = items.reverse()

    addItemStorage()
    changeNumberPendingItems()
  })
  return completeTaskButton;
}

function cleanList () {
  todoList.textContent = ''
  todoList.appendChild(emptyListItem)
  items = []
  addItemStorage()
  changeNumberPendingItems()
}

function cleanListCompleted () {
  for (let i=0; todoList.children.length > i; i++) {
    if(todoList.children[i].classList.contains('taskDone')) {
      todoList.removeChild(todoList.children[i])
    }
  }
  
  items = []

  for(let i=0; todoList.children.length > i; i++) {
      
    const objectTask = {
      taskName: todoList.children[i].firstElementChild.nextElementSibling.innerText,
      taskDone: false
    }

    items.push(objectTask)
  }

  items = items.reverse()
  addItemStorage()

  if(todoList.children.length === 0) todoList.appendChild(emptyListItem)
} 

function organizeList() {
  const taskDone = []
  const taskToDo = []

  for(let i=0; todoList.children.length > i; i++) {
    if(todoList.children[i].classList.contains('taskDone')) {
      taskDone.push(todoList.children[i])
    } else {
      taskToDo.push(todoList.children[i])
    }
  }

  items = []

  return [...taskToDo, ...taskDone]
}

function renderOrganizeList() {
  organizeList().forEach(listItem => todoList.appendChild(listItem))

  items = []

  for(let i=0; todoList.children.length > i; i++) {
      
    const objectTask = {
      taskName: todoList.children[i].firstElementChild.nextElementSibling.innerText,
      taskDone: todoList.children[i].classList.contains('taskDone')
    }

    items.push(objectTask)
  }

  items = items.reverse()

  addItemStorage()
}

function changeNumberPendingItems () {
  if(todoList.lastElementChild !== emptyListItem) {
    // const taskDone = []
    const taskToDo = []
  
    for(let i=0; todoList.children.length > i; i++) {
      if(!todoList.children[i].classList.contains('taskDone')) {
        taskToDo.push(todoList.children[i])
      } 
    }

    if(taskToDo.length === 1) {
      numberPendingItems.innerText = `${taskToDo.length} item left`
    } else {
      numberPendingItems.innerText = `${taskToDo.length} items left`
    }
  } else {
    numberPendingItems.innerText = `0 item left`
  }
}

function setDate() {
  const date = new Date()
  dateDay.textContent = date.toLocaleString('en', { day: 'numeric' });
  dateMonth.textContent = date.toLocaleString('en', { month: 'short' });
  dateWeekday.textContent = date.toLocaleString('en', { weekday: 'long' });
}

/* LOCAL STORAGE */
function addItemStorage() {
  localStorage.setItem('items', JSON.stringify(items))
}
