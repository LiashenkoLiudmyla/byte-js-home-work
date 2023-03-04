// Homework 19
// Задание 1
// Получить информацию о стране, в которой находится пользователь 
//(местонаходжение определяется по IP) и вывести на страницу информацию о ней (название, столицу, валюту и флаг). Для этого вам понадобятся следующие API:

// Для получения названия, столицы и валюты используйте эндпойнт
// https://ipapi.co/json/ который вернет вам информацию о стране, которой принадлежит ваш текущий IP адрес.
// Для получения флага сделайте запрос по адресу https://restcountries.com/v2/name/NAME 
//где вместо NAME необходимо подставить название страны, которое вы получите из первого запроса.
// Все запросы отправляйте методом GET. Обязательно используйте fetch и async await.
// Подсказка
// Документация к API:

// https://restcountries.com
// https://ipapi.co/

// const BASE_URL = "https://ipapi.co/json/"
// const BASE_URL_FLAG = "https://restcountries.com/v2/name"
const preloader = document.getElementById("preloader")

const cardCont = document.getElementById("card-container")

const showPreloader = (show) => {
    if(show) {
        preloader.style.display = "block";
    } else {
        preloader.style.display = "none";
    }
};


const renderFlag = (flag) => {
    let div = document.createElement("div")

    let imgFlag = document.createElement("img")
    imgFlag.setAttribute("src", flag)
    imgFlag.classList.add("flag-cont")

    div.append(imgFlag)

    return div
};

// 2) отримуємо прапор
const getCountryFlag = async (place, url) => {

    // console.log("place", place)
    //???????? console.log("url", url) через цей урл йде помилка але чому?!!!

    

    let { country_name: country } = place

    try {
        let response = await fetch( `${url}/${country}`)

        // console.log("response", response)

        // let test = response.status
        // console.log("test", test) 404

        if (response.status === 200 ){
            let flag = await response.json()
            let flagSrc = renderFlag(flag[0].flag) //??(flag[0].flag)-сюди кладемо src але не зрозуміла як
           
            showCountry(place, flagSrc)
        }else{
            throw new Error(`Вийшла помилка\n Код помилки: ${response.status}`)
        }
    } catch (error) {
        let errText = error.message
        alert(errText)
        
    }
};

// { country_name: country, country_capital: capital, currency} це те що ми отримуємо з сервера є в обєкті place
const showCountry = ({ country_name: country, country_capital: capital, currency}, flag) => {
    let card = document.createElement("div")
    card.classList.add("card")

    let countryText = document.createElement("h1")
    countryText.innerText = country
    countryText.classList.add("country-text")

    let capitalText = document.createElement("h2")
    capitalText.innerText = capital
    capitalText.classList.add("capital-text")

    let currencyText = document.createElement("p")
    currencyText.innerText = currency
    currencyText.classList.add("currency-text")

    showPreloader(false)
    card.append(countryText, capitalText, currencyText, flag)
    cardCont.append(card)

};

// 1) починаємо з отримання айпі адреси користувача 
//з сервера тої країни де він знаходиться
const getUserIpAdders = async (url) => {
showPreloader (true)

try {
    let response = await fetch(url)
    if (response.status === 200){
        let place = await response.json()
        getCountryFlag(place, BASE_URL_FLAG)
    } else {
        throw new Error(`Вийшла помилка\n Код помилки: ${response.status}`)
    }
} catch (error) {
    let errText = error.message
    alert(errText)
}

};

//  getUserIpAdders (BASE_URL)



// Задание 2   STAR WOR
// С помощью сервиса swapi.dev запросите информацию о персонаже 
//Звездных войн, а так же все фильмы, в которых он появлялся.

// Для этого на странице должна быть форма, в которую 
//пользователь может ввести id желаемого персонажа 
//(доступны айди персонажей от 1 до 82).

// После отправки формы, необходио отправить запрос по адресу 
//https://swapi.dev/api/people/ID где вместо ID необходимо 
//подставить значение, которое пользователь ввел в форму.

// Далее, на странице необходимо отрендерить карточку с именем 
//персонажа и кнопкой Фильмы.

// При клике на кнопку в карточке, необходимо добавить 
//в карточку с персонажем названия всех фильмов, в которых он появлялся. 

//Информация о каждом фильме хранится по ссылкам, которые перечисленны 
//в массиве по ключу films в ответе на предыдущий 
//запрос (запрос на /people/ID).

// Все запросы на фильмы необходимо отправлять с помощью 
//метода Promise.all.


const BASE_URL = "https://swapi.dev/api/people"
const idForm = document.getElementById("form") // -> форма з id = "form"
const input = document.getElementById("input") // -> input з id = "input"
const contChar = document.getElementById("character-container") // -> div з id = "charakter-container"

//обробка помилки 
const handleErrors = async (response) => {
    if(!response.ok){
        let { error } = await response.json()
        throw new Error(response.status)
    }
    return response
};


// додаємо фільми в карточку
const renderFilmList = (arrFilms) => {

    let nameFilms = arrFilms.map(film => film.title)

    const filmNameCont = document.createElement("div")

    for(let name of nameFilms){

        const filmName = document.createElement("p")
        filmName.innerText = name
        filmName.classList.add("film-text")
        filmNameCont.append(filmName)
    }

    contChar.firstElementChild.append(filmNameCont)
   
};


// запит на фільми
const handleButtonFilms = async ({ films }) => {

    const fetchFilms = films.map((film) => fetch(film))

// console.log("fetchFilms", fetchFilms) не консолиться жодна консоль

    try {
        const responses = await Promise.all(fetchFilms)
        const jsonResponses = responses.map((response) => response.json());
        const result = await Promise.all(jsonResponses)

        await renderFilmList(result)

    } catch {
        alert("Error")
    }

    
};


// рендеримо картку персонажа

const renderCharacterCard = (char) => {
    const { name } = char
    const divChar = document.createElement("div")
    divChar.classList.add("card")

    const nameChar = document.createElement("p")
    nameChar.style.marginBottom = "15px"
    nameChar.innerText = name

    const btnChar = document.createElement("button")
    btnChar.classList.add("button")
    btnChar.innerText = "FILMS"

    divChar.append(nameChar, btnChar);
    contChar.append(divChar);
    
    btnChar.addEventListener("click", (event) => {

        console.log("event.target.1",event.target)// кнопка FILMS

        if(!event.target.hasAttribute("isActive")){
            event.target.setAttribute("isActive", "")
            handleButtonFilms(char)
        }else{
            
            event.target.removeAttribute("isActive")
            event.target.nextElementSibling.remove() // не змогла подивитися по дом дереву  

        }
        
    })

    
};
console.log('contChar', contChar)

// отримуємо персонажа
const getCharacter = async (id) => {

    try {
       const response = await handleErrors(
        await fetch(`${BASE_URL}/${id}`)
       ) 

       const character = await response.json();

       await renderCharacterCard(character)
       
    } catch (error) {

        if(+error.message === 404){
            alert("Нема персонажа з таким id ")
        }else {
            alert("Error")
        }
        
    }
    

};


// for (var i = 0; i < document.body.childNodes.length; i++) {
//       alert( document.body.childNodes[i] ); // последовательно выведет дочерние элементы document.body:
//     }

// обробка форми 
const handleIdForm = (event) => {
 
    event.preventDefault()

    const { value } = input

    if (value === ""){
        alert ("Введіть число")
        return 
    }else{
        getCharacter(value)
    }
    if(contChar.firstElementChild){
        contChar.firstElementChild.remove()
  }

};


// запит форми
 idForm.addEventListener( "submit", handleIdForm)

//  const test = handleIdForm
//  console.log('test', test)

// HTMLFormElement.handleIdForm


