import React, { useEffect, useState } from 'react';
import Table from '../../components/adminPanelComponents/Table';
import TableDataImage from '../../components/adminPanelComponents/Table/TableDataImage';
import { getOrders } from '../../api/OrdersAPI';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res.orders);
    });
  }, []);

  return (
    <div className='d-flex flex-column w-100'>
      <h1 className='font-clash'>Orders List</h1>
      <Table>
        <thead>
          <tr className=''>
            <th scope='col'>ID</th>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Phone</th>
            <th scope='col'>Items</th>
            <th scope='col'>Status</th>
          </tr>
        </thead>
        <tbody className=''>
          {orders.map((order, key) => (
            <tr key={key}>
              <td>{order._id.slice(0, 5)}</td>
              <td>{order.name}</td>
              <td>{order.email}</td>
              <td>{order.phone}</td>
              <td>
                <div className='d-flex flex-column'>
                  {order.items.map((item, key) => (
                    <span key={key}>
                      {item.title} x {item.quantity}
                    </span>
                  ))}
                </div>
              </td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrdersPage;
