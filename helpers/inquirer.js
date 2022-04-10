require('colors')
const inq = require('inquirer');

const opt = [
    {
        type: 'list',
        name: 'option',
        message: 'Choose your option',
        choices: [
            {
                value: '1',
                name: `${ '1.'.brightCyan } Create task`
            }, {
                value: '2',
                name: `${'2.'.brightCyan} List all tasks`
            }, {
                value: '3',
                name: `${'3.'.brightCyan} List completed tasks`
            }, {
                value: '4',
                name: `${'4.'.brightCyan} List pending tasks`
            }, {
                value: '5',
                name: `${'5.'.brightCyan} Complete task(s)`
            }, {
                value: '6',
                name: `${'6.'.brightCyan} Delete a task`
            }, {
                value: '0',
                name: `${ '0.'.brightCyan } Exit`
            }
        ]
    }
]
const promptMenu = async () => {
    console.clear();
    console.log(`============================`.cyan);
    console.log(`      Select an option`.cyan);
    console.log(`============================\n`.cyan);

    const { option } = await inq.prompt(opt);

    return option;
}

const pauseOpt = [
    {
        type: 'input',
        name: 'pause',
        message: [`Press ${'Enter'.brightCyan} to continue`]
    }
]

const pause = async () => {
    console.log('\n')
    const { pause } = await inq.prompt(pauseOpt);

    return pause;
}

const readInput = async ( messageContent) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message: messageContent,
            validate(value) {
                if (value.length === 0) {
                    return `Please insert your text`
                }
                return true
            }
        }
    ]
    const { desc } = await inq.prompt(question)
    
    return desc
}

const tobeDeleted = async (tasks = []) => {

    const tasklist = tasks.map((task, index) => {

        const n = `${index + 1}.`.cyan;

        return {
            value: task.id,
            name: `${n} ${task.desc}`
        }
    })

    tasklist.unshift({
        value: 0,
        name: `0. Exit`.red
    })

    const delOpt = [
        {
            type: 'checkbox',
            name: 'id',
            message: 'Choose task(s) to delete',
            default: [0],
            choices: tasklist
        }
    ]

    const { id } = await inq.prompt(delOpt);

    return id
}
const confirm = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    const { ok } = await inq.prompt(question);

    return ok
}
const tobeCompleted = async (tasks = []) => {

    const tasklist = tasks.map((task, index) => {

        const n = `${index + 1}.`.cyan;
        let status = ``

        if (task.completed !== null) {
            status = `Completed`.green
        } else {
            status = `Pending`.yellow
        }

        return {
            value: task.id,
            name: `${n} ${task.desc} ${`::`.cyan} ${status}`
        }
    })

    tasklist.unshift({
        value: 0,
        name: `0. Exit`.red
    })

    const aknOpt = [
        {
            type: 'checkbox',
            name: 'id',
            message: 'Choose task(s) to complete / uncomplete',
            default: [0],
            choices: tasklist
        }
    ]

    const { id } = await inq.prompt(aknOpt);

    return id
}
module.exports = {
    promptMenu,
    pause,
    readInput,
    tobeDeleted,
    tobeCompleted,
    confirm
}