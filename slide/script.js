$('body').vegas({
  overlay: true,
  transition: 'fade', 
  transitionDuration: 2000,
  delay: 2000,
  color: 'red',
  animation: 'random',
  animationDuration: 50000,
  slides: [
    { src: 'https://kurziokode.github.io/1.jpg', properties: { width: '100%', height: 'auto' }  },
    { src: 'https://kurziokode.github.io/7.jpg', properties: { width: '100%', height: 'auto' }  },
    { src: 'https://kurziokode.github.io/6.jpg', properties: { width: '100%', height: 'auto' } },
    { src: 'https://kurziokode.github.io/5.jpg', properties: { width: '100%', height: 'auto' }  },
    { src: 'https://kurziokode.github.io/4.png', properties: { width: '100%', height: 'auto' }  },
    { src: 'https://kurziokode.github.io/3.jpg', properties: { width: '100%', height: 'auto' }  },
    { src: 'https://kurziokode.github.io/11.jpg', properties: { width: '100%', height: 'auto' }  }
  ]
});
