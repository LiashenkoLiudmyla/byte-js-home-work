// Homework 17
// Реализуйте таймер обратного отсчета на JS.

// При запуске приложения на странице должно находиться 2 кнопки Start и Stop.
// При нажатии пользователем на кнопку Start, на странице должен появиться таймер обратного отсчета. (Количесво секунд, которые будет "идти" таймер можете спросить у пользователя через инпут, prompt или записать в коде).
// Длительность таймера обязательно должна быть указана в секундах.
// Элемент таймера обязательно сожержать часы минуты и секунды. То есть, если пользователь длительность таймера 3600 секунд, изначально на странице должно отобразиться 01:00:00, если 10 секунд, то 00:00:10.
// Каждую секунду таймер должен уменьшаться на секунду.
// При нажатии на кнопку Pause таймер должен остановиться, а при повторном нажатии - продолжиться с того же места.
// По истечению таймера, должна быть возможность обработать возвращенный из функции промис. То есть, при выполнении следующего кода, в консоли через 30 секунд должна появиться строка Timer end!


const bthStart = document.getElementById('start');
const bthStop = document.getElementById('stop');
const timeText = document.getElementById('timer');

let timeout = 10; // можна зробити через форми щоб задавати  час для відліку
let intervalId = null; // змінна що відповідає за виключення таймеру
let isActive = false;// змінна що відпоідає за активність кнопки, щоб при багаторазових натисканнях не робилася каша


const formatTime = (timerItem) => {
// переводимо число в строчку і перевіряємо один символ чи два якщо олин символ, то підставляємо спереду 0
    return String(timerItem).length < 2 ? `0${timerItem}` : timerItem;

}

const renderTimer = ({hours, minutes, seconds}) => {

    const timerString = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    timeText.innerText = timerString
}

const getTimeLeft = (secondsLeft) => {
    const hours = Math.floor(secondsLeft / 3600);
    const minutes = Math.floor((secondsLeft - hours * 3600) / 60);
    const seconds = secondsLeft - hours * 3600 - minutes * 60;

    return {
        hours,
        minutes,
        seconds,
    }
}

const startTimer = () => {// запускається таймер

isActive = true;
const time = getTimeLeft(timeout);
renderTimer(time)

return new Promise((resolve) => {
    intervalId = setInterval(() => {
        timeout--

        if(timeout <= 0) {
            isActive = false
            clearInterval(intervalId)
            intervalId = null;
            resolve()
        }

        const time = getTimeLeft(timeout)
        renderTimer(time)
    }, 1000)
})
      
}

const stopTimer = () => {

    isActive = false;
    clearInterval(intervalId);
    intervalId = null
}

bthStart.addEventListener('click', () => {

    if (isActive || !timeout) {// перестраховка на якщо кнопка активна то вже не нажимається або якщо  в таймауті 0 то функція неспрацьовує
        return
    }// якщо ця умова не підтвердилася то працює наступна ф-ція

    startTimer().then(() => {
        alert('Timer end!')
    })// повертає проміс 
})

bthStop.addEventListener('click', stopTimer)