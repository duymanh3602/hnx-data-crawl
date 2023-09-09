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
    
    // var workbook;
    // try {
    //     workbook = XLSX.readFile('data.xlsx');
    // } catch {
        
    // }
    // workbook = XLSX.utils.book_new('data.xlsx')
    // file save
    const wb = XLSX.utils.book_new();

    const wsName = 'Sheet1';
    const ws = XLSX.utils.aoa_to_sheet(excelTable);

    XLSX.utils.book_append_sheet(wb, ws, wsName);

    const excelBuffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    fs.writeFileSync('data.xlsx', excelBuffer);
    // const worksheetName = 'Sheet1';
    // const worksheet = workbook.Sheets[worksheetName];

    // const lastCell = worksheet['!ref'].split(':').pop();
    // const lastRowIndex = parseInt(lastCell.match(/\d+/)[0]);

    // const newRange = XLSX.utils.sheet_add_aoa(worksheet, excelTable, { origin: -1 });

    // const newLastRowIndex = lastRowIndex + excelTable.length;
    // const newLastCell = lastCell.replace(/\d+/, newLastRowIndex);
    // worksheet['!ref'] = `A1:${newLastCell}`;

    // XLSX.writeFile(workbook, 'data.xlsx');
}

module.exports = {
    saveExcelFile
};