const mongoose = require('mongoose');
const db = require("../models/index");
const { Log } = db;

const handleChangeEvent = async (change) => {
    const userId = mongoose.connection.userId; // Get userId from Mongoose context

    const logEntry = {
        collection: change.ns.coll,
        operationType: change.operationType,
        documentId: change.documentKey ? change.documentKey._id : null,
        userId: userId || 'system', // Default to 'system' if userId is unavailable
        details: {}
    };

    switch (change.operationType) {
        case 'insert':
            logEntry.details = { insertedDocument: change.fullDocument };
            break;
        case 'update':
            logEntry.details = { updateDescription: change.updateDescription };
            break;
        case 'delete':
            logEntry.details = { deleteDocument: change.documentKey._id };
            break;
        default:
            logEntry.details = { change };
            break;
    }

    console.log(`Change detected in ${logEntry.collection}:`, logEntry);

    try {
        await new Log(logEntry).save();
    } catch (err) {
        console.error('Failed to save log entry:', err);
    }
};

const watchCollection = (collectionName) => {
    const connectChangeStream = () => {
        const collection = mongoose.connection.collection(collectionName);
        const changeStream = collection.watch();

        changeStream.on('change', (change) => {
            console.log(`Change detected in ${collectionName}:`);
            handleChangeEvent(change);
        });

        changeStream.on('error', (err) => {
            console.error(`Error in Change Stream for ${collectionName}:`, err);
            setTimeout(connectChangeStream, 5000);
        });

        changeStream.on('close', () => {
            console.log(`Change Stream closed for ${collectionName}`);
            setTimeout(connectChangeStream, 5000);
        });
    };

    connectChangeStream();
};

const setupChangeStreams = () => {
    watchCollection('Project');
    watchCollection('Sprint');
    watchCollection('Task');
    watchCollection('Comment');
};

module.exports = setupChangeStreams;
