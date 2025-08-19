import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Asegura que sea dinámico

export async function POST(request: Request) {
  try {
    // Verificar el origen de la solicitud (puedes personalizar esto según tus necesidades de seguridad)
    const authHeader = request.headers.get('authorization');
    
    // Aquí puedes agregar lógica de autenticación si es necesario
    // if (authHeader !== `Bearer ${process.env.WEBHOOK_SECRET}`) {
    //   return new NextResponse('Unauthorized', { status: 401 });
    // }

    const data = await request.json();
    
    // Aquí puedes procesar los datos del webhook
    // Por ejemplo, guardar en una base de datos o actualizar el estado de la aplicación
    
    return NextResponse.json({ 
      success: true, 
      message: 'Webhook recibido correctamente',
      data: data
    });
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
