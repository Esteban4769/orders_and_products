/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuid4 } from 'uuid';
import { Order } from '../../types/order';

interface Props {
  chosenOrder: Order;
  onOrderUpdate: (orders: Order[]) => void;
  onClose: () => void;
  onDeletingOrder: (id: number) => void;
}

export const OrderedProductList: React.FC<Props> = ({
  chosenOrder,
  onOrderUpdate,
  onClose,
  onDeletingOrder,
}) => {
  const [orderedProducts, setOrderedProducts] = useState(chosenOrder.products);

  const handleProductRemove = (removeIndex: number) => {
    const newProductsList = orderedProducts
      .filter((_, index) => removeIndex !== index);

    const ordersData = localStorage.getItem('orders');
    const ordersFromServer: Order[] = ordersData ? JSON.parse(ordersData) : [];

    const modifiedOrders = newProductsList.length > 0
      ? ordersFromServer.map(order => {
        if (order.id === chosenOrder.id) {
          const newOrder = { ...order };

          newOrder.products = newProductsList;

          return newOrder;
        }

        return order;
      }) : ordersFromServer.filter(({ id }) => id !== chosenOrder.id);

    localStorage.setItem(
      'orders',
      JSON.stringify(modifiedOrders),
    );

    setOrderedProducts(newProductsList);

    onOrderUpdate(modifiedOrders);

    if (newProductsList.length < 1) {
      onDeletingOrder(chosenOrder.id);
      onClose();
    }
  };

  useEffect(() => {
    setOrderedProducts(chosenOrder.products);
  }, [chosenOrder.id]);

  return (
    <div
      className="ordered-products"
    >
      <div className="overlay" onClick={onClose} />

      <div className="ordered-products__container">
        <h2 className="ordered-products__title">
          {chosenOrder.title}
        </h2>

        <hr className="horizontal-line" />

        <ul
          className="ordered-products__list"
        >
          {orderedProducts.map((product, index) => (
            <>
              <li key={uuid4()} className="ordered-products__list-item">
                <div className="ordered-products__product">
                  <div className="ordered-products__product-image img-wrapper">
                    <img
                      src={product.photo}
                      alt={product.title}
                      className="photo"
                    />
                  </div>

                  <div className="ordered-products__product-title">
                    {product.title}
                  </div>

                  <div className="ordered-products__product-remove-button">
                    <button
                      type="button"
                      className="add-button add-button--delete"
                      onClick={() => handleProductRemove(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
              {index !== orderedProducts.length - 1 && (
                <hr className="horizontal-line" />
              )}
            </>
          ))}
        </ul>
        <hr className="horizontal-line" />

        <button
          type="button"
          className="close-button"
          onClick={onClose}
        >
          x
        </button>
      </div>
    </div>
  );
};
