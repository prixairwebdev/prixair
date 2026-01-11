"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Order } from '../types/types';
import { getUserOrders } from '@/app/actions/orders';
import { useAuth } from './AuthContext';

interface OrderContextType {
  orders: Order[];
  getOrderById: (orderId: string) => Order | undefined;
  createOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Order;
  refreshOrders: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refreshOrders = async () => {
    if (!user || !user.id) {
      setOrders([]);
      return;
    }

    setIsLoading(true);
    try {
      const fetchedOrders = await getUserOrders(user.id);
      const transformedOrders = fetchedOrders.map((order: any) => ({
        id: order.id,
        userId: typeof order.user === 'string' ? order.user : order.user?.id,
        items: (order.items || []).map((item: any) => {
          let imageUrl = '';
          if (typeof item.image === 'string') {
            imageUrl = item.image;
          } else if (item.image && typeof item.image === 'object' && 'url' in item.image) {
            imageUrl = item.image.url;
          }
          return {
            productId: item.product_id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: imageUrl,
          };
        }),
        total: order.total,
        status: order.status,
        shippingAddress: {
          id: 'temp-' + order.id,
          userId: typeof order.user === 'string' ? order.user : order.user?.id,
          name: order.shippingAddress?.name || '',
          phone: order.shippingAddress?.phone || '',
          street: order.shippingAddress?.street || '',
          city: order.shippingAddress?.city || '',
          state: order.shippingAddress?.state || '',
          zipCode: order.shippingAddress?.zipCode || '',
          country: order.shippingAddress?.country || '',
          isDefault: false,
          type: 'shipping' as const,
        },
        paymentMethod: order.paymentMethod,
        trackingNumber: order.trackingNumber,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      }));
      setOrders(transformedOrders);
    } catch (error) {
      console.error('Failed to fetch orders from CMS', error);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshOrders();
  }, [user?.id]);

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
      refreshOrders,
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
