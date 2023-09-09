const XLSX = require('xlsx');

const workbook = XLSX.readFile('existing-file.xlsx');

const worksheet = workbook.Sheets['Sheet1'];

const newData = [
  { Name: 'Alice', Age: 28 },
  { Name: 'Eve', Age: 32 },
  { Name: 'Michael', Age: 42 }
];
const newWorksheet = XLSX.utils.json_to_sheet(newData);

worksheet['!ref'] = newWorksheet['!ref'];
Object.assign(worksheet, newWorksheet);

XLSX.writeFile(workbook, 'existing-file.xlsx');