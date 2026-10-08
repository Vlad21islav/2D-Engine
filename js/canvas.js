let canvas;
let ctx;
let dpr;

let cameraX = 0;
let cameraY = 0;
const GRID_STEP = 40;

function drawBackground() {
    // background-color: var(--background-color);
    // background-image: 
    //     linear-gradient(var(--button-background-color) 1px, transparent 1px),
    //     linear-gradient(90deg, var(--button-background-color) 1px, transparent 1px);
    // background-size: 40px 40px;

    // console.log(site_theme);

    if (site_theme === 'Dark') {
        ctx.fillStyle = '#2b2b2b';
        ctx.strokeStyle = '#3d3d3d';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (site_theme === 'Light') {
        ctx.fillStyle = '#f0f0f0';
        ctx.strokeStyle = '#e0e0e0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.lineWidth = 1;

    const width = canvas.width
    const height = canvas.height

    const startX = Math.floor(cameraX / GRID_STEP) * GRID_STEP;
    const startY = Math.floor(cameraY / GRID_STEP) * GRID_STEP;

    const endX = cameraX + width;
    const endY = cameraY + height;

    for (let wx = startX; wx <= endX; wx += GRID_STEP) {
        const sx = wx - cameraX;
        ctx.beginPath();
        ctx.moveTo(sx + 0.5, 0);
        ctx.lineTo(sx + 0.5, height);
        ctx.stroke();
    }

    for (let wy = startY; wy <= endY; wy += GRID_STEP) {
        const sy = wy - cameraY;
        ctx.beginPath();
        ctx.moveTo(0, sy + 0.5);
        ctx.lineTo(width, sy + 0.5);
        ctx.stroke();
    }
}

function movingOnWheel() {
    canvas.addEventListener('wheel', (e) => {
        e.preventDefault();

        cameraY += e.deltaY;
        cameraX += e.deltaX;

    }, { passive: false });
}

function movingOnMouse() {
    let isDragging = false;
    let startX, startY;
    let startCameraX, startCameraY;

    canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        startCameraX = cameraX;
        startCameraY = cameraY;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        cameraX = startCameraX - dx;
        cameraY = startCameraY - dy;
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

function movingOnTouch() {
    let isDragging = false;
    let lastX = 0, lastY = 0;
    let velocityX = 0, velocityY = 0;
    let lastTime = 0;
    let rafId = null;

    const FRICTION = 0.95;

    function stopInertia() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
    }

    function startInertia() {
        function tick() {
            velocityX *= FRICTION;
            velocityY *= FRICTION;

            cameraX += velocityX;
            cameraY += velocityY;

            // Останавливаемся, когда скорость почти нулевая
            if (Math.abs(velocityX) < 0.1 && Math.abs(velocityY) < 0.1) {
                velocityX = 0;
                velocityY = 0;
                rafId = null;
                return;
            }

            rafId = requestAnimationFrame(tick);
        }
        rafId = requestAnimationFrame(tick);
    }

    canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length !== 1) return;

        stopInertia();
        isDragging = true;
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
        lastTime = performance.now();
        velocityX = 0;
        velocityY = 0;
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
        if (!isDragging || e.touches.length !== 1) return;

        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        const now = performance.now();

        const dx = (x - lastX) * dpr;
        const dy = (y - lastY) * dpr;
        const dt = now - lastTime || 16;   // защита от деления на 0

        // Скорость в пикселях за кадр (~16 мс)
        velocityX = -(dx / dt) * 16;
        velocityY = -(dy / dt) * 16;

        cameraX -= dx;
        cameraY -= dy;

        lastX = x;
        lastY = y;
        lastTime = now;
    }, { passive: false });

    canvas.addEventListener('touchend', () => {
        isDragging = false;
        startInertia();
    }, { passive: true });

    canvas.addEventListener('touchcancel', () => {
        isDragging = false;
        startInertia();
    }, { passive: true });
}

function movingCanvas() {
    movingOnMouse();
    movingOnTouch();
    movingOnWheel();
}

function setupCanvas(width = window.innerWidth, height = window.innerHeight) {
    canvas = document.getElementsByTagName('canvas')[0];
    ctx = canvas.getContext("2d");
    dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    movingCanvas();
    loop();
}

function update() {
    drawBackground();
}

function loop() {
    update();

    requestAnimationFrame(loop);
}

setupCanvas();
