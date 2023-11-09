import {AiOutlinePlus} from 'react-icons/ai'
import React,{useState, useEffect} from 'react' 
import Tasks from './components/Tasks'
import { query, collection, onSnapshot } from 'firebase/firestore'
import { Firebase } from './Firebase'


function App() {
  const [tasks,setTasks] = useState([])


  //Create a new task
  //Read tasks (from firebase)
  useEffect(()=>{
    const q = query(collection(Firebase, 'tasks'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let tasksArr = []
      querySnapshot.forEach((doc) => {
        tasksArr.push({...doc.data(), id: doc.id})
      })
      setTasks(tasksArr)
    })
    return () => unsubscribe
  },[])

  //Update tasks in firebase
  //Delete tasks


  return (
      <div className='h-screen w-screen p-4 bg-gradient-to-b from-[#B878F0] to-[#78ACF0]'>
        <div className="bg-slate-100 max-w[500px] w-full m-auto rounded-md shadow-xl p-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 p-2">My tasks</h3>
          <form className="flex justify-between">
            <input className="border p-2 w-full text-xl" type="text" placeholder='Write a new task...'/>
            <button className="border p-4 ml-2 bg-[#0017C7] text-slate-100"><AiOutlinePlus size={30} /></button>
          </form>
          <ul>
            {tasks.map((tasks, index)=>(
              <Tasks key={index} tasks = {tasks}/>
            ))}
          </ul>
          <p className='text-center p-2'>You have 2 tasks</p>
        </div>
      </div>
  )
}

export default App
