import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    // Verificar el origen de la solicitud (puedes personalizar esto según tus necesidades de seguridad)
    const headersList = headers();
    const authHeader = headersList.get('authorization');
    
    // Aquí puedes agregar lógica de autenticación si es necesario
    // if (authHeader !== `Bearer ${process.env.WEBHOOK_SECRET}`) {
    //   return new NextResponse('Unauthorized', { status: 401 });
    // }

    const data = await request.json();
    console.log('Webhook recibido:', data);
    
    // Aquí puedes procesar los datos del webhook
    // Por ejemplo, guardar en una base de datos o actualizar el estado de la aplicación
    
    return NextResponse.json({ success: true, message: 'Webhook recibido correctamente' });
  } catch (error) {
    console.error('Error procesando webhook:', error);
    return NextResponse.json(
      { success: false, message: 'Error al procesar el webhook' },
      { status: 500 }
    );
  }
}
