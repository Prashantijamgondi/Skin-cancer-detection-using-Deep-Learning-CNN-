import Cookies from 'js-cookie'
import './index.css'
import { useNavigate } from 'react-router-dom'

const Heading=()=>{
  const navigate = useNavigate()

  const logoutWeb=()=>{
    Cookies.remove('Register-skin-cancer')
    navigate('/login') 
  }

  const isComplete=()=> {
    return true
  }

  const isConfirm=()=>(
    <div>
      <p>Are You Sure??</p>
      <button type='button' onClick={isComplete}>LogOut</button>
    </div>
  )

  return(
    <div className='heading'>
      <nav className="head-container">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/general">General</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
      <button type="button" className='button' onClick={isConfirm && logoutWeb}>LogOut</button>
    </div>
  )
}

export default Heading
