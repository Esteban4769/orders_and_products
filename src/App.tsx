import React, { useEffect } from 'react';
import './App.scss';
import { TopMenu } from './components/TopMenu';
import './styles/index.scss';
import { Main } from './components/Main';
import { products as productsFromServer } from './api/products';
import { Order } from './types/order';

export const App: React.FC = () => {
  useEffect(() => {
    return () => {
      const currentOrderData = sessionStorage.getItem('order');
      const productIds = currentOrderData ? JSON.parse(currentOrderData) : [];

      if (!productIds.length) {
        return;
      }

      const products = productsFromServer
        .filter(({ id }) => productIds.includes(id));
      const ordersData = localStorage.getItem('orders');
      const orders: Order[] = ordersData ? JSON.parse(ordersData) : [];
      const newOrderId = orders.length
        ? Math.max(...orders.map(({ id }) => id)) + 1
        : 1;

      const currentOrder: Order = {
        id: newOrderId,
        title: `Order ${newOrderId}`,
        date: new Date().toLocaleDateString(),
        description: 'desc',
        products,
      };

      localStorage.setItem('orders', JSON.stringify([...orders, currentOrder]));
    };
  });

  return (
    <div className="order_and_products_app">
      <TopMenu />

      <Main />
    </div>
  );
};
