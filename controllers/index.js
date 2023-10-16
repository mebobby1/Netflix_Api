import {Movies} from "../models/movies.js";

export const getALLMovies = async (req, res) => {
  await Movies.find().then((response) => {
    res
      .json({ 
        response,
        message: "Movies Successfully Fetched",
      })
      
  }).catch((e) => console.log(e));
};

export const getMovieDetails = async(req,res)=>{
  const { _id } = req.params;

  const movieDetails = await Movies.findById({_id})

  if(!movieDetails) return res.status(404).json({
    success:false,
    message:"Movie Not Found",
  })

  res.status(200).json({
    success:true,
    response:movieDetails,
  })
}

export const getMoviesByYear = async(req,res)=>{

    const {year} = req.params;

    const moviesByYear = await Movies.find({year})

    if(!moviesByYear) return res.status(404).json({
      success:false,
      message:"Movies Not Found",
    })
  
    res.status(200).json({
      success:true,
      response:moviesByYear,
    })
}