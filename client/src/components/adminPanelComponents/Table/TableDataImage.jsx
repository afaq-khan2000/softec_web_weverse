import React from 'react'

const TableDataImage = ({ src = 'https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-3.jpg'}) => {
  return (
    <td className="" style={{ width: '80px' }}>
      <img src={src} className="w-100 radius-2 rounded" alt="Sheep" />
    </td>
  )
}

export default TableDataImage