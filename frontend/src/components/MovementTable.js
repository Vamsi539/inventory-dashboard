import React from 'react';

const MovementTable = ({ data, page, totalPages, onPageChange }) => {
  return (
    <div className="card table-card">
      <h3>Audit Log</h3>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Entry ID</th>
              <th>SKU Reference</th>
              <th>Action</th>
              <th>Units</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map(m => (
              <tr key={m.id}>
                <td><code>{m.id}</code></td>
                <td><strong>{m.sku}</strong></td>
                <td>
                  <span className={`badge ${m.movementType}`}>
                    {m.movementType}
                  </span>
                </td>
                <td>{m.quantity}</td>
                <td>{new Date(m.timestamp).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="pagination-controls">
        <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
          Previous
        </button>
        <span className="page-indicator">
          Showing Page {page} of {totalPages}
        </span>
        <button disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MovementTable;
