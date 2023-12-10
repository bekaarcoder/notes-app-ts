import app from './app';
import log from './util/logger';
import env from './util/validateEnv';

import mongoose from 'mongoose';

const port = env.PORT || 5050;

mongoose
    .connect(env.MONGO_CONNECTION_STRING)
    .then(() => {
        // console.log(`Mongo DB connected.`);
        log.info('Connected to DB');
        app.listen(port, () => {
            // console.log(`Server running on port ${port}`);
            log.info(`Server running on port ${port}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
