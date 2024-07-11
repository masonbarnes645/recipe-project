import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import { useOutletContext } from "react-router-dom";

function Favorites() {
  const { favorites, setQuery, query } = useOutletContext();

  const [filteredArray, setFilteredArray] = useState([]);
  const [isSortedByName, setIsSortedByName] = useState(false);
  const [isSortedByCuisine, setIsSortedByCuisine] = useState(false);

  useEffect(() => {
    const filteredRecipes = favorites.filter(recipe =>
      recipe.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArray(filteredRecipes);
  }, [favorites, query]);

  const handleSortByName = () => {
    const sorted = [...filteredArray].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setFilteredArray(isSortedByName ? sorted.reverse() : sorted);
    setIsSortedByName(!isSortedByName);
    setIsSortedByCuisine(false); // Reset cuisine sorting state
  };

  const handleSortByCuisine = () => {
    const sorted = [...filteredArray].sort((a, b) =>
      a.cuisine.localeCompare(b.cuisine)
    );
    setFilteredArray(isSortedByCuisine ? sorted.reverse() : sorted);
    setIsSortedByCuisine(!isSortedByCuisine);
    setIsSortedByName(false); // Reset name sorting state
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <header>
        <h1>Favorite Recipes</h1>
        <input
          name="search"
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search..."
          className="searchbar"
        />
        <button onClick={handleSortByName}>
          Sort Alphabetically
        </button>
        <button onClick={handleSortByCuisine}>Sort By Cuisine</button>
      </header>
      <div className="cardContainer">
        <ul>
          {filteredArray.map((recipe) => (
            <RecipeCard key={recipe.id} {...recipe} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default Favorites;