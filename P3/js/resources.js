/**
 * @file resources.js
 * @fileoverview This is a simple an image loading utility. It eases the process of loading
 * image files so that they can be used within your game. It also includes
 * a simple "caching" layer so it will reuse cached images if you attempt
 * to load the same image multiple times.
 * @author Udacity, Inc.
 */

/**
 * @class Resources This is a simple an image loading utility.
 * @name Resources
 * @description This is a simple an image loading utility. It eases the process of loading
 * image files so that they can be used within your game. It also includes
 * a simple "caching" layer so it will reuse cached images if you attempt
 * to load the same image multiple times.
 */
(function() {
    /**
     * @lends Resources
     */
     /**
      * @var resourceCache
      * @description A dictionary matching urls with accociated items
      * of type Image
      */
    var resourceCache = {};

     /**
      * @var audioCache
      * @description A dictionary matching urls with accociated items
      * of type Audio
      */
    var audioCache = {};

    var loading = [];

    /**
      * @var readyCallbacks
      * @description An array of functions to be called when the calling window
      * calls its onReady method.
      * of type Image
      */
    var readyCallbacks = [];

    /**
     * @function load
     * @description This is the publicly accessible image loading function. It accepts
     * either an array of strings pointing to image files or a string for a single
     * image. It will then call our private image loading function accordingly.
     * @param {string or string[]} urlOrArr Either a string or an array of strings representing
     * url of files to cache.
     */
    function load(urlOrArr) {
        if(urlOrArr instanceof Array) {
            /* If the developer passed in an array of images
             * loop through each value and call our image
             * loader on that image file
             */
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        } else {
            /* The developer did not pass an array to this function,
             * assume the value is a string and call our image loader
             * directly.
             */
            _load(urlOrArr);
        }
    }

    /**
     * @function loadaudio
     * @description This is the publicly accessible audio loading function. It accepts
     * either an array of strings pointing to audio files or a string for a single
     * audio. It will then call our private audio loading function accordingly.
     * @param {string or string[]} urlOrArr Either a string or an array of strings representing
     * url of files to cache.
     */
    function loadaudio(urlOrArr) {
        if(urlOrArr instanceof Array) {
            /* If the developer passed in an array of images
             * loop through each value and call our image
             * loader on that image file
             */
            urlOrArr.forEach(function(url) {
                _loadaudio(url);
            });
        } else {
            /* The developer did not pass an array to this function,
             * assume the value is a string and call our image loader
             * directly.
             */
            _loadaudio(urlOrArr);
        }
    }

    /**
     * @function _load
     * @description This is our private image loader function, it is
     * called by the public image loader function. If this URL has been
     * previously loaded it will exist within
     * our resourceCache array. Just return that image rather
     * re-loading the image.
     * @param {string or string[]} url Either a single url or an array of urls.
     * @see resourceCache
     */
    function _load(url) {
        if(resourceCache[url]) {
            /* If this URL has been previously loaded it will exist within
             * our resourceCache array. Just return that image rather
             * re-loading the image.
             */
            return resourceCache[url];
        } else {
            /* This URL has not been previously loaded and is not present
             * within our cache; we'll need to load this image.
             */
            var img = new Image();
            img.onload = function() {
                /* Once our image has properly loaded, add it to our cache
                 * so that we can simply return this image if the developer
                 * attempts to load this file in the future.
                 */
                resourceCache[url] = img;

                /* Once the image is actually loaded and properly cached,
                 * call all of the onReady() callbacks we have defined.
                 */
                if(isEverythingReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };

            /* Set the initial cache value to false, this will change when
             * the image's onload event handler is called. Finally, point
             * the images src attribute to the passed in URL.
             */
            resourceCache[url] = false;
            img.src = url;
        }
    }

    /**
     * @function _loadaudio
     * @description This is our private audio loader function, it is
     * called by the public audio loader function. If this URL has been
     * previously loaded it will exist within
     * our audioCache array. Just return that image rather
     * re-loading the image.
     * @param {string or string[]} url Either a single url or an array of urls.
     * @see audioCache
     */
    function _loadaudio(url) {
        if(audioCache[url]) {
            /* If this URL has been previously loaded it will exist within
             * our resourceCache array. Just return that image rather
             * re-loading the image.
             */
             console.log("audio already loaded");
            return audioCache[url];
        } else {
            /* This URL has not been previously loaded and is not present
             * within our cache; we'll need to load this image.
             */
            console.log("creating audio object");
            var aud = new Audio(url);
            aud.onloadeddata = function() {
                console.log("audio objects onload function was called");
                /* Once our image has properly loaded, add it to our cache
                 * so that we can simply return this image if the developer
                 * attempts to load this file in the future.
                 */
                audioCache[url] = aud;

                /* Once the image is actually loaded and properly cached,
                 * call all of the onReady() callbacks we have defined.
                 */
                if(isEverythingReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };

            /* Set the initial cache value to false, this will change when
             * the image's onload event handler is called. Finally, point
             * the images src attribute to the passed in URL.
             */
            audioCache[url] = false;
            aud.src = url;
        }
    }

    /**
     * @function get
     * @description This is used by developer's to grab references to images they know
     * have been previously loaded. If an image is cached, this functions
     * the same as calling load() on that URL.
     * @param {string} url URL used as a key to look up a cached image.
     * @returns {Image} The requested Image object.
     */
    function get(url) {
        return resourceCache[url];
    }

    /**
     * @function getaudio
     * @description This is used by developer's to grab references to audio they know
     * have been previously loaded. If an audio is cached, this functions
     * the same as calling load() on that URL.
     * @param {string} url URL used as a key to look up a cached audio.
     * @returns {Image} The requested Audio object.
     */
    function getaudio(url) {
        console.log("performing getaudio for " + url);
        console.log("will return " + audioCache[url]);
        return audioCache[url];
    }

    /**
     * @function isReady
     * @description This function determines if all of the images that have been requested
     * for loading have in fact been completed loading.
     * @returns {bool} <b>true</b> if all requested images have been loaded, otherwise <b>false</b>.
     */
    function isReady() {
        var ready = true;
        for(var k in resourceCache) {
            if(resourceCache.hasOwnProperty(k) &&
               !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

        /**
     * @function isAudioReady
     * @description This function determines if all of the audio that has been requested
     * for loading have in fact been completed loading.
     * @returns {bool} <b>true</b> if all requested audio has been loaded, otherwise <b>false</b>.
     */
    function isAudioReady() {
        var ready = true;
        for(var k in audioCache) {
            if(audioCache.hasOwnProperty(k) &&
               !audioCache[k]) {
                ready = false;
            }
        }
        console.log("isAudioReady returning " + ready);
        return ready;
    }

    function isEverythingReady() {
        return isReady() && isAudioReady();
    }

    /**
     * @function onReady
     * @description This function will add a function to the callback stack that is called
     * when all requested images are properly loaded.
     * @param {function} func A function to add to the readyCallbacks stack.
     */
    function onReady(func) {
        readyCallbacks.push(func);
    }

    /* This object defines the publicly accessible functions available to
     * developers by creating a global Resources object.
     */
    window.Resources = {
        load: load,
        loadaudio: loadaudio,
        get: get,
        getaudio: getaudio,
        onReady: onReady,
        isReady: isEverythingReady
    };
})();
