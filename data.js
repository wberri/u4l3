async function getData() {
    const response = await fetch("covid.csv");
    const data = await response.text();
    const rows = data.split("\n").slice(1);
    const dates = [];
    const caseNums = [];
    rows.forEach((x) => {
        const row = x.split(",");
        const date = row[0];
        const caseNum = row[1];
        dates.push(date);
        //offset is delt with, has to convert to number as well
        caseNums.push(caseNum);
    });
    createLineGraph(dates, caseNums);
}


async function createLineGraph(dates, caseNums) {
    const chrt = document.getElementById('myChart');
    new Chart(chrt, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                //horizontal title on top
                label: "COVID CASES",
                data: caseNums,
                borderWidth: 1,
                pointRadius: 1.5,
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
                        text: 'Case Amount' // Label for the y-axis 
                    }
                },
                x: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Dates' // Label for the x-axis
                    }
                }//rand
            },
        }
    });
}

getData(); //call function
