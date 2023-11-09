import {FaRegTrashAlt} from 'react-icons/fa'

function Tasks({tasks}) {
  return (
    <li className={tasks.completed ? "flex justify-between bg-slate-400 p-4 my-2 capitalize":"flex justify-between bg-slate-200 p-4 my-2 capitalize" }>
      <div className="flex">
        <input type="checkbox"/>
        <p className="ml-2 cursor-pointer">{tasks.text}</p>
      </div>
      <button className='cursos-pointer flex items-center'>{<FaRegTrashAlt/>}</button>
    </li>
  )
}

export default Tasks
