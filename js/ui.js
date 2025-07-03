// ✨ ui.js - UI logic for Narii

// ===== 🎬 Custom Slideshow functionality =====
// Handles the testimonial slider autoplay and hover pause
const slider = document.getElementById('custom-slider');
const slides = slider.querySelectorAll('.custom-slide');
let current = 0;
let interval = null;

function showSlide(idx) {
	slides.forEach((slide, i) => {
		slide.classList.toggle('active', i === idx);
		slide.style.opacity = i === idx ? '1' : '0';
		slide.style.zIndex = i === idx ? '2' : '1';
	});
	current = idx;
}

function nextSlide() {
	let idx = (current + 1) % slides.length;
	showSlide(idx);
}

function startAutoPlay() {
	interval = setInterval(nextSlide, 4000);
}

function stopAutoPlay() {
	clearInterval(interval);
}

slider.addEventListener('mouseenter', stopAutoPlay);
slider.addEventListener('mouseleave', startAutoPlay);

// Init slider
showSlide(0);
startAutoPlay();

// ===== 🎯 Enhanced GUI Animation =====
// Animates the GUI image on page load
// (fade in and slide from right)
document.addEventListener('DOMContentLoaded', function() {
	const gui = document.querySelector('.gui');
	if (gui) {
		gui.style.opacity = '0';
		gui.style.transform = 'rotate(0.5deg) scale(1.15, 1.15) translateX(50px)';
		setTimeout(() => {
			gui.style.transition = 'opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
			gui.style.opacity = '1';
			gui.style.transform = 'rotate(0.5deg) scale(1.15, 1.15) translateX(0)';
			setTimeout(() => {
				gui.style.transition = 'transform 0.3s ease';
			}, 1200);
		}, 200);
	}
});

// ===== 🌟 Animated member count script =====
// Handles the animated member counter with glow effect
(function() {
  const minStart = 1200;
  const minIncrease = 1;
  const maxIncrease = 7;
  const intervalMin = 2000; // ms
  const intervalMax = 5000; // ms
  const storageKey = 'narii-member-count';
  let last = parseInt(localStorage.getItem(storageKey), 10);
  if (isNaN(last) || last < minStart) last = minStart;
  let next = last + Math.floor(Math.random() * (maxIncrease - minIncrease + 1)) + minIncrease;
  localStorage.setItem(storageKey, next);
  let current = last;
  const el = document.getElementById('member-count');
  // Add a CSS class for glow effect
  const glowClass = 'member-glow';
  if (!document.getElementById('member-glow-style')) {
    const style = document.createElement('style');
    style.id = 'member-glow-style';
    style.textContent = `
      .${glowClass} {
        text-shadow: 0 0 12px #4ec404, 0 0 24px #4ec404;
        color: #fff !important;
        transition: text-shadow 0.3s, color 0.3s;
      }
    `;
    document.head.appendChild(style);
  }
  // Animate up to the new value, digit by digit
  function animateTo(target, duration = 900) {
    const start = current;
    const startTime = performance.now();
    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(start + (target - start) * progress);
      el.textContent = value;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
        el.classList.add(glowClass);
        setTimeout(() => el.classList.remove(glowClass), 400);
      }
      current = value;
    }
    requestAnimationFrame(tick);
  }
  animateTo(next);
  // Keep increasing every 2-5 seconds
  function keepIncreasing() {
    let inc = Math.floor(Math.random() * (maxIncrease - minIncrease + 1)) + minIncrease;
    let target = current + inc;
    localStorage.setItem(storageKey, target);
    animateTo(target);
    setTimeout(keepIncreasing, Math.floor(Math.random() * (intervalMax - intervalMin + 1)) + intervalMin);
  }
  setTimeout(keepIncreasing, Math.floor(Math.random() * (intervalMax - intervalMin + 1)) + intervalMin);
})();

// ===== 🚫 Prevent dragging images and SVGs =====
// Sets draggable=false and blocks dragstart for all images and SVGs
document.addEventListener('DOMContentLoaded', function() {
	document.querySelectorAll('img, svg').forEach(el => {
		el.setAttribute('draggable', 'false');
		el.addEventListener('dragstart', function(e) { e.preventDefault(); });
	});
}); 