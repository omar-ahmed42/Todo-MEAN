const mongoose = require('mongoose')
const host = process.env.MONGODB_SERVICE_HOST || '127.0.0.1'
const port = process.env.MONGODB_SERVICE_PORT || 27017
const database = 'todo'
const connectDB =  () =>
    mongoose.connect(`mongodb://${host}:${port}/${database}`)
        .then(() => {
            console.log('Database connection successful')
        })
        .catch((err) => {
            console.log('Database connection failed \n', err)
        })

module.exports = {connectDB}
