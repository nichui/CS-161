const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors');
const { readdirSync } = require("fs");

require('dotenv').config();

//import routes
/*const authRoutes = require('./routes/auth')*/

// app
const app = express()
const dbUrl = process.env.MONGO_URL || process.env.DATABASE;

// db
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
.then(() => console.log('DB CONNECTED'))
.catch(
    err => console.log(`DB CONNECTION ERR`, err)
);

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({limit: "2mb"})); // can't upload anything > 2mb (anti-virus)
app.use(cors());

//routes middleware
//app.use('/api', authRoutes);
readdirSync('./routes').map((r) => app.use("/api", require("./routes/" + r)));

//routes


// port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));