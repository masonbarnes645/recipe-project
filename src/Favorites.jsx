import React from "react"
import RecipeCard from "./RecipeCard"
import { useOutletContext } from "react-router-dom"


function Favorites(){
  
  const { favorites } = useOutletContext()
  return(
  <>
  
  <header>
    <h1>Recipe Placeholder</h1>
    </header>
<div> 
  <ul>{favorites.map((recipe) => (<RecipeCard key={recipe.id} {...recipe} /> ))}</ul>
</div>
</>
  )


}

export default Favorites

