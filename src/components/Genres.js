import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { Chip } from '@mui/material';

const Genres = ({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setpage,
}) => {


    const handleRemove = (genre) => {
        setSelectedGenres(
            selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setpage(1);
    };


    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setpage(1)
    };

    const fetchGenres = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=8b0299a0c353a66d490a16c07cbea2aa&language=en-US`
        );
        setGenres(data.genres);
        console.log(data)
    };

    useEffect(() => {
        fetchGenres();
    }, []);
    return (

        <div style={{ padding: "6px 0" }}>
            {selectedGenres.map((genre) => (
                <Chip
                    style={{ margin: 2 }}
                    label={genre.name}
                    key={genre.id}
                    color="success"
                    clickable
                    size="small"
                    onDelete={() => handleRemove(genre)}
                />
            ))}


            {genres.map((genre) => (
                <Chip
                    style={{ margin: 2 }}
                    label={genre.name}
                    key={genre.id}

                    color="primary"
                    clickable
                    size="small"
                    onClick={() => handleAdd(genre)}
                />
            ))}
        </div>

    )
}

export default Genres
