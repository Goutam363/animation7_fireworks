const canvas=document.querySelector("canvas");
const c=canvas.getContext('2d');

canvas.height=window.innerHeight;
canvas.width=window.innerWidth;

const mouse={
    x: window.innerWidth/2,
    y: window.innerHeight/2
}

const n=700;
const gravity=0.1;
const friction=0.99;
const particleRadius=3;
const particlePower=15;

window.addEventListener('resize',function(){
    canvas.height=window.innerHeight;
    canvas.width=window.innerWidth;
})

//utility functions
function randomIntFromRange(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
function randomColor(color_palate){
    return color_palate[Math.floor(Math.random()*color_palate.length)];
}

//Objects
function Particle(x,y,radius,color,velocity)
{
    this.x=x;
    this.y=y;
    this.radius=radius;
    this.color=color;
    this.velocity=velocity;
    this.alpha=1;
    this.draw=function(){
        c.save();
        c.globalAlpha=this.alpha;
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fillStyle=this.color;
        c.fill();
        c.closePath();
        c.restore();
    };
    this.update=function(){
        this.draw();
        this.velocity.x*=friction;
        this.velocity.y*=friction;
        this.velocity.y+=gravity;
        this.x+=this.velocity.x;
        this.y+=this.velocity.y;
        this.alpha-=0.005;
    };
}

//Implementation
let particles
function init(){
    particles=[];
}

//Animation logo
function animate(){
    requestAnimationFrame(animate);
    c.fillStyle='rgba(0,0,0,0.05)';
    c.fillRect(0,0,canvas.width,canvas.height);
    particles.forEach((particle,i) => {
        if(particle.alpha>0){
            particle.update();
        }
        else{
            particles.splice(i,1);
        }
    });
}

init();
animate();

window.addEventListener('click',(event)=>{
    mouse.x=event.clientX;
    mouse.y=event.clientY;
    const angleIncrement=2*Math.PI/n;
    for(let i=0;i<n;i++)
        particles.push(new Particle(mouse.x,mouse.y,particleRadius,`hsl(${Math.random()*360},70%,50%)`,{x:Math.cos(angleIncrement*i)*Math.random()*particlePower,y:Math.sin(angleIncrement*i)*Math.random()*particlePower}));
})