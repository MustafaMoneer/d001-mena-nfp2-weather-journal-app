/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=c0f3fe98f7fc16333431957317986ced&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

const getWeather = async (baseURL, zipCode, apiKey) => {
    const res = await fetch(`${baseURL}${zipCode}${apiKey}`);
    try {
        const addData = await res.json();
        console.log(addData);
        return addData;
    } catch (error) {
        console.log('Weather Data Error', error);
    }
};

// Functions called by event listener
function performAction(e) {
    const zipCode = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

    getWeather(baseURL, zipCode, apiKey)
        .then(function (addData) {
            postData('/add', {
                temp: addData.main.temp,
                date: newDate,
                content: content
            });
        })
        .then(function () {
            updateUI()
        });
};

const updateUI = async () => {
const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('content').innerHTML = allData.content;
        console.log(allData);
    } catch (error) {
        console.log("Error", error);
    }
}


/* Async POST */
const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            date: data.date,
            temp: data.temp,
            content: data.content
        }), // body data type must match "Content-Type" header        
    });

    try {
        const newData = await response.json();
        return newData
    } catch (error) {
        console.log('Error', error);
    }
}
/*
// Call Function
postData('/add', { answer: 42 });
 */

/* Async GET */
const getData = async (url = '') => {

    const response = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('Error', error);
        // appropriately handle the error
    }
};