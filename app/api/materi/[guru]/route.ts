import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Tipe parameter route dinamis Next.js
interface Params {
    params: { guru: string };
}

export async function GET(_req: Request, { params }: Params) {
    const { guru } = params;

    try {
        const dirPath = path.join(process.cwd(), 'public', 'materi', guru);

        if (!fs.existsSync(dirPath)) {
            return NextResponse.json(
                { success: false, message: 'Guru tidak ditemukan.' },
                { status: 404 }
            );
        }

        const files = fs.readdirSync(dirPath);
        const fileList = files.map(file => ({
            name: file,
            url: `/materi/${guru}/${file}`,
        }));

        return NextResponse.json({ success: true, files: fileList });
    } catch (error) {
        console.error('Error membaca file materi:', error);
        return NextResponse.json(
            { success: false, message: 'Gagal membaca file materi guru.' },
            { status: 500 }
        );
    }
}
