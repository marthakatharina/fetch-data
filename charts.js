let bar = document.getElementById("bar");

async function renderChart(result) {
    // let response = await fetch(
    //     "https://www.berlin.de/sen/web/service/maerkte-feste/wochen-troedelmaerkte/index.php/index/all.json?q="
    // );
    // let result = await response.json();

    const valueCount = {};

    for (let i = 0; i < result.index.length; i++) {
        const obj = result.index[i];

        const value = obj.bezirk;

        // Check if the value exists in the valueCount object
        if (valueCount[value]) {
            // Increment the count if the value already exists
            valueCount[value]++;
        } else {
            // Initialize the count if the value doesn't exist
            valueCount[value] = 1;
        }
    }

    const values = [];
    const counts = [];

    // Iterate over the valueCount object and populate the arrays
    for (let value in valueCount) {
        values.push(value);
        counts.push(valueCount[value]);
    }
    console.log(values);
    console.log(counts);

    drawChart(values, counts);
}

function drawChart(values, counts) {
    Plotly.newPlot(bar, [
        {
            x: values,
            y: counts,
            type: "bar",
        },
    ]);
}

// renderChart();
