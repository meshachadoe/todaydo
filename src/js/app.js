const DOMStrings = {
    buttonDelete: '.delete-btn',
    iconDelete: 'delete-icon',
    buttonAdd: '.add-btn',
    wrapperAdd: '.add-box',
    fieldAdd: '.new-todo-desc',
    wrapperToDos: '.todolist',
    filterWrapper: '.filter-todo',
    checkbox: '.checkbox'
}

// Array to store todo list tasks
const listToDos = []

// Load data from local storage
function loadData() {
    let todo, status
    todoArray = JSON.parse(localStorage.getItem('listToDos'));
    if (todoArray) {
        todoArray.forEach((todo, index) => {
            todo.completed ? status = 'checked' : status = ''
            const todoHTML = `<li class="todolist__todo ${status}" id=${todo.id}><div class="todolist__tododesc"><input type="checkbox" class="checkbox" ${status}><label>${todo.desc}</label></div><button class="delete-btn"><ion-icon name="close-circle" class="delete-icon"></ion-icon></button></li>`
            document.querySelector(DOMStrings.wrapperToDos).insertAdjacentHTML('beforeend', todoHTML)
            console.log(todoHTML)
            listToDos.push(new Todo(todo.id, todo.desc, todo.completed))
        })
    }
}

loadData()

// Setup Event Listeners
document.querySelector(DOMStrings.wrapperToDos).addEventListener('click', deleteToDo)
document.querySelector(DOMStrings.wrapperToDos).addEventListener('click', completeToDo)
document.querySelector(DOMStrings.buttonAdd).addEventListener('click', addToDo)
document.addEventListener('keypress', (e) => {
    if (e.key === 13 || event.which === 13) {
        addToDo()
    }
})

function addToDo() {
    let todo, newID

    // Determine new ID
    if (listToDos.length > 0) {
        newID = listToDos[listToDos.length - 1].id + 1
    } else {
        newID = 0
    }

    // Add todo to array
    todo = new Todo(newID, document.querySelector(DOMStrings.fieldAdd).value, false)
    listToDos.push(todo)
    localStorage.setItem('listToDos', JSON.stringify(listToDos))

    // Add todo to UI
    const newTodo = `<li class="todolist__todo" id=${todo.getID}><div class="todolist__tododesc"><input type="checkbox" class="checkbox"><label>${todo.getDesc}</label></div><button class="delete-btn"><ion-icon name="close-circle" class="delete-icon"></ion-icon></button></li>`
    document.querySelector(DOMStrings.wrapperToDos).insertAdjacentHTML('beforeend', newTodo)

    // Clear fields
    clearFields()
}

function completeToDo(e) {
    const todoCheck = e.target
    // Add completed class for filter feature
    if (todoCheck.classList.contains('checkbox')) {
        todoCheck.parentNode.parentNode.classList.toggle('checked')
        const todoID = e.target.parentNode.parentNode.id

        // Change complete status for todo object in array and local storage
        listToDos.forEach((cur, index) => {
            if (cur.id == todoID) {
                newTodo = new Todo(cur.getID, cur.getDesc, !cur.completed)
                cur.completed = !cur.completed
                // Update data in local storage
                localStorage.setItem('listToDos', JSON.stringify(listToDos))
            }
        })
    }

}

function deleteToDo(e) {
    const item = e.target
    if (item.classList.contains('delete-icon')) {
        const todoID = e.target.parentNode.parentNode.id
        // Remove todo from array
        listToDos.forEach((cur, index) => {
            if (cur.getID == todoID) {
                listToDos.splice(index, 1)
                localStorage.setItem('listToDos', JSON.stringify(listToDos))
            }
        })

        // Remove todo from UI
        if (item.classList[0] === DOMStrings.iconDelete) {
            const elemToDel = item.parentNode.parentNode
            console.log(elemToDel)
            elemToDel.parentNode.removeChild(elemToDel)
        }
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
        console.log(cur)
        switch(this.selectedIndex) {
            case 0:
                cur.style.display = 'flex';
                break
            case 1:
                if (cur.classList.contains('checked')) {
                    cur.style.display = 'flex';
                } else {
                    cur.style.display = 'none';
                }
                break
            case 2:
                if (!cur.classList.contains('checked')) {
                    cur.style.display = 'flex';
                } else {
                    cur.style.display = 'none';
                }
                break
        }
    })
}


