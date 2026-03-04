const myMemes = ['Aaaah-cat.webp', '8P.jpg'];
let isRevealed = false;

function nextPhase(phaseId) {
    document.querySelectorAll('.phase').forEach(p => p.classList.remove('active'));
    document.getElementById(phaseId).classList.add('active');
}

const searchArea = document.getElementById('search-area');
const circle = document.getElementById('reveal-circle');
const moon = document.getElementById('moon');
const memeDisplay = document.getElementById('meme-discovery');

// Movement Logic
const handleMove = (e) => {
    if (isRevealed) return;
    const x = e.touches ? e.touches[0].pageX : e.pageX;
    const y = e.touches ? e.touches[0].pageY : e.pageY;

    circle.style.display = 'block';
    circle.style.left = x + 'px';
    circle.style.top = y + 'px';

    const moonRect = moon.getBoundingClientRect();
    const dist = Math.hypot(x - (moonRect.left + 35), y - (moonRect.top + 35));

    if (dist < 60) {
        triggerReveal();
    } else if (dist > 200 && Math.random() > 0.98) {
        showMeme(x, y);
    }
};

searchArea.addEventListener('mousemove', handleMove);
searchArea.addEventListener('touchmove', (e) => { e.preventDefault(); handleMove(e); }, {passive: false});

function showMeme(x, y) {
    if (memeDisplay.style.opacity == '0') {
        memeDisplay.src = myMemes[Math.floor(Math.random() * myMemes.length)];
        memeDisplay.style.left = (x - 60) + 'px';
        memeDisplay.style.top = (y - 60) + 'px';
        memeDisplay.style.opacity = '1';
        setTimeout(() => memeDisplay.style.opacity = '0', 800);
    }
}

function triggerReveal() {
    isRevealed = true;
    moon.style.opacity = '1';
    lightLanterns();
    setTimeout(() => {
        circle.style.transition = "transform 1s, opacity 1s";
        circle.style.transform = "translate(-50%, -50%) scale(10)";
        circle.style.opacity = "0";
        setTimeout(() => nextPhase('phase2'), 1000);
    }, 1200);
}

function lightLanterns() {
    for(let i=0; i<15; i++) {
        setTimeout(() => {
            let l = document.createElement("div");
            l.className = "lantern";
            l.innerText = "🏮";
            l.style.left = Math.random() * 90 + "%";
            document.body.appendChild(l);
        }, i * 200);
    }
}

let clicks = 0;
function openBox() {
    clicks++;
    if(clicks < 3) {
        document.getElementById('box-instruction').innerText = `Tap ${3-clicks} more!`;
    } else {
        nextPhase('phase4');
    }
        }
        
