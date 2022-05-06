const Joi=require("joi");
const JoiComplex=require("joi-password-complexity")


const complexityOptions ={
    min:6,
    max:250,
    numric:1,
    symbol:1,
    requirmentCount:2,

}

const userValidation=(data)=>{
    const schema=Joi.object({
       
        password:JoiComplex(complexityOptions)
    })
    return schema.validate(data)
}

module.exports.userValidation=userValidation