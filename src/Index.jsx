import { useEffect, useState } from "react"
import RecipeCard from "./RecipeCard";
import { useOutletContext } from "react-router-dom";




function Index(){
   
const { recipes } = useOutletContext()
    return(
        <>
        <header>
            <h1>Recipe Placeholder</h1>
            </header>
        <div> 
         <ul> {recipes.map((recipe) => (<RecipeCard key={recipe.id} {...recipe} /> ))}</ul>
        </div>
        </>
    )
}

export default Index