const canvas = document.querySelector('.cloud');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');
const circleAmount = 40;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = 'rgba(225, 228, 53, 0.4)';
    this.shadowBlur = 150;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2 , true);
        c.shadowColor = this.color;
        c.shadowBlur = this.shadowBlur;
        c.fillStyle = this.color;
        c.fill();
        
    };

    this.update = function() {
        if (this.x + radius > innerWidth || this.x - radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y > innerHeight - radius - 100 || this.y - radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    };
} 



const circleArr = [];
const circleDesc = {
    amount: 45,
    xSpeed: 0.7,
    ySpeed: 0.65,
    rMin: 170,
    rRange: 200,
    bottomOffset: 120,
}

for (let i = 0; i <= circleDesc.amount; i++) {
    let radius = Math.random() * circleDesc.rMin + circleDesc.rRange;
    let x = Math.random() * (window.innerWidth);
    let y = Math.random() * (window.innerHeight - radius - circleDesc.bottomOffset);
    let dx = Math.random() - circleDesc.xSpeed;
    let dy = Math.random() - circleDesc.ySpeed;

    circleArr.push(new Circle(x, y, dx, dy, radius));   
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circleArr.length; i++) {
        circleArr[i].update();        
    }
}

animate();   