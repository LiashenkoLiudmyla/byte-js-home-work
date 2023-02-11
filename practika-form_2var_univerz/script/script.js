// Завдання:                             /////////////////// ДРУГИЙ ВАРІАНТ- УНІВЕРСАЛЬНИЙ
// Створити форму з валідацією полів.
// 1. Форма повинна містити такі поля:
//   - login
//   - email
//   - password
//   - чекбокс, що підтверджує  у користувача погодження
//     на обработку даних
// 2. Сабміт форми не повинен перезагружати сторінку
// 3. Форма повинна проходити валідацію по наступним правилам:
//   - усі поля - заповнені
//   - пароль складається з мінім 6 символів
//   - логін - унікальний (масив використаних логінів
//     для прикладу надається)
// 4. Валідація проходить в момент відправки форми, якщо
//    користувач ввів некоректні дані, то відправка
//    блокується, і під ті інпути, в які введені
//    некоректні дані, виводиться повідомлення про помилку
// 5. якщо не стоїть галочка про згоду обробки даних
//     - форма не ідправляється
// 6. В результаті успішного сабміта форми (дані валидні),
//    відобразити в конослі брарузера, дані (логін емайл пароль)


const takenLogins = ["alexx", "Joxn-cena", "sam", "jon", "bob"];


// сабміт форми
// провести валідацію
// {
//  isFormValid: true || false,
//  erorrs: {
//    login: 'Ви не задали логін!',
//    password: 'Ви задали короткий пароль!'
//  }
// }
// якщо дані валідні - вивести значення в консоль
// якщо не валідні, підсвітити інпути з помилковими значеннями, вивести
// під них текст помилки

// при зміні чекбокса, перевіряти його значення, в залежності
// від того прибирати чи добавляти атрибут disabled кнопки



const form = document.getElementById("form");
const formInputs = document.querySelectorAll("input[type=text]");
const agreeCheckbox = document.getElementById("agree");
const submitBtn = document.getElementById("submit");

const loginInput = document.getElementById("login");// отримуємо значення по ID щоб передати у ф-цію
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const validationRules = {
    login: [
        {
            validator: (value) => !takenLogins.includes(value),
            errorMessage: "Цей логін вже зайнятий",
        },
        {
            validator: (value) => Boolean(value),
            errorMessage: "Ви не ввели логін",
        },
    ],
    email: [
        {
            validator: (value) => Boolean(value),
            errorMessage: "Ви не ввели email",
        },
    ],
         ///////////////////+++++++++++++++////////////////////////
         realName: [
            {
              validator: (value) => Boolean(value),
              errorMessage: "Ви не ввели ім'я",
            },
            {
              validator: (value) => value[0].toUpperCase() === value[0],
              errorMessage: "Ім'я повинно починатися з великої літери"
            }
          ],
        ///////////////////+++++++++++++++////////////////////////
    
    password: [
        {
            validator: (value) => Boolean(value),
            errorMessage: "Ви не ввели пароль",
        },
        {
            validator: (value) => (value === "" ? true : value.length >= 6),
            errorMessage: "Пароль повинен мати мінімально 6 символів",
        },
    ],

};

const validateForm = (values, rules) => {
  const errors = {};
  let isFormValid = true;

  for (let name in values) {
    const currentRules = rules[name];
    const value = values[name];

    currentRules.forEach((rule) => {
      const isValid = rule.validator(value);

      if (!isValid) {
        isFormValid = false;
        errors[name] = rule.errorMessage;
      }
    });
    }

    return {
        isFormValid,
        errors,
    };

};
const handleCheckboxChange = (event) => {
    const checked = event.target.checked;// отримали чекед

    if (checked) {
        submitBtn.removeAttribute("disabled");
    } else {
        submitBtn.setAttribute("disabled", "");
    }
};

const hightLightErroredInputs = (errors) => { //створюємо метод що підсвіте форми та помилки червоним
    // в неї передаємо обєкт з помилками errors
 for (let name in errors) { // за допомогою фор іф переберемо обєкт errors 
        const text = errors[name];  //щоб отримати до кожної помилки окремий доступ
    // нам буде доступний name і відповідне повідомлення згенерованої помилки
   // знаходимо на кожній ітерації інпут яикий нам підходе щоб показати в ньому цю помилку
    const erroredInput = form.querySelector(`input[name=${name}]`); // звертаємося до інпуту через кверіселектор
    console.log('erroredInput', erroredInput);
    // ~ CSS селектор (тільда ~) //
    const errorTextElement = form.querySelector( //беремо селектор
        `input[name=${name}] ~ .errorMessage` //беремо input по атрибуту name що рівинй ${name}
    // і потім берем ( ~) наступний елемент з класом errorMessage
        )
    // console.log('errorTextElement', errorTextElement);
    erroredInput.setAttribute('data-invalid', ''); // data-invalid-атрибуть що відповідає за невалідність інпута
    errorTextElement.innerText = text;
 }
}


const convertFormDataToOblect = (formData) => {
    const formValues = {}

    for (let pair of formData.entries()) {
    
        formValues[pair[0]] = pair[1]
    }
    return formValues
}

// зробимо ф-цію яка буде при дії вводу знімати з неї атрибут data-invalid і буде прибирати текст помилки

const handleInput = (event) => {
    const currentInput = event.target;

    if (currentInput.hasAttribute("data-invalid")) {
        currentInput.removeAttribute("data-invalid");
    }

    const errorTextElement = form.querySelector( 
        `input[name=${currentInput.name}] ~ .errorMessage`
    );
    errorTextElement.innerText = "";
};

const handleFormSubmit = (event) => { // обробник форми, тобто ф-ція для зняття автоматичної перезагрузки
    event.preventDefault() // дефолтна перезагрузка відключаємо


    const formData = new FormData(event.target);
    formData.delete("agree");
    const values = convertFormDataToOblect(formData);

    
    const validationResult = validateForm(values, validationRules);


        if(!validationResult.isFormValid){ //якщо в нас не валідна форма 
            hightLightErroredInputs(validationResult.errors) // тоді виконується метод для підсвічування форми
        }else{
            console.log(values);
        }
    };

agreeCheckbox.addEventListener("change", handleCheckboxChange);
form.addEventListener('submit', handleFormSubmit); // обробник повязуємо з нашою формою
// тобто сама ф-ція-обробник handleFormSubmit повязується з формою (form) через метод addEventListener
// на подію кнопки ввода даних (submit)-стандартний атрибут
formInputs.forEach((input) => { 
input.addEventListener('input', handleInput)
})