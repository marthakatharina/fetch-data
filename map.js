async function renderMap(result) {
    let map = L.map("map").setView([52.520008, 13.404954], 11);
    // console.log(map);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Geocode addresses and add markers to the map

    for (let i = 0; i < result.index.length; i++) {
        const obj = result.index[i];
        let address = obj.strasse + ", " + obj.plz;
        console.log(address);

        // Perform the geocoding request
        await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                address
            )}&format=json`
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    let { lat, lon } = data[0];

                    let marker = L.marker([lat, lon]);
                    marker.addTo(map);
                    marker.bindPopup(`${obj.strasse}`);

                    marker.on("click", function () {
                        // console.log("pop up clicked");
                        let str = obj.strasse;
                        //console.log(str);

                        fetchAndRenderStreets(str);
                    });
                }
            })
            .catch((error) => {
                console.error("Error geocoding address:", error);
            });
    }
}

async function fetchAndRenderStreets(str) {
    let leafletPopup = document.querySelectorAll(".leaflet-popup-content");

    // fetch data from map markers
    const data = await fetchData(
        "https://www.berlin.de/sen/web/service/maerkte-feste/wochen-troedelmaerkte/index.php/index/all.json?q="
    );

    leafletPopup.forEach((el) => {
        el.addEventListener("click", () => {
            console.log("pop up clicked");
            let streets = str;
            console.log(streets);

            const filteredStreets = data.index.filter(
                (obj) => obj.strasse === streets
            );
            console.log(filteredStreets);

            content.innerHTML = "";

            for (let j = 0; j < filteredStreets.length; j++) {
                let obj = filteredStreets[j];

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

                let address = document.createElement("p");
                address.textContent = obj.strasse + ", " + obj.plz;
                card.appendChild(address);

                let district = document.createElement("p");
                district.textContent = obj.bezirk;
                card.appendChild(district);
            }
        });
    });
}
