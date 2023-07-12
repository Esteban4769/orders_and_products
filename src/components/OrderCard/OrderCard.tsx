/* eslint-disable no-param-reassign */
import { FC } from 'react';
import { Order } from '../../types/order';
import { Product } from '../../types/product';

interface Props {
  order: Order;
  onDeleting: (id: number) => void;
  onOpening: (id: number) => void;
}

export const getFullOrderPrices = (products: Product[]) => {
  const sumOfPrices = products
    .map(({ price }) => price)
    .reduce((acc, price) => {
      price.forEach(p => {
        if (p.isDefault) {
          acc.defaultPriceSum += p.value;
        } else {
          acc.nonDefaultPriceSum += p.value;
        }
      });

      return acc;
    }, { defaultPriceSum: 0, nonDefaultPriceSum: 0 });

  return sumOfPrices;
};

export const OrderCard: FC<Props> = ({ order, onDeleting, onOpening }) => {
  const { title, date, products } = order;

  const productsCount = products.length;

  const { defaultPriceSum, nonDefaultPriceSum } = getFullOrderPrices(products);

  const handleOpening = () => {
    onOpening(order.id);
  };

  const handleDeleting = () => {
    onDeleting(order.id);
  };

  return (
    <div className="order-card">
      <div className="order-card__title">
        {title}
      </div>

      <div className="order-card__product-count">
        {productsCount}
        <p className="order-card__product-count-text">
          products
        </p>
      </div>

      <div className="order-card__date">
        {date}
      </div>

      <div className="order-card__prices">
        <p className="order-card__non-default-price">
          {nonDefaultPriceSum}
          &nbsp;
          <span className="order-card__price-text">
            USD
          </span>
        </p>

        <p>
          {defaultPriceSum}
          &nbsp;
          <span className="order-card__price-text">
            UAN
          </span>
        </p>
      </div>

      <button
        type="button"
        onClick={handleOpening}
        className="add-button"
      >
        Open
      </button>

      <button
        type="button"
        onClick={handleDeleting}
        className="add-button add-button--delete"
      >
        Delete
      </button>

    </div>
  );
};
