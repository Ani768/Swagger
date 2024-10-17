const basicAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      res.setHeader('WWW-Authenticate', 'Basic');
      return res.status(401).json({ message: 'Authentication required for API documentation' });
    }
  
    const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const username = credentials[0];
    const password = credentials[1];
  
    if (username === 'admin' && password === 'password') {
      next();
    } else {
      res.setHeader('WWW-Authenticate', 'Basic');
      res.status(401).json({ message: 'Invalid credentials' });
    }
  };
  
  module.exports = basicAuth;