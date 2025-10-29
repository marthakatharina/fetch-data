async function renderMap(result) {
    let map = L.map("map").setView([52.52, 13.405], 10);
    // console.log(map);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Helper to get a district color, with typo handling and fallback
    function getDistrictColor(district) {
        try {
            if (district === "Friedrichsahin-Kreuzberg" && colors) {
                return (
                    colors["Friedrichshain-Kreuzberg"] ||
                    colors[district] ||
                    "#3388ff"
                );
            }
            return (colors && colors[district]) || "#3388ff";
        } catch (_e) {
            return "#3388ff"; // Leaflet default-ish blue
        }
    }

    // Create a unified single-path pin icon colored by district
    function makePinIcon(color) {
        const svg = `
            <svg width="24" height="36" viewBox="0 0 24 36" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="1"/>
                        <feOffset dx="0" dy="1" result="offsetblur"/>
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.4"/>
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
                <g filter="url(#dropShadow)">
                    <path d="M12 2 C7 2 3 6 3 11 C3 17 12 24 12 34 C12 24 21 17 21 11 C21 6 17 2 12 2 Z" fill="${color}" stroke="#333" stroke-width="1"/>
                </g>
            </svg>`;

        return L.divIcon({
            className: "custom-pin",
            html: svg,
            iconSize: [24, 36],
            iconAnchor: [12, 34],
            popupAnchor: [0, -28],
        });
    }

    // Track created markers so we can re-style them if colors change later
    const markers = [];

    // If colors become available later (e.g., after pie renders), recolor markers
    document.addEventListener("districtColorsReady", () => {
        markers.forEach((m) => {
            const c = getDistrictColor(m.options.district);
            m.setIcon(makePinIcon(c));
        });
    });

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

                    const district = obj.bezirk;
                    const c = getDistrictColor(district);

                    let marker = L.marker([lat, lon], {
                        icon: makePinIcon(c),
                        district: district,
                    });
                    marker.addTo(map);
                    marker.bindPopup(`${obj.strasse}`);
                    markers.push(marker);

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
            // console.log("pop up clicked");
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

                let district = document.createElement("h4");
                district.textContent = obj.bezirk;
                card.appendChild(district);
                card.style.borderInlineStart =
                    "1.2rem solid " + colors[obj.bezirk];

                if (obj.bezirk === "Friedrichsahin-Kreuzberg") {
                    card.remove();
                }
            }

            btnsWrapper.childNodes.forEach((btn) => {
                btn.classList.remove("active");
            });
        });
    });
}
