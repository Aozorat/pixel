class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // โหลดรูปภาพจาก Base64 Data ที่สร้างขึ้น
        this.textures.addBase64('player', window.tempAssets.player);
        this.textures.addBase64('tiles', window.tempAssets.tiles);
    }

    create() {
        // 1. สร้าง Tilemap จำลองขนาด 20x15 ช่อง (ช่องละ 32x32 px)
        const map = this.make.tilemap({ 
            tileWidth: 32, 
            tileHeight: 32, 
            width: 20, 
            height: 15 
        });
        
        const tileset = map.addTilesetImage('tiles', null, 32, 32);

        // Layer 0: พื้นหญ้าทั้งหมด (ใช้ Tile Index 0)
        const groundLayer = map.createBlankLayer('Ground', tileset);
        groundLayer.fill(0);

        // Layer 1: สิ่งกีดขวาง/ก้อนหิน ขอบๆ แมป (ใช้ Tile Index 1)
        const obstacleLayer = map.createBlankLayer('Obstacles', tileset);
        
        // วางหินล้อมรอบแมปเป็นกำแพง
        for (let x = 0; x < 20; x++) {
            obstacleLayer.putTileAt(1, x, 0);
            obstacleLayer.putTileAt(1, x, 14);
        }
        for (let y = 0; y < 15; y++) {
            obstacleLayer.putTileAt(1, 0, y);
            obstacleLayer.putTileAt(1, 19, y);
        }
        // วางหินไว้กลางแมป 1 ก้อนไว้ทดสอบการชน
        obstacleLayer.putTileAt(1, 10, 7);

        // ตั้งค่าการชนให้ก้อนหิน (Tile Index 1)
        obstacleLayer.setCollision(1);

        // 2. สร้าง Player
        this.player = this.physics.add.sprite(100, 100, 'player', 0);
        this.player.body.setSize(20, 20);
        this.player.body.setOffset(6, 12);
        this.player.setCollideWorldBounds(true);

        // ตั้งค่าให้ Player ชนกับสิ่งกีดขวาง
        this.physics.add.collider(this.player, obstacleLayer);

        // 3. สร้าง Animations
        this.createAnimations();

        // 4. ปุ่มควบคุม
        this.cursors = this.input.keyboard.createCursorKeys();

        // 5. กล้องติดตาม
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    }

    createAnimations() {
        // กำหนด Animation ตามเฟรมตัวละคร
        this.anims.create({
            key: 'walk-down',
            frames: [{ key: 'player', frame: 0 }],
            frameRate: 5
        });
        this.anims.create({
            key: 'walk-left',
            frames: [{ key: 'player', frame: 1 }],
            frameRate: 5
        });
        this.anims.create({
            key: 'walk-right',
            frames: [{ key: 'player', frame: 2 }],
            frameRate: 5
        });
        this.anims.create({
            key: 'walk-up',
            frames: [{ key: 'player', frame: 3 }],
            frameRate: 5
        });
    }

    update() {
        const speed = 120;
        this.player.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed);
            this.player.anims.play('walk-left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed);
            this.player.anims.play('walk-right', true);
        } else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-speed);
            this.player.anims.play('walk-up', true);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(speed);
            this.player.anims.play('walk-down', true);
        }
    }
}

