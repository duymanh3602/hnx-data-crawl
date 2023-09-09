const fs = require('fs');
const XLSX = require('xlsx');

async function saveExcelFile(jsonData) {
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

    const data = jsonData;
    const excelTable = [];

    excelTable.push(dataSource);

    for (let i = 0; i < data.length; i++) {
        const rowExcel = [];
        rowExcel.push(data[i].date);
        Object.keys(data[i].data).forEach(subKey => {
            const value = data[i].data[subKey];
            rowExcel.push(value);
        });
        excelTable.push(rowExcel);
    }

    const wb = XLSX.utils.book_new();

    const wsName = 'Sheet1';
    const ws = XLSX.utils.aoa_to_sheet(excelTable);

    XLSX.utils.book_append_sheet(wb, ws, wsName);

    const excelBuffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    fs.writeFileSync('data.xlsx', excelBuffer);
}

module.exports = {
    saveExcelFile
};