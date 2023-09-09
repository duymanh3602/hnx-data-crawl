const { rawDataFilter } = require('./rawDataFilter.js');
const { saveExcelFile } = require('./exportExcel.js');

const startDate = new Date('2023-09-01'); 
const currentDate = new Date();

async function workCrawlData() {
    const fullCrawlData = [];
    for (let date = startDate; date <= currentDate; date.setDate(date.getDate() + 1)) {
        const jsonDataByDate = await rawDataFilter(date.getDate(), date.getMonth() + 1, date.getFullYear());
        fullCrawlData.push(jsonDataByDate)
    } 
    saveExcelFile(fullCrawlData);
}

workCrawlData();