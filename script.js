const myMemes = ['Aaaah-cat.webp', '8P.jpg'];
let isRevealed = false;

const searchArea = document.getElementById('search-area');
const circle = document.getElementById('reveal-circle');
const moon = document.getElementById('moon');
const memeDisplay = document.getElementById('meme-discovery');
const hint = document.getElementById('hint-text');

const handleMove = (e) => {
    if (isRevealed) return;
    
    // Support both mouse and touch
    const x = e.touches ? e.touches[0].pageX : e.pageX;
    const y = e.touches ? e.touches[0].pageY : e.pageY;

    circle.style.display = 'block';
    circle.style.left = x + 'px';
    circle.style.top = y + 'px';

    // Calculate distance to the moon
    const moonRect = moon.getBoundingClientRect();
    const moonCenterX = moonRect.left + (moonRect.width / 2);
    const moonCenterY = moonRect.top + (moonRect.height / 2);
    const distance = Math.hypot(x - moonCenterX, y - moonCenterY);

    // Reveal moon if close
    if (distance < 50) { 
        isRevealed = true;
        moon.style.opacity = '1';
        hint.innerText = "Moon Sighted! ✨";
    } 
    // Show random memes if far away
    else if (distance > 250 && Math.random() > 0.985) {
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

