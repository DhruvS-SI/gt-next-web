import React from 'react'
import { tableStyles, cellAlignment } from '@/lib/variants/table'

const Table = ({ 
  columns = [], 
  data = [],
  rowClassName,
  headerClassName = '',
  containerClassName = '',
  stickyHeader = false,
  size = 'default',
  theme = 'default',
  columnDividers = false,
  loadMore = null,
}) => {
  // Get styles from variants
  const styles = tableStyles({ theme, size, stickyHeader, columnDividers })

  
  const getVisibilityClasses = (col) => {
    if (col.hideOnMobile && col.hideOnDesktop) return 'hidden'
    if (col.hideOnMobile) return 'hidden md:table-cell'
    if (col.hideOnDesktop) return 'table-cell md:hidden'
    return ''
  }

  
  const getRowClassName = (row, index) => {
    if (typeof rowClassName === 'function') {
      return rowClassName(row, index)
    }
    return rowClassName || ''
  }

  return (
    <div className={`${styles.container()} ${containerClassName}`}>
      <table className={styles.table()}>
        <thead className={styles.thead()}>
          <tr className={`${styles.headerRow()} ${headerClassName}`}>
            {columns.map((col, index) => (
              <th 
                key={col.accessor || index} 
                className={`
                  ${styles.headerCell()}
                  ${cellAlignment({ align: col.align })}
                  ${col.headerClassName || ''}
                  ${getVisibilityClasses(col)}
                `}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody()}>
          {data.map((row, rowIndex) => (
            <tr 
              key={row.id || rowIndex} 
              className={`
                ${styles.bodyRow()}
                ${getRowClassName(row, rowIndex)}
              `}
            >
              {columns.map((col, colIndex) => {
                const cellClass = typeof col.cellClassName === 'function' 
                  ? col.cellClassName(row, rowIndex) 
                  : col.cellClassName || ''
                return (
                  <td 
                    key={col.accessor || colIndex} 
                    className={`
                      ${styles.bodyCell()}
                      ${cellAlignment({ align: col.align })}
                      ${cellClass}
                      ${getVisibilityClasses(col)}
                    `}
                  >
                    {col.render 
                      ? col.render(row[col.accessor], row, rowIndex) 
                      : row[col.accessor]
                    }
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      
      {data.length === 0 && (
        <div className={styles.emptyState()}>
          No data available
        </div>
      )}
      
      {loadMore && (
        <div className={styles.loadMoreContainer()}>
          <button
            onClick={loadMore.onClick}
            disabled={loadMore.disabled || loadMore.loading}
            className={styles.loadMoreButton()}
          >
            {loadMore.loading ? 'Loading...' : (loadMore.text || 'Load More')}
          </button>
        </div>
      )}
    </div>
  )
}

export default Table