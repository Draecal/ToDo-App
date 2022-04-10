const fs = require('fs')
const dir = './db/data.json'

const saveDb = (data) => {
    fs.writeFileSync(dir,JSON.stringify(data))
}

const readDb = () => {
    if (!fs.existsSync(dir)) {
        return null
    }

    const data = fs.readFileSync(dir, { encoding: 'utf-8' })
    
    return JSON.parse(data)
}
module.exports = {
    saveDb,
    readDb
}