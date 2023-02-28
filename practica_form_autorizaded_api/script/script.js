// Реализовать мини-приложение, в котором будет доступен
// функциаонал регистрации и авторизации.

// 1. При входе на сайт показывать пользователю
//    форму логина
// 2. После успешного входа отрисовать
//    на странице список пользователей.
// 3. Если пользователь был ранее авторизован, то вместо
//    показа формы сразу показывать список пользователей.
// 4. Список пользователей должен быть пагинирован, пользователи
//    должны отображаться по 4 на странице.

const BASE_URL = "https://reqres.in/api";
const PER_PAGE = 4;
const TOKEN_KEY = "token";

// login({
//   email: "george.bluth@reqres.in",
//   password: "123123",
// });

const headers = { "Content-Type": "application/json" };

const usersContainer = document.getElementById("users-list");
const paginationContainer = document.getElementById("pagination");
const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const isAuthorized = localStorage.getItem(TOKEN_KEY)

const handleRequestErrors = async(response) => {
  if(!response.ok) {
    const { error } = await response.json();
    throw new Error(error);
  }
  
  return response;
};

const login = async (data) => {
  try {
    const response = await handleRequestErrors(
      await fetch( `${BASE_URL}/login`, {
        body: JSON.stringify(data),
        method: "POST",
        headers,
      })
    );

    const { token } = await response.json();
    localStorage.setItem(TOKEN_KEY, token);
    loginForm.style.display = "none";
  } catch (error) {
    alert (error.message);
  }
};

const fetchUsers = async (page) => {
  try {
    const response = await handleRequestErrors(
      await fetch(`${BASE_URL}/users?page=${page}&per_page=${PER_PAGE}`, {
        method: "GET",
        headers,
      })
    );

    const { data:users, total_pages } = await response.json();

    return {
      users,
      total_pages,
    };
  } catch (error) {
    alert (error.message);
    return{
      users: [],
      total_pages: 0,
    };
  }
};

fetchUsers(1);


const getUserCardHtml = (user) => {
  const { avatar, first_name, last_name } = user;

  const html = `
    <div>
      <img alt="avatar" src="${avatar}"/>
      <p>${first_name} ${last_name}</p>
    </div>
  `;

  return html;
};


const renderUsers = (usersList) => {
  const html = usersList.map(getUserCardHtml).join("");
  usersContainer.innerHTML = html;
};


const handleChangePage = ({ target: currentBtn }) => {
  const newPage = currentBtn.dataset.page;

  if (currentBtn.classList.contains("button_active")) {
    return;
  }

  const prevButton = [...paginationContainer.children].find((btn) => {
    return btn.classList.contains("button_active");
  });

  prevButton.classList.remove("button_active");
  currentBtn.classList.add("button_active");
  updateUsersList (newPage);
};

const setupPagination = (totalPage) => {

  for ( let i = 1; i <= totalPage; i++ ) {
    const paginationBtn = document.createElement("button");
    paginationBtn.classList.add("button", "button_paging");

    if( i === 1 ) {
      paginationBtn.classList.add("button_active");
    }
    paginationBtn.setAttribute("data-page", i );
    paginationBtn.innerText = i;
    paginationBtn.addEventListener("click",handleChangePage);
    paginationContainer.append(paginationBtn);
  }
};

const handleFormSubmit = async(event) => {
  event.preventDefault();
  const { value: email } = emailInput;
  const { value: password } = passwordInput;
  
  await login ({ email, password });
  const { users, total_pages } = await fetchUsers(1);
  renderUsers (users);
  setupPagination (total_pages);
};

const init = async () => {
  if (!isAuthorized) {
    loginForm.style.display = "block";
  } else {
    const { users, total_pages } = await fetchUsers(1);
    renderUsers (users);
    setupPagination (total_pages);
  }
};

const updateUsersList = async (page) => {
  const { users } = await fetchUsers (page);
  renderUsers (users);
};
 init();
 loginForm.addEventListener ("submit", handleFormSubmit);
