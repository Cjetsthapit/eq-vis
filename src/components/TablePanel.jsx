import { useEffect, useRef } from 'react';
import useDataStore from '../useDataStore';

export default function TablePanel() {
  const {
    data,
    currentPage,
    rowsPerPage,
    setCurrentPage,
    setRowsPerPage,
    selectedRow,
    setSelectedRow
  } = useDataStore();

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);
  const columns = data[0] ? Object.keys(data[0]) : [];

  const rowRefs = useRef({});

  // ✅ Scroll to selected row
  useEffect(() => {
    if (selectedRow?.id && rowRefs.current[selectedRow.id]) {
      rowRefs.current[selectedRow.id].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selectedRow]);
  return (
   <div className="flex flex-col h-full border rounded overflow-hidden">
  {/* Scrollable table area */}
  <div className="flex-grow overflow-auto">
    <table className="min-w-full table-auto text-sm">
      <thead className="sticky top-0 z-10 bg-gray-100 shadow-sm text-sm font-semibold text-gray-800 border-b border-gray-300">
        <tr>
          {columns.map((col) => (
            <th key={col} className="border p-2 text-left">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {paginatedData.map((row, idx) => (
          <tr
            key={idx}
            className={`hover:bg-blue-100 cursor-pointer ${selectedRow?.id === row.id ? 'bg-blue-200 font-semibold' : ''}`}
            ref={(el) => (rowRefs.current[row.id] = el)}
            onClick={() => setSelectedRow(row)}
          >
            {columns.map((col) => (
              <td key={col} className="border p-2">
                {row[col] instanceof Date ? row[col].toISOString() : row[col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Fixed Pagination */}
  <div className="mt-2 p-2 border-t bg-white flex items-center justify-between text-sm">
    <div>Page {currentPage} of {totalPages}</div>
    <div className="flex items-center gap-2">
      <button
        className="px-2 py-1 border rounded"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </button>
      <button
        className="px-2 py-1 border rounded"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
      <select
        className="ml-4 border p-1"
        value={rowsPerPage}
        onChange={(e) => {
          setRowsPerPage(Number(e.target.value));
          setCurrentPage(1);
        }}
      >
        {[10, 20, 50, 100].map(n => (
          <option key={n} value={n}>{n} rows</option>
        ))}
      </select>
    </div>
  </div>
</div>

  );
}
