// Homework 16
// Вашей задачей будет реализовать функционал приветсвия пользователя на сайте c помощью localStorage.

// При первом входе на сайт просто показывать на экране приветствие Дооро пожаловать!
// Если пользователь уже заходил на сайт (при первом визите), то к базовому приветсвию следует добавить строку Вы заходили раз: N. Где вместо N будет количесво посещений сайта пользователем. Обратите внимание, что первый визит так же считается.
// Функционал должен работать при закрытии вкладки или бразура, обновлении страницы.

const VISITS_CONNY_KEY = "visits"

const renenderGreeting = (isInitial, visitsCount = 0) => { // параматр за змовчуванням 0 
  const greetingElement = document.createElement("p")
  const visitCountElement = document.createElement("p")
  greetingElement.innerText = "Ласкаво просимо!"
  visitCountElement.innerText = `Ви заходили ${visitsCount} разів`

  document.body.append(greetingElement)

  if(isInitial) {
    document.body.append(visitCountElement)
  }
}

if(localStorage.getItem(VISITS_CONNY_KEY)){ //інформація що зберігається на стороні клієнта отримуємо з visits, якщо нема то вставл-
  const visits = JSON.parse(localStorage.getItem("visits"))
  const updatedVisits = visits + 1;
  localStorage.setItem("visits", updatedVisits) 

  renenderGreeting(true, updatedVisits)
  }else{
    localStorage.setItem("visits", 1)// яємо автоматично - 1 і  не видаляється при перезавантаженні {visits: 1}
    renenderGreeting(false) //як що ще не були то в нас включається параметр за змовчуванням 0
  }