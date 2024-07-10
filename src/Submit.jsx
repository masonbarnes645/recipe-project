import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, useOutletContext } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'
import * as yup from 'yup' 


const recipeSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  cuisine: yup.string().required('Cuisine is required'),
  timeToPrep: yup.string().required('Time to Make is required'),
  instructions: yup.string().required('Instructions are required'),
  image: yup.string().url('Invalid URL format').required('Image URL is required'),
  ingredients: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Ingredient name is required'),
      amount: yup.string().required('Ingredient amount is required')
    })
  ).min(1, 'At least one ingredient is required')
});





function Submit() {
  const [inputFields, setInputFields] = useState([
    { name: '', amount: '' }
  ])
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  const initialState = {
    name: "",
    cuisine: "",
    instructions: "",
    ingredients: [],
    timeToPrep: "",
    image: "",

  }

  const { handleAddRecipe, handleRemoveRecipe } = useOutletContext()
  const handlePostRecipe = (formData) => {
    fetch('http://localhost:4000/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          // debugger
          handleRemoveRecipe(formData.id)
          toast.error('Failed to post recipe')
        }
        else {
          navigate('/')
        }

      })
      .catch(() => {
        handleRemoveRecipe(formData.id)
        toast.error('Failed to post recipe')
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
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newRecipe = ({ ...formData, ingredients: inputFields, id: uuidv4().slice(0, 4) })
    
    try {
    await recipeSchema.validate(newRecipe, { abortEarly: false });
    handlePostRecipe(newRecipe)
    handleAddRecipe(newRecipe)
    toast.success('Recipe Posted')
    }
    catch (err) {
      if (err instanceof yup.ValidationError) {
        const validationErrors = err.inner.reduce((acc, curr) => {
          return { ...acc, [curr.path]: curr.message };
        }, {});
        setErrors(validationErrors);
        toast.error(err.message);
      }
    }
  };

  const [formData, setFormData] = useState(initialState)
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Your Dishes Name" onChange={handleChange} value={formData.name} />
      {errors.name && <div>{errors.name}</div>}
      <input type="text" name="cuisine" placeholder="Cuisine" onChange={handleChange} value={formData.cuisine} />
      {errors.cuisine && <div>{errors.cuisine}</div>}
      <input type="text" name="timeToPrep" placeholder="Time to Make" onChange={handleChange} value={formData.timeToPrep} />
      {errors.timeToPrep && <div>{errors.timeToPrep}</div>}
      <input type="text" name="instructions" placeholder="Write a brief summary of the steps involved in this recipe" onChange={handleChange} value={formData.instructions} />
      {errors.instructions && <div>{errors.instructions}</div>}
      <input type="text" name="image" placeholder="Add Image URL here" onChange={handleChange} value={formData.image} />
      {errors.image && <div>{errors.image}</div>}
      {inputFields.map((input, index) => (
        <div key={index}>
          <input
            name="name"
            placeholder="Ingredient"
            value={input.name}
            onChange={e => handleDynamicChange(index, e)}
          />
          {errors[`ingredients[${index}].name`] && <div>{errors[`ingredients[${index}].name`]}</div>}
          <input
            name="amount"
            placeholder="Amount"
            value={input.amount}
            onChange={e => handleDynamicChange(index, e)}
          />
          {errors[`ingredients[${index}].amount`] && <div>{errors[`ingredients[${index}].amount`]}</div>}
        </div>
      ))}
      <button type="button" onClick={addInput}>Add Ingredient</button>
      {errors.ingredients && <div>{errors.ingredients}</div>}
      <button type="submit">Post Recipe</button>
    </form>
  );
}

export default Submit;