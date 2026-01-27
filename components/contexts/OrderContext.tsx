"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Order } from '@/types/store';
import { getUserOrders } from '@/app/actions/orders';
import { useAuth } from './AuthContext';

interface CMSOrderItem {
    product_id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string | { url: string };
}

interface CMSOrder {
    id: string;
    user: string | { id: string };
    items: CMSOrderItem[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    shippingAddress?: {
        name?: string;
        phone?: string;
        street?: string;
        city?: string;
        state?: string;
        zipCode?: string;
        country?: string;
    };
    paymentMethod: 'paypal' | 'card' | 'paystack';
    trackingNumber?: string;
    createdAt: string;
    updatedAt: string;
}

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

    const refreshOrders = useCallback(async () => {
        if (!user || !user.id) {
            setOrders([]);
            return;
        }

        setIsLoading(true);
        try {
            const fetchedOrders = await getUserOrders(user.id) as unknown as CMSOrder[];
            const transformedOrders = fetchedOrders.map((order: CMSOrder) => ({
                id: order.id,
                userId: typeof order.user === 'string' ? order.user : order.user?.id,
                items: (order.items || []).map((item: CMSOrderItem) => {
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
                    userId: typeof order.user === 'string' ? order.user : (order.user?.id || ''),
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
                paymentMethod: order.paymentMethod as any,
                trackingNumber: order.trackingNumber,
                store: (order as any).store,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt,
            }));
            setOrders(transformedOrders as Order[]);
        } catch (error) {
            console.error('Failed to fetch orders from CMS', error);
            setOrders([]);
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    useEffect(() => {
        refreshOrders();
    }, [user?.id, refreshOrders]);

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
