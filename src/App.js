import NavBar from "./Components/NavBar";
import Main from "./Components/Main";
import { useCallback, useEffect, useState } from "react";
import NumResults from "./Components/NumReults";
import ListBox from "./Components/ListBox";
import MovieList from "./Components/MovieList";
import WatchedMovieList from "./Components/WatchedMovieList";
import WatchedSummary from "./Components/WatchedSummary";
import Search from "./Components/Search";
import MovieDetail from "./Components/MovieDetail";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const [watched, setWatched] = useLocalStorage([], "watched");
  // const [watched, setWatched] = useState(() => {
  //   const storedValue = localStorage.getItem("watched");
  //   return JSON.parse(storedValue);
  // });

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  const handleCloseMovie = useCallback(() => {
    setSelectedId(null);
  }, []);
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <ListBox>
          {isLoading && <p className="loader">Loading...</p>}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <p className="error">{error}</p>}
        </ListBox>

        <ListBox>
          {selectedId ? (
            <MovieDetail
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </ListBox>
      </Main>
    </>
  );
}
