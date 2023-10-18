import express from "express";
import { getALLMovies, getMoviesByYear, getMovieDetails, videoStream } from "../controllers/index.js";

const router = express.Router();

router.get("/movies",getALLMovies)

router.post("/movies/:_id",getMovieDetails)

router.get("/movies/:year",getMoviesByYear)

router.get("/streaming",videoStream)

export default router;