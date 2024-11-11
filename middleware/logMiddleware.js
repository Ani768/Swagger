const db = require('../models/index');
const log = require('../models/log');
const { Log } = db;

const logAction = async (req, res, next) => {
    const { id } = req.user; 
    const action = req.method; 
    const resourceType = req.originalUrl.split('/')[1]; 

    try {
       const log= new Log({
            userId: id, 
            action,
            resourceType
        });
        await log.save();

        // return res.status(201).json({ message: 'Log saved' });
    } catch (err) {
        console.error('Failed to log action:', err);
    }

    next();
};

module.exports = { logAction };
