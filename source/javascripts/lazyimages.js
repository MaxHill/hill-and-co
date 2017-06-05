export default {
    init(element) {
        let img = new Image();
        const src = element.getAttribute('lazy-bg');

        img.onload = () => {
            this.changeImage(element, src);
        }
        img.src = src;
    },
    changeImage(element, src) {
        element.setAttribute(
            "style",
            "background: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75)) , url('" + src + "');"
        );
    }
}
