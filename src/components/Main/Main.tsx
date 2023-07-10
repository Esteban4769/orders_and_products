import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../Home';
import { NavigationMenu } from '../NavigationMenu';
import { Orders } from '../Orders';
import { Products } from '../Products';

export const Main = () => {
  return (
    <main className="main">
      <NavigationMenu />

      <div className="main__page">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/products" element={<Products />} />

          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </main>
  );
};
