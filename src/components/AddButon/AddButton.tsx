import { FC } from 'react';
import { Order } from '../../types/order';
import { Product } from '../../types/product';

interface Props {
  product: Product,
}

const generateNewOrder = (orders: Order[], products: Product[]) => {
  const newOrderId = orders.length
    ? Math.max(...orders.map(({ id }) => id)) + 1
    : 1;

  return {
    id: newOrderId,
    title: `Order ${newOrderId}`,
    date: new Date().toLocaleDateString(),
    description: 'desc',
    products,
  };
};

export const AddButton: FC<Props> = ({ product }) => {
  const handleAddToOrder = () => {
    const currentOrderData = sessionStorage.getItem('order');
    const products = currentOrderData ? JSON.parse(currentOrderData) : [];
    const newProductsList = [...products, product];

    sessionStorage.setItem(
      'order',
      JSON.stringify(newProductsList),
    );

    const ordersData = localStorage.getItem('orders');
    const orders: Order[] = ordersData ? JSON.parse(ordersData) : [];

    if (!products.length) {
      const newOrder = generateNewOrder(orders, newProductsList);

      localStorage.setItem(
        'orders',
        JSON.stringify([...orders, newOrder]),
      );

      return;
    }

    orders[orders.length - 1].products = newProductsList;

    localStorage.setItem(
      'orders',
      JSON.stringify([...orders]),
    );
  };

  return (
    <button
      type="button"
      className="add-button"
      onClick={handleAddToOrder}
    >
      Add
    </button>
  );
};
