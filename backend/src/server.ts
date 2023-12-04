import app from './app';
import env from './util/validateEnv';

import mongoose from 'mongoose';

const port = env.PORT || 5050;

mongoose
    .connect(env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log(`Mongo DB connected.`);
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
