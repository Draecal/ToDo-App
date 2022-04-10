require('colors');
const { promptMenu,
        pause,
        readInput,
        tobeDeleted,
        tobeCompleted,
        confirm} = require('./helpers/inquirer');
const {saveDb,readDb} = require('./helpers/savefile');
const Tasks = require('./models/tasks');
console.clear()

const main = async() => {
    let opt = ""

    const task = new Tasks()
    const tasklist = readDb()

    if (tasklist) {
        task.loadTasks(tasklist)
    }
    
    do {
        opt = await promptMenu(); 

        switch (opt) {
            case '1': //Create a task
                const desc = await readInput('Name your task: ')
                task.createTask(desc)
                break;
            case '2': //List all tasks
                task.listAllTasks()
                break;
            case '3': //List completed tasks
                task.listPendingCompletedTasks(true)
                break;
            case '4': //List pending tasks
                task.listPendingCompletedTasks(false)
                break;
            case '5': //Complete / uncomplete task(s)
                const idx = await tobeCompleted(task.listArr)
                if (idx[0] !== 0) {
                    const compConfirm = await confirm('Do you want to modify the selected task(s)?')
                    if (compConfirm) {
                        idx.forEach(i => {
                            task.completeTask(i)
                        })
                        console.log('')
                        console.log(`Task(s) modifed`.green)
                    }
                }
                break;
            case '6': //Delete task(s)
                const id = await tobeDeleted(task.listArr);
                if ( id[0] !== 0 ) {
                    const delConfirm = await confirm(`Are you sure to delete the selected task(s)?`)
                    if (delConfirm) {
                        id.forEach(i => {
                            task.deleteTask(i)
                        })
                        console.log('')
                        console.log(`Task(s) deleted`.green)
                    }
                }
                break;
        }

        saveDb(task.listArr)

        await pause()
    } while (opt !== '0')

    console.clear()
}

main();