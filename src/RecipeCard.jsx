import { useState } from "react"
import { useOutletContext } from "react-router-dom"

function RecipeCard({ name, cuisine, timeToPrep, image, id, ingredients}){
    const url = 'http://localhost:4000/favorites/'
    const [liked,setLiked]= useState(false)
   
    
    const { setFavorites, favorites } = useOutletContext()
    
       
    const handlePost = (favRecipe) => {
        
        fetch(`http://localhost:4000/favorites/`, {
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(favRecipe)    
        })
        .then(res => res.json())
        .then(favRecipe => {
            setFavorites(current => [...current, favRecipe])
            setLiked(true)
        })
        .catch(e => {
            console.log(e);

    })          
    }


    const handleDelete = (id) => {
        fetch(url + id, {
            method: 'DELETE'})
            .then(res => {
                setFavorites(current => current.filter(recipe => recipe.id !== id))
                setLiked(false)
            })
            
        }
    

    const handleClick = () =>{
        const favRecipe = {id, name, cuisine, timeToPrep, image, ingredients}

            liked ? handleDelete(id) : handlePost(favRecipe)

    }


//? On click, POST, change text/state, on 2nd click DELETE, change state
    return(
        <div>
        <h2>{name}</h2>
        <h2>{cuisine}</h2>
        <h3>Prep Time: {timeToPrep}</h3>
        <img src={image} alt={name} className="food-pics"/>
        <button onClick={handleClick}>{liked ? "Remove from Favorites" : "Add to Favorites"}</button>
        </div>
    )


}

export default RecipeCard


  