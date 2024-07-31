const imageGallery = document.querySelector('.image-gallery');

imageGallery.addEventListener('mousedown', (e) => {
    let isDown = false;
    let startX;
    let scrollLeft;

    imageGallery.classList.add('active');
    isDown = true;
    startX = e.pageX - imageGallery.offsetLeft;
    scrollLeft = imageGallery.scrollLeft;

    imageGallery.addEventListener('mouseleave', () => {
        isDown = false;
    });

    imageGallery.addEventListener('mouseup', () => {
        isDown = false;
    });

    imageGallery.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - imageGallery.offsetLeft;
        const walk = (x - startX) * 2; //scroll-fast
        imageGallery.scrollLeft = scrollLeft - walk;
    });
});
