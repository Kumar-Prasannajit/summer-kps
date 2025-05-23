import { Canvas } from "@react-three/fiber";
import React from 'react';
import "./style.css";
import { OrbitControls } from "@react-three/drei";
import Cyl from "./Cyl";
import { Bloom, EffectComposer, ToneMapping } from '@react-three/postprocessing';

const App = () => {
  
  return (
    <>
      <Canvas flat camera={{ fov: 36}} style={{ width: '100%', height: '100vh' }}>
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      <ambientLight />
      <Cyl />
      <EffectComposer>
        <Bloom
          mipmapBlur
          intensity={6.0} // The bloom intensity.
          luminanceSmoothing={0} // smoothness of the luminance threshold. Range is [0, 1]
          luminanceThreshold={0}
        />
      </EffectComposer>
      </Canvas>
      <div className="fixed top-0 left-0 font-['HelveticaNowDisplay Black'] w-full h-full flex flex-col items-center justify-center text-white">
        <h1 className="text-6xl uppercase mb-4">Kumar Prasannajit<sup>®</sup></h1>
        <h2 className="text-4xl">कुमार प्रसन्नजित्</h2>
      </div>
      <div className="w-full h-screen bg-[#d1d1d1] flex items-center justify-center mx-auto py-96 relative z-[999] text-center">
        <p className="text-5xl w-260 leading-[4.2rem] text-black font-regular text-left">
          From the dawn of civilisation onwards crowds have always undergone the influence of illusions. It is to the creators of illusions that they have raised more temples, statues, and altars than to any other class of men.
        </p>
      </div>
    </>
  );
};

export default App