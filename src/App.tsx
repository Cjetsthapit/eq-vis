import { useEffect } from 'react';
import { loadCSV } from './loadCSV';
import useDataStore from './useDataStore';
import ChartPanel from './components/ChartPanel';
import TablePanel from './components/TablePanel';

export default function App() {
  const { setData, loading, setLoading } = useDataStore();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      loadCSV()
        .then(setData)
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }, 1000);
  }, [setData, setLoading]);

  return (
    <div className="h-screen overflow-hidden">
      {loading ? (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
          <div className="loader"></div>
          <p className="text-xl font-semibold text-gray-700 mt-4">Loading earthquake data...</p>
        </div>
      ) : (
        <>
          <h1 className="text-xl font-bold p-4 pb-2">Earthquake Data</h1>
          <div className="flex h-[calc(100%-3rem)]"> {/* Remaining height after header */}
            <div className="w-1/2 h-full border-r">
              <ChartPanel />
            </div>
            <div className="w-1/2 h-full overflow-auto">
              <TablePanel />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
