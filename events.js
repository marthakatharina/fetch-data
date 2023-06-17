let content = document.getElementById("events-main");
let btnsWrapper = document.getElementById("buttons-wrapper");

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

        let district = document.createElement("p");
        district.textContent = object.bezirk;
        card.appendChild(district);
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

            content.innerHTML = "";
            // content.appendChild(btn);
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

                let time = document.createElement("p");
                time.textContent = obj.zeiten;
                card.appendChild(time);

                let district = document.createElement("p");
                district.textContent = obj.bezirk;
                card.appendChild(district);
            }
        });
    }
}
