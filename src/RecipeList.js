import React, { useEffect, useState } from 'react';
import './RecipeList.css';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch('https://localhost:7132/api/recipes')
      .then(response => response.json())
      .then(data => setRecipes(data))
      .catch(error => console.error('API Error:', error));
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className="recipe-container">
      <button onClick={toggleDarkMode} style={toggleButtonStyle}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      {recipes.map(recipe => (
        <div key={recipe.id} className="recipe-card">
          <div className="recipe-inner">
            <div className="recipe-front">
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="recipe-image"
              />
              <h2 className="recipe-title">{recipe.title}</h2>
            </div>

            <div className="recipe-back">
              <div className="recipe-steps">
                <ol>
                  {recipe.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const toggleButtonStyle = {
  position: 'absolute',
  top: '20px',
  right: '20px',
  padding: '10px 16px',
  background: '#333',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  zIndex: 1000,
};

export default RecipeList;
