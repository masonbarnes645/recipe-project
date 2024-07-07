import React from "react"
import RecipeCard from "./RecipeCard"
import { useOutletContext } from "react-router-dom"


function Favorites(){
  
  const { favorites, setFavorites, sortByName, sortByCuisine } = useOutletContext()
  
  
  
  return(
  <>
  
  <header>
    <h1>Recipe Placeholder</h1>
            <button onClick={() => sortByName(setFavorites, favorites)}> Sort Alphabetically</button>
            <button onClick={() => sortByCuisine(setFavorites, favorites)}> Sort By Cuisine</button>
    </header>
<div> 
  <ul>{favorites.map((recipe) => (<RecipeCard key={recipe.id} {...recipe} /> ))}</ul>
</div>
</>
  )


}

export default Favorites

