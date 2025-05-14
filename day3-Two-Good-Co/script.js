const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function videoConAnimation(){
    var videoCon = document.querySelector("#video-container");
var playBtn = document.querySelector("#play");

videoCon.addEventListener("mouseenter", function () {
    gsap.to(playBtn, {
        opacity: 1,
        scale: 1,
    });
});

videoCon.addEventListener("mouseleave", function () {
    gsap.to(playBtn, {
        opacity: 0,
        scale: 0,
    });
});

videoCon.addEventListener("mousemove", function (dets) {
    gsap.to(playBtn, {
        left: dets.x-70,
        top: dets.y-80,
    });
});
}
videoConAnimation();

function loadingAnimation(){
    gsap.from('#page1 h1',{
    y:100,
    duration:.9,
    opacity:0,
    stagger:0.2,
    delay: 0.5,
    });
    gsap.from('#page1 #video-container',{
    scale: 0.9,
    duration:.3,
    opacity:0,
    delay: 1.3,
});
}
loadingAnimation();

document.addEventListener("mousemove", function(dets) {
    gsap.to('#cursor', {
        top: dets.y,
        left: dets.x,
        duration: 0.3,
        ease: "power2.out"
    });
});

document.querySelectorAll(".child").forEach(function(elem) {
    elem.addEventListener("mouseenter", function() {
        gsap.to("#cursor", {
            transform: "translate(-50%, -50%) scale(1)",
            duration: 0.3
        });
    });
    
    elem.addEventListener("mouseleave", function() {
        gsap.to("#cursor", {
            transform: "translate(-50%, -50%) scale(0)",
            duration: 0.3
        });
    });
});

// Add scroll trigger for navbar animations 
scroll.on('scroll', (args) => {
    if(args.scroll.y > 100) {
        gsap.to('#svg1', {
            y: -100,
            opacity: 0,
            duration: 0.3,
        });
        
        gsap.to('#svg2', {
            y: 0,
            opacity: 1,
            duration: 0.3,
        });

        gsap.to('#nav-part2 #links', {
            y: 100,
            opacity: 0,
            duration: 0.3,
        });
    } else {
        gsap.to('#svg1', {
            y: 0,
            opacity: 1,
            duration: 0.3,
        });
        
        gsap.to('#svg2', {
            y: 100,
            opacity: 0,
            duration: 0.3,
        });

        gsap.to('#nav-part2 #links', {
            y: 0,
            opacity: 1,
            duration: 0.3,
        });
    }
});
