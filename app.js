const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose')
const TodoTask = require('./models/todo')
const dotenv = require('dotenv')
dotenv.config()

const port = 3298

app.get('/todos', (req, res) => {
    TodoTask.find({}, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
})

app.post('/todos/add', async (req, res) => {
    const todoTask = new TodoTask({
        content: req.body.content
    })
    await todoTask.save()
    res.send(todoTask)
})

app.put('/todos/update/:id', async (req, res) => {
    const response = await TodoTask.findByIdAndUpdate(req.params.id, { content: req.body.content, date: req.body.date })
    res.send(response)
})

app.delete('/todos/delete/:id', async (req, res) => {
    const response = await TodoTask.findByIdAndDelete(req.params.id)
    res.send(response)
})

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB connected'))
    .catch((err) => {
        console.log(err)
    })

app.listen(port, () => console.log(`server started at port ${port}`))