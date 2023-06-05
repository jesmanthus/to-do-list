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
const allPageButton = document.querySelector('#all-page')
const pendingPageButton = document.querySelector('#pending-page')
const completedPageButton = document.querySelector('#completed-page')
let items = []
let numberItem = 0


/* Calls */
setDate();

/* Events */
window.addEventListener('hashchange', renderUI)

document.addEventListener('DOMContentLoaded', renderUI)

panicButton.addEventListener('click', cleanList)

cleanListCompletedButton.addEventListener('click', cleanListCompleted)

// organizeButton.addEventListener('click', () => {
//   if (todoList.lastElementChild !== emptyListItem) renderOrganizeList()
// })

addButton.addEventListener('click', () => {
  if (todoInput.value != '') {
    items.push(addItemList())
    addItemStorage()
    numberItem = items[items.length - 1].id + 1
  }
  changeNumberPendingItems()
})

todoInput.addEventListener('keyup', () => {
  if (event.which === 13 && todoInput.value != '') {
    items.push(addItemList())
    addItemStorage()
    numberItem = items[items.length - 1].id + 1
  }
  changeNumberPendingItems()
})

/* Functions */
function addItemList() {
  if (todoList.lastElementChild === emptyListItem) {
    todoList.removeChild(emptyListItem)
  }

  const todoItem = document.createElement('li');
  const todoText = document.createElement('p');

  // todoText.addEventListener('click', () => {
  //   if (window.innerWidth <= 1023) editTextItem()
  // })

  // todoText.addEventListener('dblclick', () => {
  //   if (window.innerWidth >= 1024) editTextItem()
  // })

  todoText.addEventListener('click', editTextItem)


  todoItem.classList.add('todo__item');
  todoText.classList.add('todo__text');

  todoText.innerText = todoInput.value;

  todoItem.appendChild(addCompleteButton())
  todoItem.appendChild(todoText);
  todoItem.appendChild(addDeleteButton())
  todoItem.setAttribute('data-id', numberItem)

  if (!location.hash.startsWith('#/completed')) {
    todoList.prepend(todoItem);
  } else if (todoList.childElementCount === 0) {
    todoList.appendChild(emptyListItem)
  }

  todoInput.value = ''

  const taskObj = {
    taskName: todoText.innerText,
    taskDone: false,
    id: items.length === 0 ? 0 : numberItem
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
  todoItem.setAttribute('data-id', numberItem)
  todoItem.firstElementChild.innerText = 'radio_button_checked'
  todoItem.firstElementChild.nextElementSibling.classList.add('task-completed')


  todoList.prepend(todoItem);

  todoInput.value = ''

  const taskObj = {
    taskName: todoText.innerText,
    taskDone: true,
    id: numberItem
  }

  return taskObj
}

function editTextItem(event) {
  const todoItem = event.target.parentElement
  const editTextBox = document.createElement('input')


  todoItem.childNodes.forEach(item => {
    item.style.display = 'none'
  })

  todoItem.classList.add('editTextBoxActive')
  editTextBox.classList.add('todo__editTextBox')
  editTextBox.value = todoItem.firstElementChild.nextElementSibling.textContent
  todoItem.appendChild(editTextBox)
  todoItem.lastElementChild.focus()


  editTextBox.addEventListener('blur', () => {

    todoItem.removeChild(editTextBox)
    todoItem.classList.remove('editTextBoxActive')

    todoItem.childNodes.forEach(item => {
      item.removeAttribute('style')
    })

  })

  editTextBox.addEventListener('keyup', (event) => {
    if (event.which === 27) {
      editTextBox.blur()
    }
  })



  editTextBox.addEventListener('keyup', (event) => {
    if (event.which === 13) {
      todoItem.firstElementChild.nextElementSibling.textContent = editTextBox.value

      items = items.map(arrayItem => {
        if (arrayItem.id == todoItem.getAttribute("data-id")) arrayItem.taskName = editTextBox.value.trim()
        return arrayItem
      })

      addItemStorage()
      renderUI()
    }
  })
}

function addDeleteButton() {
  const deletebutton = document.createElement('span');
  deletebutton.classList.add('material-symbols-outlined')
  deletebutton.innerText = 'delete'

  deletebutton.addEventListener('click', (e) => {
    const item = e.target.parentElement;
    todoList.removeChild(item)

    if (todoList.childElementCount === 0) {
      todoList.appendChild(emptyListItem)
    }

    items = items.filter(arrayItem => arrayItem.id != item.getAttribute("data-id"))


    numberItem = items[0] !== undefined ? items[items.length - 1].id + 1 : 0

    addItemStorage()
    changeNumberPendingItems()
  })
  return deletebutton;
}

function addCompleteButton() {
  const completeTaskButton = document.createElement('span');
  completeTaskButton.classList.add('material-symbols-outlined');

  completeTaskButton.innerText = 'radio_button_unchecked'

  completeTaskButton.addEventListener('click', (e) => {
    if (completeTaskButton.innerText === 'radio_button_unchecked') {
      completeTaskButton.innerText = 'radio_button_checked'
    } else {
      completeTaskButton.innerText = 'radio_button_unchecked'
    }

    const item = e.target.nextElementSibling;
    const listItem = e.target.parentElement;
    listItem.classList.toggle('taskDone')
    item.classList.toggle('task-completed')

    items = items.map(arrayItem => {
      if (arrayItem.id == listItem.getAttribute("data-id")) {
        if (arrayItem.taskDone === true) {
          arrayItem.taskDone = false
        } else {
          arrayItem.taskDone = true
        }
      }
      return arrayItem
    })

    addItemStorage()
    renderUI()
    changeNumberPendingItems()
  })

  return completeTaskButton;
}

function cleanList() {
  todoList.textContent = ''
  todoList.appendChild(emptyListItem)
  items = []
  numberItem = 0
  addItemStorage()
  changeNumberPendingItems()
}

function cleanListCompleted() {
  items = items.filter(arrayItem => arrayItem.taskDone === false)

  todoList.textContent = ''

  items.forEach(task => {
    todoInput.value = task.taskName
    numberItem = task.id
    addItemList()
  })

  numberItem = items.length === 0 ? 0 : items[items.length - 1].id + 1
  addItemStorage()

  if (todoList.children.length === 0) todoList.appendChild(emptyListItem)
}

// function organizeList() {
//   const taskDone = []
//   const taskToDo = []

//   items.forEach(task => {
//     if (task.taskDone === true) {
//       taskDone.push(task)
//     } else {
//       taskToDo.push(task)
//     }
//   })

//   return [...taskDone, ...taskToDo]
// }

function renderOrganizeList() {
  todoList.textContent = ''

  items = organizeList()

  items.forEach(task => {
    if (task.taskDone === false) {
      todoInput.value = task.taskName
      numberItem = task.id
      addItemList()
    } else {
      todoInput.value = task.taskName
      numberItem = task.id
      addItemListCompleted()
    }
  })

  // addItemStorage()
}

function changeNumberPendingItems() {
  if (items.length !== 0) {
    const taskToDo = items.filter(arrayItem => arrayItem.taskDone === false)

    if (taskToDo.length === 1) {
      numberPendingItems.innerText = `${taskToDo.length} item left`
    } else {
      numberPendingItems.innerText = `${taskToDo.length} items left`
    }

  } else {
    numberPendingItems.innerText = `0 items left`
  }
}

function setDate() {
  const date = new Date()
  dateDay.textContent = date.toLocaleString('en', { day: 'numeric' });
  dateMonth.textContent = date.toLocaleString('en', { month: 'short' });
  dateWeekday.textContent = date.toLocaleString('en', { weekday: 'long' });
}

function renderUI() {
  if (location.hash.startsWith('#/pending')) {
    todoList.textContent = ''
    todoList.appendChild(emptyListItem)
    pendingPageButton.classList.add('active')
    allPageButton.classList.remove('active')
    completedPageButton.classList.remove('active')

    if (localStorage.getItem('items') !== null) {
      items = JSON.parse(localStorage.getItem('items'))
    }

    items.forEach(item => {
      if (item.taskDone === false) {
        todoInput.value = item.taskName
        numberItem = item.id
        addItemList()
      }
    })

    if (items.length) numberItem = items[items.length - 1].id + 1
    changeNumberPendingItems()

  } else if (location.hash.startsWith('#/completed')) {
    todoList.textContent = ''
    todoList.appendChild(emptyListItem)
    completedPageButton.classList.add('active')
    pendingPageButton.classList.remove('active')
    allPageButton.classList.remove('active')

    if (localStorage.getItem('items') !== null) {
      items = JSON.parse(localStorage.getItem('items'))
    }

    items.forEach(item => {
      if (item.taskDone === true) {
        todoInput.value = item.taskName
        numberItem = item.id
        addItemListCompleted()
      }
    })

    if (items.length) numberItem = items[items.length - 1].id + 1
    changeNumberPendingItems()

  } else {
    todoList.textContent = ''
    todoList.appendChild(emptyListItem)
    allPageButton.classList.add('active')
    pendingPageButton.classList.remove('active')
    completedPageButton.classList.remove('active')

    if (localStorage.getItem('items') !== null) {
      items = JSON.parse(localStorage.getItem('items'))
    }

    items.forEach(item => {
      if (item.taskDone === true) {
        todoInput.value = item.taskName
        numberItem = item.id
        addItemListCompleted()
      } else {
        todoInput.value = item.taskName
        numberItem = item.id
        addItemList()
      }
    })

    if (items.length !== 0) numberItem = items[items.length - 1].id + 1
    changeNumberPendingItems()
  }
}

/* LOCAL STORAGE */
function addItemStorage() {
  localStorage.setItem('items', JSON.stringify(items))
}