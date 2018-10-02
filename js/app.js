'use strict'; // Recommended by Udacity reviewer to help made code error-free
let win = false; // Another condition to check for or else alert will pop up endlessly

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x < 400) {
        this.x += (this.speed*dt);
    } 
    else {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.resetPos(); // Recommended by Udacity reviewer
        this.sprite = 'images/char-horn-girl.png';
    }
    update() {
        for (let enemy of allEnemies) {
            if (this.y < (enemy.y + 10) && 
            this.y > (enemy.y -10) && 
            this.x < (enemy.x + 60) && 
            this.x > (enemy.x - 60)) {
                this.resetPos();
            } else if (!win && this.y === -25) {
                this.win();
            }
        }
    }
    win() {
        win = true;
        setTimeout(() => {
            alert("ya did it!");
        }, 500);
        this.resetPos();
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(keypress) {
        switch(keypress) {
            case 'left': 
                if (this.x > 0) {
                    this.x -= 100;
                }
                break;
            case 'up': 
                if (this.y > 0) {
                    this.y -= 85;
                }
                break;
            case 'right': 
                if (this.x < 400) {
                    this.x += 100;
                }
                break;
            case 'down': 
                if (this.y < 400) {
                    this.y += 85;
                }
                break;
        }
    }
    resetPos() {
        this.x = 200;
        this.y = 400;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const enemy1 = new Enemy(0, 60, 300);
const enemy2 = new Enemy(0, 145, 200);
const enemy3 = new Enemy(0, 225, 100);
const enemy4 = new Enemy(0, 315, 150);

let allEnemies = [];
// could use for loop to create new random enemy objects and push them into array?
allEnemies.push(enemy1, enemy2, enemy3, enemy4);

const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
