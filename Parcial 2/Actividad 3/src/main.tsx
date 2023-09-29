import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AddNumber from './components/AddNumber'
import AddAdjectives from './components/AddAdjective'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AddNumber num={0} />
    <AddAdjectives name="Benito"  initialAdj='guapo' initialAdjOp='OPCIONAL'/>
  </React.StrictMode>,
)
