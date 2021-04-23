require('dotenv').config()
const { env: { PORT = 8080, MONGODB_URL } } = process

const express = require('express')
const mongoose = require('mongoose')
const { cors } = require('./middlewares')
const router = require('./routes')


return (async () => {
    await mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => console.log('🗄  Connected to database'))

    const app = express()

    app.use('/api', router)

    app.listen(PORT, () => console.log(`🚀 Server up and listening in port ${PORT}`))

    process.on('SIGINT', () => {
        console.log('🛑 Server abruptly stopped');

        process.exit(0);
    })
})()