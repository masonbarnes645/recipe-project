import { useEffect, useState } from "react"
import RecipeCard from "./RecipeCard";
import { useOutletContext } from "react-router-dom";




function Index(){
   
const { recipes, setRecipes, sortByCuisine, sortByName } = useOutletContext()

    return(
        <>
        <header>
            <h1>Recipe Placeholder</h1>
            <button onClick={() => sortByName(setRecipes, recipes)}> Sort Alphabetically</button>
            <button onClick={() => sortByCuisine(setRecipes, recipes)}> Sort By Cuisine</button>
            </header>
        <div> 
         <ul> {recipes.map((recipe) => (<RecipeCard key={recipe.id} {...recipe} /> ))}</ul>
        </div>
        </>
    )
}

export default Index