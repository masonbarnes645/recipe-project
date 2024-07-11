import { useEffect, useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar.jsx'
import toast, { Toaster } from 'react-hot-toast'



function Home() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [query, setQuery] =  useState('');
 

  const handleAddRecipe = (newRecipe) => {
    setRecipes( current => [...current, newRecipe] ) 
  }
  const mainFetch = fetch('http://localhost:4000/recipes').then(res => res.json())
  const favoritesFetch = fetch('http://localhost:4000/favorites').then(res => res.json())

  const toggleFavorite = (favRecipe) =>  favorites.find(recipe => recipe.id === favRecipe.id) ? setFavorites(current => current.filter(recipe => recipe.id !== favRecipe.id)) : setFavorites(current => [...current, favRecipe])
  
  const handleRemoveRecipe = (recipeId) => {

    setRecipes(current => current.filter(recipe => recipe.id !== recipeId))
  }

  const filteredArray = [...recipes]
  
  useEffect(() => {
  Promise.all([mainFetch, favoritesFetch])
  .then(([data1, data2]) => {
    setRecipes(data1)
    setFavorites(data2)
  })
  .catch(error => toast.error(error.message))},[]) 

  const sortByName = (set, dataset) => {set([...dataset].sort((a, b) => a.name.localeCompare(b.name)))}
  const sortByCuisine = (set, dataset) => {set([...dataset].sort((a, b) => a.cuisine.localeCompare(b.cuisine)))}
  


  
  return (
    <>
      <header>
        
        <Toaster />
        <NavBar />
        
      </header>
      <div>
        <Outlet context={{ recipes, favorites, toggleFavorite, setRecipes, sortByName, sortByCuisine, query, setQuery, handleAddRecipe, setFavorites, handleRemoveRecipe, filteredArray }} />
      </div>
    
      
    </>
  )
}

export default Home
