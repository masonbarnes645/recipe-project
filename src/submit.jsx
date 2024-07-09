import { useState } from "react"
import {   useNavigate, useOutletContext } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'

function Submit(){
   const [inputFields, setInputFields] = useState([
    {name: '', amount:''}
   ])
    const navigate = useNavigate()
    const initialState = {      
    name: "",
    cuisine: "",
    instructions: "",
    ingredients: [],
    timeToPrep: "",
    image: "",

   }

const {handleAddRecipe} = useOutletContext()
   const handlePostRecipe = (formData) =>{
    fetch('http://localhost:4000/recipes',{
        method:'POST',
        headers:{'Content-Type': 'application/json',},
        body:JSON.stringify(formData),
   })
   .then((res) => {
    if (!res.ok){
        // deletefromstate
    }
    else{
    navigate('/')
    }
   })
}


   const handleDynamicChange = (index, e) => {
    let data = [...inputFields]
    data[index][e.target.name] = e.target.value
    
    setInputFields(data)

   }

   const addInput = (e) => {
   
    let newField = { name: '', amount: '' }
    setInputFields([...inputFields, newField])
   }
   const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value})
    }
   
   const handleSubmit = (e) => {
    e.preventDefault()
    const newRecipe = ({...formData, ingredients:inputFields, id:uuidv4().slice(0,4)})
    handlePostRecipe(newRecipe)
    handleAddRecipe(newRecipe)
    
   }
   const [formData, setFormData] = useState(initialState)
    return(
        
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Dishes Name" onChange={handleChange} value={formData.name}/>
            <input type="text" name="cuisine" placeholder="Cuisine" onChange={handleChange}value={formData.cuisine}/>
            <input type="text" name="timeToPrep" placeholder="Time to Make" onChange={handleChange}value={formData.timeToPrep}/>
            <input type="text" name="instructions" placeholder="Write a brief summary of the steps involved in this recipe" onChange={handleChange}value={formData.instructions}/>
            <input type="image" name="image" placeholder="Add Image URL here" onChange={handleChange} value={formData.image}/>
            {inputFields.map((input, index) => {
          return (
            <div key={index}>
              <input
                name='name'
                placeholder='Ingredient'
                value={input.name}
                onChange={e => handleDynamicChange(index,e)}
              />
              <input
                name='amount'
                placeholder='Amount'
                value={input.amount}
                onChange={e => handleDynamicChange(index,e)}
              />
            </div>
          )
        })}
            <button type="button" onClick={addInput}>Add Ingredient</button>
            <button type="submit">Post Recipe</button>
        </form>
    )
}

export default Submit;