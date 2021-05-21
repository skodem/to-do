function onPageLoaded() {
  const input = document.querySelector("input[type='text']")
  const ul = document.querySelector('ul.todos')
  const saveButton = document.querySelector('button.save')
  const clearButton = document.querySelector('button.clear')

  function createTodo() {
    const li = document.createElement('li')
    const textSpan = document.createElement('span')
    textSpan.classList.add('todo-text')
    const newTodo = input.value
    textSpan.append(newTodo)

    const deleteBtn = document.createElement('span')
    deleteBtn.classList.add('todo-trash')
    const icon = document.createElement('i')
    icon.classList.add('fas', 'fa-trash-alt')
    deleteBtn.appendChild(icon)

    ul.appendChild(li).append(textSpan, deleteBtn)
    input.value = ''
    listenDeleteTodo(deleteBtn)
  }

  input.addEventListener('keypress', keyPressed => {
    const keyEnter = 13
    if (keyPressed.which == keyEnter && input.value.length !== 0) {
      createTodo()
    }
  })

  function listenDeleteTodo(element) {
    element.addEventListener('click', event => {
      element.parentElement.remove()
      event.stopPropagation()
    })
  }

  function loadTodos() {
    const data = localStorage.getItem('todos')
    if (data) {
      ul.innerHTML = data
    }
    const deleteButtons = document.querySelectorAll('span.todo-trash')
    for (const button of deleteButtons) {
      listenDeleteTodo(button)
    }
  }

  function onClickTodo(event) {
    if (event.target.tagName === 'LI') {
      event.target.classList.toggle('checked')
    }
  }

  saveButton.addEventListener('click', () => {
    localStorage.setItem('todos', ul.innerHTML)
  })
  clearButton.addEventListener('click', () => {
    ul.innerHTML = ''
    localStorage.removeItem('todos', ul.innerHTML)
  })

  ul.addEventListener('click', onClickTodo)
  loadTodos()
}

document.addEventListener('DOMContentLoaded', onPageLoaded)
