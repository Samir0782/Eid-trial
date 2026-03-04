const myMemes = ['Aaaah-cat.webp', '8P.jpg'];
let isRevealed = false;

// Navigation
function nextPhase(phaseId) {
    document.querySelectorAll('.phase').forEach(p => p.classList.remove('active'));
    document.getElementById(phaseId).classList.add('active');
}

const searchArea = document.getElementById('search-area');
const circle = document.getElementById('reveal-circle');
const moon = document.getElementById('moon');
const memeDisplay = document.getElementById('meme-discovery');
const hint = document.getElementById('hint-text');

// Combined Touch/Mouse Logic
const handleMove = (e) => {
    if (isRevealed) return;
    const x = e.touches ? e.touches[0].pageX : e.pageX;
    const y = e.touches ? e.touches[0].pageY : e.pageY;

    circle.style.display = 'block';
    circle.style.left = x + 'px';
    circle.style.top = y + 'px';

    // Check for "Overlap" with the Moon
    const moonRect = moon.getBoundingClientRect();
    const moonCenterX = moonRect.left + (moonRect.width / 2);
    const moonCenterY = moonRect.top + (moonRect.height / 2);
    const distance = Math.hypot(x - moonCenterX, y - moonCenterY);

    if (distance < 50) { // Moon is inside the magnifying glass
        triggerMagicReveal();
    } else if (distance > 250 && Math.random() > 0.985) {
        showMeme(x, y);
    }
};

searchArea.addEventListener('mousemove', handleMove);
searchArea.addEventListener('touchmove', (e) => { 
    e.preventDefault(); 
    handleMove(e); 
}, {passive: false});

function showMeme(x, y) {
    if (memeDisplay.style.opacity == '0') {
        memeDisplay.src = myMemes[Math.floor(Math.random() * myMemes.length)];
        memeDisplay.style.left = (x - 60) + 'px';
        memeDisplay.style.top = (y - 60) + 'px';
        memeDisplay.style.opacity = '1';
        setTimeout(() => memeDisplay.style.opacity = '0', 900);
    }
}

function triggerMagicReveal() {
    isRevealed = true;
    moon.style.opacity = '1';
    hint.innerText = "Moon Sighted! ✨";
    
    // Automatic Lanterns
    lightLanterns();

    // Portal Zoom
    setTimeout(() => {
        circle.style.transition = "transform 1.2s ease-in, opacity 1s";
        circle.style.transform = "translate(-50%, -50%) scale(15)";
        circle.style.opacity = "0";
        setTimeout(() => nextPhase('phase2'), 1000);
    }, 1500);
}

function lightLanterns() {
    for(let i=0; i<15; i++) {
        setTimeout(() => {
            let l = document.createElement("div");
            l.className = "lantern";
            l.innerText = "🏮";
            l.style.left = Math.random() * 92 + "%";
            l.style.animationDuration = (4 + Math.random() * 6) + "s";
            document.body.appendChild(l);
        }, i * 150);
    }
}

let clicks = 0;
function openBox() {
    clicks++;
    if(clicks < 3) {
        document.getElementById('box-instruction').innerText = `Tap ${3-clicks} more times!`;
    } else {
        nextPhase('phase4');
    }
}
