const fs = require('fs');
const XLSX = require('xlsx');

const jsonData = fs.readFileSync('target.json', 'utf-8');

let dataSource = [
        "Date",
        "3 tháng",
        "6 tháng",
        "9 tháng",
        "1 năm",
        "2 năm",
        "3 năm",
        "5 năm",
        "7 năm",
        "10 năm",
        "15 năm",
        "20 năm",
];    

const data = JSON.parse(jsonData);

const excelTable = [];

excelTable.push(dataSource);

Object.keys(data).forEach(key => {
    const rowExcel = [];
    const valueObj = data[key];
    rowExcel.push(key);
    Object.keys(valueObj).forEach(subKey => {
        const value = valueObj[subKey];
        rowExcel.push(value);
    });
    excelTable.push(rowExcel);
});

// console.log(excelTable);

// console.log(dataSource);
const wb = XLSX.utils.book_new();

const wsName = 'Sheet1';
const ws = XLSX.utils.aoa_to_sheet(excelTable);

// Add the worksheet to the workbook
XLSX.utils.book_append_sheet(wb, ws, wsName);

// Convert the workbook to a buffer
const excelBuffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

// Write the buffer to a file
fs.writeFileSync('data.xlsx', excelBuffer);