// usamos createcontex nos permite crear reglas y almacenamietno de la informacion
// usecontext es un hook nos permite consmir uncontexto , es un atajo para compartir la informacion entre componentes
import {createContext,useState,useContext, useEffect} from 'react'

import { loginRequest, registerRequest ,verifyTokenRequest} from '../api/auth';//importamos el registeRequest de la api
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context  = useContext(AuthContext);
    if(!context){
        // si el contexto no se encuentra(!context),no se debe 
        // hacer sin estar autorizado 
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}                           //REcibimos elhijo 
export const AuthProvider = ({children}) =>{
    const [user,setUser] = useState(null);
    const [isAuthenticathed, setIsAuthenticathed] = useState(false);//para saber si esta autenticado
    const [ errors, setErrors] = useState([]);//recibimos los errores que se manejan en la libreria de zod
    const [loading, setLoading] = useState(true);

    const signup = async (user)=>{
        try {
            const res = await registerRequest(user)
            console.log(res);
            setUser(res.data);
            // aqui lo que hacemos es que si este proceso 
            // devuelve valores modificamos el setIsAuthenticathed que esta en falso
            setIsAuthenticathed(true);
        } catch (error) {
            setErrors(error.response.data)//resultado del error
            console.log(error);
        }
    }
    const signin = async(user)=>{
        try {
            const res = await loginRequest(user);
            console.log(res.data);
            setIsAuthenticathed(true);
            setUser(res.data)
        } catch (error) {
            console.log(error)
            if(Array.isArray(error.response.data)){
                setErrors(error.response.data)//resultado del error
            }
            setErrors([error.response.data.message])//converitmos el mensje en array
        }
    }
    useEffect(() =>{
        if(errors.length > 0){
            const timer = setTimeout(() => {
                setErrors([]);
            }, 4000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(()=>{
        async function checkLogin() 
        {
            const cookies = Cookies.get();
        if(!cookies.token){
            setIsAuthenticathed(false)
            return setUser(null)
        }
        try {
            const res = await verifyTokenRequest(cookies.token)
            console.log(res)
            if(!res.data){
                setIsAuthenticathed(false)
                setLoading(false)
            }
            setIsAuthenticathed(true)
            setUser(res.data)
            setLoading(false)
            
        } catch (error) {
            setIsAuthenticathed(false);
            setUser(null);
            setLoading(false)
            
        }
            
        }
        checkLogin();
    },[])



    return(//retorno funcion provider
        <AuthContext.Provider value = {{
            signup,
            signin,
            user,
            isAuthenticathed,
            errors,
            loading
        }}>
            {children}  {/* enviamos el hijo */}
        </AuthContext.Provider>
    )
}