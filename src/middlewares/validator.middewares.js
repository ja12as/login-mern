export const validateschema =  (schema) => (res, req, next)=>{
    try{
        schema.parse(req.body);        
        next();
    }catch(error){
        return res.status(400).json({error})
    }
}