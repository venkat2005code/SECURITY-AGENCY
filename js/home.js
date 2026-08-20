document.addEventListener('DOMContentLoaded', () => {
  // --- Animated Statistics Counters ---
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const animateValue = (obj, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // ease out quad
      const easeOut = progress * (2 - progress);
      obj.innerHTML = Math.floor(easeOut * (end - start) + start) + (obj.dataset.target == 99 ? '%' : '+');
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        animateValue(entry.target, 0, target, 2000);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  statNumbers.forEach(stat => {
    statsObserver.observe(stat);
  });

  // --- Duplicate Testimonial Cards for Marquee ---
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    const cards = marqueeTrack.innerHTML;
    // Duplicate twice for seamless infinite scroll
    marqueeTrack.innerHTML += cards + cards;
  }
});
