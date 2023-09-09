const fs = require('fs');
const cheerio = require('cheerio');

const { postData } = require('./crawlData.js');

async function rawDataFilter() {
    const html = await postData(11, 9);

    const $ = cheerio.load(html);
    const table = $('table');

    const data = [];

    table.find('tbody tr').each((_, row) => {
        const rowData = {};
        $(row).find('td').each((index, td) => {
        const header = table.find('thead th').eq(index).text();
        const value = $(td).text().trim();
        rowData[header] = value;
        });
        data.push(rowData);
    });
    
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync('data.json', jsonData, 'utf8');
}

rawDataFilter()