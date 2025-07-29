/**
 * RNA Cartography Landing Page - Simple Animation
 * Title slides down from top, tagline slides up from bottom, button fades in
 */

class RNACartographyAnimation {
  constructor() {
    this.prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.buttonEl = document.getElementById('cta');
    
    this.init();
  }

  init() {
    if (this.prefersReduced) {
      // Show everything immediately for reduced motion users
      document.body.classList.add('animate-in');
      return;
    }

    // Start animation after a brief delay to ensure page is loaded
    setTimeout(() => {
      document.body.classList.add('animate-in');
    }, 100);

    // Setup button click handler
    this.buttonEl.addEventListener('click', () => {
      window.location.href = 'https://cryosagar.openemage.org/talks/2025-09-14-WE-Heraeus';
    });
  }
}

// Initialize the animation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new RNACartographyAnimation();
});
