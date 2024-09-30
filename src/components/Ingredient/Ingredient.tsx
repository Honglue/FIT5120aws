import React, { useState } from 'react';

const Ingredient: React.FC = () => {
  const [ingredients, setIngredients] = useState<string>('');
  const [recipes, setRecipes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = async () => {
    setError(null);
    try {
      const response = await fetch('https://cykcougbc2.execute-api.us-east-1.amazonaws.com/prod/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients: ingredients.split(',').map((item) => item.trim()),
        }),
      });
      const result = await response.json();
      const parsedData = JSON.parse(result.body);
      setRecipes(parsedData.dishes || []); // Assuming the dishes key contains recipes
    } catch (err: any) {
        setError(err.message);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRecipes();
  };

  return (
    <div className="ingredient-page" style={{ paddingTop: '80px' }}>
      <h2>Find Recipes by Ingredients</h2>
      <form onSubmit={handleSubmit}>
        <label>Enter Ingredients (comma separated):</label>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="e.g., chicken, rice, tomato"
        />
        <button type="submit">Search Recipes</button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="recipe-results">
        {recipes.length > 0 ? (
          <ul>
            {recipes.map((recipe, index) => (
              <li key={index}>
                <h3>{recipe.name}</h3>
                <img src={recipe.image} alt={recipe.name} style={{ width: '200px' }} />
                <p>Ingredients: {recipe.ingredients.join(', ')}</p>
                <h4>Nutritional Information</h4>
                <p>Calories: {recipe.nutrition.calories?.toFixed(2)} kcal</p>
                <p>Proteins: {recipe.nutrition.proteins?.toFixed(2)} g</p>
                <p>Carbs: {recipe.nutrition.carbs?.toFixed(2)} g</p>
                <p>Fats: {recipe.nutrition.fats?.toFixed(2)} g</p>
                <p>Fiber: {recipe.nutrition.fiber?.toFixed(2)} g</p>
                <p>Sugar: {recipe.nutrition.sugar?.toFixed(2)} g</p>
                <p>vitaminA: {recipe.nutrition.vitaminA?.toFixed(2)} g</p>
                <p>vitaminC: {recipe.nutrition.vitaminC?.toFixed(2)} g</p>
                <p>calcium: {recipe.nutrition.calcium?.toFixed(2)} g</p>
                <p>Sodium: {recipe.nutrition.sodium?.toFixed(2)} mg</p>
                <p>iron: {recipe.nutrition.iron?.toFixed(2)} mg</p>
                <h4>Health Labels</h4>
                <p>{recipe.healthLabels.join(', ')}</p>
                <p>Cuisine Type: {recipe.cuisineType.join(', ')}</p>
                <p>Meal Type: {recipe.mealType.join(', ')}</p>
                <p>Total Time: {recipe.totalTime} minutes</p>
                <p>Yield: {recipe.yield} servings</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recipes found</p>
        )}
      </div>
    </div>
  );
};

export default Ingredient;
