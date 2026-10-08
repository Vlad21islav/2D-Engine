let canvas;
let ctx;

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

    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);

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

function movingCanvas() {
    canvas.addEventListener('wheel', (e) => {
        e.preventDefault();

        cameraY += e.deltaY;
        cameraX += e.deltaX;

    }, { passive: false });
}

function setupCanvas(width = window.innerWidth, height = window.innerHeight) {
    canvas = document.getElementsByTagName('canvas')[0];
    ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
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
