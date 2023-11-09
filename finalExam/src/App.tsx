import {AiOutlinePlus} from 'react-icons/ai'
import React,{useState, useEffect} from 'react' 
import Tasks from './components/Tasks'
import { query, collection, onSnapshot, updateDoc, doc, addDoc, Firestore, deleteDoc } from 'firebase/firestore'
import { Firebase } from './Firebase'


function App() {
  const [tasks,setTasks] = useState([])
  const [input,setInput] = useState('')
  console.log(input)


  //Create a new task
  const createTask = async (e)=>{
    e.preventDefault(e)
    if(input === ''){
      alert('Please enter a valid task')
      return
    }
    await addDoc(collection(Firebase, 'tasks'),{
      text: input,
      completed: false
    })
    setInput('')

  }

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
  const toggleTask = async (tasks) => {
    await updateDoc(doc(Firebase, 'tasks', tasks.id),{
      completed: !tasks.completed
    })
  }

  //Delete tasks
  const deleteTask = async (id) => {
    await deleteDoc(doc(Firebase,'tasks',id))
  }




  return (
      <div className='h-screen w-screen p-4 bg-gradient-to-b from-[#B878F0] to-[#78ACF0]'>
        <div className="bg-slate-100  max-w-[700px]	w-full m-auto rounded-md shadow-xl p-4">
          <h3 className="text-4xl font-bold text-center text-gray-800 p-2">My tasks</h3>
          <form onSubmit={createTask} className="mt-3 flex justify-between">
            <input 
              value={input} onChange= {(e) => (setInput(e.target.value))} 
              className="border p-2 w-full text-xl" 
              type="text" 
              placeholder='Write a new task...'
              />
            <button className="border p-4 ml-2 bg-[#0017C7] text-slate-100"><AiOutlinePlus size={30} /></button>
          </form>
          <ul>
            {tasks.map((tasks, index)=>(
              <Tasks 
                key={index} 
                tasks = {tasks} 
                toggleTask={toggleTask} 
                deleteTask={deleteTask}
              />
            ))}
          </ul>

          {tasks.length < 1 ? null : 
          <p className='text-center p-2 font-bold'>{`You have ${tasks.length} pending tasks`}</p>
}
        </div>
      </div>
  )
}

export default App
