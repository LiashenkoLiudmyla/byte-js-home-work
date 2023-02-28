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

const BASE_URL = "https://ipapi.co/json/"
const BASE_URL_FLAG = "https://restcountries.com/v2/name"
const preloader = document.getElementById("preloader")

const cardCont = document.getElementById("card-container")

const showPreloader = (show) => {};


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

 getUserIpAdders (BASE_URL)




































// Задание 2
// С помощью сервиса swapi.dev запросите информацию о персонаже Звездных войн, а так же все фильмы, в которых он появлялся.

// Для этого на странице должна быть форма, в которую пользователь может ввести id желаемого персонажа (доступны айди персонажей от 1 до 82).
// После отправки формы, необходио отправить запрос по адресу https://swapi.dev/api/people/ID где вместо ID необходимо подставить значение, которое пользователь ввел в форму.
// Далее, на странице необходимо отрендерить карточку с именем персонажа и кнопкой Фильмы.
// При клике на кнопку в карточке, необходимо добавить в карточку с персонажем названия всех фильмов, в которых он появлялся. Информация о каждом фильме хранится по ссылкам, которые перечисленны в массиве по ключу films в ответе на предыдущий запрос (запрос на /people/ID).
// Все запросы на фильмы необходимо отправлять с помощью метода Promise.all.