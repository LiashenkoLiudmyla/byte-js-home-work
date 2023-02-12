// Из массива с данными создать форму и обработать событие ее отправки.

// Вам предоставляется массив данных, коллекция, где каждый объект характеризует поле ввода, которое необходимо отобразить на экране.
// Поля ввода могут быть следующих типов:
// текстовое поле (обычный инпут) - text
// селект - select
// Модель данных, описывающих неободимое поле ввода, следующая:
// element: описывает какой елемент создать: текстовое поле или select

// name: имя для поля ввода (атрибут name)

// label: значение, которое отображается в теге label для текущего поля

// options: массив вариантов option, будет присутсвовать, если значение поля element = 'select', то есть текущее поле ввода - селект

// Массив options представлен в следующей модели данных:
// text: значение, которое показывается пользователю

// value: значение атрибута value тега option

// При сабмите формы страница НЕ должна перезагружаться
// Результатом сабмита формы должен быть объект, в котором хранятся все значения, введенные пользователем. Ключами, по которым хранятся значения, должны быть значения атрибута name соответствущего поля ввода.
// Каждое поле ввода + label к нему требуется завернуть в div.
// В форме обязательно должна содержаться button type=submit.
// Форма должна быть создана полностью средствами JavaScript. В html файле должно быть пусто, максимум только элемент-контейнер, в который вы в последсвии добавите форму.
// Вы можете использовать любые стили и дополнительные элементы. Главное выполнить все по заданию.

const formConfig = [
    {
      element: "text",
      name: "login",
      label: "Логин",
    },
    {
      element: "text",
      name: "age",
      label: "Возраст",
    },
    {
      element: "select",
      name: "language",
      label: "Выберите язык программирования",
      options: [
        {
          text: "JavaScript",
          value: "js",
        },
        {
          text: "Java",
          value: "java",
        },
        {
          text: "Python",
          value: "python",
        },
      ],
    },
  ];
// console.log("formConfig", formConfig)
const handleForm = (event) => {

    event.preventDefault()

    const formData = new FormData(event.target) // вбудована функція конструктор FormData по обробці форми
    const data = {}

   console.log( formData.get("age"))

    for(let pair of formData.entries()){

        // console.log(pair)

        data[pair[0]] = pair[1]
    }

    console.log(data)
}

const createInput = (inputData) => {
const input = document.createElement("input")
input.setAttribute("type", "text")
input.setAttribute("id", inputData.name)
input.setAttribute("name", inputData.name)

return input
}

const createSelect = (selectData) => {
    const select = document.createElement("select") // створили тег селект
    select.setAttribute("id", selectData.name) // з айдішкою
    select.setAttribute("name", selectData.name)// і неймом

selectData.options.forEach((opt) => { //перебираємо
    const option = document.createElement("option")// створюємо кожний option
    option.innerText = opt.text // надаємо контент
    option.setAttribute("value", opt.value)// надаємо атрибут

    select.append(option)// і додаємо в селект апендимо
})

return select // кожен селект повертаємо
}

const createForm = (arrFormData) => {
 const form = document.createElement("form") //створюємо форму

 const btnSubmit = document.createElement("button") // створюємо кнопку
 btnSubmit.setAttribute("type", "submit") // створюємо атрибут 
 btnSubmit.innerText = "submit"

 arrFormData.forEach((formElement) => { // перебираємо

    const divWrapp = document.createElement("div") // створюємо тег дів

    const label = document.createElement("label") // створюємо лайбл
    label.setAttribute("for", formElement.label) // з атрибутом 
    label.innerText = formElement.label

    if(formElement.element === "text"){

        const input = createInput(formElement) //  рюємо піднього елемент і записуємо в нашу форму
        divWrapp.append(label, input)

     }else if (formElement.element === "select"){
        const select = createSelect(formElement) // кожен обєкт який нам приходить ідентифікуємо і ство-
        divWrapp.append(label, select)
     }

     form.appendChild(divWrapp)
 })
// як цик закінчив створювати все елементи то апендимо їх в HTML
 form.append(btnSubmit)
 document.body.append(form)

//  form.addEventListener("submit", handleForm) // навішуємо або тут подію на форму
 return form //і повертаємо form
}

let form = createForm(formConfig)
form.addEventListener('submit', handleForm) // або тут подію на форму тепер при натисканні кнопки submit буде визиватися функція handleForm


// выведем в консоль все значения классов, которые есть у элементов p на странице
// const parag = document.querySelectorAll("p")
// for (i = 0; length = parag.length; i < length; i++){
//   if (parag[i].className)
//   console.log (parag [i].className)
// }

// Пример, в котором установим всем элементам с классом content свойство lang со значением "ru":

// let contents = document.querySelectorAll('.content');
// for (var i = 0, length = contents.length; i < length; i++) {
//   contents[i].lang = "ru";
// }

