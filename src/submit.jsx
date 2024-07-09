import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { singleField } from 'react-dynamic-fields'

function Submit(){
   const navigate = useNavigate()
    const initialState = {      
    name: "",
    cuisine: "",
    instructions: "",
    ingredients: [],
    timeToPrep: "",
    image: "",

   }

   const handlePostRecipe = (formData) =>{
    fetch('http://localhost:4000/recipes',{
        method:'POST',
        headers:{'Content-Type': 'application/json',},
        body:JSON.stringify(formData),
   })}



   const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value})
    }
   
   const handleSubmit = (e) => {
    e.preventDefault()
    handlePostRecipe(formData)
    setFormData(initialState)
    navigate('/')
   }
   const [formData, setFormData] = useState(initialState)
    return(
        
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Dishes Name" onChange={handleChange} value={formData.name}/>
            <input type="text" name="cuisine" placeholder="Cuisine" onChange={handleChange}value={formData.cuisine}/>
            <input type="text" name="timeToPrep" placeholder="Time to Make" onChange={handleChange}value={formData.timeToPrep}/>
            <input type="text" name="instructions" placeholder="Write a brief summary of the steps involved in this recipe" onChange={handleChange}value={formData.instructions}/>
            <input type="image" name="image" placeholder="Add Image URL here" onChange={handleChange} value={formData.image}/>
            <button type="submit">Post Recipe</button>
        </form>
    )
}

export default Submit;