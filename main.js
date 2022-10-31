const todoList = document.querySelector('.todo__list');
const todoInput = document.querySelector('.todo__input');
const addButton = document.querySelector('.fa-plus');

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
    todoList.appendChild(todoItem);
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
    item.classList.toggle('task-completed')
    completeTaskButton.classList.toggle('border-radius-on')
  })
  return completeTaskButton;
}