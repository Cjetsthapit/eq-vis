import { useState } from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis,
  Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';
import useDataStore from '../useDataStore';

const numericKeys = [
  'latitude', 'longitude', 'depth', 'mag', 'nst', 'gap',
  'dmin', 'rms', 'horizontalError', 'depthError', 'magError', 'magNst'
];

export default function ChartPanel() {
  const { data, currentPage, rowsPerPage, selectedRow, setSelectedRow } = useDataStore();

  const [xKey, setXKey] = useState('depth');
  const [yKey, setYKey] = useState('mag');

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

  const formatTick = (val) => Number.isFinite(val) ? Math.round(val) : val;

  const sortedData = [...paginatedData].sort((a, b) => {
  const aVal = a[xKey];
  const bVal = b[xKey];
  return aVal - bVal;
});

  // Custom shape function
  const customShape = (props) => {
    const { cx, cy, payload } = props;
    const isSelected = selectedRow?.id && payload.id === selectedRow.id;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={isSelected ? 8 : 4}
        fill={isSelected ? '#ef4444' : '#4f46e5'}
        stroke={isSelected ? 'black' : 'none'}
        strokeWidth={isSelected ? 2 : 0}
      />
    );
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex gap-4 mb-4">
         X:<select value={xKey} onChange={(e) => setXKey(e.target.value)} className="border p-1">
         {numericKeys.map((key) => <option key={key}>{key}</option>)}
        </select>
        Y: <select value={yKey} onChange={(e) => setYKey(e.target.value)} className="border p-1">
          {numericKeys.map((key) => <option key={key}>{key}</option>)}
        </select>
      </div>

      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <CartesianGrid />
            <XAxis dataKey={xKey} type="number" domain={['auto', 'auto']} tickFormatter={formatTick} />
            <YAxis dataKey={yKey} tickFormatter={formatTick}/>
            <Tooltip />
            <Scatter
              data={sortedData}
              shape={customShape}
              name="Earthquakes"
              onClick={(data) => setSelectedRow(data)}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
