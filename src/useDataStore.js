import { create } from 'zustand';

const useDataStore = create((set) => ({
  data: [],
  loading: false,
  currentPage: 1,
  rowsPerPage: 10,
  selectedRow: null,


  setData: (data) => set({ data, loading: false }),
  setLoading: (state) => set({ loading: state }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setRowsPerPage: (count) => set({ rowsPerPage: count }),
  setSelectedRow: (value) => set({ selectedRow: value }),
}));

export default useDataStore;
