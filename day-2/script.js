const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim() {
    var tl = gsap.timeline();

    tl.from('#nav', {
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease: 'Expo.easeInOut'
    })
    .to('.boundingelem', {
        y: 0,
        duration: 1.5,
        delay: -1,
        ease: 'Expo.easeInOut',
        stagger: .2,
    })
    .from('#herofooter', {
        y: 10,
        opacity: 0,
        duration: 1,
        delay: -.8,
        ease: 'Expo.easeInOut'
    })
}

let xscale = 1;
let yscale = 1;
let xprev = 0;
let yprev = 0;
let timeout;

let mouseX = 0;
let mouseY = 0;

function circleMouseFollower(dets){ 
    mouseX = dets.clientX;
    mouseY = dets.clientY;
    
    const minicircle = document.querySelector("#minicircle");
    requestAnimationFrame(() => {
        const scrolled = scroll.scroll ? scroll.scroll.instance.scroll.y : 0;
        minicircle.style.transform = `translate(${mouseX}px, ${mouseY + scrolled}px) scale(${xscale}, ${yscale})`;
    });
}

function squeezeMiniCircle(){
    window.addEventListener('mousemove', function(dets){
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(dets);

        timeout = setTimeout(() => {
            const scrolled = scroll.scroll ? scroll.scroll.instance.scroll.y : 0;
            document.querySelector('#minicircle').style.transform = `translate(${mouseX}px, ${mouseY + scrolled}px) scale(1, 1)`;
        }, 100);
    });
}

// Update scroll event listener
scroll.on('scroll', (args) => {
    const scrolled = args.scroll.y;
    const minicircle = document.querySelector("#minicircle");
    minicircle.style.transform = `translate(${mouseX}px, ${mouseY + scrolled}px) scale(${xscale}, ${yscale})`;
});

document.querySelectorAll('#elem').forEach(function(elem){
    let rotate = 0;
    let diffrotate = 0;

    // Add mouseleave event handler
    elem.addEventListener('mouseleave', function(){
        gsap.to(elem.querySelector('img'), {
            opacity: 0,
            ease: Power2,
            duration: 0.5
        });
    });

    elem.addEventListener('mousemove', function(details){
        var diff = details.clientY - elem.getBoundingClientRect().top;
        diffrotate = details.clientX - rotate;
        rotate = details.clientX;
        
        gsap.to(elem.querySelector('img'), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: details.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrotate*0.8),
        });
    });
});

squeezeMiniCircle();
firstPageAnim();