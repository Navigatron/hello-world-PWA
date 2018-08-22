'use strict';

var rotation = 0;
var velocity = 0;
var accel_range = 36;
var accel_min = 10;
var drag_quadratic = 0.001;
var drag_linear = 0.05;
var threshold = 0.1;
var spinning = false;

var arrow;

window.onload = function(){
    console.log("Window Loaded");
    arrow = document.getElementById('arrow');
    arrow.addEventListener("click", spin);
    arrow.addEventListener("touchstart", function(e){
        e.preventDefault();
        spin();
    });
    arrow.addEventListener("touchend", function(e){
        e.preventDefault();
    });
}

var spin = function(){
    console.log("You've poked the arrow.");
    let accel = Math.random()*accel_range+accel_min;
    if(spinning){
        velocity += accel;
    }else{
        velocity = accel;
        spinning = true;
        window.requestAnimationFrame(tick);
    }
}

var tick = function(timestamp){
    // Rotation
    rotation += velocity;
    // Linear Drag
    velocity -= velocity * drag_linear;
    // Quadratic Drag
    velocity -= velocity * velocity * drag_quadratic;
    // apply
    arrow.style.transform = 'rotate('+rotation+'deg)';
    if(velocity > threshold){
        window.requestAnimationFrame(tick);
    }else{
        velocity = 0;
        spinning = false;
    }
}
