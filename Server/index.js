import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'


mongoose.connect('mongodb+srv://rajrishav12021978_db_user:Rishav2236@cluster0.lxyuz79.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log('Database connected')
})


const schema  = mongoose.Schema({
    title:String,
    description:String
})


const model = mongoose.model('tasks',schema)
const app = express()

app.use(express.json())
const corsOptions = {
  origin: "https://simpleto-dolist-project.netlify.app",
  credentials: true,
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.get('/tasks',async(req,res)=>{
    try {
        const tasks = await model.find({})
        res.json(tasks) // Sends data to the client
     
    } catch (error) {
        res.status(500).json({message: "Error fetching tasks."})
    }
})

app.post('/addTask',async(req,res)=>{
    try {
        const {title , description} = req.body
        const newTask = await model.create({title, description})
        res.status(201).json({message:'Added successfully', task: newTask})
    } catch (error) {
        res.status(500).json({message: "Error adding task."})
    }
})

app.get('/task/:id', async(req,res)=>{
    const {id} = req.params
    try {
        const task = await model.findById(id)
        res.json(task)
    } catch (error) {
        res.status(500).json({message: "Error fetching task."})
    }
})



app.delete('/delete/:id',async(req,res)=>{
    const id = req.params.id
    const result = await model.findByIdAndDelete(id)

    res.json({
        message:"Deleted successfully",
        success:true
    })
})

app.put('/update/:id', async(req,res)=>{
    const {id} = req.params
    const {title, description} = req.body
    try {
        await model.findByIdAndUpdate(id, {title, description})
        res.json({message: "Updated successfully", success: true})
    } catch (error) {
        res.status(500).json({message: "Error updating task."})
    }
})
app.listen(3200)
