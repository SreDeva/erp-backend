require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/student');
const adminRoutes = require('./routes/admin');
const adminUserRoutes = require('./routes/adminUser');
const userRoutes = require('./routes/user');
//const courseRoutes = require('./routes/course')
// const classRoutes = require('./routes/classRoute')
//const staffRoute = require('./routes/staff')
// const venueRoute = require('./routes/venue')

const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes
app.use('/api/student', studentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/adminUser', adminUserRoutes);
app.use('/api/user', userRoutes);
//app.use('/api/course', courseRoutes)
// app.use('/api/admin/classRoute', classRoutes)
//app.use('/api/admin/staff', staffRoute);
// app.use('/api/admin/venue', venueRoute );


// connect to db
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected ot db & Server running on port', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error)
    })
