async function fetchData(url) {
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data);

    return data;
}

async function start() {
    // fetch data
    const data = await fetchData(
        "https://www.berlin.de/sen/web/service/maerkte-feste/wochen-troedelmaerkte/index.php/index/all.json?q="
    );
    // render charts
    renderChart(data);
    // render events
    renderEvents(data);
    // render map
    renderMap(data);
}

async function fetchAndRenderEvents(districts) {
    // fetch data with search from pie chart
    const data = await fetchData(
        "https://www.berlin.de/sen/web/service/maerkte-feste/wochen-troedelmaerkte/index.php/index/all.json?bezirk=" +
            districts
    );
    // render filtered events
    renderEvents(data);
}

async function resetEvents() {
    // fetch data
    const data = await fetchData(
        "https://www.berlin.de/sen/web/service/maerkte-feste/wochen-troedelmaerkte/index.php/index/all.json?q="
    );
    // render events
    renderEvents(data);
}

start();
