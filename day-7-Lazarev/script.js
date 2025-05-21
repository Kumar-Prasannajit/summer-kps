const btmNav = document.querySelector('#btm-nav');
const btmNavLinks = document.querySelectorAll('.dropdown a');

// Set initial state
gsap.set(".dropdown", {
    scaleY: 0,
    opacity: 0,
    visibility: 'hidden',
    transformOrigin: "top center"
});

// Add event listeners
btmNav.addEventListener('mouseenter', () => {
    const tl = gsap.timeline();
    
    tl.to(".dropdown", {
        scaleY: 1,
        opacity: 1,
        visibility: 'visible',
        duration: 1,
        ease: 'power2.out',
        transformOrigin: "top center"
    })

    tl.to(btmNavLinks, {
        display: "block",
    })

    tl.from(".dropdown a span",{
        y: 25,
        stagger: {
            amount: 0.65
        },
    }, "-=1.5")
});

btmNav.addEventListener('mouseleave', () => {
    gsap.to(".dropdown", {
        scaleY: 0,
        opacity: 0,
        visibility: 'hidden',
        duration: 0
    });
});