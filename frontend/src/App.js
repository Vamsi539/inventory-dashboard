import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Filters from './components/Filters';
import SummaryChart from './components/SummaryChart';
import MovementTable from './components/MovementTable';
import { inventoryService } from './services/api';
import './App.css';

const PAGE_SIZE = 10;

function App() {
  const [movements, setMovements] = useState([]);
  const [skus, setSkus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  
  const [filters, setFilters] = useState({
    start: '',
    end: '',
    type: 'ALL',
    sku: 'ALL'
  });

  // Init dependencies
  useEffect(() => {
    (async () => {
      try {
        const list = await inventoryService.getSkus();
        setSkus(list);
      } catch (err) {
        console.error('Core init failed:', err);
      }
    })();
  }, []);

  const refreshData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await inventoryService.getMovements(filters);
      setMovements(data);
      setPage(1);
    } catch (err) {
      console.error('Movement refresh failed:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Derived State
  const paginatedResults = useMemo(() => {
    const offset = (page - 1) * PAGE_SIZE;
    return movements.slice(offset, offset + PAGE_SIZE);
  }, [movements, page]);

  const totalPages = Math.ceil(movements.length / PAGE_SIZE) || 1;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleExport = () => {
    const url = inventoryService.getExportUrl(filters);
    window.open(url, '_blank');
  };

  return (
    <div className="dashboard-root">
      <header className="navbar">
        <h1>Inventory Control Center</h1>
      </header>

      <main className="container">
        <Filters 
          filters={filters} 
          skus={skus} 
          onFilterChange={handleFilterChange} 
          onExport={handleExport}
          loading={loading}
        />

        <div className="visuals-grid">
          <SummaryChart data={movements} />
          
          <MovementTable 
            data={paginatedResults} 
            page={page} 
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
