// Sample array of objects

let allData;

const dataRow = [
  "rank",
  "codingamerNickname",
  "name",
  "score",
  "duration",
  "languageId",
  "challenge",
  "link",
  "date",
];

function getTimeOfDay(date) {
  const currentHour = new Date(date).getHours();
  if (currentHour < 12) {
    return "Morning";
  } else {
    return "Afternoon";
  }
}

function convertMilliseconds(milliseconds) {
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  return `00:${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
}

function convertArrayOfObjectsToCSV(data) {
  const csvRows = data.map((obj) => dataRow.map((elt) => obj[elt]));

  const trueData = csvRows.map((elt) => {
    elt[4] = convertMilliseconds(elt[4]);
    elt[8] = new Date(allData.creationTime).toDateString();
    elt[6] = getTimeOfDay(allData.creationTime);
    elt[3] = elt[3] / 100;
    return elt;
  });

  const finalData = trueData.map((elt) => elt.join(",")).join("\n");

  return finalData;
}

function downloadCSV(data1) {
  const csvContent =
    "data:text/csv;charset=utf-8," + convertArrayOfObjectsToCSV(data1);
  const link = document.createElement("a");
  link.href = encodeURI(csvContent);
  link.target = "_blank";
  link.download = `Clash Report - ${new Date(
    allData.creationTime
  ).toDateString()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Download the CSV file

function getTheInput() {
  const value = document.getElementById("data_input").value;
  allData = JSON.parse(value);
  downloadCSV(allData.players);
}
