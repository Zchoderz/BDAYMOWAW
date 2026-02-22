document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.querySelector('.envelope');
    const card = document.querySelector('.card');
    let balloonInterval = null;
    let balloonsStarted = false;
    let confettiRainInterval = null;

    // Add click event to open the envelope
    envelope.addEventListener('click', () => {
        if (!envelope.classList.contains('open')) {
            envelope.classList.add('open');
            launchFireworkShow();
            startConfettiRain();
            if (!balloonsStarted) {
                balloonsStarted = true;
                // Generate balloons at intervals
                balloonInterval = setInterval(createBalloon, 900);
                // Create a few at start
                for (let i = 0; i < 5; i++) setTimeout(createBalloon, i * 400);
            }
            // Hide the indicator
            const indicator = document.getElementById('envelope-indicator');
            if (indicator) indicator.style.display = 'none';
            // Pop up images
            showPopupImages();
            // Play audio
            const audio = document.getElementById('bday-audio');
            if (audio) audio.play();
        }
    });

    // Launch multiple confetti fireworks for a longer effect
    function launchFireworkShow() {
        let bursts = 0;
        const maxBursts = 8;
        const burstInterval = 400; // ms between bursts
        function burst() {
            createFireworkConfetti();
            bursts++;
            if (bursts < maxBursts) {
                setTimeout(burst, burstInterval);
            }
        }
        burst();
    }

    // Create firework confetti effect (single burst, improved)
    function createFireworkConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#ffd166', '#a1c4fd', '#e9c74d', '#bfa12e', '#fff', '#b983ff', '#f7b2b7'];
        const shapes = ['circle', 'rect', 'star'];
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        confettiContainer.style.position = 'fixed';
        confettiContainer.style.left = 0;
        confettiContainer.style.top = 0;
        confettiContainer.style.width = '100vw';
        confettiContainer.style.height = '100vh';
        confettiContainer.style.pointerEvents = 'none';
        confettiContainer.style.zIndex = 1000;
        document.body.appendChild(confettiContainer);

        // Center of the envelope (roughly)
        const env = envelope.getBoundingClientRect();
        const centerX = env.left + env.width / 2;
        const centerY = env.top + env.height / 2.5;

        for (let i = 0; i < 90; i++) {
            const angle = (Math.PI * 2 * i) / 90;
            const distance = 320 + Math.random() * 180; // much bigger range
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;
            const confettiPiece = document.createElement('div');
            // Random shape
            const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
            confettiPiece.className = `confetti-piece firework${shapeType === 'star' ? ' star' : shapeType === 'rect' ? ' rect' : ''}`;
            confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confettiPiece.style.position = 'absolute';
            confettiPiece.style.left = `${centerX}px`;
            confettiPiece.style.top = `${centerY}px`;
            confettiPiece.style.setProperty('--dx', `${dx}px`);
            confettiPiece.style.setProperty('--dy', `${dy}px`);
            // Random rotation and scale
            const rot = Math.floor(Math.random() * 360);
            const scale = 0.8 + Math.random() * 1.2;
            confettiPiece.style.transform = `rotate(${rot}deg) scale(${scale})`;
            confettiPiece.style.opacity = 1;
            confettiPiece.style.transition = 'opacity 0.7s';
            confettiContainer.appendChild(confettiPiece);
        }

        // Remove confetti after animation
        setTimeout(() => {
            confettiContainer.style.transition = 'opacity 0.7s';
            confettiContainer.style.opacity = 0;
            setTimeout(() => confettiContainer.remove(), 700);
        }, 2600); // longer duration
    }

    // --- Confetti Rain ---
    function startConfettiRain() {
        const rainColors = ['#ff6b6b', '#4ecdc4', '#ffd166', '#a1c4fd', '#e9c74d', '#bfa12e', '#fff'];
        const rainShapes = ['circle', 'rect', 'star', 'triangle', 'heart'];
        let rainCount = 0;
        confettiRainInterval = setInterval(() => {
            for (let i = 0; i < 6; i++) {
                const confetti = document.createElement('div');
                const shapeType = rainShapes[Math.floor(Math.random() * rainShapes.length)];
                confetti.className = `confetti-piece rain${shapeType !== 'circle' ? ' ' + shapeType : ''}`;
                confetti.style.left = Math.random() * 98 + 'vw';
                confetti.style.backgroundColor = rainColors[Math.floor(Math.random() * rainColors.length)];
                confetti.style.setProperty('--sway', `${Math.random() * 60 - 30}px`);
                document.body.appendChild(confetti);
                setTimeout(() => confetti.remove(), 3500);
            }
            rainCount++;
            if (rainCount > 22) { // about 4 seconds
                clearInterval(confettiRainInterval);
            }
        }, 160);
    }

    // --- Balloons ---
    const balloonColors = ['#ff6b6b', '#4ecdc4', '#ffd166', '#a1c4fd', '#e9c74d', '#bfa12e', '#b983ff', '#f7b2b7'];
    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = Math.random() * 95 + 'vw';
        balloon.style.background = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        balloon.style.animationDuration = (7 + Math.random() * 3) + 's';
        balloon.style.opacity = 0.85 + Math.random() * 0.15;
        document.body.appendChild(balloon);
        // Remove balloon after animation
        setTimeout(() => {
            balloon.remove();
        }, 9000);
    }

    // Show popup images with a pop-in effect
    function showPopupImages() {
        const imageNames = [
            '520436938_779853351161288_6269310393740344263_n.jpg',
            '599241856_880182581649316_4073695745894049287_n.jpg',
            '599328582_1399769984882115_7393951428076600452_n.jpg',
            '605202002_917488190943668_8992420132823933505_n.jpg',
            '605596151_25365348229786672_6545916797412653262_n.jpg',
            '605819941_1378531916983275_215938383506127320_n.jpg',
            '606264838_1941248000138348_7408402043804041385_n.jpg',
            '6066468064255395304.jpg',
            '6066468064255395638.jpg',
            '6084396546239088429.jpg',
            '609479469_1506213550462141_15350955796132213_n.jpg',
            '6194990279073840309.jpg',
            '6215063087904571729.jpg',
            '6298597388608193181.jpg',
            '6300614704682351013.jpg',
            '6330191932541749288.jpg',
            'Annotation 2026-02-22 164644.png'
        ];
        const popup = document.getElementById('popup-images');
        popup.innerHTML = '';
        imageNames.forEach((name, i) => {
            setTimeout(() => {
                const img = document.createElement('img');
                img.src = `images/${name}`;
                img.alt = '';
                img.style.animationDelay = (i * 0.08) + 's';
                popup.appendChild(img);
            }, i * 80);
        });
    }

    function checkOrientation() {
        const overlay = document.getElementById('rotate-overlay');
        if (window.innerWidth < 700 && window.innerHeight > window.innerWidth) {
            overlay.style.display = 'flex';
        } else {
            overlay.style.display = 'none';
        }
    }
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    document.addEventListener('DOMContentLoaded', checkOrientation);
}); 