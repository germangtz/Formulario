import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../styles/styles.css';

// Esquema de validación usando Yup
const schema = yup.object().shape({
    username: yup.string().required('El nombre de usuario es requerido')
    .min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
    email: yup.string().email('Debe ser un email válido')
    .required('El correo electrónico es requerido'),
    password: yup.string().required('El password es requerido').
    min(6, 'El password debe tener al menos 6 caracteres'),
    confirmPasssword: yup.string()
    .oneOf([yup.ref('password'), null], 'Los passwords deben coincidir')
});

const RegistrationForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = data => {
        console.log(data);
        alert('Registro exitoso');
    }

    return(
        <div className='form-container'>
            <h2>Formulario de registro</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form-group'>
                    <label htmlFor="username">Nombre de usuario</label>
                    <input id="username" {...register('username')}/>
                    {errors.username && <p className='error-message'>{errors.username.message}</p>}
                </div>

                <div className='form-group'>
                    <label htmlFor="email">Correo electrónico</label>
                    <input id="email" {...register('email')}/>
                    {errors.email && <p className='error-message'>{errors.email.message}</p>}
                </div>

                <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" {...register('password')}/>
                    {errors.password && <p className='error-message'>{errors.password.message}</p>}
                </div>

                <div className='form-group'>
                    <label htmlFor="confirmPassword">Confirmar Password</label>
                    <input id="confirmPassword" type="password" {...register('confirmPassword')}/>
                    {errors.confirmPasssword && <p className='error-message'>{errors.confirmPasssword.message}</p>}
                </div>
            </form>
        </div>
    );
};

export default RegistrationForm;

