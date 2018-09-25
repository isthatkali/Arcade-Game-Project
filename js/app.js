// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // x pos
    // y pos

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
        this.x = 0;
        this.y = 0;
        // Character image property
        this.sprite = 'images/char-boy.png';
    }
    // Methods
    // update() to update position on gameboard        
        // check if play and enemy collided
        // check if player won
    render() {
        // draws player on gameboard based on x and y coordinates; copied from Enemy render function
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // handleInput() to translate arrow key strokes to character movement on game board
    handleInput(keyup) {
        switch(keyup) {
            // left (x)
            case 37: this.x -= 10;
                break;
            // up (y)
            case 38: this.y += 10;
                break;
            // right (x)
            case 39: this.x += 10;
                break;
            // down (y)
            case 40: this.y -= 10;
                break;
        }
    }
    // resetPos() to reset player to starting position
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// new Player object
const player = new Player();

// allEnemies array
let allEnemies = [];
    // for loop to create new enemy objects and push them into array


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