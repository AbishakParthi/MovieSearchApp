import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';

export const MovieSearchApp = ({fav, setFav, movies, setMovies}) => {
  // const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movie, setMovie] = useState("");
  const [film, setFilm] = useState(movies);
  const [flag, setFlag] = useState(true);
  // function search() {
  //   setLoading(true);
  //   fetch(`https://www.omdbapi.com/?t=${movie}&apikey=8c18111b`).then((response) => {
  //     if(!response.ok) {
  //       throw new Error("Failed to fetch data!");
  //     }
  //     return response.json();
  //   }).then((data) => {
  //     if(data.Response == "False"){
  //       setError(data.Error);
  //     }else{
  //       setError(null);
  //       setData(data);
  //     }
  //     setLoading(false);
  //   }).catch((err) => {
  //     setError(err.message);
  //     setLoading(false);
  //   })
  // }
  const addFav = (fm) => {
        setFav([...fav, fm]);
        toast.success("Movie added to favorite successfully!");
    }
  const removeFav = (fm) => {
        setFav(fav.filter((f) => f.imdbID !== fm.imdbID));
        toast.success("Movie removed from favorite successfully!");
    }
  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     setLoading(true);
  //     let page = 1;
  //     let allResults = [];
  //     let totalResults = 0;
  //     while(true){
  //       const res = await fetch(`https://www.omdbapi.com/?apikey=8c18111b&s=batman&page=1`);
  //       const allData = await res.json();
  //       if(allData.Response === "True"){
  //         allResults = [...allResults, ...allData.Search];
  //         totalResults = parseInt(allData.totalResults, 10);
  //         if(allResults.length >= totalResults){
  //           break;
  //         }
  //         page++;
  //       }else{
  //         console.warn("OMDB Error: ", allData.Error);
  //         break;
  //       }
  //     }
  //     const uniqm = Array.from(new Map(allResults.map((ar) => [ar.imdbID, ar])).values());
  //     setMovies(uniqm);
  //     setLoading(false);
  //   };
  //   fetchMovies();
  // }, []);
  function search() {
  const fetchMovies = async (imdbID) => {
  setLoading(true);
      let page = 1;
      let allResults = [];
      let totalResults = 0;
      while(true){
        const res = await fetch(`https://www.omdbapi.com/?apikey=8c18111b&s=${movie}&page=1`);
        const allData = await res.json();
        if(allData.Response === "True"){
          allResults = [...allResults, ...allData.Search];
          totalResults = parseInt(allData.totalResults, 10);
          if(allResults.length >= totalResults){
            break;
          }
          page++;
        }else{
          setError(allData.Error);
          break;
        }
      }
      const dr = await Promise.all(
        allResults.map(async (dm) => {
          const res = await fetch(`https://www.omdbapi.com/?apikey=8c18111b&i=${dm.imdbID}&plot=full`);
          return await res.json();
        })
      );
      const uniqm = Array.from(new Map(dr.map((ar) => [ar.imdbID, ar])).values());
      setMovies(uniqm);
      setLoading(false);
    }
    fetchMovies();
  }
  const cd = new Date().getFullYear();
  const years = [];
  for(let i = cd; i >= 1800; i--){
    years.push(i);
  }
  const handleChange = (e) => {
    if(e.target.value === "all"){
      setFilm(movies);
      setError("");
      setFlag(true);
    }
    else{
    const f = movies.filter((m) => m.Year === e.target.value);
    if(f.length === 0){
      setFilm([]);
      // setError(`Movies Not Found in this year: ${e.target.value}!`);
      setFlag(false);
      toast.error(`Movies Not Found in this year: ${e.target.value}!`);
    }else{
      setFilm(f);
      setError("");
      setFlag(true);
    }
  }
  }
  // const handleChange = (e) => {
  //   if(e.target.value === "all"){
  //     setMovies(movies);
  //     setFilm([]);
  //   }
  //   else{
  //   setFilm(movies.filter((m) => m.Year === e.target.value));
  //   let f = movies.filter((m) => m.Year !== e.target.value);
  //   if(f.length === movies.length){
  //     setError(`Movies Not Found in this year: ${e.target.value}!`);
  //     setFlag(false);
  //   }else{
  //     setError("");
  //     setFlag(true);
  //   }
  // }
  // }
  const show = film.length > 0 ? film : movies;
  useEffect(() => {
    error && toast.error(error, { toastId: "tooManyResults" });
  }, [error]);
  return (
    <>
    <div className="navbar">
            <div className="logo">Movie Search and Favorites App</div>
            <ul>
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
                <li>
                    <span className="cart-count"></span>
                </li>
                <li>
                    <Link to={"/FavouriteMovie"}>View Favorite Movies</Link>
                </li>
            </ul>
        </div>
    {/* <div className='box'>
    <div className='card'>
    <input type="text" placeholder="Search Movies" onChange={(e) => setMovie(e.target.value)} className='txt'/>
    <button onClick={search} className='btn'>Search</button><br />
    {error && <h2>Error: {error}</h2>}
    {loading && <h2>Loading...</h2>}
    {data && (
    <>
    <h2>{data.Title} ({data.Year})</h2>
    <p><strong>Actors:</strong>{data.Actors}</p>
    <p className='plot'><strong>Plot:</strong>{data.Plot}</p>
    {fav.find(f => f.imdbID === data.imdbID) ? <button className='favRemove' onClick={removeFav}>Remove from favourite⭐</button> : <button className='fav' onClick={addFav}>Add to favourite⭐</button>}
    <img src={data.Poster} alt={data.Title} />
    </>
    )}
    </div>
    </div> */}
    <div className='card'>
    <div className='box'>
      <div className='input'>
    <input type="text" placeholder="Search Movies" onChange={(e) => setMovie(e.target.value)} className='txt'/>
    <button onClick={search} className='btn'>Search</button>
    <select style={{marginLeft: "10px"}} onChange={handleChange} id='drop'>
      <option value="all">-- All --</option>
      {years.map((y) => (
        <option key={y} value={y}>{y}</option>
      ))}
    </select><br />
    {/* {error && <h2 className='err'>Error: {error}!</h2>} */}
    </div>
    </div>
    {flag && show.map((m) => (
      <motion.div
      initial={{y: 100, opacity: 0}}
      whileInView={{y: 0, opacity: 1}}
      transition={{duration: 1, ease: "easeOut"}}
      viewport={{once: true}}
      key={m.imdbID} className='movies'>
      <h2>{m.Title.length > 11 ? m.Title.substring(0, 10) + "..." : m.Title} ({m.Year})</h2>
      <p><strong>Actors:</strong>{m.Actors.length > 29 ? m.Actors.substring(0, 28) + "..." : m.Actors}</p>
      <p className='plot'><strong>Plot:</strong>{m.Plot.length > 126 ? m.Plot.substring(0, 125) + "..." : m.Plot}</p>
      {fav.find(f => f.imdbID === m.imdbID) ? <button className='favRemove' onClick={() => removeFav(m)}>Remove from favourite⭐</button> : <button className='fav' onClick={() => addFav(m)}>Add to favourite⭐</button>}
      <img src={m.Poster} alt={m.Title} />
      </motion.div>
    ))}
    </div>
    {loading && <div className="spiner-par">
      <div className="spiner"></div>
      <h2 className='load'>Loading</h2>
    </div>}
    </>
  )
}
