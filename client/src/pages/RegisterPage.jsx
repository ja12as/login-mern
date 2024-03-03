

// aqui usamos un hook de formulario que nos 
// permita validar la informacion antes de enviarse 
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  // desestructuramos los elementos que necesitamos
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signup, isAuthenticathed, errors: RegisterErrors } = useAuth();//generamos la funcion que recibira estos parametros
    // y renombramos los errors:RegisterErrors porque el useForm usa tambien errors

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticathed) navigate('/task');//si esta autenticado navega a las rutas 
    }, [isAuthenticathed, navigate])

    // creacion de la funcion handle submit y sea mas limpio el codigo
    const onSubmited = handleSubmit(async (values) => {
        signup(values);

    })
    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <div className='bg-zinc-800 max-w-md p-10 rounded-md'>

            {
            RegisterErrors.map((error, i) => (//este es para recorrer cada uno de los errors
                <div className='bg-red-500 text-white p2' key={i}>
                {error}
                </div>
            ))
            }
            <form onSubmit={onSubmited}>
            {/*  traemos el onSubmited que contiene el handlesubmit es cuando nosotros le damos click en submit(boton),
    ademas estamos indicando que el evento es asincrono ,envia unos valores 
    y con el console.log miramos que nos muestres en consola los datos */}



            <input type="text" {...register("username", { required: true })} placeholder='username'
                className='w-full bg-zinc-600 text-white px-4 py-4 rounded-md my-2' />{/* usamos el register para almacenar
    informacion y los elementos que le agregamos o necesitamos  */}
            {
                errors.username && <p className='text-red-500'>Username is required</p>
            }

            <input type="email" {...register("email", { required: true })} placeholder='email'
                className='w-full bg-zinc-600 text-white px-4 py-4 rounded-md my-2' />

            {
                errors.email && <p className='text-red-500'>Email is required</p>
            }

            <input type="password" {...register("password", { required: true })} placeholder='password'
                className='w-full bg-zinc-600 text-white px-4 py-4 rounded-md my-2' />
            {
                errors.password && <p className='text-red-500'>Password is required</p>
            }


            <button type="submit" className='bg-blue-500 hover:bg-slate-700 text-white font-bold py-2
            px-4 rounded'>Registrer</button>
            </form>
        </div>

        </div>
    )
}
