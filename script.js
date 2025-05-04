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
            'c5bd071b-5366-4ec2-8cf0-f8d54f1a59cc.jpg',
            'eac7d379-7629-4fd4-bf6a-9a0976fe091a.jpg',
            'f87432df-77e3-40c5-9c2f-b4f8fa9b4634.jpg',
            '392dc625-9a7d-466c-a439-f2c78533ded2.jpg',
            'ca465356-e04a-460e-8df4-abb64be431c3.jpg',
            'd50ef520-3e03-4d84-9111-9368d93cf74a.jpg',
            'f1a6eaaa-c44a-4a04-a901-83cfa78c1638.jpg',
            'df8aed51-5be2-4fe3-b3f0-7923f33a3831.jpg',
            'd3f2f481-537e-4aee-9178-0fd73632c43f.jpg',
            '778f0903-b327-4d73-a06e-e08496434319.jpg',
            'a72720ef-bd0c-428a-be47-726159baab17.jpg',
            '11c17bb0-e227-497a-9b66-422463ac2c40.jpg',
            '81804640-460c-438f-820b-10d23af2d719.jpg',
            '2798909c-656c-4f69-ac21-f306c26efcf6.jpg',
            '20dacc23-2649-4592-9b0e-0ff0e1c87a5b.jpg',
            '90cab4a1-1821-4912-afb2-ca8f274c76be.jpg',
            'cfe86f53-a9fd-4611-8d3c-db5002bedd3d.jpg',
            '4036de3a-6914-4a59-94df-85224fbb14b3.jpg',
            'cd9ef8b9-d012-47e1-861f-2cd31e62710d.jpg',
            'f592b58b-e150-4189-920c-9e1ed97aa852.jpg',
            'de8c003b-44bc-45cf-a800-c699bdb5635c.jpg',
            '599e0c67-eae9-485e-9bb2-6d7e9b309ca3.jpg',
            '2fc123b8-46e2-4fc7-b791-137ec6c650c0.jpg',
            '2aa9215a-760a-42e4-af93-efd22d837aba.jpg',
            '0be6ab12-6d77-4dea-8e03-b7205072d7e6.jpg',
            'de649215-1a43-4254-9521-ded50719ef23.jpg',
            'f9bfc054-1bf1-4ce5-9e6b-da4d5585ba3c.jpg',
            'de014e8d-9741-422b-8bff-bb907b943dba.jpg'
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