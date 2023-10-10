require('dotenv').config()
const express = require('express')
const app = express()

app.get('/', (res, req) => {
    res.statusCode(200).json({ msg: 'Hello World' })
})

const PORT = process.env.PORT || 5050
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})