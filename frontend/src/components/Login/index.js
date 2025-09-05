import  { useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import './index.css'

const Login = () => {
    const [msges, setMessage]=useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const getLogin = (event) => {
        event.preventDefault()
        if(name==='' || password===''){
            alert('Please enter valid details')
        }else{ 
            const isAuth = Cookies.get('Register-skin-cancer');
            if(isAuth!==undefined){
                navigate('/')
            }else{
                alert('Please Register First')
            }
        }
    }

    const registerNewOne = (event) => {
        if(name==='' || password===''){
            alert('Please enter valid details')
        }else{
            const isAuth = Cookies.get('Register-skin-cancer');
            if(isAuth===undefined){
                Cookies.set('Register-skin-cancer', password, {expires: 7})
                setMessage('Registered Successfully')
                setName('')
                setPassword('')
            } 
        }
    }

    return (
        <div className='login-container'>
            <h1 style={{color: '#00b7eb'}}>LOGIN</h1>
            <form onSubmit={getLogin}>
                <div>
                    <input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} className='input'/>
                </div>
                <div>
                    <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} className='input'/>
                </div>
                <button type="submit" className='b1'>login</button>
                <button type="button" className='b2' onClick={registerNewOne}>Register</button>
                <p style={{color: 'lightgreen'}}>{msges}</p>
            </form>
        </div>
    )
}

export default Login
