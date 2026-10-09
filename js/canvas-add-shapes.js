let pointHandler = null;
let points = [];
let shape;

function addRect() {
    canvas_mode = 'drawing_shape';
    shape = 'rect'

    pointHandler = (e) => {
        if (e.button !== 0) return;
        
        points.push([cameraX + mouseX, cameraY + mouseY]);
        
        if (points.length === 2) {
            canvas.removeEventListener('mousedown', pointHandler);
            pointHandler = null;

            const x1 = points[0][0];
            const y1 = points[0][1];
            const x2 = points[1][0];
            const y2 = points[1][1];

            const w = Math.abs(x2 - x1);
            const h = Math.abs(y2 - y1);
            const x = Math.min(x1, x2) + w;
            const y = Math.min(y1, y2) + h;

            const box = Bodies.rectangle(x, y, w, h);
            Composite.add(engine.world, box);
            points = [];

            canvas_mode = 'reading';
        }
    };

    canvas.addEventListener('mousedown', pointHandler);
}

function setShapePoint() {
    ctx.save();
    ctx.translate(-cameraX, -cameraY);

    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(mouseX + cameraX, mouseY + cameraY, 3, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();

    if (shape === 'rect' && points.length === 1) {
        let x = points[0][0];
        let y = points[0][1];
        let w = mouseX - x + cameraX;
        let h = mouseY - y + cameraY;

        ctx.beginPath();
        ctx.setLineDash([10, 5]);
        ctx.strokeRect(x, y, w, h);
        ctx.setLineDash([]);

        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
    }

    ctx.restore();
}