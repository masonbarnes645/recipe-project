import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import { useOutletContext } from "react-router-dom";

function Index() {
  const { recipes, sortByCuisine, sortByName, query, setQuery } = useOutletContext();

  const [filteredArray, setFilteredArray] = useState([...recipes]);
  const [isSortedByName, setIsSortedByName] = useState(false);
  const [isSortedByCuisine, setIsSortedByCuisine] = useState(false);

  useEffect(() => {
    const filteredRecipes = recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArray(filteredRecipes);
  }, [recipes, query]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSortByName = () => {
    if (isSortedByName) {
      setFilteredArray(recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query.toLowerCase())
      ));
    } else {
      const sorted = [...filteredArray].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setFilteredArray(sorted);
    }
    setIsSortedByName(!isSortedByName);
  };

  const handleSortByCuisine = () => {
    if (isSortedByCuisine) {
      setFilteredArray(recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query.toLowerCase()  )
      ));
    } else {
      const sorted = [...filteredArray].sort((a, b) =>
        a.cuisine.localeCompare(b.cuisine)
      );
      setFilteredArray(sorted);
    }
    setIsSortedByCuisine(!isSortedByCuisine);
    setIsSortedByName(false); 
  };


  return (
    <>
      <header>
        <h1>Recipe Box</h1>
        <input
          name="search"
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search..."
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

export default Index;