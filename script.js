let isRevealed = false;

const searchArea = document.getElementById('search-area');
const circle = document.getElementById('reveal-circle');
const moon = document.getElementById('moon');
const memes = document.querySelectorAll('.persistent-meme');
const hint = document.getElementById('hint-text');

const handleMove = (e) => {
    if (isRevealed) return;
    
    const x = e.touches ? e.touches[0].pageX : e.pageX;
    const y = e.touches ? e.touches[0].pageY : e.pageY;

    circle.style.display = 'block';
    circle.style.left = x + 'px';
    circle.style.top = y + 'px';

    // 1. Handle Meme Visibility (They stay visible inside the circle)
    memes.forEach(meme => {
        const rect = meme.getBoundingClientRect();
        const memeX = rect.left + (rect.width / 2);
        const memeY = rect.top + (rect.height / 2);
        const distToMeme = Math.hypot(x - memeX, y - memeY);
        
        // If the magnifying glass is over the meme, show it
        meme.style.opacity = (distToMeme < 85) ? "0.8" : "0";
    });

    // 2. Handle Moon Reveal (Collision)
    const moonRect = moon.getBoundingClientRect();
    const moonX = moonRect.left + (moonRect.width / 2);
    const moonY = moonRect.top + (moonRect.height / 2);
    const distToMoon = Math.hypot(x - moonX, y - moonY);

    if (distToMoon < 55) { 
        isRevealed = true;
        moon.style.opacity = '1';
        hint.innerText = "The Moon has been sighted! ✨";
        
        // Hide memes once moon is found
        memes.forEach(m => m.style.opacity = "0");
        
        // Remove the darkness
        setTimeout(() => {
            circle.style.transition = "opacity 2s";
            circle.style.opacity = "0";
        }, 1000);
    }
};

searchArea.addEventListener('mousemove', handleMove);
searchArea.addEventListener('touchmove', (e) => { 
    e.preventDefault(); 
    handleMove(e); 
}, {passive: false});


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

