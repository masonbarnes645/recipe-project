import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'

function Details(){
const {recipes} = useOutletContext()
const { id } = useParams();
const [fetchedRecipe, setFetchedRecipe] = useState(null)
const fetchRecipeById = (id) =>{
    return recipes.find(recipe => recipe.id === id)

}

useEffect(() => {
    const shownRecipe = fetchRecipeById(id)
    setFetchedRecipe(shownRecipe)
},[recipes])

if(!fetchedRecipe){
    return(<p>loading...</p>)
}

return(
    <>
    <img src={fetchedRecipe.image}/>
    <h1>{fetchedRecipe.name}</h1>
    <h2>{fetchedRecipe.cuisine}</h2>
    <h2>{fetchedRecipe.timeToPrep}</h2>
    <h2>{fetchedRecipe.instructions}</h2>
    <ul>
                {fetchedRecipe.ingredients.map((ingredient) => (
                    <li key={uuidv4().slice(0.2)}>
                        {ingredient.name}: {ingredient.amount}
                    </li>
                ))}
            </ul>
    </>
   


    
)

}

export default Details