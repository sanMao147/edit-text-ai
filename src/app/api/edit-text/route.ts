import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File | null;
    const editType = formData.get('editType') as string;
    const paramsStr = formData.get('params') as string;

    if (!image) {
      return NextResponse.json(
        { success: false, error: 'No image provided' },
        { status: 400 },
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(image.type)) {
      return NextResponse.json(
        { success: false, error: 'Unsupported file format' },
        { status: 400 },
      );
    }

    // Simulate processing delay
    await new Promise((resolve) =>
      setTimeout(resolve, 1500 + Math.random() * 2000),
    );

    // Parse params
    const params = paramsStr ? JSON.parse(paramsStr) : {};

    // Convert image to base64 (mock result = same image)
    const buffer = Buffer.from(await image.arrayBuffer());
    const base64 = `data:${image.type};base64,${buffer.toString('base64')}`;

    return NextResponse.json({
      success: true,
      editedImageBase64: base64,
      metadata: {
        editType,
        params,
        processedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Edit text error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    );
  }
}
