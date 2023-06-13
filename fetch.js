async function fetchData(url) {
    let response = await fetch(url);
    let data = await response.json();

    //condition clean the data
    // console.log(data);
    renderEvents(data);
    renderChart(data);
}

fetchData(
    "https://www.berlin.de/sen/web/service/maerkte-feste/wochen-troedelmaerkte/index.php/index/all.json?q="
);
