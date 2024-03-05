class Welcome extends Phaser.Scene {
    constructor() {
        super('welcome');
    }

    preload() {
        this.load.image('fundo01', 'assets/fundoentrada.png');
    }

    create() {
        this.add.image(525, 312, 'fundo01').setScale(1.1);

        let inputZone = this.add.zone(400, 300, 400, 100)
        .setOrigin(0) 
        .setInteractive();

        inputZone.on('pointerdown', (pointer) => {
            this.scene.start('cena01');
        });
    }
}