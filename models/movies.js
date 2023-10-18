import mongoose from "mongoose";


const movieSchema = new mongoose.Schema({
    movieName:String,
})

export const Movies = mongoose.model("Movies",movieSchema)

