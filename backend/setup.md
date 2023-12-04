## Setting Up NodeJS, Express and MongoDB with TypeScript

### Step 1: Install Dependencies

```bash
mkdir backend
cd backend

npm init -y

# Install typescript as a dev dependency
npm i -D typescript

# create tsconfig.json
npx tsc --init

# Install express
npm i express
npm i -D @types/express

# Install nodemon
npm i -D nodemon

# Install ts-node
npm i -D ts-node
```

### Step 2: Base Setup

Create `src` folder inside the root directory.  
Inside the `src` folder, create `server.ts` file.  
Now add the below code

```javascript
// server.ts
import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.send('Hello Node!');
});

const port = 5050;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
```

In the `package.json` file, put the below script:

```json
...
"scripts": {
    "start": "nodemon src/server.ts",
},
...
```

Now open the terminal and run the command: `npm start`  
This will start the server at port 5050

```bash
> backend@1.0.0 start
> nodemon src/server.ts

[nodemon] 3.0.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: ts,json
[nodemon] starting `ts-node src/server.ts`
Server running on port 5050
```

## Setting Up Environment Variables

In the root directory, create a `.env` file and the port value.

```env
PORT=5050
```

Install the dependencies

```bash
npm i dotenv envalid
```

Create a `util` folder inside the `src` directory.  
Inside `util`, create `validateEnv.ts` file and put the below code:

```javascript
// validateEnv.ts
import { cleanEnv, port, str } from 'envalid';

export default cleanEnv(process.env, {
    PORT: port(),
});
```

Update the code in `server.ts`

```javascript
// server.ts
import 'dotenv/config';
import env from './util/validateEnv';
import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.send('Hello Node!');
});

const port = env.PORT || 5050;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
```

## Setting Up MongoDB With Mongoose

Install mongoose: `npm i mongoose`

Add the environment variable for mongodb url in `.env` file

```env
MONGO_CONNECTION_STRING=mongodb://127.0.0.1:27017/notesdb
PORT=5050
```

Setup the connection string for mongoose in the `server.ts` file

```javascript
// server.ts
import 'dotenv/config';
import env from './util/validateEnv';
import express from 'express';
import mongoose from 'mongoose';
const app = express();

app.get('/', (req, res) => {
    res.send('Hello Node!');
});

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
```
