import React from "react"
import RecipeCard from "./RecipeCard"
import { useOutletContext } from "react-router-dom"


function Favorites(){
  
  const { favorites, setFavorites, sortByName, sortByCuisine, setQuery, query } = useOutletContext()
  
  
  
        const handleChange = (e) =>{
    
            setQuery(e.target.value)
            
        }
        const filteredFavorites = (favorites.filter( recipe => (recipe.name.toLowerCase()).includes(query.toLowerCase())))
    

  return(
  <>
  
  <header>
    <h1>Recipe Placeholder</h1>
            <input name="search" type="text"value={query} onChange={handleChange} />
            <button onClick={() => sortByName(setFavorites, favorites)}> Sort Alphabetically</button>
            <button onClick={() => sortByCuisine(setFavorites, favorites)}> Sort By Cuisine</button>
    </header>
<div> 
  <ul>{filteredFavorites.map((recipe) => (<RecipeCard key={recipe.id} {...recipe} /> ))}</ul>
</div>
</>
  )


}

export default Favorites

