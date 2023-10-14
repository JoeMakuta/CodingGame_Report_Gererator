// Declare variables

const errorPara = document.getElementById("error");
const downloadButton = document.getElementById("downloadButton");
const data_input = document.getElementById("data_input");
const container = document.querySelector(".container");

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
  const currentHour = new Date(date).getHours() + 2;
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
    elt[3] /= 100;
    return elt;
  });

  const finalData = trueData.map((elt) => elt.join(",")).join("\n");

  return finalData;
}

// Download the CSV file

function downloadCSV(data1) {
  const csvContent =
    "data:text/csv;charset=utf-8," + convertArrayOfObjectsToCSV(data1);

  downloadButton.href = encodeURI(csvContent);

  downloadButton.target = "_blank";

  downloadButton.download = `Clash Report : ${getTimeOfDay(
    allData.creationTime
  )} - ${new Date(allData.creationTime).toDateString()}.csv`;
}

function getTheInput(jsonData) {
  try {
    downloadButton.removeAttribute("href");

    allData = JSON.parse(jsonData);

    if (allData.players !== "undefined") downloadCSV(allData.players);
    else throw new Error("Not a valid json");

    data_input.style.border = "0px solid black";
    errorPara.textContent = "";
  } catch (error) {
    errorPara.textContent = error?.message.split(",")[1];
    data_input.style.border = "1px solid red";
  }
}

data_input.addEventListener("input", (e) => {
  getTheInput(e.target.value);
});
