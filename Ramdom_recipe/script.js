const btn = document.querySelector('.btn');
const recipeName = document.querySelector('.recipe-name');
const recipeInstruction = document.querySelector('.recipe-instruction');
const recipeImage = document.querySelector('.recipe-image');
const recipeIngredients = document.querySelector('.ingredients-list');

const videoLink = document.querySelector('.video-link');

const recipeVideo = document.querySelector('.recipe-video');

async function getRecipe() {
  const response = await fetch(
    'https://www.themealdb.com/api/json/v1/1/random.php'
  );
  const temp = await response.json();
  const data = temp.meals[0];
  console.log(data);
  renderInfo(data);
}
btn.addEventListener('click', getRecipe);

function renderInfo(data) {
  recipeImage.src = data.strMealThumb;
  recipeVideo.style.backgroundImage = `url(${data.strMealThumb})`;
  videoLink.href = data.strYoutube;
  recipeName.textContent = data.strMeal;
  recipeIngredients.textContent = '';
  for (i = 1; i <= 20; i++) {
    const li = document.createElement('li');
    const str =
      (data[`strIngredient${i}`] != null ? data[`strIngredient${i}`] : '') +
      ': ' +
      (data[`strIngredient${i}`] != null ? data[`strMeasure${i}`] : '');
    if (str.length > 3) {
      li.textContent = str;
      recipeIngredients.appendChild(li);
    }
  }
  const instructions = data.strInstructions.split('.');
  recipeInstruction.textContent = '';
  instructions.forEach(ins => {
    if (ins.length > 1) {
      const li = document.createElement('li');
      li.textContent = ins;
      recipeInstruction.appendChild(li);
    }
  });
}

getRecipe();
