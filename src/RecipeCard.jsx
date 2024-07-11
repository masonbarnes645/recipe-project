
import { Link, useOutletContext } from "react-router-dom"

function RecipeCard({ name, cuisine, timeToPrep, image, id, ingredients, className }) {
     
    const url = 'http://localhost:4000/favorites/'
    const { favorites, toggleFavorite } = useOutletContext()
    let liked = favorites.find(recipe => recipe.id === id)
    const handlePost = (favRecipe) => {

        fetch(`http://localhost:4000/favorites/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(favRecipe)
        })
            .then(res => res.json())
            .then(favRecipe => {
                toggleFavorite(favRecipe)

            })
            .catch(e => {
                console.log(e);

            })
    }
    const handleDelete = () => {
        fetch(url + id, {
            method: 'DELETE'
        })
            .then(res => {
                toggleFavorite({ id })
                // setLiked(false)
            })

    }
    const handleClick = () => {
        const favRecipe = { id, name, cuisine, timeToPrep, image, ingredients }

        liked ? handleDelete() : handlePost(favRecipe)

    }
    return (
        <div className="recipeCard">
            <h2><Link to={`/recipes/${id}`}>{name}</Link></h2>
            <h2>{cuisine}</h2>
            <button onClick={handleClick}>{liked ? "Remove from Favorites" : "Add to Favorites"}</button>
            <h3>Prep Time: {timeToPrep}</h3>
            <img src={image} alt={name} className="food-pics" />
            
            
        </div>
    )


}

export default RecipeCard


