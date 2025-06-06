import './AuthView.css';

import Form from '../../components/Form/Form';
import { registerUserSchema, loginUserSchema } from '../../components/Form/userSchema';
import { useState } from 'react';

import { userService } from '../../services/api';

const AuthView = () => {
    const [isLogin, setLogin] = useState(false);

    const handleChange = () => {
        setLogin(prev => !prev);
    }
    
    const handleRegister = (userData) => {
        userService.register(userData);
    }

    const handleLogin = (userData) => {
        userService.login(userData);
    }    

    return (
        <div className="auth-page">
            <div className="auth-box">
                <Form
                    title={isLogin ? 'Log In' : 'Register User'}
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