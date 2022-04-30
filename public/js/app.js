
const form = document.querySelector("form");
const locationInput = document.querySelector("#location-input");
const message1 = document.querySelector(".message-1");
const message2 = document.querySelector(".message-2");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    message1.textContent = "Loading...";
    message2.textContent = "";
    message1.classList.remove("error");

    const location = locationInput.value;

    if(location.length < 1){
        message1.textContent = "Please provide the location!";
        return message1.classList.add("error");
    }
    
    fetch("/weather?location=" + location).then((res) => {
        res.json().then((data) => {
            if(data.error){
                message1.textContent = data.error;
                return message1.classList.add("error");
            }

            message1.textContent = data.place;
            message2.textContent = data.forecast;
        });
    });
});


    
