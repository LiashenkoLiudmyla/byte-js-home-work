// Завдання:
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
const formInputs = document.querySelectorAll("input[type=text]")
const agreeCheckbox = document.getElementById("agree");
const submitBtn = document.getElementById("submit");

const loginInput = document.getElementById("login");// отримуємо значення по ID щоб передати у ф-цію
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");


const simpleValidateForm = ( login, email, password) =>{ // І варіант ф-ція для валідації форми
    // цей варіант підходить для одного виду форми, яка потім не зміниться. самий простий варіант
//  console.log('login', login);
//  console.log('email', email);
//  console.log('password', password);

 const errors = {}; // створюємо пустий обєкт ерорс
 let isFormValid = true; // по дефолту в нас форма валідна
 // тобто на початку в нас немає ніяких помилок

 if (!login) { //якщо не логін, тобто його немає
    isFormValid = false; //то форма не валідна
    errors.login = "Ви не ввели логін" // і в обєкт ерорс по ключу login  виводимо 'Ви не ввели логін'
 }
 if (!email) { //якщо не email, тобто його немає
    isFormValid = false; //то форма не валідна
    errors.email = 'Ви не ввели email' // і в обєкт ерорс по ключу email  виводимо 'Ви не ввели email'
 } 
 if (!password) { //якщо не password, тобто його немає
    isFormValid = false; //то форма не валідна
    errors.password = 'Ви не ввели password' // і в обєкт ерорс по ключу password  виводимо 'Ви не ввели password'
 }// всі ключи берем з HTML name="password" --> --> <input type="text" class="input" id="password" name="password" />

 if (password !== '' && password.length < 6 ) {// перевірка на к-ть символів 
    isFormValid = false; //то форма не валідна
    errors.password = 'Пароль має складатися не менше 6 символів'
 }

 if (takenLogins.includes(login)){ //в масиві takenLogins(або датабаза) перевіряємо через метод масивів includes наявність логіна
    isFormValid = false; //то форма не валідна
    errors.login = 'Такий логін уже існує придумайте інший'
 }

 return { // і повертаємо обєкт де по ключу isFormValid в нас буде лежати isFormValid  
        // і по ключу errors лежить значення errors
    isFormValid,
    errors,
 }

}

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
    const erroredInput = form.querySelector(`input[name=${name}]`) // звертаємося до інпуту через кверіселектор
    // console.log('erroredInput', erroredInput);
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

    const loginValue = loginInput.value;//передаємо у ф-цію кожне значення інпутів
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

     const validationResult = simpleValidateForm(// визиваємо функцію для валідації інпутів
        loginValue, // щоб їх отримати нам потрібен доступ через ID (50 строки)
        emailValue, 
        passwordValue
        ); 
    
        if(!validationResult.isFormValid){ //якщо в нас не валідна форма 
            hightLightErroredInputs(validationResult.errors) // тоді виконується метод для підсвічування форми
        }else{
            console.log({
                login: loginValue,
                email: emailValue,
                password: passwordValue
            })
        }

    console.log('validationResult', validationResult);
}

agreeCheckbox.addEventListener("change", handleCheckboxChange);
form.addEventListener('submit', handleFormSubmit); // обробник повязуємо з нашою формою
// тобто сама ф-ція-обробник handleFormSubmit повязується з формою (form) через метод addEventListener
// на подію кнопки ввода даних (submit)-стандартний атрибут
formInputs.forEach((input) => { 
input.addEventListener('input', handleInput)
})