"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { dummyOrders } from '../../data/dummy-data';
import { Order } from '../../types/types';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(dummyOrders);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredOrders = selectedStatus === 'all'
    ? orders
    : orders.filter(order => order.status === selectedStatus);

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus, updatedAt: new Date().toISOString() } : order
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'shipped':
        return 'bg-blue-100 text-blue-700';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link href="/supermarket/admin" className="text-orange-600 hover:text-orange-700">
            ← Back to Admin Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-black mb-2">Manage Orders</h1>
          <p className="text-gray-600">View and update order statuses</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedStatus === 'all'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-black hover:bg-gray-200'
              }`}
            >
              All Orders ({orders.length})
            </button>
            <button
              onClick={() => setSelectedStatus('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedStatus === 'pending'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-black hover:bg-gray-200'
              }`}
            >
              Pending ({orders.filter(o => o.status === 'pending').length})
            </button>
            <button
              onClick={() => setSelectedStatus('processing')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedStatus === 'processing'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-black hover:bg-gray-200'
              }`}
            >
              Processing ({orders.filter(o => o.status === 'processing').length})
            </button>
            <button
              onClick={() => setSelectedStatus('shipped')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedStatus === 'shipped'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-black hover:bg-gray-200'
              }`}
            >
              Shipped ({orders.filter(o => o.status === 'shipped').length})
            </button>
            <button
              onClick={() => setSelectedStatus('delivered')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedStatus === 'delivered'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-black hover:bg-gray-200'
              }`}
            >
              Delivered ({orders.filter(o => o.status === 'delivered').length})
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredOrders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-black">Order #{order.id}</h3>
                  <p className="text-gray-500 text-sm">
                    Placed: {new Date(order.createdAt).toLocaleDateString()} • 
                    Updated: {new Date(order.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h4 className="text-black font-semibold mb-2">Order Items</h4>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm">
                        <img
                          src={item.image || '/img/foodimg/placeholder.png'}
                          alt={item.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="text-black font-medium">{item.name}</p>
                          <p className="text-gray-500">Qty: {item.quantity} × NGN {item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-black font-semibold mb-2">Shipping Address</h4>
                  <p className="text-gray-700 text-sm">{order.shippingAddress.name}</p>
                  <p className="text-gray-700 text-sm">{order.shippingAddress.phone}</p>
                  <p className="text-gray-700 text-sm">{order.shippingAddress.street}</p>
                  <p className="text-gray-700 text-sm">
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Payment: {order.paymentMethod === 'paypal' ? 'PayPal' : 'Card'}</p>
                  {order.trackingNumber && (
                    <p className="text-gray-600 text-sm">Tracking: {order.trackingNumber}</p>
                  )}
                  <p className="text-xl font-bold text-orange-600 mt-1">Total: NGN {order.total.toFixed(2)}</p>
                </div>

                <div className="flex gap-2">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-black font-medium"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-600">No orders found for this status</p>
          </div>
        )}

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            💡 <strong>Shipday Integration:</strong> When connected, order status updates will automatically create delivery tasks in Shipday.
          </p>
        </div>
      </div>
    </div>
  );
}
