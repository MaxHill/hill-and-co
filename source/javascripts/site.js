import constants from './constants';

// Wrap console log to show arrow functions work
let log = (text) => {
    console.info(text);
};

// We have the possibility to have environment specific config
if (ENV_DEVELOPMENT) {
    log(constants.DEV);
} else if (ENV_PRODUCTION) {
    log(constants.PROD);
}

// Lazyload background
window.onload = function() {
    document.querySelectorAll('[lazy-bg]').forEach(element => {
        lazyImage(element);
    });
};

function lazyImage(element) {
    var img = new Image();
    img.onload = function() {
        change_image();
    }
    img.src = element.getAttribute('lazy-bg');

    function change_image() {
        console.log(img.src, 'Image is loaded');
        element.setAttribute("style", "background: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75)) , url('" + img.src + "');");
    }
}
