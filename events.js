let content = document.getElementById("events-main");
let btnsWrapper = document.getElementById("buttons-wrapper");

// global colors (also in map.js)
let colors = {
    Brandenburg: "#1F77B4",
    "Charlottenburg-Wilmersdorf": "#FFB575",
    "Friedrichshain-Kreuzberg": "#E377C2",
    Lichtenberg: "#D62829",
    "Marzahn-Hellersdorf": "#60D35F",
    Mitte: "#7F7F7F",
    Neukölln: "#FF7F0E",
    Pankow: "#BCBE23",
    Reinickendorf: "#17BECE",
    Spandau: "#58A9E2",
    "Steglitz-Zehlendorf": "#9467BD",
    "Tempelhof-Schöneberg": "#2CA02C",
    "Treptow-Köpenick": "#8C564B",
    "Prenzlauer Berg": "#C6AEDC",
    Potsdam: "#E77C7C",
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
