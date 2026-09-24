const config = {
    type: Phaser.AUTO,
    width: 480,   // ความกว้าง Canvas (สไตล์เกม Pixel ซูมกำลังสวย)
    height: 270,  // ความสูง Canvas (สัดส่วน 16:9)
    pixelArt: true, // สำคัญมาก! บังคับให้Render แบบ Crisp Pixel Art (ไม่เบลอ)
    zoom: 2,      // ขยาย Canvas 2 เท่าเพื่อให้เห็นพิกเซลชัดเจนบนจอ HD
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // ไม่ใช้แรงโน้มถ่วงสำหรับ Top-down
            debug: false       // เปลี่ยนเป็น true ถ้าต้องการดูเส้นกรอบ Hitbox/Collision
        }
    },
    scene: [GameScene]
};

const game = new Phaser.Game(config);
