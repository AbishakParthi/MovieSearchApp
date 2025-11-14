import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export const FavouriteMovie = ({fav, setFav}) => {
const removeFav = (fm) => {
    setFav(fav.filter((f) => f.imdbID !== fm.imdbID));
    toast.success("Movie removed from favorite successfully!");
}
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
        <h1 className="fav-heading">Favorite Movies</h1>
            {
                fav.map((f) => (
                <motion.div 
                initial={{y: 100, opacity: 0}}
                whileInView={{y: 0, opacity: 1}}
                transition={{duration: 1, ease: "easeOut"}}
                viewport={{once: true}}
                key={f.imdbID} className="fav-container">
                <h2>{f.Title.length > 11 ? f.Title.substring(0, 10) + "..." : f.Title} ({f.Year})</h2>
                <p><strong>Actors:</strong>{f.Actors.length > 29 ? f.Actors.substring(0, 28) + "..." : f.Actors}</p>
                <p className='plot'><strong>Plot:</strong>{f.Plot.length > 126 ? f.Plot.substring(0, 125) + "..." : f.Plot}</p>
                <button className='favRemove' onClick={() => removeFav(f)}>Remove from favourite⭐</button>
                <img src={f.Poster} alt={f.Title} />
                </motion.div>
                ))
            }
    </>
  )
}
