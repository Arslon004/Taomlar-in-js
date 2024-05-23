const searchBox=document.querySelector(".searchBox");//input
const searchBtn=document.querySelector(".searchBtn");//button
const recipeContainer=document.querySelector(".recipe-container");
const recipeCloseBtn=document.querySelector('.recipe-close-btn');
const recipeDetailsContent=document.querySelector(".recipe-details-content")

//function to get recipes
const fetchRecipes=async (searchInput)=>{
  recipeContainer.innerHTML="<h2>Fetching recipes....</h2>"
  try{
  const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
  const response=await data.json();
  recipeContainer.innerHTML="";
   response.meals.forEach((taom)=>{
   const recipeDiv=document.createElement("div");
   recipeDiv.classList.add("recipe");
   recipeDiv.innerHTML=`
   <img src=${taom.strMealThumb}>
   <h3>${taom.strMeal}</h3>
   <p><span>${taom.strArea}</span> Dish</p>
   <p>Belongs to <span>${taom.strCategory}</span> Category</p>
   `
   const button=document.createElement('button');
   button.textContent="View recipe";
   recipeDiv.appendChild(button);

   // addEventListener to recipe button;
   button.addEventListener('click',()=>{
     openRecipePopup(taom);
   })

   recipeContainer.appendChild(recipeDiv)
  })
}catch(error){
  recipeContainer.innerHTML="<h2>Error in Fetching recipes....</h2>"
}
}
//Function to fetch Ingredients
const fetchIngredients=(taom)=>{
  let ingredientsList="";
  for(let i=1;i<=20;i++){
    const ingredient=taom[`strIngredient${i}`];
    if(ingredient){
      const measure=taom[`strMeasure${i}`]
      ingredientsList +=`<li>${measure} ${ingredient  }</li>`
    }
  }
  return ingredientsList;
  console.log(taom);
}

const openRecipePopup=(taom)=>{
  recipeDetailsContent.innerHTML=`
  <h2 class="recipeName">${taom.strMeal}</h2>
  <h3>Ingredents:</h3>
  <ul class="ingredientList">${fetchIngredients(taom)}</ul>
  <div>
      <h3>Instructions:</h3>
      <p class="recipeInstructions">${taom.strInstructions}</p>
  </div>
  `
  recipeDetailsContent.parentElement.style.display="block";
}

recipeCloseBtn.addEventListener('click',()=>{
  recipeDetailsContent.parentElement.style.display="none"
})

searchBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  const searchInput=searchBox.value.trim()
  fetchRecipes(searchInput);
})