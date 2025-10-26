import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const dirPath = path.join(process.cwd(), 'public', 'materi');

        // Pastikan folder ada
        if (!fs.existsSync(dirPath)) {
            return NextResponse.json(
                { success: false, message: 'Folder materi tidak ditemukan.' },
                { status: 404 }
            );
        }

        // Ambil semua folder (nama guru)
        const entries = fs.readdirSync(dirPath, { withFileTypes: true });
        const folders: string[] = entries
            .filter(entry => entry.isDirectory())
            .map(folder => folder.name);

        return NextResponse.json({ success: true, gurus: folders });
    } catch (error) {
        console.error('Error membaca folder guru:', error);
        return NextResponse.json(
            { success: false, message: 'Gagal membaca folder guru.' },
            { status: 500 }
        );
    }
}
