import { useEffect, useState } from 'react';
import { Product } from '../../types/product';
import { products as productsFromServer } from '../../api/products';
import { ProductCard } from '../ProductCard';

const getfilteredProducts = (products: Product[], filterType: string) => {
  return products.filter(({ type }) => type === filterType);
};

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [typeFilter, setTypeFilter] = useState('');

  const typeFilterSet = new Set(products.map(({ type }) => type));

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;

    setTypeFilter(value);
  };

  const visibleProducts = typeFilter
    ? getfilteredProducts(products, typeFilter)
    : products;

  useEffect(() => {
    setProducts(productsFromServer);
  }, []);

  return (
    <div className="products">
      <div className="products__top-wrapper">
        <h1 className="products__title">
          Products
        </h1>

        <label htmlFor="type-filter">
          Type:
          &nbsp;
          <select
            className="products__type-filter"
            name="type-filter"
            onChange={handleSelectChange}
            defaultValue=""
          >
            <option value="">All types</option>

            {[...typeFilterSet].map((type :string) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="products__list">
        {visibleProducts.length > 0
          && visibleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};
