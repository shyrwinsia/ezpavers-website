document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  const images = document.querySelectorAll('.carousel img');

  let currentIndex = 0;

  function updateCarousel() {
    const totalImages = images.length;
    currentIndex = (currentIndex + 1) % totalImages;

    if (currentIndex + 5 <= totalImages) {
      carousel.style.transform = `translateX(${-currentIndex * (100 / 12)}%)`;
    } else {
      // This part ensures the carousel loops smoothly
      carousel.style.transition = 'none';
      carousel.style.transform = 'translateX(0)';
      setTimeout(() => {
        carousel.style.transition = 'transform 20s linear';
        currentIndex = 0;
        carousel.style.transform = `translateX(${-currentIndex * (100 / 12)}%)`;
      }, 20); // setTimeout to remove transition temporarily and reset
    }
  }

  setInterval(updateCarousel, 20000); // Move the images every 20 seconds

  // Initial display
  updateCarousel();
});
