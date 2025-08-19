'use client';

import { useState } from 'react';
import { notifyNewReservation } from '@/services/webhookService';

export function TestWebhookButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTestWebhook = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const testData = {
        id: 'test-' + Date.now(),
        name: 'Test Reservation',
        date: new Date().toISOString(),
        people: 2,
        status: 'pending'
      };
      
      const response = await notifyNewReservation(testData);
      setResult(response);
      console.log('Webhook response:', response);
    } catch (err) {
      console.error('Error testing webhook:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Prueba de Webhook</h2>
      
      <button
        onClick={handleTestWebhook}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? 'Enviando...' : 'Probar Webhook'}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
          <p className="font-medium text-green-800">¡Éxito!</p>
          <pre className="mt-2 text-sm text-green-700 overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
