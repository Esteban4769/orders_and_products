import { useEffect, useState } from 'react';
import { Order } from '../../types/order';
import { OrderCard } from '../OrderCard';
import { OrderedProductList } from '../OrderedProducs';

export const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [chosenOrder, setChosenOrder] = useState<Order | null>(null);

  useEffect(() => {
    const ordersData = localStorage.getItem('orders');
    const ordersFromServer: Order[] = ordersData ? JSON.parse(ordersData) : [];

    setOrders(ordersFromServer);
  }, []);

  const handleOpening = (orderId: number) => {
    const order = orders.find(({ id }) => orderId === id);

    if (order) {
      setChosenOrder(order);
    }
  };

  const handleDeleting = (deletingId: number) => {
    const filteredOrders = orders.filter(({ id }) => id !== deletingId);

    localStorage.setItem(
      'orders',
      JSON.stringify(filteredOrders),
    );

    if (deletingId === orders[orders.length - 1].id) {
      sessionStorage.clear();
    }

    setOrders(filteredOrders);
  };

  const handleOrderClose = () => {
    setChosenOrder(null);
  };

  return (
    <div className="orders">
      <h1 className="orders__title">
        Orders
      </h1>

      {orders.length > 0
        ? (
          <div className="orders__orders-list">
            {orders.map(order => (
              <OrderCard
                key={order.id}
                order={order}
                onDeleting={handleDeleting}
                onOpening={handleOpening}
              />
            ))}
          </div>
        )
        : (
          <p>
            There are no orders at the moment
          </p>
        )}

      {chosenOrder && (
        <OrderedProductList
          chosenOrder={chosenOrder}
          onOrderUpdate={setOrders}
          onClose={handleOrderClose}
          onDeletingOrder={handleDeleting}
        />
      )}
    </div>
  );
};
