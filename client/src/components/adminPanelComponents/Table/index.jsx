import React from 'react'

const Table = ({ children }) => {
  return (
    <div className='w-100 p-4'>

      <table className="table table-striped table-hover table-responsive-md">
        {children}
      </table>
    </div>
  )
}

export default Table