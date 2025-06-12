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
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        try {
            userService.logout();
        } catch (error) {
            console.log('[ERROR] Error haciendo logout', error);
        }
        
    }, [])

    const handleChange = () => {
        setLogin(prev => !prev);
    }
    
    const handleRegister = async (userData) => {
        const userRegistered = await userService.register(userData);

        if(userRegistered.status === 201) {
            console.log('Usuario registrado: ', userRegistered.data);
            setLogin(true);  
        }
        
    }
     
    const handleLogin = async (userData) => {
         try {
            dispatch(startLoading());
            const response = await userService.login(userData);

            if (response.status === 200) {
                dispatch(setUser(response.data));

                console.log('Login exitoso. Redirigiendo...');
                //window.location.href = '/tasks'; // Fuerza recarga para que se reconozca la cookie
                setTimeout(() => {
                    dispatch(stopLoading());
                    navigate('tasks');
                }, 500)
            }
            
        } catch (error) {
            console.error('Error en login:', error);
        }
    }
       

    return (
        <div className="auth-page">
            <div className="auth-box">
                <Form
                    key={isLogin ? 'login' : 'register'}
                    title={isLogin ? 'Log In' : 'Register User'}
                    type={'auth'}
                    fields={isLogin ? ['username', 'password'] : ['username', 'password', 'role'] }
                    schema={isLogin ? loginUserSchema : registerUserSchema}
                    onSubmit={isLogin ? (userData) => handleLogin(userData) : (userData) => handleRegister(userData)}
                />

                <p className="form-note">
                        
                    {isLogin ? '¿No tienes una cuenta? ' : '¿Ya tienes cuenta? '} 
                    <a onClick={() => handleChange()}>{isLogin ? 'Regístrate aquí' : 'Inicia sesión'}</a>
                </p> 

                
            </div>
        </div>
  );
}

export default AuthView;