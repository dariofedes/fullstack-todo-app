require('dotenv').config()
const { env: { PORT = 8080, MONGODB_URL } } = process

const express = require('express')
const mongoose = require('mongoose')


return (async () => {
    await mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => console.log('🗄 Connected to database 🗄'))

    const app = express()

    app.get('/', (req, res) => res.sendStatus(200))

    app.listen(PORT, () => console.log(`🚀 Server up and listening in port ${PORT} 🚀`))

    process.on('SIGINT', () => {
        console.log('🛑 Server abruptly stopped 🛑');

        process.exit(0);
    })
})()