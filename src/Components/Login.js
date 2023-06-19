import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../Firebase'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import './Login.css'


export const Login = () => {
    const [user] = useAuthState(auth)
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const firebaseLogin = (event) => {
        event.preventDefault()

        signInWithEmailAndPassword(auth, email, pass)
        .then((userCred) => {
            navigate('/dashboard')
            console.log(userCred)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        if (user)
        {
            navigate('/dashboard')
        }
    }, [user])
    
    return (
        <div className="w-25 mx-auto my-5 width">
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label text-white">Email address</label>
                    <input type="email" className="form-control bg-dark text-white" id="exampleInputEmail1" onChange={(e)=>setEmail(e.target.value)} autoFocus/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label text-white">Password</label>
                    <input type="password" className="form-control bg-dark text-white" id="exampleInputPassword1" onChange={(e)=>setPass(e.target.value)}/>
                </div>
                
                <button type="submit" className="btn btn-primary" onClick={firebaseLogin}>Login</button>
            </form>
        </div>
    )
}

