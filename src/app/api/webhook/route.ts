import { NextResponse } from 'next/server';

// Configuración del webhook
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Segundos máximos de ejecución

export async function POST(request: Request) {
  try {
    // Verificar el método de la solicitud
    if (request.method !== 'POST') {
      return new NextResponse('Method not allowed', { status: 405 });
    }

    // Obtener la IP del remitente para registro
    const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Verificar el tipo de contenido
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return new NextResponse('Content-Type must be application/json', { status: 400 });
    }

    // Procesar el cuerpo de la solicitud
    let data;
    try {
      data = await request.json();
    } catch (error) {
      return new NextResponse('Invalid JSON payload', { status: 400 });
    }

    // Validar los datos recibidos (ejemplo básico)
    if (!data || typeof data !== 'object') {
      return new NextResponse('Invalid data format', { status: 400 });
    }

    // Registrar la recepción del webhook (en producción, usa un sistema de logging)
    console.log(`[${new Date().toISOString()}] Webhook recibido desde ${clientIp}`, {
      headers: Object.fromEntries(request.headers.entries()),
      body: data
    });

    // Aquí puedes procesar los datos del webhook según tu lógica de negocio
    // Por ejemplo, guardar en una base de datos o actualizar el estado de la aplicación
    
    // Ejemplo de respuesta exitosa para n8n
    return NextResponse.json({ 
      success: true, 
      message: 'Webhook procesado correctamente',
      receivedAt: new Date().toISOString(),
      data: data
    }, { status: 200 });
  } catch (error) {
    console.error('Error procesando webhook:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error al procesar el webhook',
        error: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
