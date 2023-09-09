const fs = require('fs');
const cheerio = require('cheerio');

const { postData } = require('./crawlData.js');

async function rawDataFilter(day, month, year) {
    const html = await postData(day, month, year);

    const $ = cheerio.load(html);
    const table = $('table');

    const row = {};
    const rowData = {};

    table.find('tbody tr').each((_, row) => {
        var timeIndex = '-';
        var value = '-';
        $(row).find('td').each((index, td) => {
            const header = table.find('thead th').eq(index).text();
            if (header === 'Kỳ hạn còn lại') {
                let temp = $(td).text().trim();
                timeIndex = temp;
            } else if (header == 'Spot rate theo năm (%)') {
                let temp = $(td).text().trim();
                value = temp;
            }
        });
        rowData[timeIndex] = value;
    });
    row[day + '-' + month + '-' + year] = rowData;

    const jsonData = JSON.stringify(row, null, 2);
    return jsonData;
}

module.exports = {
    rawDataFilter
};