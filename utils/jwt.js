const jwt=require('jsonwebtoken')
const createToken = (userobj) => {
    // Payload to be signed into the token
    const payload =userobj

    // Sign the payload with a secret key to generate the token
    const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: '1h' // Token expiry time
    });

    return token;
};

module.exports=createToken