import React, { useState } from 'react'
import styles from '../styles/AddTask.module.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AddTask() {
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const navigate = useNavigate()


  function handleAddTask(){
    axios.post('http://localhost:3200/addTask',{title,description},{withCredentials:true})
    .then((res)=>{
      console.log("Task added successfully");
      navigate('/')

    })
  }


  return (
    <div className={styles.main}>
        <label htmlFor="title" className={styles.label}>Title</label>
        <input className={styles.input} maxLength={40} type="text" name="title" id="title" placeholder='Enter Title' onChange={(event)=>{setTitle(event.target.value)}} />
        <label htmlFor="description" className={styles.label}>Description</label>
        <textarea className={styles.textarea} maxLength={200} name="description" id="description" placeholder='Enter Description' onChange={(event)=>{setDescription(event.target.value)}} ></textarea>
        <button onClick={handleAddTask} className={styles.button}> Add Task</button>
    </div>
  )
}

export default AddTask