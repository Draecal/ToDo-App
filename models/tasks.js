require('colors')
const { v4: uuidv4 } = require('uuid')
const Task = require('./task')
const inq = require('inquirer');


class Tasks {
    _list = { };

    get listArr() {
        const list = []

        Object.keys(this._list).forEach(key => {
            list.push(this._list[key])
        })
        return list
    }

    constructor() {
        this._list = { }
    }

    deleteTask(id) {
        if (this._list[id]) {
            delete this._list[id]
        }
    }
    completeTask(id) {
        if (this._list[id]) {
            if (this._list[id].completed === null) {
                this._list[id].completed = new Date().toJSON()
            } else {
                this._list[id].completed = null
            }
        }
    }
    loadTasks(tasklist = []) {
        tasklist.forEach(task => {
            this._list[task.id] = task
        })
    }
    createTask(desc) {
        const task = new Task(desc)
        this._list[task.id] = task
    }
    listAllTasks() {
        console.log('')
        this.listArr.forEach((task, index) => {

            const n = `${index + 1}`.cyan;
            const { desc, completed } = task;
            const status = (completed)
                ? `${new Date(completed).toLocaleDateString()}`.green
                : `Pending`.yellow;
            
            console.log(`${n}. ${desc} :: ${status}`);
        })
    }
    listPendingCompletedTasks(taskStatus) {
        console.log('')
        let index = 0

        this.listArr.forEach((task) => {
            const { desc, completed } = task;

            if (taskStatus === true && completed !== null) {
                const n = `${index += 1}.`.cyan;

                const status = `${new Date(completed).toLocaleDateString()}`.green

                console.log(`${n} ${desc} ${`::`.cyan} ${status}`);
            }
            if (taskStatus === false && completed === null) {
                const n = `${index += 1}.`.cyan;

                const status = `Pending`.yellow

                console.log(`${n} ${desc} ${`::`.cyan} ${status}`);
            }
        })
    }
}

module.exports = Tasks