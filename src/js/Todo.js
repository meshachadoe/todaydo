class Todo {
    constructor(id, desc, completed) {
        this.id = id
        this.desc = desc
        this.completed = completed
    }

    get getID() {
        return this.id
    }

    get getDesc() {
        return this.desc
    }

    get getStatus() {
        return this.completed
    }
}