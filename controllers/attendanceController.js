const Attendance = require('../models/attendanceModel');
const studentModel = require('../models/studentModel');

// Create a new attendance record for a specific hour
exports.postAttendance =  async (req, res) => {
    const userRole = req.user.role
    if (userRole !== 'admin') {
        return res.status(400).json({ error: "Access denied" })
    }
  try {
    const { studentRollNo, date, Hours } = req.body;
    const student = await studentModel.findOne({ roll_no: studentRollNo })
    if (!student) {
        return res.status(400).json({error: 'No such student'})
    }

    let attendance = await Attendance.findOne({ studentRollNo, date });
    console.log(attendance)
    // if (attendance) {
    //   return res.status(400).json({ error: 'Attendance already exists' })
    // }
    

    if (!attendance) {
      attendance = new Attendance({ studentRollNo, date, hours: [] });
    }
    console.log(attendance)
    for (let index = 0; index < Hours.length; index++) {
      attendanceObj = Hours[index]
      const duplicateHours = Hours.filter((attendanceObj) => {
        return attendance.hours.some((existingHour) => existingHour.hour === attendanceObj.hour);
      });

    if (duplicateHours.length > 0) {
        return res.status(400).json({ error: 'Duplicate hours found' });
    }
      attendance.hours.push(attendanceObj)
    }
    await attendance.save();
    res.status(200).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//get all attendance
exports.getAllAttendace = async (req, res) => {
    const userRole = req.user.role
    if (userRole !== 'admin') {
        return res.status(400).json({ error: "Access denied" })
    }
    try {
        const attendance = await Attendance.find().sort()
        if (!attendance) {
            return res.status(400).json({ error: 'No Attendance found' })
        }
        res.status(200).json(attendance); 
    } catch (error) {
        console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Get attendance records for a specific day
exports.getAttendanceByDate =  async (req, res) => {
    const userRole = req.user.role
    if (userRole !== 'admin') {
        return res.status(400).json({ error: "Access denied" })
    }
  try {
    const { date } = req.params;
    const attendance = await Attendance.find({ date }).populate('studentId', 'name');
    if (!attendance) {
        return res.status(400).json({ error: 'No such Attendance' })
    }
    res.status(200).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get attendance by user
exports.getAttendanceByUser =  async (req, res) => {
  const {studentRollNo} = req.body;
  try {
      student = await studentModel.findOne({roll_no: studentRollNo})
      if (!student) {
        return res.status(400).json({error: 'No such student'})
      }
      const attendance = await Attendance.find({studentRollNo}).sort()
      if (!attendance) {
          return res.status(400).json({ error: 'No Attendance found' })
      }
      console.log(attendance)
      res.status(200).json(attendance); 
  } catch (error) {
      console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
  }
};

