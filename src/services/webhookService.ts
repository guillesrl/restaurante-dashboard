
const N8N_WEBHOOK_URL = '/api/send-webhook';

// Ensure fetch is available in all environments
const _fetch = typeof window !== 'undefined' ? window.fetch : require('node-fetch');

// Type assertion for fetch
type FetchFunction = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
const fetch = _fetch as unknown as FetchFunction;

export interface WebhookPayload {
  event: string;
  data: any;
  timestamp: string;
}

export async function sendToWebhook(payload: WebhookPayload) {
  try {
    console.log('Sending webhook to:', N8N_WEBHOOK_URL);
    console.log('Payload:', JSON.stringify(payload, null, 2));
    
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        source: 'restaurante-dashboard',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Webhook error response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: errorText,
      });
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    try {
      const data = await response.json();
      console.log('Webhook successful:', data);
      return data;
    } catch (e) {
      console.log('Webhook successful (no JSON response)');
      return { success: true };
    }
  } catch (error) {
    console.error('Raw error caught in sendToWebhook:', error);
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'object' && error !== null) {
      errorMessage = JSON.stringify(error);
    } else if (error) {
      errorMessage = String(error);
    }

    console.error('Error sending webhook:', {
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
      payload: JSON.stringify(payload, null, 2),
    });
    throw new Error(`Failed to send webhook: ${errorMessage}`);
  }
}

// Ejemplos de uso:
// Enviar notificación de nueva reserva
export async function notifyNewReservation(reservationData: any) {
  return sendToWebhook({
    event: 'reservation.created',
    data: reservationData,
    timestamp: new Date().toISOString(),
  });
}

// Enviar notificación de actualización de pedido
export async function notifyOrderUpdate(orderData: any) {
  return sendToWebhook({
    event: 'order.updated',
    data: orderData,
    timestamp: new Date().toISOString(),
  });
}

// Enviar solicitud para obtener las reservas de hoy
export async function getTodaysReservations() {
  return sendToWebhook({
    event: 'reservations.get_today',
    data: {},
    timestamp: new Date().toISOString(),
  });
}

// Enviar solicitud para obtener los pedidos de hoy
export async function getTodaysOrders() {
  return sendToWebhook({
    event: 'orders.get_today',
    data: {},
    timestamp: new Date().toISOString(),
  });
}

// Enviar solicitud para obtener el menú
export async function getMenu() {
  return sendToWebhook({
    event: 'menu.get',
    data: {},
    timestamp: new Date().toISOString(),
  });
}
