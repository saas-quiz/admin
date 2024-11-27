export const downloadFile = ({ data, fileName, fileType }: { data: string; fileName: string; fileType: string }) => {
  const blob = new Blob([data], { type: fileType });
  const a = document.createElement("a");
  a.download = fileName;
  a.href = window.URL.createObjectURL(blob);
  const clickEvt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  a.dispatchEvent(clickEvt);
  a.remove();
};

export function convertJsonToCsv(jsonArray: any[]) {
  // Extract headers from the first object in the array
  const headers = Object.keys(jsonArray[0]);

  const csvHeader = headers.join(",");

  const csvRows = jsonArray.map((obj) => {
    return headers
      .map((header) => {
        const value = obj[header];

        // If the value contains spaces, wrap it in double quotes
        if (typeof value === "string" && value.includes(" ")) {
          return `"${value}"`;
        }

        return value;
      })
      .join(",");
  });

  // Combine the header and rows to form the complete CSV string
  const csvString = [csvHeader, ...csvRows].join("\n");

  return csvString;
}
