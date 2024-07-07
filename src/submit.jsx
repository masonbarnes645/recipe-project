import { useState } from "react"

function Submit(){
   const initialState = {      
    name: "",
    cuisine: "Italian",
    instructions: "",
    ingredients: [],
    timeToPrep: "",
    image: "",

   }
   //need data from fetch for post 
   const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value})
        console.log(formData)
    }
   
   const handleSubmit = () => {}
   const [formData, setFormData] = useState(initialState)
    return(
        
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Dishes Name" onChange={handleChange}/>
            <input type="text" name="cuisine" placeholder="Cuisine" onChange={handleChange}/>
            <input type="text" name="timeToMake" placeholder="Time to Make" onChange={handleChange}/>
            <input type="text" name="instructions" placeholder="Write a brief summary of the steps involved in this recipe" onChange={handleChange}/>
        </form>
    )
}

export default Submit;