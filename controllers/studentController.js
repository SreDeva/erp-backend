const Student = require('../models/studentModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')

//get all Student
const getStudents = async (req, res) => {
    const user = req.user._id; 
    console.log(user)

    try {
        const students = await Student.find({ user }).sort({ createdAt: -1 });

        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



//get admin students
const getAdminStudents = async (req, res) => {

    const student = await Student.find().sort({createdAT: -1})

    res.status(200).json(student)
}
 

//get single Student
const getStudent = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ error: 'No such Student' });
    }

        const student = await Student.findById(id);

        if (!Student) {
            return res.status(404).json({ error: 'No such Student' });
        }

        res.status(200).json(student);
};


//create new Student
const createStudent = async (req, res) => {

    const createToken = (_id) => {
        return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
    }

    try {
        // Validate the incoming request data
        const {
            name,
            dob,
            gender,
            email,
            roll_no,
            reg_no,
            address,
            phone_no,
            batch,
            degree,
            Class,
            password
        } = req.body;

        const requiredFields = [
            'name', 'dob', 'gender', 'email',
            'roll_no', 'reg_no', 'address',
            'phone_no', 'batch', 'degree', 'Class', 'password'
        ];

        const emptyFields = requiredFields.filter(field => !req.body[field]);

        if (emptyFields.length > 0) {
            return res.status(400).json({ error: 'Please fill in all the required fields', emptyFields });
        }

        // Create the user
        const user = await User.signup(email, password);

        // Create the student
        const student = await Student.create({
            name, dob, gender, email, roll_no, reg_no, address, phone_no, batch, degree, Class, user: user._id
        });

        // Create a token (assuming createToken function is available)
        const token = createToken(user._id);

        res.status(200).json({ email, student, token });
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


//delete a Student
const deleteStudent = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'No such Student' });
    }

    const student = await Student.findOneAndDelete({_id: id})

    if (!student) {
        return res.status(400).json({ error: 'No such Student' });
    }

    res.status(200).json(student);
}



//updaate a Student
const updateStudent = async (req,res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'No such Student' });
    }

    const student = await Student.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!student) {
        return res.status(400).json({ error: 'No such Student' });
    }

    res.status(200).json(student)
}


module.exports = {
    createStudent,
    getStudent,
    getStudents,
    deleteStudent,
    updateStudent ,
    getAdminStudents
}