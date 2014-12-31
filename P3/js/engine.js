/**
 * @file engine.js
 * @fileoverview This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 * <P>
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 * <P>
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 * @author Udacity, Inc.
 */

/**
 * @class Provides the game loop functionality.
 * @description The Engine class provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 */
var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    
    /**
     * @var doc
     * @description The current global document element.
     */
    var doc = global.document;

    /**
     * @var parent
     * @description The current global document element.
     */
    var parent = doc.getElementById('maincontent');
    console.log("parent = " + parent);

    /**
     * @var win
     * @description the current window
     */
    var win = global.window;

    /**
     * @var canvas
     * @description the current window
     */
    var canvas = doc.createElement('canvas');

    /**
     * @var ctx
     * @description The 2d drawing context of the current canvas.
     */
    var ctx = canvas.getContext('2d');

    /**
     * @var lastTime
     * @description The most recent time that the global Engine object
     * executed its animation loop. Used in the Player and Enemy objects'
     * update() methods
     * @see Enemy#update
     * @see Player#update
     */
    var lastTime;

    canvas.width = 505;
    canvas.height = 606;
    //doc.body.appendChild(canvas);
    parent.appendChild(canvas);

    /**
     * @function main
     * @description The main loop of the game engine. This function serves as
     * the kickoff point for the game loop itself and handles properly calling
     * the update and render methods.
     * <p>
     * The loop sets a variable to the length of time between calls to
     * win.requestAnimation frame. This value is later passed to each
     * GameCharacter object's update method.
     * @see Player#update
     * @see Enemy#update
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        /**
         * @instance now
         * @description Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now();

        var dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    };

    /**
     * @function init
     * @description This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        startBackgroundAudio();
        //resetGame();
        main();
    }

    /**
     * @function update
     * @param {float} dt window.requestAnimationFrame interval on the current machine, in seconds.
     * @description This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     * <p>
     * Collision detection is done right after all the entities update.
     * @see collisionDetectReact
     */
    function update(dt) {
        updateEntities(dt);
        updateTimer(dt);
        collisionDetectReact();
    }

    /**
     * @function updateEntities
     * @param {float} dt window.requestAnimationFrame interval on the current machine, in seconds.
     * @description This is called by the update function  and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to  the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    /**
     * @function render
     * @description This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
        renderEntities();
        if (status == statusEnum.playing) {
            renderScore();
        }
    }

    /**
     * @function renderEntities
     * @description This function is called by the render function and is called on each game
     * tick. It's purpose is to redraw the background and score, then call the render
     * functions you have defined on your character entities within app.js
     * @see GameCharacter#render
     * @see Enemy#render
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        if (status == statusEnum.playing) {
            allPrizes.forEach(function(prize) {
                prize.render();
            });

            allEnemies.forEach(function(enemy) {
                enemy.render();
            });

            player.render();
        } else if (status == statusEnum.won) {
            renderWinPoster();
        } else {
            renderLosePoster();
        }
    }

    function renderLosePoster() {
        ctx.drawImage(Resources.get("images/losegame.png"), 51, 110);
    }

    function renderWinPoster() {
        ctx.drawImage(Resources.get("images/wingame.png"), 101, 166);
    }

    function renderScore() {
        var _scoretext = "Score: " + score;
        var _leveltext = "Level: " + level;
        var _livestext = "Lives: " + lives;
        ctx.font = "20pt Impact";
        ctx.textAlign = "left";
        ctx.fillStyle = "yellow";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.fillText(_scoretext, 10, canvas.height - 30);
        ctx.strokeText(_scoretext, 10, canvas.height - 30);
        ctx.fillText(_livestext, 210, canvas.height - 30);
        ctx.strokeText(_livestext, 210, canvas.height - 30);
        ctx.fillText(_leveltext, 410, canvas.height - 30);
        ctx.strokeText(_leveltext, 410, canvas.height - 30);
    }

    /**
     * @function reset
     * @description This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        // noop
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/Gem-Blue.png',
        'images/Gem-Green.png',
        'images/Gem-Orange.png',
        'images/wingame.png',
        'images/losegame.png'
    ]);
    console.log("loading audio??");
    Resources.loadaudio([
        'audio/background.mp3',
        'audio/jump.mp3',
        'audio/collision.mp3',
        'audio/getprize.mp3',
        'audio/leveldone.mp3',
        'audio/losegame.mp3'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developer's can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
