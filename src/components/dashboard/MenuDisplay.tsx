'use client';

import { useState, useEffect } from 'react';
import { getMenu } from '@/services/webhookService';

interface MenuItem {
  category: string;
  items: { name: string; description: string; price: number }[];
}

export function MenuDisplay() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      setIsLoading(true);
      setError(null);
      setMessage(null);
      setMenu([]);
      try {
        const response = await getMenu();
        console.log('Menu response:', response);
        const menuData = response?.output;
        if (Array.isArray(menuData)) {
          setMenu(menuData);
          if (menuData.length === 0) {
            setMessage('El menú no está disponible en este momento.');
          }
        } else if (typeof menuData === 'string') {
          setMessage(menuData);
        } else {
          console.error('Received menu data is not an array:', menuData);
          setError('El formato de los datos del menú no es válido.');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch menu');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Menú del Restaurante</h2>
      
      {isLoading && <p>Cargando menú...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {message && <p className="text-gray-600 mt-4">{message}</p>}

      {menu.length > 0 && (
        <div>
          {menu.map((category) => (
            <div key={category.category} className="mb-6">
              <h3 className="text-md font-bold text-gray-800 border-b pb-2 mb-3">{category.category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.items.map((item) => (
                  <div key={item.name} className="p-3 bg-gray-50 rounded">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="font-mono text-sm">${item.price.toFixed(2)}</p>
                      <br/>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
