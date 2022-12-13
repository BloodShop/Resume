// Animations
AOS.init({
  anchorPlacement: 'top-left',
  duration: 1000
});

// Scroll to specific values
// window.scrollTo or window.scroll
window.scroll({
  top: 1000,
  left: 0,
  behavior: 'smooth'
});

// Scroll certain amounts from current position
window.scrollBy({
  top: 250, // could be negative value
  left: 0,
  behavior: 'smooth'
});