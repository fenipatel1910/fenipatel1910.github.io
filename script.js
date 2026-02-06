// Get name from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name') || 'there';
document.getElementById('name').textContent = name;

const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const message = document.getElementById('message');
const question = document.getElementById('question');
const subtitle = document.querySelector('.subtitle');

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
    message.textContent = `Yay! 🎉 ${name}, you made me so happy! 💕❤️✨`;
    message.classList.remove('hidden');
    message.classList.add('celebration');
    question.style.display = 'none';
    subtitle.style.display = 'none';
    document.querySelector('.buttons').style.display = 'none';
    
    // Enhanced celebration effect
    document.body.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #ff9a9e 100%)';
    document.body.style.backgroundSize = '400% 400%';
    
    // Create confetti effect
    createConfetti();
});

// Move No button on hover (make it run away) and show messages
noBtn.addEventListener('mouseenter', function() {
    // Show message and grow Yes button
    if (noClickCount < noResponses.length) {
        question.textContent = noResponses[noClickCount];
        noClickCount++;
        
        // Make Yes button bigger
        const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
        yesBtn.style.fontSize = (currentSize + 5) + 'px';
        yesBtn.style.padding = (18 + noClickCount * 3) + 'px ' + (40 + noClickCount * 5) + 'px';
        
        // Make No button smaller but keep it visible
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize);
        noBtn.style.fontSize = Math.max(12, noSize - 2) + 'px';
        noBtn.style.padding = Math.max(10, 18 - noClickCount * 2) + 'px ' + Math.max(20, 40 - noClickCount * 3) + 'px';
    }
    
    // Move the button to random position
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    
    // Calculate safe boundaries
    const maxX = window.innerWidth - btnWidth - 20;
    const maxY = window.innerHeight - btnHeight - 20;
    
    // Generate random position within safe boundaries
    const randomX = Math.floor(Math.random() * (maxX - 20)) + 20;
    const randomY = Math.floor(Math.random() * (maxY - 20)) + 20;
    
    // Apply new position
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transition = 'all 0.3s ease';
    noBtn.style.zIndex = '1000';
});

// Confetti effect
function createConfetti() {
    const colors = ['#ff6b9d', '#f093fb', '#e74c3c', '#ffd700', '#ff1493'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.opacity = '1';
            
            document.body.appendChild(confetti);
            
            const fallDuration = 3 + Math.random() * 2;
            const horizontalMovement = (Math.random() - 0.5) * 200;
            
            confetti.animate([
                { 
                    transform: 'translateY(0px) translateX(0px) rotate(0deg)',
                    opacity: 1
                },
                { 
                    transform: `translateY(${window.innerHeight + 20}px) translateX(${horizontalMovement}px) rotate(${Math.random() * 720}deg)`,
                    opacity: 0
                }
            ], {
                duration: fallDuration * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            setTimeout(() => {
                confetti.remove();
            }, fallDuration * 1000);
        }, i * 30);
    }
}
