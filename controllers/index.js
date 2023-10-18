import {Movies} from "../models/movies.js";
import fs from "fs";

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

export const videoStream = (req,res)=>{

  const range = req.headers.range;

  if(!range) return res.send("Range Headers Required")

  const videoPath = "./videoplayer.mp4";

  const VideoSize = fs.statSync(videoPath).size;

  const CHUNK_SIZE = 10 ** 6 ;

  const startRange = Number(range.replace(/\D/g,""))

  const endRange = Math.min(startRange + CHUNK_SIZE, VideoSize - 1)

  const contentLength = endRange - startRange + 1 ;

  const headers = {
    "Content-Range": `bytes ${startRange} - ${endRange}/ ${VideoSize}`,
    "Accept-Range": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  }

  res.writeHead(206,headers)

  const videoStream = fs.createReadStream(videoPath,{startRange,endRange})

  videoStream.pipe(res)

}