import User from '../models/user.models.js';
import bcrypt from 'bcryptjs';
import { createTokenAccess } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const register = async(req , res) => {
    // desustructurar el body que se envia
    const {email, password, username} = req.body;
    //console.log(email, password, username);
    //res.send('Resgistrando');
    try{

        //funcion que valida si el usuario se encuentra registrado
        const userFound = await User.findOne({email})
        if(userFound) return res.status(400).json(["the email is already in use"])

        const passwordHash = await bcrypt.hash(password, 10);//Cifrar la contraseña con Bcrypt
        const newUser = new User({
            username,
            email,
            password: passwordHash
        });

        const userSaved = await newUser.save();
        const token = await createTokenAccess({id: userSaved._id});
        res.cookie('token', token)
        res.status(201).json({
            id: userSaved._id,
            username: userSaved.username,
            email :  userSaved.email
        })
    } catch{
        res.status(500).json({message: console.error.message});
    }

};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ message: 'El usuario no existe' });

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: 'La credencial es incorrecta' });

        const token = await createTokenAccess({ id: userFound._id });
        res.cookie('token', token)
        return res.status(201).json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        });
    } catch (error) {
        // Capturamos y devolvemos el error como respuesta
        return res.status(500).json({ message: error.message });
    }
};

export const logout = (req, res)=>{
    res.cookie('token','',
    {expires:new Date()}).json({message:"Cerró sesión correctamente"});
    return ren.sendStatus(200);
};

export const profile = async(req ,res)=>{
    const userFound =await User.findById(req.user.id);
    if(!userFound)return  res.status(400).json({message:'No se encontró al usuario'});

    res.status(201).json({
        id: userFound._id,
        username: userFound.username,
        email :  userFound.email
    })

};
//verificamos nuestro token 
export const verifyToken = async (req,res)=>{
    const {token}=req.cookies
    if(!token) return res.status(401).json({message:"Unauthorized"})

    jwt.verify(token,TOKEN_SECRET,async(err,user)=>{
    if (err) return res.status(401).json({message:"Unauthorized"})

    const userFound = await User.findById(user.id)
    if(!userFound) return res.status(401).json({message:"Unauthorized"})

    return res.json({
        id: userFound.id,
        username: userFound.username,
        email: userFound.email

    })

    })
}