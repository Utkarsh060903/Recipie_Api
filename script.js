const searchBox = document.querySelector('.searchBox')
const searchBtn = document.querySelector('.searchBtn')
const recipieContainer = document.querySelector('.recipie-container')
const recipieDetailsContent = document.querySelector('.recipie-details-content')
const recipieCloseBtn = document.querySelector('.recipie-close-btn')

//function to get Recipies

const fetchRecipies = async(query) => {
    recipieContainer.innerHTML = "<h2>fetching recipies...</h2>"
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipieContainer.innerHTML = "";

    response.meals.forEach(meal => {
        const recipieDiv = document.createElement('div');
        recipieDiv.classList.add('recipie');
        recipieDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span> category</p>
        `
        const button = document.createElement('button')
        button.textContent = "view Recipie";
        recipieDiv.appendChild(button);

        button.addEventListener('click' , ()=>{
            openRecipePopup(meal);
        })

        recipieContainer.appendChild(recipieDiv)
    });
    //console.log(response.meals[0]);
}

const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for(let i = 1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`]
        if(ingredient){
            const measure = meal[`strMeasure${i}`]
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList
}


const openRecipePopup = (meal) => {
    recipieDetailsContent.innerHTML = `
        <h2 class="recipieName">${meal.strMeal}</h2>
        <h3>Ingredients :</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
        <div>
            <h3>Instructions : </h3>
            <p class="recipieInstructions">${meal.strInstructions}</p>
        </div>
    `
    recipieDetailsContent.parentElement.style.display = "block"
}

recipieCloseBtn.addEventListener('click' , () => {
    recipieDetailsContent.parentElement.style.display = "none"
})

searchBtn.addEventListener('click' , (e)=>{
    e.preventDefault()
    const searchInput = searchBox.value.trim();
    fetchRecipies(searchInput);
    //console.log("button clicked")
})