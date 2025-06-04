import Papa from 'papaparse';

export const loadCSV = async (path = '/data/earthquake.csv') => {
  const response = await fetch(path);
  const text = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        const formatted = results.data
          .filter(row => row.time && !isNaN(Date.parse(row.time)))
          .map(row => ({
            ...row,
            time: new Date(row.time).toLocaleString(), // 👈 convert to readable format (date + time)
          }))
          .sort((a, b) => new Date(b.time) - new Date(a.time)); // sort DESC by time

        resolve(formatted);
      },
      error: reject,
    });
  });
};
