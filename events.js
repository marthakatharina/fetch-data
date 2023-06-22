let content = document.getElementById("events-main");
let btnsWrapper = document.getElementById("buttons-wrapper");

// global colors (also in map.js)
let colors = {
    Brandenburg: "rgb(255, 181, 116)",
    "Charlottenburg-Wilmersdorf": "rgb(31, 119, 180)",
    "Friedrichshain-Kreuzberg": "rgb(227, 119, 194)",
    Lichtenberg: "rgb(255, 127, 14)",
    "Marzahn-Hellersdorf": "rgb(87, 169, 226)",
    Mitte: "rgb(44, 160, 44)",
    Neukölln: "rgb(127, 127, 127)",
    Pankow: "rgb(140, 86, 75)",
    Reinickendorf: "rgb(95, 211, 95)",
    Spandau: "rgb(188, 189, 34)",
    "Steglitz-Zehlendorf": "rgb(214, 39, 40)",
    "Tempelhof-Schöneberg": "rgb(148, 103, 189)",
    "Treptow-Köpenick": "rgb(23, 190, 207)",
};

async function renderEvents(data) {
    content.innerHTML = "";
    btnsWrapper.innerHTML = "";

    filterEventsBtns(data);

    for (let i = 0; i < data.index.length; i++) {
        let object = data.index[i];
        //  console.log(object);

        let card = document.createElement("div");

        content.appendChild(card);
        card.className = "card";

        let eventName = document.createElement("h2");
        eventName.textContent = object.bezeichnung;
        card.appendChild(eventName);

        let days = document.createElement("h3");
        days.textContent = object.tage;
        card.appendChild(days);

        let time = document.createElement("p");
        time.textContent = object.zeiten;
        card.appendChild(time);

        let address = document.createElement("p");
        address.textContent = object.strasse + ", " + object.plz;
        card.appendChild(address);

        let district = document.createElement("h4");
        district.textContent = object.bezirk;
        // console.log(object.bezirk, colors[object.bezirk]);
        card.appendChild(district);
        card.style.borderInlineStart = "1.2rem solid " + colors[object.bezirk];

        if (object.bezirk === "Friedrichsahin-Kreuzberg") {
            card.remove();
        }
    }
}

function filterEventsBtns(data) {
    let btns = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
    for (let i = 0; i < btns.length; i++) {
        let btn = document.createElement("button");
        btn.textContent = btns[i];
        btnsWrapper.appendChild(btn);

        btn.addEventListener("click", () => {
            // console.log("button cliked");
            const filteredDays = data.index.filter((obj) =>
                obj.tage.includes(btns[i])
            );
            console.log(filteredDays);
            btnsWrapper.childNodes.forEach((btn) => {
                btn.classList.remove("active");
            });
            btn.classList.add("active");

            content.innerHTML = "";

            for (let j = 0; j < filteredDays.length; j++) {
                let obj = filteredDays[j];

                let card = document.createElement("div");

                content.appendChild(card);
                card.className = "card";

                let eventName = document.createElement("h2");
                eventName.textContent = obj.bezeichnung;
                card.appendChild(eventName);

                let days = document.createElement("h3");
                days.textContent = obj.tage;
                card.appendChild(days);
                // console.log(obj.tage.split(/( |,|\n)+/));
                // let splitDays = obj.tage.split(/( |,|\n)+/);
                // splitDays.style.color = "red";

                let time = document.createElement("p");
                time.textContent = obj.zeiten;
                card.appendChild(time);

                let address = document.createElement("p");
                address.textContent = obj.strasse + ", " + obj.plz;
                card.appendChild(address);

                let district = document.createElement("h4");
                district.textContent = obj.bezirk;
                card.appendChild(district);
                card.style.borderInlineStart =
                    "1.2rem solid " + colors[obj.bezirk];

                if (obj.bezirk === "Friedrichsahin-Kreuzberg") {
                    card.remove();
                }
            }
        });
    }
}
