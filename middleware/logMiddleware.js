const db = require('../models/index');
const { Log } = db;

const logAction = async (req, res, next) => {
    const { id } = req.user || {}; 
    const action = req.method;
    const resourceType = req.originalUrl.split('/')[1]; 

    try {
       const log = new Log({
            userId: id || 'system', 
            action,
            resourceType,
            collection: resourceType, 
            operationType: action,
        });
        await log.save();
    } catch (err) {
        console.error('Failed to log action:', err);
    }

    next();
};

module.exports = { logAction };
