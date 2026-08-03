import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const assetsDir = './public/assets';
const MAX_WIDTH = 1000;
const JPEG_QUALITY = 80;

const files = readdirSync(assetsDir).filter(f =>
    ['.jpg', '.jpeg', '.png', '.webp'].includes(extname(f).toLowerCase())
);

console.log(`🔍 Found ${files.length} image(s) to compress...\n`);

for (const file of files) {
    const inputPath = join(assetsDir, file);
    const sizeBefore = statSync(inputPath).size;

    await sharp(inputPath)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .jpeg({ quality: JPEG_QUALITY, progressive: true })
        .toFile(inputPath + '.tmp');

    const { rename, unlink } = await import('fs/promises');
    await unlink(inputPath);
    await rename(inputPath + '.tmp', inputPath);

    const sizeAfter = statSync(inputPath).size;
    const saved = (((sizeBefore - sizeAfter) / sizeBefore) * 100).toFixed(1);
    console.log(`✅ ${file}: ${(sizeBefore / 1024).toFixed(0)}KB → ${(sizeAfter / 1024).toFixed(0)}KB (hemat ${saved}%)`);
}

console.log('Kompres gambar selesai');
