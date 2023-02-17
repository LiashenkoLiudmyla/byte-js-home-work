// Practice
// Промисификация запросов

// Задача:
// 1. Написать функцию-обертку для XMLHTTP запроса, которая
//    будет принимать настройки запроса в качестве аргумента,
//    а возвращать Promise с результатом запроса, а так же
//    будет обрабатывать ошибки. Если с запросом
//    что-то пошло не так, то функция должна
//    "выбросить" ошибку, ее можно будеть обработать
//    с помощью catch.

// 2. Написать функцию, которая будет запрашивать пользователя
//    с сервера, ее результат можно будет обратоботать с помощью
//    then и сatch. Для реализации задачи, необходимо использовать
//    функцию из предыдущего задания

const get = (url) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "json";

        xhr.send();

        xhr.onload = () => {
            const { status, response } = xhr;
            if( status === 200) {
                resolve(response);
            } else {
                reject({
                    status,
                });
            }
        };
        xhr.onerror = () => {
            reject({});
        };
    });
};

// get("https://jsonplaceholder.typicode.com/users/11")
// .then((response) => console.log(response))
// .catch((err) => {
//     if( err.status !== undefined) {
//         if(err.status === 404) {
//             alert("User on defined")
//         }
//     }
// });


const getUser = (id) => {
    return get(`https://jsonplaceholder.typicode.com/users/${id}`)
};

getUser(1)
.then((user) => console.log(user))
.catch((err) => {

});



const post = (url, body) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.responseType = "json";

        xhr.send(JSON.stringify(body));

        xhr.onload = () => {
            const { status, response } = xhr;
            if( status === 200) {
                resolve(response);
            } else {
                reject({
                    status,
                });
            }
        };
        xhr.onerror = () => {
            reject({});
        };
    });
};

const BASE_URL = "https://jsonplaceholder.typicode.com";

const form = document.getElementById("findUserForm");
const userIdInput = document.getElementById("userId");
const userContainer = document.getElementById("userContainer");

const renderUser = ({ name, email, phone }) => {
    console.log("user...");

    const nameParagraph = document.createElement("p");
    const emailParagraph = document.createElement("p");
    const phoneParagraph = document.createElement("p");

    nameParagraph.innerText = name;
    emailParagraph.innerText = email;
    phoneParagraph.innerText = phone;

    userContainer.innerHTML = "";
    userContainer.append(nameParagraph, emailParagraph, phoneParagraph)
        
};
const handleFindUser = (event) => {
    event.preventDefault();

    const userId = userIdInput.value;

    // const getUserByIdRequest = new XMLHttpRequest();
    // getUserByIdRequest.open("GET",`${BASE_URL}/users/${userId}`);
    // getUserByIdRequest.responseType = "json";
    // getUserByIdRequest.send();

    // getUserByIdRequest.onload =() => {
    //     const { status } = getUserByIdRequest;

    //     if (status === 200) {
    //         renderUser(getUserByIdRequest.response);
    //     } else {
    //         alert("User not found!")
    //     }
    // };
    getUser(userId)
    .then((user) => renderUser(user))
    .catch((err) => {
        if(err.status !==undefined) {
            if(err === 404) {
                alert("User not found!")
            }
        }
    })
};

form.addEventListener("submit", handleFindUser);