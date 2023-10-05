import { MediaType } from '../types';

const apikey = import.meta.env.VITE_API_KEY;
const url = `http://www.omdbapi.com/?apikey=${apikey}&`


export const getMovies = async (title: string, page: number = 1) => {
  try {
    const response = await fetch(`${url}s=${title}&page=${page}`);
    const data = await response.json();
    return data;
  }
  catch (error) {
    throw new Error('Error searching movies. Please try again.');
    console.log(error);
  }
}

export const getMovieById = async (id: string) => {
  try {
    const response = await fetch(`${url}i=${id}`);
    const data = await response.json();
    return data;
  }
  catch (error) {
    throw new Error('Error searching movies. Please try again.');
    console.log(error);
  }
}

export const getMovieByTitle = async (title: string) => {
  try {
    const response = await fetch(`${url}t=${title}`);
    const data = await response.json();
    return data;
  }
  catch (error) {
    throw new Error('Error searching movies. Please try again.');
    console.log(error);
  }
}

export const getMoviesByType = async (type: MediaType, page: number = 1) => {
  try{
    const response = await fetch(`${url}type=${type}&page=${page}`);
    const data = await response.json();
    return data;
  }
  catch (error) {
    throw new Error('Error searching movies. Please try again.');
    console.log(error);
  }
}

export const getMoviesByYear = async (year: string, page: number = 1) => {
  try{
    const response = await fetch(`${url}y=${year}&page=${page}`);
    const data = await response.json();
    return data;
  }
  catch (error) {
    throw new Error('Error searching movies. Please try again.');
    console.log(error);
  }
}

export const searchMovies = async (title?: string, type?: MediaType, year?: string, page: number = 1) => {
  try{
    const response = await fetch(`${url}s=${title}&type=${type}&y=${year}&page=${page}`);
    const data = await response.json();
    return data;
  }
  catch (error) {
    throw new Error('Error searching movies. Please try again.');
    console.log(error);
  }
}