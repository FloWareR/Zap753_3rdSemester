import {Route,Routes} from 'react-router-dom'
import Navbar from './Navbar'
import HomePage from '../pages/HomePage'
import ContentPage from '../pages/ContentPage'
import AboutPage from '../pages/AboutPage'

const AppRouter = () => {
    return <>
        <Navbar/>
        <Routes>
            <Route path='/*' element={<HomePage/>}/>
            <Route path='/home' element={<HomePage/>}/>
            <Route path='/content' element={<ContentPage/>}/>
            <Route path='/about' element={<AboutPage/>}/>
        </Routes>
  </>
}

export default AppRouter
