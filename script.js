const searchArea = document.getElementById('search-area');
const circle = document.getElementById('reveal-circle');
const moonIcon = document.getElementById('moon');
const memeDisplay = document.getElementById('meme-discovery');
const hint = document.getElementById('hint-text');

let isRevealed = false;
const myMemes = ['Aaaah-cat.webp', '8P.jpg']; 

// Movement Tracking
searchArea.addEventListener('mousemove', (e) => handleMove(e.pageX, e.pageY));
searchArea.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Stop mobile bounce
    handleMove(e.touches[0].pageX, e.touches[0].pageY);
}, { passive: false });

function handleMove(x, y) {
    if (isRevealed) return;

    circle.style.display = 'block';
    circle.style.left = x + 'px';
    circle.style.top = y + 'px';

    // Get distance between Circle center and Moon center
    const moonRect = moonIcon.getBoundingClientRect();
    const moonX = moonRect.left + moonRect.width / 2;
    const moonY = moonRect.top + moonRect.height / 2;
    const distance = Math.hypot(x - moonX, y - moonY);

    // If moon is caught in the magnifying glass (80% overlap)
    if (distance < 50) {
        triggerSuccess();
    } 
    // Randomly show memes if far away
    else if (distance > 250 && Math.random() > 0.985) {
        showRandomMeme(x, y);
    }
}

function showRandomMeme(x, y) {
    if (memeDisplay.style.opacity == '0') {
        memeDisplay.src = myMemes[Math.floor(Math.random() * myMemes.length)];
        memeDisplay.style.left = (x - 60) + 'px';
        memeDisplay.style.top = (y - 60) + 'px';
        memeDisplay.style.opacity = '0.8';
        setTimeout(() => memeDisplay.style.opacity = '0', 1000);
    }
}

function triggerSuccess() {
    isRevealed = true;
    moonIcon.style.opacity = '1';
    hint.innerText = "Moon Sighted! ✨";
    
    // Start lanterns flying up
    if (typeof lightLanterns === "function") lightLanterns();

    // Cinematic zoom transition
    setTimeout(() => {
        circle.style.transition = "transform 1.5s ease-in, opacity 1s";
        circle.style.transform = "translate(-50%, -50%) scale(15)";
        circle.style.opacity = "0";
        setTimeout(() => nextPhase('phase2'), 1200);
    }, 1000);
}
