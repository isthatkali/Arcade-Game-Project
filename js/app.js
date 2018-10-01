let win = false; // need another condition or else alert will pop up endlessly

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // if enemy hasn't reached gameboard boundary
        // move forward
        // multiply movement by dt parameter
    // else
        // reset position
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
        // Position coordinate properties
        this.x = 200;
        this.y = 400;
        // Character image property
        this.sprite = 'images/char-horn-girl.png';
    }
    // Methods
    // update() to update position on gameboard        
        // check if player and enemy collided (need to check positions of objects in allEnemies array)
        // check if player won
    update() {
        for (let enemy of allEnemies) {
            if (this.y < (enemy.y + 10) && 
            this.y > (enemy.y -10) && 
            this.x < (enemy.x + 20) && 
            this.x > (enemy.x - 20)) {
                // reset position after collision
                this.resetPos();
            } else if (!win && this.y === -25) {
                this.win();
            }
        }
    }
    win() {
        // when player wins, positions will be reset and alert will be displayed
        win = true;

        for (let enemy of allEnemies) {
            enemy.speed = 0;
            enemy.x = 0;
        }
        setTimeout(() => {
            alert("ya did it!");
        }, 500);

        this.resetPos();
    }
    render() {
        // draws player on gameboard based on x and y coordinates; copied from provided Enemy render function above
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // handleInput() to translate arrow key strokes to character movement on game board
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
    // resetPos() to reset player to starting position
    resetPos() {
        this.x = 200;
        this.y = 400;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// new Enemy objects
const enemy1 = new Enemy(0, 60, 300);
const enemy2 = new Enemy(0, 145, 200);
const enemy3 = new Enemy(0, 225, 100);
const enemy4 = new Enemy(0, 315, 150);

// allEnemies array to store all enemies
let allEnemies = [];
// could use for loop to create new random enemy objects and push them into array?
allEnemies.push(enemy1, enemy2, enemy3, enemy4);

// new Player object
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
