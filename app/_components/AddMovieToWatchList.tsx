"use client";
import React from "react";

const AddMovieToWatchList = ({ movie }) => {
  const addMovieToWatchList = (movie) => {
    const watchList =
      JSON.parse(window.localStorage.getItem("watchList")!) || [];
    if (!watchList.find((m) => m.id === movie.id)) {
      watchList.push(movie);
      localStorage.setItem("watchList", JSON.stringify(watchList));
    }
  };
  return (
    <button
      onClick={() => addMovieToWatchList(movie)}
      className="absolute top-2 right-2 bg-white bg-opacity-70 hover:bg-opacity-100 text-black px-2 py-1 rounded"
    >
      +
    </button>
  );
};

export default AddMovieToWatchList;
