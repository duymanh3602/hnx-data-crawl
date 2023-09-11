const { rawDataFilter } = require('./rawDataFilter.js');
const { saveExcelFile } = require('./exportExcel.js');

// const startDate = new Date('2023-08-01'); 
// const currentDate = new Date();

const args = process.argv.slice(2);
const startDate = new Date(args[0]);
if (startDate > new Date()) {
    console.log("Start-Date-Go-Wrong");
    return;
}
const currentDate = (args[1] == null 
    || args[1] === '' || (args[1] && new Date(args[1]) > new Date()) ? new Date() : new Date(args[1]));
if (startDate > currentDate) {
    console.log("Invalid-Date");
    return;
}

async function workCrawlData() {
    const fullCrawlData = [];
    for (let date = startDate; date <= currentDate; date.setDate(date.getDate() + 1)) {
        const jsonDataByDate = await rawDataFilter(date.getDate(), date.getMonth() + 1, date.getFullYear());
        fullCrawlData.push(jsonDataByDate)
    } 
    saveExcelFile(fullCrawlData);
}

workCrawlData();