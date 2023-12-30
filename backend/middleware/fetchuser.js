const jwt = require('jsonwebtoken'); 

const fetchuser = async (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    // Extract the token from the request header
  const token = req.header('Authorization');
  // console.log('Authorization Header:', req.header('Authorization'));


  if (!token) {
    return res.status(401).json({ error: 'Unauthorized, enter2 a valid token' });
  }
 
  try{
     // jwt to verify and decode the token using a secret key ('your_secret_key')
     const decoded = jwt.verify(token, 'your_secret_key');
     // If the verification is successful, Attach the decoded user to the request object
    //  req.user = decoded;
    // console.log('Decoded Token:', decoded);

     req.user = { id: decoded.userId ,decoded};
     next();

    // If the verification fails, it returns a 401 Unauthorized response.
   } catch(error) {
      return res.status(401).json({ error: 'Unauthorized, enter1 a valid token' });
    }

  };

module.exports = fetchuser;
