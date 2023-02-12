// Задание 1 Из объекта в примере ниже, с помощью деструктуризации достаньте следующие значения:

// total, из объекта paging, который вложен в объект meta
// значение is_active, которое принадлежит первому объекту в массиве data. Переименуйте переменную в isActive.

const response = {
  data: [
    {
      username: "samuel",
      is_active: true,
      created_at: "2020-11-20T09:53:50.000000Z",
    },
    {
      username: "john",
      is_active: false,
      created_at: "2020-11-20T09:53:50.000000Z",
    },
    {
      username: "peter",
      is_active: false,
      created_at: "2020-11-20T09:53:50.000000Z",
    },
  ],
  meta: {
    paging: {
      current: 1,
      next: 2,
      prev: null,
      total: 14,
      per_page: 3,
    },
  },
};

const {
  data: [{is_active: isactive}],
  meta: {
  paging: { total }
  }
} = response;

// console.log('total', total);
// console.log('isactive', isactive);



// Задание 2

// Из объекта в примере ниже, с помощью деструктуризации достаньте следующие значения:
// name
// surname
// все остальные свойста (height, age) должны быть присвоены объекту parameters.

const user = {
  name: "gabriel",
  surname: "brown",
  age: 17,
  height: 178,
};

const { surname, name,...parameters } = user
// console.log('parameters', parameters)
// console.log('surname', surname)
// console.log('name', name)

// Задание 3

// const max = (a, b) => {
//   return a > b ? a : b;
// };
// Переделайте функцию max таким образом, что бы она принимала любое количество аргументов (при условии, что все они являются числами,
// и возвращала максимальное из них). P.S. В данной задаче нельзя использовать Math.max()

const max = (a, b) => {
  return a > b ? a : b;
};

const advancedMax = (...numbers) => {
  let max = -10

  numbers.forEach((num) => {
    if(num > max){
      max = num
    }
  })
  return max
}
// console.log('advancedMax', advancedMax(-10, -3, -1))

// Задание 4 

// Переделайте функцию createMessage таким образом, что бы на вход передавались не 4 аргумента, а один объект. 
// Деструктузизуйте его в прямо в аргументах или в теле функции, и присвойте значения по умолчанию:

// Guest для поля author
// текущую дату для поля time

// const createMessage = (author, text, reciever, time) => {
//   return `From ${author} to ${reciever}: ${text} (${time.toLocaleDateString()})`;
// };

// const message = createMessage("Peter", "Hello", "Sam", new Date());
// console.log('message', message)


const AdvancedCreateMessage = (author = "guest", text, reciever, time = new Date()) => {
  return `From ${author} to ${reciever}: ${text} (${time.toLocaleDateString()})`;
  };

// // после выполнения этого задания, функция должна коректно работать с таким аргументом
// const message = createMessage({
//   reciever: "John",
//   text: "Hi!",
// });

// console.log('message', message);



// Задание 5

// Напишите регулярное выражение, которое находит подстроки с такими свойствами:
// начинается с буквенного символа
// заканчивает на буквенный символ
// между первым и послденим символом находятя только числовые символы
// для поиска используйте метод match

let str1 = "x1y 722a 333 a123v1n a55555a qwe1 1zxc";
let regexp1 = /\w\d+\w/gi
// console.log(str1.match(regexp1)) 
//'x1y', '722a', '333', 'a123v', 'a55555a']


// Напишите регулярное выражение для валидации домена (адреса сайта)
// Валидные домены: ex.ua, google.com, yandex.ru, site.com.ua, my-page.com
// то есть, доменные имена начинаются с любого количества буквенных символов, 
//чисел, символов - _ ., заканчиваются подстрокой, длина которой
// не менее 2 символов. Начало и конец обязательно разделены точкой

let str2 = "test@sit.eua"
let regexp2 = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi
console.log(str2.match(regexp2));
// используйте метод test
console.log(regexp2.test(str2));

let str2a = "ex.ua, google.com, yandex.ru, site.com.ua, my-page.com"
let regexp2a = /([a-z._-]+).([\w]{2,})/gi
console.log(str2a.match(regexp2a));
// используйте метод test
console.log(regexp2a.test(str2a));

// Напишите регулярное выражаение, которое проверяет строку:
// строка не должна содержать ничего кроме числовых символов
// длина строка должна быть не менее 12, но можно и больше
let str3 = "5789403frh87251, 578940309887251,u,9872";
let regexp3 = /(\d+){12,}/gi
console.log(str3.match(regexp3));
// Тестируйте свои регулярки тут: https://regex101.com