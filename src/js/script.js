
const DOMStrings = {
    buttonDelete: '.delete-btn',
    iconDelete: 'delete-icon',
    buttonAdd: '.add-btn',
    wrapperAdd: '.add-box',
    fieldAdd: '.new-todo-desc',
    wrapperToDos: '.todolist',
    filterWrapper: '.filter-todo'
}

// Array to store todo list tasks
const listToDos = []

// Function Constructor for Todo Object
function Todo(id, desc) {
    this.id = id;
    this.desc = desc;
}

// Setup Event Listeners
document.querySelector(DOMStrings.wrapperToDos).addEventListener('click', deleteToDo)
document.querySelector(DOMStrings.buttonAdd).addEventListener('click', addToDo)
document.addEventListener('keypress', (e) => {
    if (e.key === 13 || event.which === 13) {
        addToDo()
    }
})
document.querySelector(DOMStrings.wrapperToDos).addEventListener('click', completeToDo)


function addToDo() {
    let todo, newID

    if (listToDos.length > 0) {
        newID = listToDos[listToDos.length - 1].id + 1
    } else {
        newID = 0
    }
    todo = new Todo(newID, document.querySelector(DOMStrings.fieldAdd).value)
    // Add todo to array
    listToDos.push(todo)

    // Add todo to UI
    const newTodo = `<li class="todolist__todo" id=${todo.id}><div class="todolist__tododesc"><input type="checkbox" class="checkbox"><label>${todo.desc}</label></div><button class="delete-btn"><ion-icon name="close-circle" class="delete-icon"></ion-icon></button></li>`
    document.querySelector(DOMStrings.wrapperToDos).insertAdjacentHTML('beforeend', newTodo)

    // Clear fields
    clearFields()
}

function completeToDo(e) {
    const todoCheck = e.target
    if (todoCheck.classList.contains('checkbox')) {
        todoCheck.parentNode.parentNode.classList.toggle('completed')
        console.log(todoCheck.parentNode.parentNode)
    }
}

function deleteToDo(e) {
    const item = e.target
    const todoID = e.target.parentNode.parentNode.id

    // Remove todo from array
    listToDos.forEach((cur, index) => {
        if (cur.id == todoID) {
            listToDos.splice(index, 1)
        }
    })

    // Remove todo from UI
    if (item.classList[0] === DOMStrings.iconDelete) {
        const elemToDel = item.parentNode.parentNode
        elemToDel.parentNode.removeChild(elemToDel)
    }
}

function clearFields() {
    const addField = document.querySelector(DOMStrings.fieldAdd);
    addField.value = ""
    addField.focus()
}

document.getElementsByTagName('select')[0].onchange = function() {
    const todos = document.querySelector(DOMStrings.wrapperToDos).childNodes
    todos.forEach((cur) => {
        switch(this.selectedIndex) {
            case 0:
                cur.style.display = 'flex';
                break
            case 1:
                if (cur.classList.contains('completed')) {
                    cur.style.display = 'flex';
                } else {
                    cur.style.display = 'none';
                }
                break
            case 2:
                if (!cur.classList.contains('completed')) {
                    cur.style.display = 'flex';
                } else {
                    cur.style.display = 'none';
                }
                break
        }
    })
}


