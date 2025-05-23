import React, { useEffect } from 'react';
import Lenis from 'lenis';
import "./index.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/all';


const App = () => {
  gsap.registerPlugin(ScrollTrigger)
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });

    lenis.on('scroll', (e) => {
      console.log(e);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  })

  useGSAP(() => {
    document.querySelectorAll(".elem").forEach(elem => {
    let image = elem.querySelector("img");
    let tl = gsap.timeline();
    let xTransform = gsap.utils.random(-100, 100);

    tl.set(image, {
        transformOrigin: `${xTransform < 0 ? 0 : '100%'}`,
    }, "start")
      .to(image, {
        scale: 0,
        ease: "none",
        scrollTrigger: {
            trigger: image,
            start: "top top",
            end: "bottom top",
            scrub: true,
        }
      }, "start")
      .to(elem, {
        xPercent: xTransform,
        ease: "none",
        scrollTrigger:{
          trigger: image,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      })
    });
  })

  // Optional: Helper function to set grid position styles
  const getGridStyle = (r, c) => ({ '--r': r, '--c': c });

  return (
    <div className="w-full bg-zinc-900">
      <div className="grid grid-cols-8 grid-rows-10 gap-2 overflow-hidden">
        <div className="elem col-span-1 row-span-1" style={getGridStyle(1, 3)}><img src="./img/1.jpg" alt="image 1" /></div>
        <div className="elem col-span-1 row-span-1" style={getGridStyle(1, 7)}><img src="./img/2.jpg" alt="image 2" /></div>
        <div className="elem col-span-1 row-span-1" style={getGridStyle(2, 2)}><img src="./img/3.jpg" alt="image 3" /></div>
        <div className="elem col-span-1 row-span-1" style={getGridStyle(2, 6)}><img src="./img/4.jpg" alt="image 4" /></div>
        <div className="elem col-span-1 row-span-1" style={getGridStyle(3, 4)}><img src="./img/5.jpg" alt="image 5" /></div>
        <div className="elem col-span-1 row-span-1" style={getGridStyle(3, 8)}><img src="./img/6.jpg" alt="image 6" /></div>
        <div className="elem col-span-1 row-span-1" style={getGridStyle(4, 1)}><img src="./img/7.jpg" alt="image 7" /></div>
        <div className="elem col-span-1 row-span-1" style={getGridStyle(4, 4)}><img src="./img/8.jpg" alt="image 8" /></div>
        <div className="elem col-span-1 row-span-1" style={getGridStyle(5, 2)}><img src="./img/9.jpg" alt="image 9" /></div>
        <div className="elem col-span-1 row-span-1" style={getGridStyle(5, 6)}><img src="./img/10.jpg" alt="image 10" /></div>
        <div className="elem col-span-1 row-span-1" style={getGridStyle(6, 3)}><img src="./img/11.jpg" alt="image 11" /></div>
        <div className="elem col-span-1 row-span-1" style={getGridStyle(6, 7)}><img src="./img/12.jpg" alt="image 12" /></div>
        <div className="elem col-span-1 row-span-1" style={getGridStyle(7, 5)}><img src="./img/13.jpg" alt="image 13" /></div>
        <div className="elem col-span-1 row-span-1" style={getGridStyle(7, 8)}><img src="./img/14.jpg" alt="image 14" /></div>
        <div className="elem col-span-1 row-span-1" style={getGridStyle(8, 1)}><img src="./img/15.jpg" alt="image 15" /></div>
        <div className="elem col-span-1 row-span-1" style={getGridStyle(8, 4)}><img src="./img/16.jpg" alt="image 16" /></div>
        <div className="elem col-span-1 row-span-1" style={getGridStyle(9, 2)}><img src="./img/17.jpg" alt="image 17" /></div>
        <div className="elem col-span-1 row-span-1" style={getGridStyle(9, 6)}><img src="./img/18.jpg" alt="image 18" /></div>
        <div className="elem col-span-1 row-span-1" style={getGridStyle(10, 3)}><img src="./img/19.jpg" alt="image 19" /></div>
        <div className="elem col-span-1 row-span-1" style={getGridStyle(10, 7)}><img src="./img/20.jpg" alt="image 20" /></div>
      </div>

      <div className="fixed top-0 left-0 font-['HelveticaNowDisplay Black'] w-full h-full flex flex-col items-center justify-center text-white">
        <h1 className="text-8xl uppercase mb-4">Thomas Vance <sup>®</sup></h1>
        <h2 className="text-5xl">並外れたファッション</h2>
      </div>

      <div className="w-full h-screen bg-[#d1d1d1] flex items-center justify-center mx-auto py-96 relative z-[999] text-center">
        <p className="text-5xl w-260 leading-[4.2rem] text-black font-regular text-left">
          From the dawn of civilisation onwards crowds have always undergone the influence of illusions. It is to the creators of illusions that they have raised more temples, statues, and altars than to any other class of men.
        </p>
      </div>
    </div>
  );
};

export default App;
