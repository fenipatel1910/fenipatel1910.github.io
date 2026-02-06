// Get name from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name') || 'there';
document.getElementById('name').textContent = name;

const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const message = document.getElementById('message');
const question = document.getElementById('question');

let noClickCount = 0;
const noResponses = [
    "Are you sure? 🥺",
    "Really? Think again! 💭",
    "Please? 🙏",
    "Just give it a chance! 💕",
    "You're breaking my heart 💔",
    "One more chance? 🌹",
    "Pretty please? 🥺👉👈",
    "I won't give up! 💪",
    "You know you want to say yes! 😊",
    "Final answer? 😢"
];

// Yes button click
yesBtn.addEventListener('click', function() {
    message.textContent = `Yay! 🎉 ${name}, you made me so happy! 💕❤️`;
    message.classList.remove('hidden');
    message.classList.add('celebration');
    question.style.display = 'none';
    document.querySelector('.buttons').style.display = 'none';
    
    // Add confetti or celebration effect
    document.body.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
});

// No button click with moving button effect
noBtn.addEventListener('click', function() {
    if (noClickCount < noResponses.length) {
        question.textContent = noResponses[noClickCount];
        noClickCount++;
        
        // Make Yes button bigger
        const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
        yesBtn.style.fontSize = (currentSize + 5) + 'px';
        yesBtn.style.padding = (15 + noClickCount * 3) + 'px ' + (30 + noClickCount * 5) + 'px';
        
        // Make No button smaller
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize);
        noBtn.style.fontSize = Math.max(10, noSize - 2) + 'px';
    }
});

// Move No button on hover
noBtn.addEventListener('mouseenter', function() {
    const maxX = window.innerWidth - noBtn.offsetWidth - 100;
    const maxY = window.innerHeight - noBtn.offsetHeight - 100;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
});
