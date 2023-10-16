import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    }
})

export const Movies = mongoose.model("Movies", movieSchema)

