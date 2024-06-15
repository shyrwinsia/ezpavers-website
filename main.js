document.addEventListener('DOMContentLoaded', () => {

    setTimeout(() => {
        document.getElementById('header').classList.remove('hidden');
        document.getElementById('explainer').classList.remove('hidden');
        document.getElementById('cta').classList.remove('hidden');
    }, 600);

  const carousel = document.querySelector('.carousel');
  const images = document.querySelectorAll('.carousel img');

  let currentIndex = 0;
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID;

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

  // Drag functionality
  carousel.addEventListener('mousedown', startDrag);
  carousel.addEventListener('mouseup', endDrag);
  carousel.addEventListener('mouseleave', endDrag);
  carousel.addEventListener('mousemove', drag);
  carousel.addEventListener('touchstart', startDrag);
  carousel.addEventListener('touchend', endDrag);
  carousel.addEventListener('touchmove', drag);

  function startDrag(event) {
      isDragging = true;
      startPos = getPositionX(event);
      animationID = requestAnimationFrame(animation);
      carousel.classList.add('dragging');
  }

  function endDrag() {
      isDragging = false;
      cancelAnimationFrame(animationID);

      const movedBy = currentTranslate - prevTranslate;

      if (movedBy < -50 && currentIndex < images.length - 1) {
          currentIndex += 1;
      }

      if (movedBy > 50 && currentIndex > 0) {
          currentIndex -= 1;
      }

      setPositionByIndex();
      carousel.classList.remove('dragging');
  }

  function drag(event) {
      console.log(isDragging)
      if (isDragging) {
          const currentPosition = getPositionX(event);
          currentTranslate = prevTranslate + currentPosition - startPos;
      }
  }

  function getPositionX(event) {
      return event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
  }

  function animation() {
      setSliderPosition();
      if (isDragging) requestAnimationFrame(animation);
  }

  function setSliderPosition() {
      carousel.style.transform = `translateX(${currentTranslate}px)`;
  }

  function setPositionByIndex() {
      currentTranslate = currentIndex * -carousel.offsetWidth / 12;
      prevTranslate = currentTranslate;
      setSliderPosition();
  }
});
