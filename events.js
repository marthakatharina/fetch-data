let content = document.getElementById("events-main");

async function renderEvents(data) {
    //content.innerHTML = "";

    // let response = await fetch(url);
    // let data = await response.json();
    // // console.log(data);

    for (let i = 0; i < data.index.length; i++) {
        let object = data.index[i];
        console.log(object);
        // console.log(object.bezeichnung);
        // console.log(object.bezirk);

        let card = document.createElement("div");

        content.appendChild(card);
        card.className = "card";

        let eventName = document.createElement("h2");
        eventName.textContent = object.bezeichnung;
        card.appendChild(eventName);

        let days = document.createElement("h3");
        days.textContent = object.tage;
        card.appendChild(days);

        // let dateFrom = document.createElement("span");
        // dateFrom.textContent = object.von + " - ";
        // card.appendChild(dateFrom);
        // let dateTo = document.createElement("span");
        // dateTo.textContent = object.bis;
        // card.appendChild(dateTo);

        let time = document.createElement("p");
        time.textContent = object.zeiten;
        card.appendChild(time);

        let district = document.createElement("p");
        district.textContent = object.bezirk;
        card.appendChild(district);
    }
}

// fetchEvents(
//     "https://www.berlin.de/sen/web/service/maerkte-feste/wochen-troedelmaerkte/index.php/index/all.json?q="
// );
