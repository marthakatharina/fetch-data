let bar = document.getElementById("bar");
let pie = document.getElementById("pie");

let layout = {
    height: 500,
    width: 800,
};

async function renderChart(result) {
    const valueCount = {};

    for (let i = 0; i < result.index.length; i++) {
        const obj = result.index[i];

        const value = obj.bezirk;

        // Check if the value exists in the valueCount object
        if (valueCount[value]) {
            // Increment the count if the value already exists
            valueCount[value]++;
            // typo spotted in the dataset - clean the data
        } else if ("Friedrichsahin-Kreuzberg" === value) {
            valueCount["Friedrichshain-Kreuzberg"]++;
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

    drawPie(values, counts);
    drawBar(values, counts);
}

function drawBar(values, counts) {
    Plotly.newPlot(bar, [
        {
            x: values,
            y: counts,
            type: "bar",
        },
    ]);
}

function drawPie(labels, values) {
    Plotly.newPlot(
        pie,
        [
            {
                labels: labels,
                values: values, // counts
                type: "pie",
            },
        ],
        layout
    );
    pie.on("plotly_click", function (data) {
        console.log(data);
        let districts = data.points[0].label;
        console.log(districts);

        fetchAndRenderEvents(districts);
    });
}
