import React from 'react';

const Filters = ({ filters, skus, onFilterChange, onExport, loading }) => {
  return (
    <section className="filter-bar">
      <div className="input-group">
        <label>Start Date</label>
        <input 
          type="date" 
          name="start" 
          value={filters.start} 
          onChange={onFilterChange} 
        />
      </div>
      <div className="input-group">
        <label>End Date</label>
        <input 
          type="date" 
          name="end" 
          value={filters.end} 
          onChange={onFilterChange} 
        />
      </div>
      <div className="input-group">
        <label>Transaction Type</label>
        <select name="type" value={filters.type} onChange={onFilterChange}>
          <option value="ALL">All Types</option>
          <option value="IN">IN</option>
          <option value="OUT">OUT</option>
        </select>
      </div>
      <div className="input-group">
        <label>Product (SKU)</label>
        <select name="sku" value={filters.sku} onChange={onFilterChange}>
          <option value="ALL">All Products</option>
          {skus.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <button className="btn-success" onClick={onExport} disabled={loading}>
        Export CSV
      </button>
    </section>
  );
};

export default Filters;
