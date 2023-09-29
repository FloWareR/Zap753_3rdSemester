import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
        <ul>
            <li> <Link to={"/home"} >Home</Link> </li>
            <li> <Link to={"/content"} >Content</Link> </li>
            <li> <Link to={"/about"} >About</Link> </li>
        </ul>
    </nav>
  )
}

export default Navbar
