//Iniciando a Cena

class cena01 extends Phaser.Scene {
    constructor() {
        super('cena01');
    }


    preload() {

        //Precarregando as imagens

        this.load.image('fundo02', 'assets/fundo02.png');
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('blast', 'assets/haduken.png', { frameWidth: 30, frameHeight: 25 });
        this.load.spritesheet('blastL', 'assets/hadukene.png', { frameWidth: 30, frameHeight: 25 });
    

    }

    create(){

        //Defininfo os limites do jogo para estruturar a colisão com os 'World Bounds' depois.

        this.physics.world.setBounds(0, 0, 1200, 605);       
        
        //Adicionando as imagens, fundo, personagem e seu poder.

        this.add.image(525, 300, 'fundo02');

        this.player = this.physics.add.sprite(500, 605, 'player').setScale(2);

        this.blast = this.physics.add.sprite(this.player.x, this.player.y - 40, 'blast').setVisible(false).setScale(2);

        this.player.setCollideWorldBounds(true);
        
        //Retira o efeito da gravidade do poder, para que ele nao caia ao ser usado

        this.blast.body.setAllowGravity(false);

        //Atribuindo as teclas a serem usadas

        this.cursors = this.input.keyboard.createCursorKeys();
        this.teclaC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        
        //Definnindo as animações do poder e do jogador

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'frente',
            frames: [ { key: 'player', frame: 2 } ],
            frameRate: 20
        });    

        this.anims.create({
            key: 'rightblast',
            frames: this.anims.generateFrameNumbers('blast', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'leftblast',
            frames: this.anims.generateFrameNumbers('blastL', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'rightblastmove',
            frames: this.anims.generateFrameNumbers('player', { frame: 8 }),
            frameRate: 10,
            repeat: 0
        });
    }
 
      
        update(){

            //Movimentação do personagem + seus sprites

        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);
    
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);
    
            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);
    
            this.player.anims.play('frente');
        }

        //Definindo mecanica do poder

        if (this.teclaC.isDown && this.cursors.right.isDown){
            this.blast.setPosition(this.player.x, this.player.y).setVisible(true).anims.play('rightblast', true);
            this.blast.setVelocityX(200);    
        }

        if (this.teclaC.isDown && this.cursors.left.isDown){
            this.blast.setPosition(this.player.x, this.player.y).setVisible(true).anims.play('leftblast', true);
            this.blast.setVelocityX(-200);    
        }
    }
}