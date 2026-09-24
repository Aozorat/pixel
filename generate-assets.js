// generate-assets.js
// สคริปต์สร้าง Pixel Art อัตโนมัติสำหรับทดสอบ Phase 1

function createBase64Image(width, height, drawCallback) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false; // คงความ Pixel ไม่ให้เบลอ
    drawCallback(ctx);
    return canvas.toDataURL('image/png');
}

// 1. สร้าง Spritesheet ตัวละคร (128x32 px) - มี 4 ทิศทาง (ทิศละ 32x32 px)
const playerCanvas = document.createElement('canvas');
playerCanvas.width = 128;
playerCanvas.height = 32;
const pCtx = playerCanvas.getContext('2d');
pCtx.imageSmoothingEnabled = false;

const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f']; // ตัวละคร 4 สีแทน 4 ทิศ
colors.forEach((color, i) => {
    // ตัวละคร
    pCtx.fillStyle = color;
    pCtx.fillRect(i * 32 + 8, 8, 16, 20); // ลำตัว
    pCtx.fillStyle = '#f39c12';
    pCtx.fillRect(i * 32 + 10, 4, 12, 10); // หัว
    // ตา
    pCtx.fillStyle = '#000000';
    pCtx.fillRect(i * 32 + 12, 8, 2, 2);
    pCtx.fillRect(i * 32 + 18, 8, 2, 2);
});

// 2. สร้าง Tileset (64x32 px) - มี หญ้า (32x32) และ สิ่งกีดขวาง/ก้อนหิน (32x32)
const tileCanvas = document.createElement('canvas');
tileCanvas.width = 64;
tileCanvas.height = 32;
const tCtx = tileCanvas.getContext('2d');
tCtx.imageSmoothingEnabled = false;

// Tile 1: หญ้า (เดินผ่านได้)
tCtx.fillStyle = '#58d68d';
tCtx.fillRect(0, 0, 32, 32);
tCtx.fillStyle = '#27ae60'; // จุดหญ้า
tCtx.fillRect(4, 4, 4, 4);
tCtx.fillRect(20, 10, 4, 4);
tCtx.fillRect(10, 22, 4, 4);

// Tile 2: ก้อนหิน/สิ่งกีดขวาง (Collision)
tCtx.fillStyle = '#58d68d'; // พื้นหลัง
tCtx.fillRect(32, 0, 32, 32);
tCtx.fillStyle = '#7f8c8d'; // ก้อนหิน
tCtx.fillRect(36, 4, 24, 24);
tCtx.fillStyle = '#95a5a6'; // แสงเงาหิน
tCtx.fillRect(38, 6, 20, 20);

// ส่งออก Base64 ไปยัง Phaser Memory
window.tempAssets = {
    player: playerCanvas.toDataURL(),
    tiles: tileCanvas.toDataURL()
};
