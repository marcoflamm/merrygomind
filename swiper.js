//Initialize Swiper in Menu
const swiper1 = new Swiper('.swiper-container', {
  direction: 'vertical', // Vertical sliding
  loop: true,
  autoplay: {
    delay: 5000,
  },
  speed: 1000,
  disableOnInteraction: true,
  slidesPerView: 1, // Show one slide at a time
  spaceBetween: 0, // Space between slides, adjust as needed
  mousewheel: false, // Optional: enable mouse wheel control
  navigation: { // Enable navigation arrows
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

//Initialize Swiper on homepage
const swiper2 = new Swiper('.swiper', {
  slidesPerView: 3.2,
  spaceBetween: 40,
  slidesPerGroup: 1,
  navigation: {
    nextEl: '.swiper-home-button-next',
    prevEl: '.swiper-home-button-prev',
  },
  breakpoints: {
    1: {
      slidesPerView: 1.1,
      spaceBetween: 16
    },
    650: {
      slidesPerView: 2.2,
      spaceBetween: 40
    },
    991: {
      slidesPerView: 3.2,
      spaceBetween: 40
    }
  }
});
