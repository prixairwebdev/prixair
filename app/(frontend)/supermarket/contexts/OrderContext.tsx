"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Order } from '../types/types';
import { dummyOrders } from '../data/dummy-data';

interface OrderContextType {
  orders: Order[];
  getOrderById: (orderId: string) => Order | undefined;
  createOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Order;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(dummyOrders);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('prixair_orders');
      if (saved) {
        setOrders(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load orders', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('prixair_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders', e);
    }
  }, [orders]);

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setOrders(prev => [...prev, newOrder]);
    return newOrder;
  };

  return (
    <OrderContext.Provider value={{
      orders,
      getOrderById,
      createOrder,
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within OrderProvider');
  }
  return context;
};
