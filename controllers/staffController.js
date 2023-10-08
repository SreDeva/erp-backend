const staffModel = require("../models/staffModel")


//get all staff
exports.getAllStaff = async (req, res) => {
    const staff = await staffModel.find().sort({createdAT: -1})

    res.status(200).json(staff)
}

//get staff by id
exports.getStaffById = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ error: 'No such Staff' });
    }

        const staff = await staffModel.findById(id);

        if (!staff) {
            return res.status(404).json({ error: 'No such Student' });
        }

        res.status(200).json(staff);
}

//create staff
exports.createStaff = async (req, res) => {
    const { name, staff_id } = req.body;
    let emptyFields = []
    if(!name){
        emptyFields.push('name')
    }
    if(!staff_id){
        emptyFields.push('staff')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({ error: 'All field must be filled' })
    }
    try {
        const staff = await staffModel.create({name, staff_id})
        res.status(200).json(staff)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete a staff
exports.deleteStaff = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'Invalid staff id' });
    }

    const staff = await staffModel.findOneAndDelete({_id: id})

    if (!staff) {
        return res.status(400).json({ error: 'No such staff' });
    }

    res.status(200).json(staff);
}

//update staff
exports.updateStaff = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'No such staff' });
    }

    const staff = await staffModel.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!staff) {
        return res.status(400).json({ error: 'No such staff' });
    }

    res.status(200).json(staff)
}