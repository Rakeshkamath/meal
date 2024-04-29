document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("search-input");
    const mealContainer = document.getElementById("meal-container");
  
    // Function to search meals and display results
    function searchMeals(query) {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then(response => response.json())
        .then(data => {
          mealContainer.innerHTML = "";
          if (data.meals) {
            data.meals.forEach(meal => {
              const mealItem = document.createElement("div");
              mealItem.classList.add("meal");
              mealItem.innerHTML = `
                <h3>${meal.strMeal}</h3>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <button class="favorite-btn" data-id="${meal.idMeal}">Add to Favorites</button>
              `;
              mealContainer.appendChild(mealItem);
  
              // Add event listener for favorite button
              const favoriteBtn = mealItem.querySelector(".favorite-btn");
              favoriteBtn.addEventListener("click", () => {
                addToFavorites(meal);
              });
            });
          } else {
            mealContainer.innerHTML = "<p>No meals found</p>";
          }
        })
        .catch(error => console.log(error));
    }
  
    // Function to add meal to favorites
    function addToFavorites(meal) {
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      if (!favorites.some(fav => fav.idMeal === meal.idMeal)) {
        favorites.push(meal);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert("Meal added to favorites!");
      } else {
        alert("Meal is already in favorites!");
      }
    }
  
    // Event listener for search input
    searchInput.addEventListener("input", function() {
      const query = searchInput.value.trim();
      if (query !== "") {
        searchMeals(query);
      } else {
        mealContainer.innerHTML = "";
      }
    });
  });
  