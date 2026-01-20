import mongoose, { connect } from "mongoose";

// function to connect mongodb
export const     connectDB = async()=>{
    try {
        mongoose.connection.on('connected',()=> console.log('DB Connected'));
        await mongoose.connect(`${process.env.MONGODB_URI}/chat-akpp`)
    } catch (error) {
        console.log(error)
    }
}