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
    // We are alive!
    console.log("Window Loaded");
    // Get the arrow image for later reference
    arrow = document.getElementById('arrow');
    // Make it spin when we click it
    arrow.addEventListener("click", spin);
    // Make it spin when we touch it
    arrow.addEventListener("touchstart", function(e){
        e.preventDefault();
        spin();
    });
    // Make the iPhone not do that zooming thing when you touch it a lot.
    arrow.addEventListener("touchend", function(e){
        e.preventDefault();
    });
    // Let's see if we're in the iPhone app or not, just for fun.
    if(window.navigator.standalone){
        console.log("We are in Web-App Mode on an iPhone");
    }else{
        console.log("We are NOT in web-app mode on an iPhone.");
    }
    // Let's register a service worker so we can do this offline
    if('serviceWorker' in navigator) {
        console.log("[service-worker] Attempting to Register...");
        navigator.serviceWorker.register("./service-worker.js").then(
            function() {
                console.log("[service-worker] Registered Successfully!");
            },
            function(){
                console.log("[service-worker] Registration Failed.");
            }
        );
    }
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
