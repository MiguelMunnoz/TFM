import './AuthView.css';

import Form from '../../components/Form/Form';
import { registerUserSchema, loginUserSchema } from '../../components/Form/userSchema';
import { useEffect, useState } from 'react';
import { userService } from '../../services/api';

import { useDispatch } from 'react-redux';
import { setUser } from '../../slices/userSlice';
import { startLoading, stopLoading } from '../../slices/loadingSlice';

import { useNavigate } from 'react-router-dom';


const AuthView = () => {
    const [isLogin, setLogin] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        try {
            userService.logout();
        } catch (error) {
            console.log('[ERROR] Error in logout', error);
        }
        
    }, [])

    const handleChange = () => {
        setLogin(prev => !prev);
    }
    
    const handleRegister = async (userData) => {
        try {
            const userRegistered = await userService.register(userData);

            if(userRegistered.status === 201) {
                setLogin(true);  

                await userService.email(userRegistered.data);
            }
        } catch (error) {
            console.error('[ERROR] Error registering user.', error);
        }
        
    }
     
    const handleLogin = async (userData) => {
         try {
            dispatch(startLoading());
            const response = await userService.login(userData);

            if (response.status === 200) {
                localStorage.setItem('loggedUser', JSON.stringify(response.data));
                dispatch(setUser(response.data));

                setTimeout(() => {
                    dispatch(stopLoading());
                    navigate('tasks');
                }, 500)
            } else {
                setErrorMessage('Invalid Credentials')
            }
            
        } catch (error) {
            console.error('[ERROR] Error in login:', error);
            setErrorMessage('Invalid email or password');
            dispatch(stopLoading());
        }
    }
       

    return (
        <div className="auth-page">
            <div className="auth-box">
                <Form
                    key={isLogin ? 'login' : 'register'}
                    title={isLogin ? 'Log In' : 'Register User'}
                    type={'auth'}
                    fields={isLogin ? ['username', 'password'] : ['username', 'password'] }
                    schema={isLogin ? loginUserSchema : registerUserSchema}
                    onSubmit={isLogin ? (userData) => handleLogin(userData) : (userData) => handleRegister(userData)}
                />

                <p className="form-note">
                    {isLogin ? '¿No tienes una cuenta? ' : '¿Ya tienes cuenta? '} 
                    <a onClick={() => handleChange()}>{isLogin ? 'Regístrate aquí' : 'Inicia sesión'}</a>
                </p> 

                {errorMessage && <p className="login-error-message">{errorMessage}</p>}

            </div>
        </div>
  );
}

export default AuthView;