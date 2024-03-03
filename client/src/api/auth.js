// archivo conectar con backend

import axios from './axios';

//const API = 'http://localhost:5001/api';

export const registerRequest = user => axios.post(`/register`, user);//exportamos esta funcion que hace una
//peticion post con endpoint register y le pasamos el user(usuario)

export const loginRequest = user => axios.post(`/login`,user);

export const verifyTokenRequest = () => axios.get(`/verify`);