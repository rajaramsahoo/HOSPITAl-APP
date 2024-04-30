import mongoose from "mongoose"

const { Schema } = mongoose

const doctorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true
    },

    availability: [{
        startTime: String, 
        endTime: String 
    }],
    addedBy: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: "doctor",
    }



})

export default mongoose.model('Doctormodel', doctorSchema, "Doctors")