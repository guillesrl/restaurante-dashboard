import { type NextRequest, NextResponse } from 'next/server';

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'https://n8n.guille.live/webhook/ccb11e02-0eeb-4818-ba9b-35652979e31d';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { message: 'Error from n8n webhook', details: errorText },
        { status: response.status }
      );
    }

    const responseText = await response.text();
    try {
      const data = JSON.parse(responseText);
      return NextResponse.json(data, { status: 200 });
    } catch (e) {
      // If n8n returns a non-JSON response (e.g., just "workflow executed"), handle it gracefully.
      return NextResponse.json({ success: true, message: 'Webhook received by n8n', response: responseText }, { status: 200 });
    }

  } catch (error) {
    let errorMessage = 'Unknown error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { message: 'Failed to proxy webhook', error: errorMessage },
      { status: 500 }
    );
  }
}
