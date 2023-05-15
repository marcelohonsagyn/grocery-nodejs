const express = require('express');
const connectDB = require('./db/connect');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const rateLimiter = require('express-rate-limit');
const crosHeader = require('./middleware/cros-header');

//Variables
const app = express();
const PORT = 80;

//Congigurations
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan('tiny'));

//Routes
const shoppingRouter = require('./routers/shoppingRouter');
app.use('/api/shopping', crosHeader, shoppingRouter);

//Security
app.set('trust proxy', 1);
app.use(rateLimiter({
windowMs: 15 * 60 * 1000,
max: 60,
}));

app.use(helmet());
app.use(cors());
app.use(mongoSanitize());

const start = async () => {
    try {
        const port = PORT || 5000;
        await connectDB();
        app.listen(port, ()=> {
            console.log(`Server listening port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();