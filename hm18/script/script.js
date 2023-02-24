// Homework 18
// Реализовать функционал получения постов и комментариев к ним с сервера.

// Получить список всех постов с эндпоинта https://jsonplaceholder.typicode.com/posts и отрисовать их на странице.
// В каждом посте должна находится кнопка с текстом Show comments, которая отвечает за получение комментариев к этому конкретному посту.
// При нажатии на кнопку, на сервер по адресу https://jsonplaceholder.typicode.com/posts/{postId}/comments (где ВМЕСТО postId должeн находится id поста) отправляется запрос, к которому необходимо запросить комментарии.
// Полученные комментарии нужно отрендерить в посте (где-то под ним, выбов визуального оформления остается за вами).
// Когда комментарии отрендерены, текст в кнопке необходимо заменить на Hide comments.
// Повторное нажатие на кнопку (если комменты уже отрендерены), удаляет их с поста. Текст кнопки снова меняется на Show comments.
// Документация к API: https://jsonplaceholder.typicode.com/


const BASE_URL = "https://jsonplaceholder.typicode.com/posts"
// отримуємо контейнер куди будемо апендити

const cont = document.getElementById("cont") // отримуємо контейнер для написання туди постів

const postsRequest = new XMLHttpRequest();
postsRequest.open("GET", BASE_URL)
postsRequest.responseType = "json"



//  console.log("cont",cont)

postsRequest.send()

const hideComments = (div) => { // ми створювали дів у кінець тепер нам треба видалити коментар 

    // для цього отримуємо останню дитину по ДОМ дереву
    let comments = div.lastElementChild
    comments.remove()

    
}



const showComments = (comments, div) => {

    const divComment = document.createElement("div")

    comments.forEach((obj) => {
        let { body: comment } = obj

        const p = document.createElement("p")
        p.innerText = comment

        divComment.append(p)

        // console.log("p",p) 
       
    })
    
   
    div.append(divComment) // дів з коментарями додається в кінець

    
    
}



const getPostComments = (id, event) => {

    const xhrComments = new XMLHttpRequest()

    // xhrComments.open("GET", `${BASE_URL}${id}/comments`)
    xhrComments.open("GET",` https://jsonplaceholder.typicode.com/posts/${id}/comments`)

    xhrComments.responseType = "json"

    xhrComments.send()

    const button = event.target
    
    const parent = event.target.parentNode; // батько (parent) куди будемо додавати коментарі

    xhrComments.onload = () => {

        let result = xhrComments.response

        if(button.innerText === "Show comments") {
            button.innerText = "Hide comments"
            showComments(result, parent) // у функцію шоукоментс передаємо резалт тобто відповідь з сервера та батька куди будемо додавати коментарі

        } else if (button.innerText === "Hide comments" ) {
            button.innerText = "Show comments"
            hideComments(parent)
        }
       
    }
    
   
}



const renderPost = (postsList, container) => {



    const posts = postsList.map((post) => {
        const postContainer = document.createElement("div");
        const postTitle = document.createElement("h2");
        const postText = document.createElement("p");
        const button = document.createElement("button")
        
        postTitle.innerText = post.title
        postText.innerText = post.body
        button.innerText = "Show comments"
        postContainer.classList.add("post-container")

        button.classList.add("button")

       
        postContainer.append(postTitle, postText, button)

        let postsId = post.id //щоб дістати кожен пост по айді призначаємо змінну

        button.addEventListener("click", (event) => {
            getPostComments(postsId, event) // і передаємо кожен пост айді по якому будемо робити запит
        })
        
    //    console.log(post)

        return postContainer
    })

    container.append(...posts)
  
}

postsRequest.onload = () => {
    const { response } = postsRequest
    renderPost(response, cont)
    
}

