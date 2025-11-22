import React from 'react';

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
}

export function DataTable<T extends Record<string, any>>({ columns, data, className = '' }: DataTableProps<T>) {
  return (
    <div className={`overflow-x-auto rounded-xl border border-border ${className}`}>
      <table className="w-full">
        <thead className="bg-muted/50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-6 py-4 text-left text-sm text-muted-foreground ${column.className || ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-card">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center text-muted-foreground">
                No data available
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index} className="border-t border-border hover:bg-muted/30 transition-colors">
                {columns.map((column) => (
                  <td key={column.key} className={`px-6 py-4 text-sm ${column.className || ''}`}>
                    {column.render ? column.render(item) : item[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
