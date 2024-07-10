import { useEffect, useState } from "react"
import RecipeCard from "./RecipeCard";
import { useOutletContext } from "react-router-dom";




function Index(){

const { recipes, setRecipes, sortByCuisine, sortByName, query, setQuery,  } = useOutletContext() 

const [filteredArray, setFilteredArray] = useState([...recipes])

const handleChange = (e) =>{
    
    setQuery(e.target.value)
    
}
const filteredRecipes = (filteredArray.filter( recipe => (recipe.name.toLowerCase()).includes(query.toLowerCase())))

    return(
        <>
        <header>
            <h1>Recipe Placeholder</h1>
            <input name="search" type="text"value={query} onChange={handleChange} placeholder={'Search...'} />
            <button onClick={() => sortByName(setFilteredArray, filteredArray)}> Sort Alphabetically</button>
            <button onClick={() => sortByCuisine(setRecipes, recipes)}> Sort By Cuisine</button>
            </header>
        <div> 
         <ul> {filteredRecipes.map((recipe) => (<RecipeCard key={recipe.id} {...recipe} /> ))}</ul>
        </div>
        </>
    )
}

export default Index