import {FaRegTrashAlt} from 'react-icons/fa'

function Tasks({tasks, toggleTask, deleteTask}) {
  return (
    <li className={tasks.completed ? "flex justify-between bg-slate-400 p-4 my-2 capitalize":"flex justify-between bg-slate-200 p-4 my-2 capitalize" }>
      <div className="flex">
        <input onChange={() => toggleTask(tasks)} type="checkbox" checked={tasks.completed ? 'checked' : ''}/>
        <p onClick={() => toggleTask(tasks)} className={tasks.completed ? "ml-2 cursor-pointer line-through" :"ml-2 cursor-pointer"}>{tasks.text}</p>
      </div>
      <button onClick={()=> deleteTask(tasks.id)} className='cursos-pointer flex items-center'>{<FaRegTrashAlt/>}</button>
    </li>
  )
}

export default Tasks
