document.addEventListener('DOMContentLoaded', () => {
    initSparkles();

    const enterBtn = document.getElementById('enterBtn');
    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            enterBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                enterBtn.style.transform = 'scale(1.05)';
                window.location.href = 'quiz_intro.html';
            }, 150);
        });
    }

    const startQuizBtn = document.getElementById('startQuizBtn');
    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', () => {
            startQuizBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                startQuizBtn.style.transform = 'scale(1.05)';
                window.location.href = 'quiz_q1.html';
            }, 150);
        });
    }

    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                nextBtn.style.transform = 'scale(1.05)';
                console.log("Navigating to next page...");
                // For now, prompt or placeholder as user didn't specify next page yet
                // But generally it should use data-next-url if available, or just log
                const nextUrl = document.body.getAttribute('data-next-url');
                if (nextUrl) {
                    window.location.href = nextUrl;
                } else {
                    console.log("No next URL defined.");
                }
            }, 150);
        });
    }

    const agreeBtn = document.getElementById('agreeBtn');
    if (agreeBtn) {
        agreeBtn.addEventListener('click', () => {
            agreeBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                agreeBtn.style.transform = 'scale(1.05)';
                console.log("Agreed. Navigating...");
                const nextUrl = document.body.getAttribute('data-next-url');
                if (nextUrl) {
                    window.location.href = nextUrl;
                } else {
                    console.log("End of Contract. Celebration?");
                    // Maybe show a final alert or animation
                    alert("The Contract is Sealed! 🪄");
                }
            }, 150);
        });
    }

    // Quiz Options Logic
    const optionBtns = document.querySelectorAll('.option-btn');
    optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isCorrect = btn.getAttribute('data-correct') === 'true';

            if (isCorrect) {
                // Correct Answer
                btn.classList.add('correct-answer');

                const correctNotification = document.getElementById('correctAnswerNotification');
                if (correctNotification) {
                    correctNotification.classList.remove('hidden');
                    correctNotification.classList.add('visible');
                }

                setTimeout(() => {
                    // Generic navigation to next page
                    console.log("Correct! Navigating...");
                    const nextUrl = document.body.getAttribute('data-next-url');
                    if (nextUrl) {
                        window.location.href = nextUrl;
                    } else {
                        console.log("No next URL defined (End of Quiz?)");
                        // Optional: Redirect to a results page or show "The End"
                    }
                }, 1500); // Increased wait time slightly to read the message
            } else {
                // Wrong Answer
                const notification = document.getElementById('wrongAnswerNotification');
                btn.classList.add('vibrate-wrong');

                if (notification) {
                    notification.classList.remove('hidden');
                    notification.classList.add('visible');

                    // Hide after 2 seconds
                    setTimeout(() => {
                        notification.classList.remove('visible');
                        notification.classList.add('hidden');
                    }, 2000);
                }

                setTimeout(() => {
                    btn.classList.remove('vibrate-wrong');
                }, 500);
            }
        });
    });
});

function initSparkles() {
    const canvas = document.getElementById('sparkleCanvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = Math.random() * 0.5 - 0.25;
            this.vy = Math.random() * 0.5 - 0.25;
            this.size = Math.random() * 2;
            this.alpha = Math.random();
            this.growing = Math.random() > 0.5;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;

            if (this.growing) {
                this.alpha += 0.01;
                if (this.alpha >= 1) this.growing = false;
            } else {
                this.alpha -= 0.01;
                if (this.alpha <= 0.2) this.growing = true;
            }
        }

        draw() {
            ctx.fillStyle = `rgba(200, 180, 255, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}
