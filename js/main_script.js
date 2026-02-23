let mainslide = new Swiper(".wrap__bg", {
  loop: true,
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },

  navigation: {
    nextEl: "#nextBtn",
    prevEl: "#prevBtn",
  },
});