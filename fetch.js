async function fetchData(url) {
    let response = await fetch(url);
    let data = await response.json();

    // console.log(data);
    // renderEvents(data);
    // renderChart(data);
    return data;
}

async function start() {
    const data = await fetchData(
        "https://www.berlin.de/sen/web/service/maerkte-feste/wochen-troedelmaerkte/index.php/index/all.json?q="
    );
    // fetch data
    // render charts
    renderChart(data);
}

async function fetchAndRenderEvents(districts) {
    // fetch data with search
    const data = await fetchData(
        "https://www.berlin.de/sen/web/service/maerkte-feste/wochen-troedelmaerkte/index.php/index/all.json?q=" +
            districts
    );
    // render events
    renderEvents(data);
}
start();
