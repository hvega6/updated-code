// Part: Dynamic CSV Parsing into a Two-Dimensional Array
function parseCSVToArray(data) {
    const rows = data.split('\n').map(row => row.trim()).filter(row => row);
    const numColumns = rows[0].split(',').length; // Store the number of columns based on the first row
    const result = [];

    for (let i = 0; i < rows.length; i++) {
        const values = rows[i].split(',').map(value => value.trim());
        // Ensure the row has the correct number of columns
        if (values.length === numColumns) {
            result.push(values);
        }
    }

    return result; // Return the two-dimensional array
}

// Example usage
const csvData2 = `ID,Name,Occupation,Age
42,Bruce,Knight,41
57,Bob,Fry Cook,19
63,Blaine,Quiz Master,58
98,Bill,Doctor's Assistant,26`;

const parsedData2 = parseCSVToArray(csvData2);
console.log(parsedData2);

// Part: Transforming Data to Objects

function transformDataToObjects(dataArray) {
    const headers = dataArray[0].map(header => header.toLowerCase()); // Convert headers to lowercase
    const result = [];

    // Loop through the data rows
    for (let i = 1; i < dataArray.length; i++) {
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = dataArray[i][index]; // Assign values to the corresponding header
        });
        result.push(obj); // Add the object to the result array
    }

    return result; // Return the array of objects
}

// Example usage
const objectsData = transformDataToObjects(parsedData2);
console.log(objectsData);

// Part: Manipulating Data

function manipulateData(dataArray) {
    // Remove the last element
    dataArray.pop();

    // Insert a new object at index 1
    dataArray.splice(1, 0, { id: "48", name: "Barry", occupation: "Runner", age: "25" });

    // Add a new object to the end of the array
    dataArray.push({ id: "7", name: "Bilbo", occupation: "None", age: "111" });

    // Calculate the average age
    let totalAge = 0;
    for (let obj of dataArray) {
        totalAge += parseInt(obj.age); // Convert age to integer
    }
    const averageAge = totalAge / dataArray.length;

    return { modifiedData: dataArray, averageAge: averageAge };
}

// Example usage
const { modifiedData, averageAge } = manipulateData(objectsData);
console.log(modifiedData);
console.log(`Average Age: ${averageAge}`);

// Part 7: Convert Back to CSV

function convertToCSV(dataArray) {
    const headers = Object.keys(dataArray[0]);
    const csvRows = [];

    // Add the header row
    csvRows.push(headers.join(','));

    // Add each object as a row
    for (const obj of dataArray) {
        const values = headers.map(header => obj[header]);
        csvRows.push(values.join(','));
    }

    return csvRows.join('\n'); // Join all rows into a single string
}

// Example usage
const csvOutput = convertToCSV(modifiedData);
console.log(csvOutput);
