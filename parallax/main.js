import Lenis from '@studio-freight/lenis';
import SplitType from 'split-type';

const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);
let speed = 100;

/*  SCENE 1 */
let scene1 = gsap.timeline();
ScrollTrigger.create({
  animation: scene1,
  trigger: ".scrollElement",
  start: "top top",
  end: "45% 100%",
  scrub: 1.5,
});

// animate text & UI overlay
// Setup custom cursor
try {
  const cursor = document.querySelector('.cursor');
  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
    });

    const interactiveElements = document.querySelectorAll('a, button, .glass-btn');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover-effect'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover-effect'));
    });
  }
} catch(e) {
  console.error("Cursor error:", e);
}

// Setup Animated Typography with SplitType
// (Removed hero title per user request)



// hills animation
scene1.to(
  "#h1-1",
  { y: 3 * speed, x: 1 * speed, scale: 0.9, ease: "power2.inOut" },
  0
);
scene1.to("#h1-2", { y: 2.6 * speed, x: -0.6 * speed, ease: "power2.inOut" }, 0);
scene1.to("#h1-3", { y: 1.7 * speed, x: 1.2 * speed }, 0.03);
scene1.to("#h1-4", { y: 3 * speed, x: 1 * speed }, 0.03);
scene1.to("#h1-5", { y: 2 * speed, x: 1 * speed }, 0.03);
scene1.to("#h1-6", { y: 2.3 * speed, x: -2.5 * speed }, 0);
scene1.to("#h1-7", { y: 5 * speed, x: 1.6 * speed }, 0);
scene1.to("#h1-8", { y: 3.5 * speed, x: 0.2 * speed }, 0);
scene1.to("#h1-9", { y: 3.5 * speed, x: -0.2 * speed }, 0);


/*   Bird   */
gsap.fromTo(
  "#bird",
  { opacity: 1 },
  {
    y: -250,
    x: 800,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: ".scrollElement",
      start: "15% top",
      end: "60% 100%",
      scrub: 2,
    },
  }
);

/* Clouds  */
let clouds = gsap.timeline();
ScrollTrigger.create({
  animation: clouds,
  trigger: ".scrollElement",
  start: "top top",
  end: "70% 100%",
  scrub: 1.5,
});

clouds.to("#cloud1", { x: 500 }, 0);
clouds.to("#cloud2", { x: 1000 }, 0);
clouds.to("#cloud3", { x: -1000 }, 0);
clouds.to("#cloud4", { x: -700, y: 25 }, 0);

/* Sun motion Animation  */
let sun = gsap.timeline();
ScrollTrigger.create({
  animation: sun,
  trigger: ".scrollElement",
  start: "top top",
  end: "2200 100%",
  scrub: 1.5,
});

// Set initial Daylight state for ALL gradient stops to avoid harsh orange rings
gsap.set("#sun", { attr: { "stop-color": "#ffffff" } });
gsap.set("#bg_grad stop:nth-child(2)", { attr: { "stop-color": "#ffffff" } });
gsap.set("#bg_grad stop:nth-child(3)", { attr: { "stop-color": "#c1e1ff" } });
gsap.set("#bg_grad stop:nth-child(4)", { attr: { "stop-color": "#89c6ff" } });
gsap.set("#bg_grad stop:nth-child(5)", { attr: { "stop-color": "#63afff" } });
gsap.set("#bg_grad stop:nth-child(6)", { attr: { "stop-color": "#4a90e2" } });

// Programmatically set mountains to daytime colors for high performance (avoids laggy CSS filters)
const originalStops = [];
for (let i = 1; i <= 9; i++) {
  const stops = document.querySelectorAll(`#grad${i} stop`);
  const lightness = 70 - (i * 6); // Distance-based atmospheric perspective
  const daytimeColor = `hsl(210, 40%, ${lightness}%)`;
  
  stops.forEach((stop) => {
    originalStops.push({ el: stop, color: stop.getAttribute("stop-color") });
    gsap.set(stop, { attr: { "stop-color": daytimeColor } });
  });
}

//sun motion
sun.to("#bg_grad", { attr: { cy: "330" } }, 0.0);

//bg change (smooth transition from daylight blue to sunset orange)
sun.to("#sun", { attr: { offset: "0.15", "stop-color": "#F5C54E" } }, 0.0);
sun.to("#bg_grad stop:nth-child(2)", { attr: { offset: "0.15", "stop-color": "#FFDBA6" } }, 0.0);
sun.to("#bg_grad stop:nth-child(3)", { attr: { offset: "0.18", "stop-color": "#F7BB93" } }, 0.0);
sun.to("#bg_grad stop:nth-child(4)", { attr: { offset: "0.25", "stop-color": "#F2995E" } }, 0.0);
sun.to("#bg_grad stop:nth-child(5)", { attr: { offset: "0.46", "stop-color": "#f07560" } }, 0.0);
sun.to("#bg_grad stop:nth-child(6)", { attr: { "stop-color": "#FF9171" } }, 0);

// Animate mountains back to original sunset colors individually (extremely fast, no lag!)
originalStops.forEach((item) => {
  sun.to(item.el, { attr: { "stop-color": item.color } }, 0);
});

/*   SCENE 2  */
let scene2 = gsap.timeline();
ScrollTrigger.create({
  animation: scene2,
  trigger: ".scrollElement",
  start: "15% top",
  end: "40% 100%",
  scrub: 1.5,
});

scene2.fromTo("#h2-1", { y: 500, opacity: 0 }, { y: 0, opacity: 1 }, 0);
scene2.fromTo("#h2-2", { y: 500 }, { y: 0 }, 0.1);
scene2.fromTo("#h2-3", { y: 700 }, { y: 0 }, 0.1);
scene2.fromTo("#h2-4", { y: 700 }, { y: 0 }, 0.2);
scene2.fromTo("#h2-5", { y: 800 }, { y: 0 }, 0.3);
scene2.fromTo("#h2-6", { y: 900 }, { y: 0 }, 0.3);

/* Bats */
gsap.fromTo(
  "#bats",
  { opacity: 1, y: 400, scale: 0 },
  {
    y: 120,
    scale: 0.8,
    transformOrigin: "50% 50%",
    ease: "power3.inOut",
    scrollTrigger: {
      trigger: ".scrollElement",
      start: "40% top",
      end: "70% 100%",
      scrub: 2,
      onEnter: function () {
        gsap.utils.toArray("#bats path").forEach((item, i) => {
          gsap.to(item, {
            scaleX: 0.5,
            yoyo: true,
            repeat: 11,
            duration: 0.15,
            delay: 0.7 + i / 10,
            transformOrigin: "50% 50%",
          });
        });
        gsap.set("#bats", { opacity: 1 });
      },
      onLeave: function () {
        gsap.to("#bats", { opacity: 0, delay: 2 });
      },
    },
  }
);

/* Sun increase */
let sun2 = gsap.timeline();
ScrollTrigger.create({
  animation: sun2,
  trigger: ".scrollElement",
  start: "2200 top",
  end: "5000 100%",
  scrub: 1.5,
});

// Instead of growing the sun (offset: 0.6), make it set down behind the mountains
sun2.to("#bg_grad", { attr: { cy: "600" } }, 0);
sun2.to("#sun", { attr: { "stop-color": "#ffff00" } }, 0);
sun2.to("#lg4 stop:nth-child(1)", { attr: { "stop-color": "#623951" } }, 0);
sun2.to("#lg4 stop:nth-child(2)", { attr: { "stop-color": "#261F36" } }, 0);
sun2.to("#bg_grad stop:nth-child(6)", { attr: { "stop-color": "#45224A" } }, 0);

/* Transition (from Scene2 to Scene3) */
gsap.set("#scene3", { y: 580, visibility: "visible" });
let sceneTransition = gsap.timeline();
ScrollTrigger.create({
  animation: sceneTransition,
  trigger: ".scrollElement",
  start: "70% top",
  end: "bottom 100%",
  scrub: 1.5,
});

sceneTransition.to(
  "#h2-1",
  { y: -680, scale: 1.5, transformOrigin: "50% 50%" },
  0
);
sceneTransition.to("#bg_grad", { attr: { cy: "-80" } }, 0.0);
sceneTransition.to("#bg2", { y: 0 }, 0);

/* Scene 3 */
let scene3 = gsap.timeline();
ScrollTrigger.create({
  animation: scene3,
  trigger: ".scrollElement",
  start: "80% 50%",
  end: "bottom 100%",
  scrub: 1.5,
});

//Hills motion
scene3.fromTo("#h3-1", { y: 300 }, { y: -550 }, 0);
scene3.fromTo("#h3-2", { y: 800 }, { y: -550 }, 0.03);
scene3.fromTo("#h3-3", { y: 600 }, { y: -550 }, 0.06);
scene3.fromTo("#h3-4", { y: 800 }, { y: -550 }, 0.09);
scene3.fromTo("#h3-5", { y: 1000 }, { y: -550 }, 0.12);

//stars & moon
scene3.fromTo("#stars", { opacity: 0 }, { opacity: 0.5, y: -500 }, 0);
scene3.fromTo("#moon", { opacity: 0, y: 200 }, { opacity: 1, y: -500 }, 0.05);


//gradient value change
scene3.to('#bg2-grad', { attr: { cy: 600 } }, 0);
scene3.to('#bg2-grad', { attr: { r: 500 } }, 0);

//reset scrollbar position after refresh
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

let fullscreen;
let fsEnter = document.getElementById("fullscr");
if (fsEnter) {
  fsEnter.addEventListener("click", function (e) {
    e.preventDefault();
    if (!fullscreen) {
      fullscreen = true;
      document.documentElement.requestFullscreen();
      fsEnter.innerHTML = "Exit Fullscreen";
    } else {
      fullscreen = false;
      document.exitFullscreen();
      fsEnter.innerHTML = "Go Fullscreen";
    }
  });
}

/* --- Atmospheric Weather Engine (Pure Code) --- */
const canvas = document.getElementById('weatherCanvas');
const ctx = canvas.getContext('2d');
let width, height;

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const raindrops = [];
const fireflies = [];
const stars = [];
const shootingStars = [];
const maxRain = 250;
const maxFireflies = 60;
const maxStars = 400;

// Utility for depth/parallax rain
class Raindrop {
  constructor() { this.reset(); }
  reset() {
    this.z = Math.random(); // 0 is back, 1 is front
    this.x = Math.random() * width;
    this.y = Math.random() * -height;
    this.length = (this.z * 20) + 10;
    this.speed = (this.z * 15) + 10;
    this.opacity = (this.z * 0.3) + 0.1;
  }
  update() {
    this.y += this.speed;
    this.x -= 3 * this.z; // wind is stronger in foreground
    if (this.y > height || this.x < 0) {
      this.reset();
      this.y = -this.length;
    }
  }
  draw(nightIntensity) {
    if (nightIntensity <= 0) return; // No rain during bright daytime
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - 3 * this.z, this.y + this.length);
    ctx.strokeStyle = `rgba(200, 220, 255, ${this.opacity * nightIntensity})`;
    ctx.lineWidth = this.z * 1.5 + 0.5;
    ctx.stroke();
  }
}

// Organic breathing fireflies
class Firefly {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 2 + 1;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 0.5 + 0.2;
    this.offset = Math.random() * 100;
  }
  update() {
    this.angle += (Math.random() - 0.5) * 0.2;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed - 0.3; // slowly float up
    if(this.y < 0) this.y = height + 50;
    if(this.x < 0) this.x = width;
    if(this.x > width) this.x = 0;
  }
  draw(time) {
    const pulse = (Math.sin(time * 0.003 + this.offset) + 1) / 2; // 0 to 1
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 240, 150, ${pulse * 0.8})`;
    ctx.shadowBlur = pulse * 15;
    ctx.shadowColor = 'rgba(255, 230, 100, 0.9)';
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

// Twinkling background stars (Optimized for performance)
class Star {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height * 0.6; // mostly top half
    this.size = Math.random() * 1.5 + 0.5;
    this.twinkleSpeed = Math.random() * 0.02 + 0.005;
    this.offset = Math.random() * Math.PI * 2;
  }
  draw(time, nightIntensity) {
    if (nightIntensity <= 0 || !time) return;
    const twinkle = (Math.sin(time * this.twinkleSpeed + this.offset) + 1) / 2;
    // Using fillRect instead of arc is much faster for hundreds of tiny particles
    ctx.fillStyle = `rgba(255, 255, 255, ${twinkle * nightIntensity})`;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

// Epic shooting stars
class ShootingStar {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * width + width;
    this.y = Math.random() * height * 0.3;
    this.length = Math.random() * 80 + 40;
    this.speed = Math.random() * 15 + 15;
    this.active = false;
    this.timer = Math.random() * 300 + 100;
  }
  update() {
    if(!this.active) {
      this.timer--;
      if(this.timer <= 0) this.active = true;
      return;
    }
    this.x -= this.speed;
    this.y += this.speed * 0.3;
    if(this.x < -this.length) this.reset();
  }
  draw(nightIntensity) {
    if(!this.active || nightIntensity <= 0) return;
    const grad = ctx.createLinearGradient(this.x, this.y, this.x + this.length, this.y - this.length * 0.3);
    grad.addColorStop(0, `rgba(255, 255, 255, ${nightIntensity})`);
    grad.addColorStop(1, `rgba(255, 255, 255, 0)`);
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.length, this.y - this.length * 0.3);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

// Reduced star count for massive performance boost
const maxStarsOptimized = 150; 
for (let i = 0; i < maxRain; i++) raindrops.push(new Raindrop());
for (let i = 0; i < maxFireflies; i++) fireflies.push(new Firefly());
for (let i = 0; i < maxStarsOptimized; i++) stars.push(new Star());
for (let i = 0; i < 3; i++) shootingStars.push(new ShootingStar());

let isDarkScene = false;
let scrollPos = 0;
window.addEventListener('scroll', () => {
  scrollPos = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  isDarkScene = scrollPos > 0.4;
});

function animateWeather(time) {
  ctx.clearRect(0, 0, width, height);

  const nightIntensity = Math.max(0, Math.min((scrollPos - 0.4) * 3, 1)); // Fades in beautifully

  // Draw background sky elements first
  stars.forEach(star => star.draw(time, nightIntensity));
  
  // NOTE: drawMoon() removed because there is already an SVG moon from index.html!
  
  shootingStars.forEach(star => { star.update(); star.draw(nightIntensity); });

  // Rain is continuous, but fades in with storm
  raindrops.forEach(drop => { drop.update(); drop.draw(nightIntensity); });

  // Fireflies in dark scene only
  if (isDarkScene) {
    fireflies.forEach(fly => { fly.update(); fly.draw(time); });
  }
  
  requestAnimationFrame(animateWeather);
}
// Pass starting time by using requestAnimationFrame instead of calling it directly
requestAnimationFrame(animateWeather);

/* --- Lightning Controller --- */
const lightningLayer = document.getElementById('lightning-flash');
function triggerLightning() {
  // More lightning in early scenes, less in the final dark scene
  if (Math.random() > (isDarkScene ? 0.95 : 0.6)) {
    // Sharp blinding flash sequence
    let tl = gsap.timeline();
    tl.to(lightningLayer, { opacity: Math.random() * 0.5 + 0.5, duration: 0.03 })
      .to(lightningLayer, { opacity: 0, duration: 0.03 })
      .to(lightningLayer, { opacity: Math.random() * 0.8 + 0.2, duration: 0.04, delay: 0.02 })
      .to(lightningLayer, { opacity: 0, duration: 0.15 });
      
    // Sometimes a massive secondary strike
    if (Math.random() > 0.6) {
      setTimeout(() => {
        let tl2 = gsap.timeline();
        tl2.to(lightningLayer, { opacity: 1, duration: 0.02 })
           .to(lightningLayer, { opacity: 0, duration: 0.2 });
      }, 250);
    }
  }
  setTimeout(triggerLightning, Math.random() * 5000 + 2000);
}
setTimeout(triggerLightning, 2000);

/* --- GSAP Atmosphere Deepening --- */
let atmosphereTimeline = gsap.timeline();
ScrollTrigger.create({
  animation: atmosphereTimeline,
  trigger: ".scrollElement",
  start: "10% top",
  end: "80% 100%",
  scrub: 2,
});

// Deepen the cinematic overlay to make it moodier
atmosphereTimeline.to('.cinematic-overlay', { backgroundColor: 'rgba(14, 10, 26, 0.4)' }, 0);
atmosphereTimeline.to('.fog-container', { opacity: 0.4 }, 0); // Thicken fog
atmosphereTimeline.to('.cinematic-overlay', { backgroundColor: 'rgba(14, 10, 26, 0.7)' }, 0.5); // Deep darkness

/* --- Procedural Web Audio API Engine (Zero Network/CORS issues) --- */
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
let rainGainNode = null;
let birdGainNode = null;
let audioStarted = false;

function playBirdChirp() {
  if (!audioStarted || audioCtx.state === 'suspended') return;
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  // High pitch sine wave for bird
  osc.type = 'sine';
  const baseFreq = 2000 + Math.random() * 1000;
  osc.frequency.setValueAtTime(baseFreq, audioCtx.currentTime);
  
  // Quick frequency sweep (chirp up and down)
  osc.frequency.exponentialRampToValueAtTime(baseFreq + 1000, audioCtx.currentTime + 0.1);
  osc.frequency.exponentialRampToValueAtTime(baseFreq - 500, audioCtx.currentTime + 0.2);
  
  // Envelope (fade in and out quickly)
  gain.gain.setValueAtTime(0, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.05);
  gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.2);
  
  osc.connect(gain);
  gain.connect(birdGainNode);
  
  osc.start();
  osc.stop(audioCtx.currentTime + 0.2);
}

function initProceduralAudio() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  if (audioStarted) return;
  audioStarted = true;

  // 1. Generate continuous Rain (White Noise + Lowpass Filter)
  const bufferSize = audioCtx.sampleRate * 2;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  
  const noiseSource = audioCtx.createBufferSource();
  noiseSource.buffer = buffer;
  noiseSource.loop = true;
  
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 600; // deep rain sound
  
  rainGainNode = audioCtx.createGain();
  rainGainNode.gain.value = 0; // Rain starts silent (daytime)
  
  noiseSource.connect(filter);
  filter.connect(rainGainNode);
  rainGainNode.connect(audioCtx.destination);
  noiseSource.start();

  // 2. Setup master bird gain (Starts loud at daytime)
  birdGainNode = audioCtx.createGain();
  birdGainNode.gain.value = 0.5; // Birds start loud
  birdGainNode.connect(audioCtx.destination);
  
  // Trigger bird chirps randomly
  setInterval(() => {
    playBirdChirp();
    if(Math.random() > 0.5) setTimeout(playBirdChirp, 150);
    if(Math.random() > 0.7) setTimeout(playBirdChirp, 300);
  }, 2500);

}

function playProceduralThunder() {
  if (!audioStarted || audioCtx.state === 'suspended') return;
  // Deep rumbling thunder using layered oscillators and noise
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();
  
  osc.type = 'square';
  osc.frequency.setValueAtTime(80, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 2);
  
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1000, audioCtx.currentTime);
  filter.frequency.linearRampToValueAtTime(50, audioCtx.currentTime + 2);
  
  gain.gain.setValueAtTime(1, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 2);
  
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + 2);
}

// Start audio on first click
document.addEventListener('click', initProceduralAudio, { once: true });

// Sync rain and bird volume to scroll position (Day to Night transition)
window.addEventListener('scroll', () => {
  if (!audioStarted || !rainGainNode || !birdGainNode) return;
  
  let scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  
  // Calculate the same nightIntensity used for visual rain (starts at 40% scroll)
  let nightIntensity = Math.max(0, Math.min((scrollPercent - 0.4) * 3, 1));
  
  // Fade in rain ONLY when visual storm starts
  let rainVol = nightIntensity * 0.6;
  rainGainNode.gain.setValueAtTime(rainVol, audioCtx.currentTime);

  // Fade out birds before the storm hits
  let birdVol = Math.max(0, 0.5 - (scrollPercent * 1.5));
  birdGainNode.gain.setValueAtTime(birdVol, audioCtx.currentTime);
});

// Modify lightning trigger to also play thunder sound
const originalTriggerLightning = triggerLightning;
window.triggerLightning = function() {
  if (Math.random() > (isDarkScene ? 0.95 : 0.6)) {
    if (isDarkScene && audioStarted && Math.random() > 0.5) {
      playProceduralThunder();
    }
  }
  originalTriggerLightning();
}



