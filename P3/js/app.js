/**
 * @file app.js
 * @fileoverview Defines classes and functions called during gameplay.
 * @author Gregory Colin
 * @version 1.0,5 - 31DEC2014 Correct naming convention for constants.<br>
 * @version 1.0.4 - 30DEC2014 Cleanup for completion.<br>
 * @version 1.0.3 - 17DEC2014 Add score. Add changeable character.<br>
 * @version 1.0.2 - 11DEC2014 Rewrite comments as JSDoc-formatted <br>
 * @version 1.0.1 - 10DEC2014 Incorporate OO principles<br>
 * @version 1.0.0 - 08DEC2014 Initial release<br>
 */

/**
 * @class Used for character positioning within game tiles.
 * @description Character bounding boxes within game tiles. Everything within the game
 * is set within a transparent tile which is larger than the object. These rectangles
 * are used to hold the bounding boxes for the actual game object.
 * @param {int} x - The left bound
 * @param {int} y - The top bound
 * @param {int} w - The width
 * @param {int} h - The height
 */
var GameRectangle = function(x, y, w, h) {
    /** 
     * @member {int}
     * @description The X offset between the character's tile and the bounding rectangle within it.
     */
    this.x = x;
    /** 
     * @member {int}
     * @description The Y offset between the character's tile and the bounding rectangle within it.
     */
    this.y = y;
    /** 
     * @member {int}
     * @description The width of the character's bounding rectangle.
     */
    this.w = w;
    /** 
     * @member {int}
     * @description The height of the character's bounding rectangle.
     */
    this.h = h;
}

/**
 * @class A superclass for every object in the game
 * @description GameCharacter is a superclass for every object in the game,
 * encapsulating variables and behaviors common to all.
 * @param {string} strname - The characters can have names. Can be used
 * for debug logging or gameplay.
 * @param {int} x - The character tile's initial X position
 * @param {int} y - The character tile's initial Y position
 */
var GameCharacter = function(strname, x, y) {
    /** 
     * @public
     * @member {string}
     * @description Character's "name", for logging and/or gameplay purposes.
     */
    this.name = strname;
    /** 
     * @public
     * @member {int}
     * @description The character's current X location on the canvas.
     */
    this.x = x;
    /**
     * @public
     * @member {int}
     * @description The character's Y location on the canvas
     */
    this.y = y;
    /**
     * @public
     * @member {GameRectangle}
     * @description A rectangle distinguishing the actual position of it's bitmap
     * as opposed to the game tile that contains it.
     * @see GameRectangle
     */
    this.boundingRect = new GameRectangle(0, 0, 0, 0);
    /**
     * @public
     * @member {string}
     * @description The path to an image used to represent the character onscreen.
     */
    this.sprite = "";
}

/**
 * @method setLocation
 * @description Sets a new X/Y position on the canvas for the current character
 * @param {int} x - New X position for character
 * @param {int} y - New Y position for character
 */
GameCharacter.prototype.setLocation = function(x, y) {
    this.x = x;
    this.y = y;
}

/**
 * @method setCharacterBounds
 * @description Sets the X/Y/W/H parameters of a bounding box within a game tile
 * @param {int} x - Set character bounding box X offset from containing tile
 * @param {int} y - Set character bounding box Y offset from containing tile
 * @param {int} w - Set character bounding box width
 * @param {int} h - Set character bounding box height
 */
GameCharacter.prototype.setCharacterBounds = function(x, y, w, h) {
    this.boundingRect.x = x;
    this.boundingRect.y = y;
    this.boundingRect.w = w;
    this.boundingRect.h = h;
}

/**
 * @method setSprite
 * @description Sets the path to an image .png file. Relative pathing is
 * used in this game.
 * @param {string} strpath - Path to image png
 */
GameCharacter.prototype.setSprite = function(strpath) {
    console.log(this.name + " setting sprite to " + strpath)
    this.sprite = strpath;
}

/**
 * @method hasCollidedWith
 * @type Bool
 * @description Determines if the current character has collided with another,
 * given as a parameter. The bounding boxes within the character tiles are
 * checked to see if they overlap.
 * @param {GameCharacter} objcharacter
 * @returns {Bool} indicating whether of not the character this has collided with objcharacter
 */
GameCharacter.prototype.hasCollidedWith = function(objcharacter) {
    // Precalculate everything, to make it easier to reason about the values and allow
    // for later, more interesting collision detection
    var top1 = this.boundingRect.y;
    var bottom1 = top1 + this.boundingRect.h;
    var left1 = this.boundingRect.x;
    var right1 = left1 + this.boundingRect.w;
    var top2 = objcharacter.boundingRect.y;
    var bottom2 = top2 + objcharacter.boundingRect.h;
    var left2 = objcharacter.boundingRect.x;
    var right2 = left2 + objcharacter.boundingRect.w; 

    if (left1 < right2 && right1 > left2 && top1 < bottom2 && bottom1 > top2) {
            return true;
    }
    return false;    
}

/**
 * @method render
 * @description Draw the character tile on the canvas. The character bounding
 * box is drawn as well if the global variable showBoundingRects is set to true.
 */
GameCharacter.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (showBoundingRects) {
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 1;
        ctx.rect(this.boundingRect.x, this.boundingRect.y, this.boundingRect.w, this.boundingRect.h);
        ctx.stroke();
    }
}

/**
 * @class The player character within the game.
 * @extends GameCharacter
 * @see GameCharacter
 * @description Prizes that can be collected by the player to gain points.
 * @param {string} strname - The player's name for logging or gameplay use.
 * @borrows GameCharacter#boundingRect as this.boundingRect
 * @borrows GameCharacter#name as this.name
 * @borrows GameCharacter#sprite as this.sprite
 * @borrows GameCharacter#x as this.x
 * @borrows GameCharacter#y as this.y
 * @borrows GameCharacter#render as this.render
 * @borrows GameCharacter#setCharacterBounds as this.setCharacterBounds
 * @borrows GameCharacter#setLocation as this.setLocation
 * @borrows GameCharacter#setSprite as this.setSprite
 * @borrows GameCharacter#hasCollidedWith as this.hasCollidedWith
 */
var Prize = function(strname, row, col, num) {
    GameCharacter.call(this, strname, col * BOX_WIDTH, row * BOX_HEIGHT - 10);
    this.setCharacterBounds(this.x + 0,
        this.y + 60,
        BOX_WIDTH,
        BOX_HEIGHT);
    /**
     * @member {int}
     * @description Contains the point value of this prize.
     */
    this.value = (num + 1) * 100;
    this.isVisible = true;
    this.setSprite(PRIZE_URLS[num]);
}
Prize.prototype = Object.create(GameCharacter.prototype);
Prize.prototype.constructor = Prize;

/**
 * @method render
 * @description Overrides GameCharacter.render to only draw if this prize
 * has not already been collected by player.
 * @see GameCharacter#render
 */
Prize.prototype.render = function() {
    if (this.isVisible) {
        GameCharacter.prototype.render.call(this);
    }
}

/**
 * @class Enemy characters within the game.
 * @extends GameCharacter
 * @see GameCharacter
 * @description Enemy characters within the game. All enemies are the same in this game.
 * Enemies are created at random locations on the screen  and move at random speeds withing
 * a range to add a little variety.
 * @param {dtring} strname - The name of the character for debug logging or gameplay use.
 * @borrows GameCharacter#boundingRect as this.boundingRect
 * @borrows GameCharacter#name as this.name
 * @borrows GameCharacter#sprite as this.sprite
 * @borrows GameCharacter#x as this.x
 * @borrows GameCharacter#y as this.y
 * @borrows GameCharacter#render as this.render
 * @borrows GameCharacter#setCharacterBounds as this.setCharacterBounds
 * @borrows GameCharacter#setLocation as this.setLocation
 * @borrows GameCharacter#setSprite as this.setSprite
 * @borrows GameCharacter#hasCollidedWith as this.hasCollidedWith
 */
var Enemy = function(strname) {
    GameCharacter.call(this, strname, randRange(0,4) * BOX_WIDTH, randRange(1, 3) * BOX_HEIGHT - ENEMY_DRAW_Y_OFFSET);
    /** 
     * @member {int}
     * @description The speed at which the current enemy moves expressed as multiples of
     * the Engine's loop interval.
     */
    this.speed = randRange(ENEMY_SPEED_LOW, ENEMY_SPEED_HIGH);
    this.setCharacterBounds(this.x + ENEMY_BOUND_LEFT_OFFSET,
        this.y + ENEMY_BOUND_TOP_OFFSET,
        ENEMY_BOUND_WIDTH,
        ENEMY_BOUND_HEIGHT);
    this.setSprite("images/enemy-bug.png");
}

Enemy.prototype = Object.create(GameCharacter.prototype);

Enemy.prototype.constructor = Enemy;

/**
 * @method update
 * @description Update enemy parameters for each iteration of the Engine's main loop.
 * Movement is multiplied by the floating point parameter dt (set in the engine), to
 * ensure that the game operates at the same speed for all players. Characters do not
 * move when the global variable showBoundingRects is set to true. Values are updated
 * for both the character tile and the character bounding box within it. When the enemy
 * moves offscreen to the right, its row is reset randomly and then it re-enters on
 * the left side.
 * <p>
 * Enemy characters do not move if they are bumping the rear end of another enemy.
 * @param {float} dt - Movement multiplier for speed equalization.
 * @see isBumpingAnyOther
 */
Enemy.prototype.update = function(dt) {
    if (!showBoundingRects) {
        if (!this.isBumpingAnyOther()) {
            this.setLocation(this.x + this.speed * dt, this.y);
        }
        if (this.isOffscreenX(this.x)) {
            this.x = 0;
            this.row = randRange(1, 3);
            this.y = this.row * BOX_HEIGHT - ENEMY_DRAW_Y_OFFSET;
            this.speed = randRange(ENEMY_SPEED_LOW, ENEMY_SPEED_HIGH);
        }
        this.boundingRect.x = this.x + ENEMY_BOUND_LEFT_OFFSET;
        this.boundingRect.y = this.y + ENEMY_BOUND_TOP_OFFSET;
    }
}

/**
 * @method isOffscreenX
 * @description Determine if an enemy is offscreen in the X dimension. An enemy is offscreen
 * when it is centered on the rightmost tile.
 * @param {int} x The X position of the character tile.
 * @returns {bool} True if the X position of the enemy tile places is off the canvas. Otherwise false.
 */
Enemy.prototype.isOffscreenX = function(x) {
    if ((x < 0) || (x > BOX_WIDTH * (BOARD_WIDTH_BOXES -1))) {
        return true;
    }
    return false;
}

/**
 * @method isBumpingBehind
 * @description Returns true if the current enemy has collided with another (enemy can only
 * collide in the X axis).
 * @param {Enemy} otherenemy An enemy with which we are testing collision.
 * @returns {bool} True if collision occured, otherwise false.
 */
Enemy.prototype.isBumpingBehind = function(otherenemy) {
    if (this.hasCollidedWith(otherenemy) && (this.boundingRect.x < otherenemy.boundingRect.x)) {
        return true;
    }
    return false;
}

/**
 * @method isBumpingAnyOther
 * @description Returns true if the current enemy has collided with any other enemy.
 * @returns {bool} True if a collision has occurred, otherwise false.
 * @see isBumpingBehind
 */
Enemy.prototype.isBumpingAnyOther = function() {
    for (var i = 0; i < numEnemy; i++) {
        if (this.name != allEnemies[i].name) {
            if (this.isBumpingBehind(allEnemies[i])) {
                return true;
            }
        }
    }
    return false;
}

/**
 * @class The player character within the game.
 * @extends GameCharacter
 * @see GameCharacter
 * @description The player character within the game. The player is always shown in the same
 * starting spot each time (s)he is created.
 * @param {string} strname - The player's name for logging or gameplay use.
 * @borrows GameCharacter#boundingRect as this.boundingRect
 * @borrows GameCharacter#name as this.name
 * @borrows GameCharacter#sprite as this.sprite
 * @borrows GameCharacter#x as this.x
 * @borrows GameCharacter#y as this.y
 * @borrows GameCharacter#render as this.render
 * @borrows GameCharacter#setCharacterBounds as this.setCharacterBounds
 * @borrows GameCharacter#setLocation as this.setLocation
 * @borrows GameCharacter#setSprite as this.setSprite
 * @borrows GameCharacter#hasCollidedWith as this.hasCollidedWith
 */
var Player = function(strname) {
    GameCharacter.call(this, strname, BOX_WIDTH * 2, BOX_HEIGHT * 5 - 10);
    this.setCharacterBounds(this.x + PLAYER_BOUND_LEFT_OFFSET,
        this.y + PLAYER_BOUND_TOP_OFFSET,
        PLAYER_BOUND_WIDTH,
        PLAYER_BOUND_HEIGHT);
    this.setSprite(CHARACTER_URLS[characterNumber]);
}

Player.prototype = Object.create(GameCharacter.prototype);

Player.prototype.constructor = Player;

/**
 * @method update
 * @description Update player parameters for each iteration of the Engine's main loop.
 * Movement is multiplied by the floating point parameter dt (set in the engine), to
 * ensure that the game operates at the same speed for all players. Characters do not
 * move when the global variable showBoundingRects is set to true. Values are updated
 * for both the character tile and the character bounding box within it. <b>NOTE: Player
 * only moves in increments of box size (NOT tile size) in this game and those moves
 * are made in handleInput(). Only the character bounding boxes are updated in this
 * method.</b><p>
 * If the player attempts to go offscreen in the up direction, <b>and</b> has collected
 * all of the prizes on the current level, activity is frozen to prevent play while
 * changing levels, and a countdown is set for timer ticks until the level changes.
 * @see countdown
 * @see frozen
 * @see pauseBackgroundAudio
 * @param {float} dt - Movement multiplier for speed equalization
 */
Player.prototype.update = function(dt) {
    this.boundingRect.x = this.x + PLAYER_BOUND_LEFT_OFFSET;
    this.boundingRect.y = this.y + PLAYER_BOUND_TOP_OFFSET;
    if (this.y <= 0 && !frozen) {
        if (this.hasAllPrizes()) {
            frozen = true;
            pauseBackgroundAudio();
            playNewLevelSound();
            countdown = 5;
        }
    }
}

Player.prototype.hasAllPrizes = function() {
    var _numvisible = 0;
    for (var i = 0; i < numPrizes; i++) {
        if (allPrizes[i].isVisible) {
            _numvisible = _numvisible + 1;
        }
    }
    return _numvisible == 0;
}

/**
 * @method handleInput
 * @description Keypresses accepted by the application are handled to
 * move the player up, down, left, or right. Tests for and prohibits
 * out-of-bounds moves.
 * @param {string} inkey - String corresponding to the keycode for the key pressed.
 */
Player.prototype.handleInput = function(inkey) {
    console.log("valid keypress");
    var snd = Resources.getaudio(AUDIO_URLS[1]);
    snd.mediaGroup = "game";
    if (!frozen) {
        switch (inkey) {
            case 'left':
                if (this.x > 0) {
                    this.x = this.x - 101;
                    snd.currentTime = 0;
                    snd.play();
                }
                break;
            case 'up':
                if (this.y > 0) {
                    this.y = this.y - BOX_HEIGHT;
                    snd.currentTime = 0;
                    snd.play();
                }
            break;
            case 'right':
                if (this.x < 404) {
                    this.x = this.x + 101;
                    snd.currentTime = 0;
                    snd.play();
                }
                break;
            case 'down':
                if (this.y < 404) {
                    this.y = this.y + BOX_HEIGHT;
                    snd.currentTime = 0;
                    snd.play();
                }
                break;
            case 'a' :
                toggleAudio();
                break;
            case 'b' :
                if (showBoundingRects) {
                    showBoundingRects = false;
                } else {
                    showBoundingRects = true;
                }
                break;
            case 'c' :
                this.switchCharacter();
                break;
            default:
                console.log("Key pressed: " + inkey);
            break;
        }
    } else {
        console.log("key while frozen");
    }
}

/**
 * @method switchCharacter
 * @description Switch to the next possible character bitmap, selected from
 * an array of URLs.
 * @see CHARACTER_URLS
 * @see characterNumber
 */
Player.prototype.switchCharacter = function() {
    characterNumber++;
    if (characterNumber > MAX_CHAR_NUM) {
        characterNumber = 0;
    }
    this.setSprite(CHARACTER_URLS[characterNumber]);
}

/**
 * @function tickTimer
 * @description This timer gets called approximately every timerInterval seconds. Along with
 * countdown (which is only counting down at a level completion) to create a pause between
 * levels and count levels upward. Also tests for winning the game, and sets frozen (to
 * disable player character movement) and status accordingly.
 * @see timerInterval
 * @see countdown
 * @see level
 */
function tickTimer() {
    console.log("timer tick. countdown = " + countdown + " - frozen = " + frozen);
    if (countdown != 0) {
        countdown = countdown - 1;
        if (countdown == 0) {
            if (audioon) {
                startBackgroundAudio();
            }
            var _visibleprizes = 0;
            for (var i = 0; i < numPrizes; i++) {
                if (allPrizes[i].isVisible) {
                    _visiblePrizes = _visible_prizes + 1;
                }
            }
            if (level == 0) {
                level = level + 1;
            } else {
                if (_visibleprizes == 0) {
                    level = level + 1;
                    if (level == 4) {
                        frozen = true;
                        status = statusEnum.won;
                    }
                }
            }
            if (status == statusEnum.playing) {
                console.log("********** Calling for game reset");
                resetGame();
            }
        }
    }
}

/**
 * @function updateTimer
 * @param {float} dx The interval, in seconds, of the time it took for the
 * engine's main loop to perform the most recent requestAnimationFrame. 
 * @description timerInterval (a value in seconds) is ticked down by the
 * given parameter, and calls tickTimer every ~timerInterval seconds.
 * value is used to tick down timerInterval.
 * @see Engine
 * @see tickTimer
 * @see timerInterval
 */
function updateTimer(dx) {
    timer = timer - dx;
    if (timer <= 0) {
        tickTimer();
        timer = timerInterval;
    }
}

/**
 * @function randRange
 * @description Generate a random integer within a range given by the parameters. Used
 * to generate a new row for enemy characters after they've move offscreen.
 * @see Enemy#update
 * @param {int} min - The lowest possible value
 * @param {int} max - The highest possible value
 */
function randRange(min, max) {
    return Math.floor(Math.random() * (max-min + 1) + min);
}

/**
 * @function resetGame
 * @description Dispose player and all enemies, and recreate them, restarting the game.
 */
function resetGame() {
    console.log("******************************** game reset");
    if (level == 0) {
        numEnemy = 1;
        numPrizes = 0;
    } else if (level == 1) {
        numEnemy = 1;
        numPrizes = 1;
    } else {
        numEnemy = level;
        numPrizes = level;
    }
    allEnemies = [];
    allPrizes = [];
    player = null;
    for (var i = 0; i < numEnemy; i++) {
        var enemy = new Enemy("enemy" + i);
        allEnemies.push(enemy);
    }
    for (var j = 0; j < numPrizes; j++) {
        var prize = new Prize("prize" + j, randRange(1, 3), randRange(0, 4), j);
        allPrizes.push(prize);
    }
    player = new Player("player");
    frozen = false;
    countdown = 0;
}

/**
 * @function collisionDetectReact
 * @description Determine if any enemy has collided with the player, and reset the game if so.
 */
function collisionDetectReact() {
    for (var i = 0; i < numEnemy; i++) {
        if (allEnemies[i].hasCollidedWith(player)) {
            playCollisionSound();
            lives = lives - 1;
            if (lives != 0) {
                resetGame();
            } else {
                frozen = true;
                status = statusEnum.lost;
            }
        }
    }
    for (var j = 0; j < numPrizes; j++) {
        if (allPrizes[j].isVisible) {
            if (allPrizes[j].hasCollidedWith(player)) {
                playGetPrizeSound();
                score = score + allPrizes[j].value;
                allPrizes[j].isVisible = false;
            }
        }
    }
}

/**
 * @function playNewLevelSound
 * @description Play the sound for transition between levels.
 */
function playNewLevelSound() {
    var snd = Resources.getaudio(AUDIO_URLS[4]);
    snd.mediaGroup = "game";
    snd.currentTime = 0;
    snd.play();
}

/**
 * @function playGetPrizeSound
 * @description Play the prize collection sound.
 */
function playGetPrizeSound() {
    var snd = Resources.getaudio(AUDIO_URLS[3]);
    snd.mediaGroup = "game";
    snd.currentTime = 0;
    snd.play();
}

/**
 * @function playCollisionSound
 * @description Play player/enemy collision sound.
 */
function playCollisionSound() {
    var snd = Resources.getaudio(AUDIO_URLS[2]);
    snd.mediaGroup = "game";
    snd.currentTime = 0;
    snd.play();
}

/**
 * @function pauseBackgroundAudio
 * @description Turns off the background audio.
 * @see audioon
 * @see toggleAudio
 * @see playBackgroundAudio
 */
function pauseBackgroundAudio() {
    console.log("BG Audio paused");
    var backgroundAudio = Resources.getaudio(AUDIO_URLS[0]);
    backgroundAudio.pause();
}

/**
 * @function startBackgroundAudio
 * @description Turns on the background audio.
 * @see audioon
 * @see toggleAudio
 * @see pauseBackgroundAudio
 */
function startBackgroundAudio() {
    var backgroundAudio = Resources.getaudio(AUDIO_URLS[0]);
    backgroundAudio.mediaGroup = "game";
    backgroundAudio.loop = true;
    backgroundAudio.play();
}

/**
 * @function toggleAudio
 * @description Toggles background music on/off. Called by button in the container.
 * @see audioon
 * @see pauseBackgroundAudio
 * @see startBackgroundAudio
 */
function toggleAudio() {
    if (audioon) {
        pauseBackgroundAudio();
        audioon = false;
    } else {
        startBackgroundAudio();
        audioon = true;
    }
}

/**
 * @function userReset
 * @description Game reset called by the container. Clear everything but the background
 * audio preference anc character, and restart the game.
 */
function userReset() {
    level = 0;
    score = 0;
    countdown = 0;
    frozen = false;
    status = statusEnum.playing;
    resetGame();
}

/**
 * @constant {int} TILE_HEIGHT
 * @description The high of a full tile on the game canvas.
 */
var TILE_HEIGHT = 171;

/**
 * @constant {int} TILE_WIDTH
 * @description The high of a full tile on the game canvas.
 */
var TILE_WIDTH = 101;

/**
 * @constant {int} BOX_WIDTH
 * @description The width of a game row - equals TILE_WIDTH.
 * @see TILE_WIDTH
 */
var BOX_WIDTH = TILE_WIDTH;

/**
 * @constant {int} BOX_HEIGHT
 * @description The height of a game row, as distinct from a tile height.
 */
var BOX_HEIGHT = 83;

/**
 * @constant {int} ENEMY_WIDTH
 * @description The width of an enemy tile. For this game, same as TILE_WIDTH
 * @see TILE_WIDTH
 */
var ENEMY_WIDTH = TILE_WIDTH;

/**
 * @constant {int} ENEMY_HEIGHT
 * @description The height of an enemy tile. For this game, same as TILE_HEIGHT
 * @see TILE_HEIGHT
 */
var ENEMY_HEIGHT = TILE_HEIGHT;

/**
 * @constant {int} ENEMY_DRAW_Y_OFFSET
 * @description Used to correctly position the enemy tile to improve appearance.
 */
var ENEMY_DRAW_Y_OFFSET = 18;

/**
 * @constant {int} PLAYER_WIDTH
 * @description The width of an player tile. For this game, same as TILE_WIDTH
 * @see TILE_WIDTH
 */
var PLAYER_WIDTH = TILE_WIDTH;

/**
 * @constant {int} PLAYER_HEIGHT
 * @description The width of an player tile. For this game, same as TILE_WIDTH
 * @see TILE_HEIGHT
 */
var PLAYER_HEIGHT = TILE_HEIGHT;

/**
 * @constant {int} BOARD_WIDTH_BOXES
 * @description The width of the board, as a multiple of TILE_WIDTH
 * @see TILE_WIDTH
 */
var BOARD_WIDTH_BOXES = 5;

/**
 * @constant {int} ENEMY_SPEED_LOW
 * @description The low end of the random range within which enemies move
 * @see Enemy#speed
 */
var ENEMY_SPEED_LOW = 150;

/**
 * @constant {int} ENEMY_SPEED_HIGH
 * @description The high end of the random range within which enemies move
 * @see Enemy#speed
 */
var ENEMY_SPEED_HIGH = 200;

/**
 * @constant {int} ENEMY_BOUND_TOP_OFFSET
 * @type {int}
 * @description The number of pixels between the top of the tile and the top of
 * the enemy's bounding rectangle
 * @see GameRectangle
 * @see GameCharacter#boundingRect
 */
var ENEMY_BOUND_TOP_OFFSET = 77;

/**
 * @constant {int} ENEMY_BOUND_BOTTOM_OFFSET
 * @type {int}
 * @description The number of pixels between the bottom of the tile and the bottom of
 * the enemy's bounding rectangle
 * @see GameRectangle
 * @see GameCharacter#boundingRect
 */
var ENEMY_BOUND_BOTTOM_OFFSET = 29;

/**
 * @constant {int} ENEMY_BOUND_LEFT_OFFSET
 * @type {int}
 * @description The number of pixels between the left side of the tile and the left side of
 * the enemy's bounding rectangle
 * @see GameRectangle
 * @see GameCharacter#boundingRect
 */
var ENEMY_BOUND_LEFT_OFFSET = 1;

/**
 * @constant {int} ENEMY_BOUND_RIGHT_OFFSET
 * @type {int}
 * @description The number of pixels between the right side of the tile and the right side of
 * the enemy's bounding rectangle
 * @see GameRectangle
 * @see GameCharacter#boundingRect
 */
var ENEMY_BOUND_RIGHT_OFFSET = 1;

/**
 * @constant {int} ENEMY_BOUND_WIDTH
 * @type {int}
 * @description The width of the enemy's bounding rectangle in case its needed for something.
 * @see GameRectangle
 * @see GameCharacter#boundingRect
 */
var ENEMY_BOUND_WIDTH = ENEMY_WIDTH - ENEMY_BOUND_LEFT_OFFSET - ENEMY_BOUND_RIGHT_OFFSET;

/**
 * @constant {int} ENEMY_BOUND_HEIGHT
 * @type {int}
 * @description The height of the enemy's bounding rectangle in case its needed for something.
 * @see GameRectangle
 * @see GameCharacter#boundingRect
 */
var ENEMY_BOUND_HEIGHT = ENEMY_HEIGHT - ENEMY_BOUND_TOP_OFFSET - ENEMY_BOUND_BOTTOM_OFFSET;

/**
 * @constant {int} PLAYER_BOUND_TOP_OFFSET
 * @type {int}
 * @description The number of pixels between the top of the tile and the top of
 * the player's bounding rectangle
 * @see GameRectangle
 * @see GameCharacter#boundingRect
 */
var PLAYER_BOUND_TOP_OFFSET = 65;

/**
 * @constant {int} PLAYER_BOUND_BOTTOM_OFFSET
 * @type {int}
 * @description The number of pixels between the bottom of the tile and the bottom of
 * the player's bounding rectangle
 * @see GameRectangle
 * @see GameCharacter#boundingRect
 */
var PLAYER_BOUND_BOTTOM_OFFSET = 31;

/**
 * @constant {int} PLAYER_BOUND_LEFT_OFFSET
 * @type {int}
 * @description The number of pixels between the left side of the tile and the left side of
 * the player's bounding rectangle
 * @see GameRectangle
 * @see GameCharacter#boundingRect
 */
var PLAYER_BOUND_LEFT_OFFSET = 17;

/**
 * @constant {int} PLAYER_BOUND_TOP_OFFSET
 * @type {int}
 * @description The number of pixels between the right side of the tile and the right side of
 * the player's bounding rectangle
 * @see GameRectangle
 * @see GameCharacter#boundingRect
 */
var PLAYER_BOUND_RIGHT_OFFSET = 16;

/**
 * @constant {int} PLAYER_BOUND_HEIGHT
 * @type {int}
 * @description The width of the player's bounding rectangle in case its needed for something.
 * @see GameRectangle
 * @see GameCharacter#boundingRect
 */
var PLAYER_BOUND_HEIGHT = PLAYER_HEIGHT - PLAYER_BOUND_TOP_OFFSET - PLAYER_BOUND_BOTTOM_OFFSET;

/**
 * @constant {int} PLAYER_BOUND_WIDTH
 * @type {int}
 * @description The width of the player's bounding rectangle in case its needed for something.
 * @see GameRectangle
 * @see GameCharacter#boundingRect
 */
var PLAYER_BOUND_WIDTH = PLAYER_WIDTH - PLAYER_BOUND_LEFT_OFFSET - PLAYER_BOUND_RIGHT_OFFSET;

/**
 * @constant {int} PRIZE_DRAW_Y_OFFSET
 * @description Used to correctly position the enemy tile to improve appearance.
 */
var PRIZE_DRAW_Y_OFFSET = 18;

/**
 * @var {bool} showBoundingRects
 * @type {bool}
 * @description For debugging, keep play frozen and show character bounding rectangles.
 * @see GameRectangle
 * @see GameCharacter#boundingRect
 */
var showBoundingRects = false;

/**
 * @constant {int} numEnemy
 * @type {int}
 * @description An array containing all of the enemy character objects. Used in
 * resetGame to create the requisite number of enemy.
 * @see resetGame
 */
var numEnemy;
// var numEnemy = 1; // change commenting for simplified game

var numPrizes;

/**
 * @var {int} score
 * @description The player's current score in the game.
 */
var score = 0;

/**
 * @var {int} level
 * @description The player's current level in the game.
 */
var level = 0;

/**
 * @const {int} timerInterval
 * @description Length, in seconds, of a timer to kick off or count down timed actions.
 */
var timerInterval = 1; // seconds

/**
 * @const {float} timer
 * @description Length, in seconds, of the remaining portion of the current timer interval.
 */
var timer = 0;

/**
 * @var {bool} frozen
 * @description Whether or not the game is frozen. The game freezes momentarily at level
 change.
 */
var frozen = false;

/**
 * @var {int} countdown
 * @description One-second interval countdown used for level change or game over
 change.
 */
var countdown;

/**
 * @var {int} lives
 * @description Number of replays before the game is lost.
 change.
 */
var lives = 5;

/**
 * @var {bool} audioon
 * @type {bool}
 * @description The user's background audio preference.
 */
var audioon = true;

statusEnum = {
    playing : 0,
    won : 1,
    lost : 2
}

/**
 * @var status
 * @type {int}
 * @description The current status of gameplay.
 */
var status = statusEnum.playing;

/**
 * @var {int} characterNumber
 * @description The index of the current character's bitmap.
 */
var characterNumber = 0;

/**
 * @constant MAX_CHAR_NUM
 * @type {int}
 * @description The highest poasible index in the array of character URLs.
 */
var MAX_CHAR_NUM = 3;

/**
 * @constant {string[]} CHARACTER_URLS
 * @description An array of relative URLs used to change the current character.
 * during gameplay.
 */
var CHARACTER_URLS = [
    "images/char-boy.png",
    "images/char-cat-girl.png",
    "images/char-horn-girl.png",
    "images/char-pink-girl.png",
];

/**
 * @constant {string[]} PRIZE_URLS
 * @description An array of relative URLs used to set the prize bitmaps.
 */
var PRIZE_URLS = [
    "images/Gem-Blue.png",
    "images/Gem-Green.png",
    "images/Gem-Orange.png"
];

/**
 * @constant {string[]} AUDIO_URLS
 * @description An array of relative URLs used to get sounds for gameplay.
 */
var AUDIO_URLS = [
    "audio/background.mp3",
    "audio/jump.mp3",
    "audio/collision.mp3",
    "audio/getprize.mp3",
    "audio/leveldone.mp3",
    "audio/losegame.mp3"
];

/**
 * @var allEnemies[]
 * @type {Enemy[]}
 * @description An array containing all of the enemy character objects.
 * @see numEnemy
 * @see Enemy
 */
var allEnemies = [];

var allPrizes = [];

/**
 * @var player
 * @type {Player}
 * @description Define the player character. <b>NOTE: The initial player is never used
 * since we immediately reset the game. Still, there must be a player character here or the
 * Engine will malfunction.</b>
 * @see resetGame
 * @see Player
 * @see Player#switchCharacter
 */
var player = new Player();

console.log("***** GAME START *****");
resetGame();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'a',
        66: 'b',
        67: 'c'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
