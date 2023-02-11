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

    const formData = new FormData(event.target)
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
const select = document.createElement("select")
select.setAttribute("id", selectData.name)
select.setAttribute("name", selectData.name)

selectData.options.forEach((opt) => {
    const option = document.createElement("option")
    option.innerText = opt.text
    option.setAttribute("value", opt.value)

    select.append(option)
})

return select
}

const createForm = (arrFormData) => {
 const form = document.createElement("form")

 const btnSubmit = document.createElement("button")
 btnSubmit.setAttribute("type", "submit")
 btnSubmit.innerText = "submit"

 arrFormData.forEach((formElement) => {

    const divWrapp = document.createElement("div")

    const label = document.createElement("label")
    label.setAttribute("for", formElement.label)
    label.innerText = formElement.label

    if(formElement.element === "text"){

        const input = createInput(formElement)
        divWrapp.append(label, input)
     }else if (formElement.element === "select"){
        const select = createSelect(formElement)
        divWrapp.append(label, select)
     }

     form.appendChild(divWrapp)
 })

 form.append(btnSubmit)
 document.body.append(form)

//  form.addEventListener("submit", handleForm)
 return form
}

let form = createForm(formConfig)
form.addEventListener('submit', handleForm)