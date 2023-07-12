import React from 'react';
import './App.scss';
import { TopMenu } from './components/TopMenu';
import './styles/index.scss';
import { Main } from './components/Main';

export const App: React.FC = () => {
  return (
    <div className="order_and_products_app">
      <TopMenu />

      <Main />
    </div>
  );
};
