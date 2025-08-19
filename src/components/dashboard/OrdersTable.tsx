'use client';

import { useState } from 'react';
import { getTodaysOrders } from '@/services/webhookService';

interface Order {
  id: string;
  customerName: string;
  items: { name: string; quantity: number }[];
  total: number;
  status: string;
}

export function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleFetchOrders = async () => {
    setIsLoading(true);
    setError(null);
    setMessage(null);
    setOrders([]);
    try {
      const response = await getTodaysOrders();
      console.log('Orders response:', response);
      const ordersData = response?.output;
      if (Array.isArray(ordersData)) {
        setOrders(ordersData);
        if (ordersData.length === 0) {
          setMessage('No se encontraron pedidos para hoy.');
        }
      } else if (typeof ordersData === 'string') {
        setMessage(ordersData);
      } else {
        console.error('Received orders data is not an array:', ordersData);
        setError('El formato de los datos de los pedidos no es válido.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Pedidos de Hoy</h2>
      <button
        onClick={handleFetchOrders}
        disabled={isLoading}
        className="px-4 py-2 mb-4 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
      >
        {isLoading ? 'Cargando...' : 'Mostrar Pedidos'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {message && <p className="text-gray-600 mt-4">{message}</p>}

      {orders.length > 0 && (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Artículos</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">{order.customerName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
