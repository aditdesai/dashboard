import { useAuthState } from "react-firebase-hooks/auth"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../Firebase"
import { signOut } from "firebase/auth"

export default function Navbar() {
    const [user] = useAuthState(auth)
    const navigate = useNavigate()


    const firebaseLogout = (event) => {
        event.preventDefault()

        signOut(auth)
            .then((user) => {
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
            })
    }


    

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="navbar-brand ms-1">
                    Dashboard
                    {
                        user && localStorage.getItem("schoolName") ? " - " + localStorage.getItem("schoolName") : ""
                    }
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item mx-3">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item mx-3">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        
                        <li className="nav-item mx-3">
                            { user ?
                            <button className="btn btn-outline-danger" onClick={firebaseLogout}>Logout</button> :
                            <button className="btn btn-outline-primary" onClick={() => {navigate('/')}}>Login</button>
                            }
                        </li>
                    </ul>
                    
                </div>
            </div>
        </nav>
    )
}