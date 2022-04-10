require('colors')

const menu = () => {
    return new Promise(res => {
        console.clear();
        console.log(`============================`.cyan);
        console.log(`      Select an option`.cyan);
        console.log(`============================\n`.cyan);

        console.log(`${'1.'.brightCyan} Create task`)
        console.log(`${'2.'.brightCyan} List all tasks`)
        console.log(`${'3.'.brightCyan} List completed tasks`)
        console.log(`${'4.'.brightCyan} List pending tasks`)
        console.log(`${'5.'.brightCyan} Complete task(s)`)
        console.log(`${'6.'.brightCyan} Delete a task`)
        console.log(`${'0.'.brightCyan} Exit\n`)

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
        readline.question(`Select one option: `, (opt) => {
            readline.close()
            res(opt)
        })
    })
    
}

const pause = () => {
    return new Promise(res => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
        readline.question(`\nPress ${'Enter'.brightCyan} to continue:\n`, (opt) => {
            readline.close()
            res()
        })
    })
}
module.exports = {
    menu,
    pause
}