import cn from 'classnames';
import { Product } from '../../types/product';
import { AddButton } from '../AddButon';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    title,
    type,
    photo,
    guarantee,
    price,
    isNew,
    serialNumber,
  } = product;

  const origin = isNew ? 'New' : 'Used';

  const sortedPrice = [...price].sort((currentPrice, nextPrice) => {
    return Number(currentPrice.isDefault) - Number(nextPrice.isDefault);
  });

  return (
    <div className="product-card">
      <div className="product-card__img-wrapper img-wrapper">
        <img
          className="product-card__photo photo"
          src={photo}
          alt={title}
        />
      </div>

      <div className="product-card__naming">
        <p className="product-card__name">
          {title}
        </p>

        <p className="product-card__serial">
          {serialNumber}
        </p>
      </div>

      <div className="product-card__type">
        {type}
      </div>

      <div className="product-card__origin">
        {origin}
      </div>

      <div className="product-card__guarantee">
        <p>
          <span className="product-card__guarantee-text">
            c
          </span>
          &nbsp;
          {new Date(guarantee.start).toLocaleDateString()}
        </p>

        <p>
          <span className="product-card__guarantee-text">
            по
          </span>
          &nbsp;
          {new Date(guarantee.end).toLocaleDateString()}
        </p>
      </div>

      <div className="product-card__prices">
        {sortedPrice.map(({ value, symbol, isDefault }) => (
          <p
            key={symbol}
            className={cn({ 'product-card__price--non-default': !isDefault })}
          >
            {value}
            &nbsp;
            <span className="product-card__prices-text">
              {symbol}
            </span>
          </p>
        ))}
      </div>
      <div className="product-card__add-button">
        <AddButton product={product} />
      </div>
    </div>
  );
};
