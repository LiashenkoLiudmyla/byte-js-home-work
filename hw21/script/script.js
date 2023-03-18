// Homework 21
// Реализуйте мини-приложение SWAPI Board для отображения информмационных карточек о звёздных кораблях, планетах и сухопутном транспорте из вселенной Звёздных войн. В реализации вам поможет уже знакомое вам открытое АПИ (swapi).

// Для реализации необходимо использовать ES6 Class.

// На странице должна присутвовать форма, в которой присутствует select для выбора типа необходимого вам объекта (звёздный корабль, сухопутное ТС или планета) и input, текстовое поле для ввода айди ресурса.

// При сабмите формы с выбраным типом и заполенным полем айди, отправляется запрос на сервер, и с полученными данными должна отрисоваться карточка на странице.

// Для получения данных вам понадобятся следующие эндпоинты

// https://swapi.dev/api/starships/${id} для кораблей
// https://swapi.dev/api/vehicles/${id} для сухопутного транспорта
// https://swapi.dev/api/planets/${id} для планет
// Карточки для каждого типа сущности должна отрисовать уникальные данные. Для звездных кораблей (starships) это:

// название (name)
// модель (model)
// производитель (manufacturer)
// максимальная скорость (max_atmosphering_speed) Для планет:
// название (name)
// климат (climate)
// поверхность (terrain)
// население (population) Для сухопутного транспорта (vehicles):
// название (name)
// стоимость (cost_in_credits)
// количество человек в команде (crew)
// возможное количество пассажиров (passengers)
// Если неообходимого ресурса с переданным айди не существует, то должен быть показан alert с соответсвующим текстом.

// Каждая карточка должна может быть удалена с доски. Для этого в ней должна присутствовать кнопка-крестик.

// Обязательно должны быть реализованы следующие классы:

// Сard - базовый класс для карточки, cодержит базовую логику отрисовки и удаления карточки.
// PlanetCard, StarshipCard и VehicleCard которые содержат в себе логику рендера необходимых полей для конкретного типа карточки
// API - класс содержащий в себе логику работы с сервером. Должны быть реальзованы методы для получения каждого ресурса и метод для отправки запроса / обработки ошибок.
// Необязательное задание продвинутой сложности: При обновлении страницы / закрытии вкладки, карточки должны сохраняться. То есть, при повторном входе пользователь должен увидеть ту же доску с карточками, что и при последнем визите.

const input = document.getElementById('input')
const select = document.getElementById('select')
const form = document.getElementById('form')

//отримуємо форму
//отримуємо інпут
// отримуємо селект

class Card {
  constructor({ name }) {
    this.card = document.createElement('div');
    this.name = name
    this.render()
  }

  render() {
    const buttonClose = document.createElement('button');
    const cardName = document.createElement('h4');

    this.card.classList.add('classCard') //додаємо класи
    buttonClose.classList.add('close')//додаємо класи
    cardName.classList.add('card-name')//додаємо класи

    cardName.innerHTML = this.name // додаємо контент
    buttonClose.addEventListener('click', () => {//додаємо обробник
      this.remove()
    })

    this.card.append(cardName, buttonClose) //апндимо карту з її нажвою і кнопку
  }

  show() {
    const container = document.body // отримуємо той блок в який будемо рендерити
  container.append(this.card)
  }
  remove() {
    this.card.remove()
  }

}
// під кожен вид карточки
class StarshipCard extends Card{
  constructor({ model, manufacturer, max_atmosphering_speed, ...rest }){

    super(rest)
    this.model = model;
    this.manufacturer = manufacturer;
    this.maxSpeed = max_atmosphering_speed;

    this.render()
  }

  render() {
    super.render()

    const textModal = document.createElement('p');
    const textManufacturer = document.createElement('p');
    const textMaxSpeed = document.createElement('p');

    // style

    textModal.innerHTML = this.model
    manufacturer.innerHTML = this.manufacturer
    this.maxSpeed.innerHTML = this.maxSpeed

    this.card.append(textModal, textManufacturer, textMaxSpeed)
  }

}

class Api {
  constructor() {
    this.BASE_URL = 'https://swapi.dev/api'
  }

  findErrors = async (response) => {
    if(!response.ok){
      const { detail } = await response.json();
      throw new Error(detail)
    }

    return response
  }

  // під кожен вид карточки
  getStarship = async(id) => {
    const response = await this.sendRequest(`${this.BASE_URL}/starships/${id}`)
    return starship
  }

  getVehicles = async(id) => {
    const response = await this.sendRequest(`${this.BASE_URL}/vehicles/${id}`)
    return vehicles
  }

  getPlanets = async(id) => {
    const response = await this.sendRequest(`${this.BASE_URL}/planets/${id}`)
    return planets
  }

  sendRequest = async(url) => {
    const response = await this.findErrors(await fetch(url))
    const result = await response.json()
    return result
  }

}

const api = new Api()

const CARD_MAP = {
 starship: api.getStarship,
 vehicles: api.getVehicles,
 planets: api.getPlanets,

}

const API_MAP = {
  starship: api.getStarship,
  vehicles: api.getVehicles,
  planets: api.getPlanets,

}

const handleSubmit = async (event) => {
  event.preventDefault()

const type = select.value;
const id = input.id

// switch
// case 'starship':
//  api.getStarship(id),

try{
  // важливо щоб значення  в option співпадали з ключем

  const item = await API_MAP[type](id);
  const card = new CARD_MAP[type](item);

  card.show()
}catch(error){
  alert(error.massage)
}

}

 form.addEventListener('submit', handleSubmit)

