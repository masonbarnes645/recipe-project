import { useEffect, useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar.jsx'



function Home() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [query, setQuery] =  useState('');
 

  const mainFetch = fetch('http://localhost:4000/recipes').then(res => res.json())
  const favoritesFetch = fetch('http://localhost:4000/favorites').then(res => res.json())

  const toggleFavorite = (favRecipe) =>  favorites.find(recipe => recipe.id === favRecipe.id) ? setFavorites(current => current.filter(recipe => recipe.id !== favRecipe.id)) : setFavorites(current => [...current, favRecipe])
  
  
  useEffect(() => {
  Promise.all([mainFetch, favoritesFetch])
  .then(([data1, data2]) => {
    setRecipes(data1)
    setFavorites(data2)
  })
  .catch(console.log)},[recipes]) 

  const sortByName = (set, dataset) => {set([...dataset].sort((a, b) => a.name.localeCompare(b.name)))}
  const sortByCuisine = (set, dataset) => {set([...dataset].sort((a, b) => a.cuisine.localeCompare(b.cuisine)))}
  


  
  return (
    <>
      <header>
        <NavBar />
        
      </header>
      <div>
        <Outlet context={{ recipes, favorites, toggleFavorite, setRecipes, sortByName, sortByCuisine, query, setQuery }} />
      </div>
      <footer className='footer'> 
        test information footer
      </footer>
      
    </>
  )
}

export default Home
