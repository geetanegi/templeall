export const downloadFile = (filePath: string, fileName: string) => {
  const link = document.createElement("a");
  link.href = filePath; // Path to your file
  link.download = fileName; // Filename for download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const viewPdf = (pdfUrl: string) => {
  window.open(pdfUrl, "_blank");
};
