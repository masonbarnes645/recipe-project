import { useEffect, useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar.jsx'



function Home() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const mainFetch = fetch('http://localhost:4000/recipes').then(res => res.json())
  const favoritesFetch = fetch('http://localhost:4000/favorites').then(res => res.json())

  useEffect(() => {
  Promise.all([mainFetch, favoritesFetch])
  .then(([data1, data2]) => {
    
    console.log('Data from mainFetch:', data1);
    console.log('Data from favoritesFetch:', data2);
    setRecipes(data1)
    setFavorites(data2)
  })},[]) 

  const sortByName = (set, data) => {set([...data].sort((a, b) => a.name.localeCompare(b.name)))}
  const sortByCuisine = (set, data) => {set([...data].sort((a, b) => a.cuisine.localeCompare(b.cuisine)))}
  
 


  
  return (
    <>
      <header>
        <NavBar />
        
      </header>
      <div>
        <Outlet context={{ recipes, favorites, setFavorites, setRecipes, sortByName, sortByCuisine }} />
      </div>
      <footer className='footer'> 
        test information footer
      </footer>
      
    </>
  )
}

export default Home
