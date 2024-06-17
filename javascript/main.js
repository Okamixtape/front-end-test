document.addEventListener('DOMContentLoaded', () => {
  // Example of JS code
  console.log('Page loaded and ready');

  let currentIndex = 0;
  const slides = document.querySelectorAll('.slider__slide');
  const buttons = document.querySelectorAll('.slider__lateralCounter__button');
  const totalSlides = slides.length;
  const autoPlayInterval = 5000; // 5 seconds
  let autoPlayTimer;

  // Set the background images for the slides
  slides.forEach((slide) => {
    const imageUrl = slide.getAttribute('data-image');
    slide.style.backgroundImage = `url(${imageUrl})`;
  });

  function updateActiveClass(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      buttons[i].style.opacity = i === index ? '1' : '0.3';
    });
  }

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
    });
    updateActiveClass(index);
    currentIndex = index;
  }

  function nextSlide() {
    let nextIndex = currentIndex + 1 < totalSlides ? currentIndex + 1 : 0;
    showSlide(nextIndex);
  }

  function prevSlide() {
    let prevIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : totalSlides - 1;
    showSlide(prevIndex);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(nextSlide, autoPlayInterval);
  }

  document.querySelector('.slider__navButton--right').addEventListener('click', () => {
    nextSlide();
    resetAutoPlay();
  });

  document.querySelector('.slider__navButton--left').addEventListener('click', () => {
    prevSlide();
    resetAutoPlay();
  });

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      showSlide(index);
      resetAutoPlay();
    });
  });

  // Autoplay
  autoPlayTimer = setInterval(nextSlide, autoPlayInterval);

  // Initialize the slider
  showSlide(currentIndex);

  function toggleDescription(id) {
    for (let i = 1; i <= 6; i++) {
      const desc = document.getElementById('desc' + i);
      if (i === id) {
        desc.style.visibility = desc.style.visibility === 'visible' ? 'hidden' : 'visible';
      } else {
        desc.style.visibility = 'hidden';
      }
    }
  }
  document.querySelectorAll('.timeline-icon').forEach((icon, index) => {
    icon.addEventListener('click', () => {
      toggleDescription(index + 1);
    });
  });
});
