import React from 'react'
import Navbar from './components/Navbar'
import {Routes,Route} from 'react-router-dom'
import List from './components/List'
import AddTask from './components/AddTask'
import EditTask from './components/EditTask'



function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<List/>}/>
      <Route path='/add-task' element={<AddTask/>}/>
      <Route path='/edit/:id' element={<EditTask/>} />
    </Routes>

    </>
  )
}

export default App