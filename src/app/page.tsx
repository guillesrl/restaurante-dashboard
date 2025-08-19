'use client';
import { TestWebhookButton } from '@/components/TestWebhookButton';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Control del Restaurante</h1>
          <p className="text-gray-600">Gestiona tus reservas y pedidos</p>
        </header>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Prueba de Integración con n8n</h2>
            <p className="text-gray-600 mb-4">
              Utiliza el botón de abajo para probar la conexión con el webhook de n8n.
              Se enviará una reserva de prueba.
            </p>
            <TestWebhookButton />
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Información del Webhook</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">URL del Webhook:</h3>
                <code className="block mt-1 p-2 bg-gray-100 rounded text-sm break-all">
                  https://n8n.guille.live/webhook/ccb11e02-0eeb-4818-ba9b-35652979e31d
                </code>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Método:</h3>
                <p className="mt-1">POST</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Content-Type:</h3>
                <p className="mt-1">application/json</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
