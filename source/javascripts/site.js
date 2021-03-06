import constants from './constants';
import lazyImages from './lazyimages';

// Wrap console log to show arrow functions work
const log = (text) => {
    console.info(text);
};


// We have the possibility to have environment specific config
if (ENV_DEVELOPMENT) {
    log(constants.DEV);
} else if (ENV_PRODUCTION) {
    log(constants.PROD);
}

// Lazyload background
window.onload = () => {
    let images = [].slice.call(document.querySelectorAll('[lazy-bg]'));
    images.forEach(element => {
        lazyImages.init(element);
    });
};

