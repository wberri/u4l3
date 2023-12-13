async function getData() {
    const response = await fetch("test.csv");
    const data = await response.text();
    const rows = data.split("\n").slice(1);
    const years = [];
    const temperatures = [];
    rows.forEach((x) => {
        const row = x.split(",");
        const year = row[0];
        const temperature = row[1];
        years.push(year);
        //offset is delt with, has to convert to number as well
        temperatures.push(Number(temperature)+14);
    });
    createLineGraph(years, temperatures);
}


async function createLineGraph(years, temperatures) {
    const chrt = document.getElementById('myChart');
    new Chart(chrt, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                //horizontal title on top
                label: "Global Average Temperature",
                data: temperatures,
                borderWidth: 1,
                //colors
                borderColor: 'pink',
                pointBackgroundColor: 'purple'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Temperature' // Label for the y-axis 
                    }
                },
                x: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Years' // Label for the x-axis
                    }
                }
            },
        }
    });
}

getData(); //call function
