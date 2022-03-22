import React, { useContext, useState } from 'react';
import './Login.css';
import app from './firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../App';
const Login = () => {
    const provider = new GoogleAuthProvider();
    const history = useNavigate();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [login, setLogin] = useContext(LoginContext);
    const [error, setError] = useState({
        error: '',
    });
    // hendle google login using firebase
    const hendleGoogleLogin = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                if(user.email){
                    setLogin({
                        email: user.email
                    })
                    history(from)
                }
                
            }).catch((error) => {
                const errorMessage = error.message;
                if(errorMessage){
                    setError({
                        error: errorMessage
                    })
                }
                console.log(errorMessage);

            });
    }

    return (
        <div className='login_container'>
            <button onClick={hendleGoogleLogin} className='google_btn'>Google Login</button>
            {
                error.length? <p>{error.error}</p> : null
            }
        </div>
    );
};

export default Login;