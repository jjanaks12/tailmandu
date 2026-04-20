const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

// Define the path to the Excel file
const filePath = path.join(__dirname, 'data', 'Final Sheet MTR 2026 V12.10.xlsx');

/**
 * Reads the Excel file and extracts data from the first sheet.
 */
function extractData() {
    try {
        console.log(`Attempting to read file: ${filePath}`);

        // Read the workbook
        const workbook = XLSX.readFile(filePath);

        // List all sheets
        console.log('Available Sheets:', workbook.SheetNames);

        // Get the first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert the sheet to JSON
        // header: 1 would return an array of arrays, default returns array of objects using first row as keys
        const data = XLSX.utils.sheet_to_json(worksheet);

        console.log(`Successfully extracted ${data.length} records from "${sheetName}".`);

        // Return or process the data
        return data.filter(item => ['100_mile', '80_km'].includes(item.race_category));
    } catch (error) {
        console.error('Extraction failed:', error.message);
        return null;
    }
}

// hit api
async function sendData() {
    const runnerData = extractData();

    /*  await fetch('http://localhost:8000/api/runners/import', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
             'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NzYyMTg1MTEsImV4cCI6MTc3NjI0MDExMSwiYXVkIjoiY21qd2xrNjE5MDA3aHMxcm4zOTh3cGl4diIsImlzcyI6ImFwcF9uYW1lIn0.ioXZxX1ayfSmlrwxBjcGe4gs-OUT9OZYp4Hij8a4Bkg'
         },
         body: JSON.stringify({
             runners: runnerData,
             event_id: 'cmn7ffez5001sw8s1evt3kput',
             stage_id: 'cmn7fg8ol001uw8s14zvcbn01',
             stage_categories: {
                 '100_mile': 'cmn7fhnye001ww8s1lenw2eud',
                 '80_km': 'cmnzfh9x1000104vdudv9um79'
             }
         })
     })
         .then(response => response.json())
         .then(data => {
             console.log(data)
             fs.writeFileSync(path.join(__dirname, 'data', 'runner_ids.json'), JSON.stringify(data, null, 2));
             console.log('Saved to data/runner_ids.json')
         })
         .catch(error => {
             console.log(error)
         }) */
    await fetch('https://trailmandu.api.janak.click/api/runners/import', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NzYyMTg2NzYsImV4cCI6MTc3NjI0MDI3NiwiYXVkIjoiY21qd2xrNjE5MDA3aHMxcm4zOTh3cGl4diIsImlzcyI6InRyYWlsbWFpbmR1In0.ifHt_WbW_O3Gj4YdEL_loe3beJvnurzAbDz6eHNZMXc'
        },
        body: JSON.stringify({
            runners: runnerData,
            event_id: 'cmn7ffez5001sw8s1evt3kput',
            stage_id: 'cmn7fg8ol001uw8s14zvcbn01',
            stage_categories: {
                '100_mile': 'cmn7fhnye001ww8s1lenw2eud',
                '80_km': 'cmnzhxf5o0005ais1egl3dum3'
            }
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            fs.writeFileSync(path.join(__dirname, 'data', 'runner_ids.json'), JSON.stringify(data, null, 2));
            console.log('Saved to data/runner_ids.json')
        })
        .catch(error => {
            console.log(error)
        })

}

sendData()