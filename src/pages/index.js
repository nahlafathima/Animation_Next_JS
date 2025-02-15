import { useEffect } from 'react';
import Head from 'next/head';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import Logo from '../components/Logo';
import Cubes from '../components/Cubes';
import Header1 from '../components/Header1';
import Header2 from '../components/Header2';
import About from '../components/About';
import { cubesData } from '../data/cubesData';

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    const interpolate = (start, end, progress) => {
      return start + (end - start) * progress;
    };

    const stickyHeight = window.innerHeight * 4;
    const stickySection = document.querySelector('.sticky');
    const logo = document.querySelector('.logo');
    const cubesContainer = document.querySelector('.cubes');
    const header1 = document.querySelector('.header-1');
    const header2 = document.querySelector('.header-2');

    ScrollTrigger.create({
      trigger: stickySection,
      start: 'top top',
      end: `+=${stickyHeight}px`,
      scrub: 1,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        // Logo animation
        const initialProgress = Math.min(self.progress * 20, 1);
        const logoOpacityProgress = self.progress >= 0.02 ? Math.min((self.progress - 0.02) * 100, 1) : 0;
        
        if (logo) {
          logo.style.filter = `blur(${interpolate(0, 20, initialProgress)}px)`;
          logo.style.opacity = 1 - logoOpacityProgress;
        }

        // Cubes container animation
        if (cubesContainer) {
          const cubesOpacityProgress = self.progress > 0.01 ? Math.min((self.progress - 0.01) * 100, 1) : 0;
          cubesContainer.style.opacity = cubesOpacityProgress;
        }

        // Headers animation
        if (header1) {
          const header1Progress = Math.min(self.progress * 2.5, 1);
          header1.style.transform = `translate(-50%, -50%) scale(${interpolate(1, 1.5, header1Progress)})`;
          header1.style.filter = `blur(${interpolate(0, 20, header1Progress)}px)`;
          header1.style.opacity = 1 - header1Progress;
        }

        if (header2) {
          const header2StartProgress = (self.progress - 0.4) * 10;
          const header2Progress = Math.max(0, Math.min(header2StartProgress, 1));
          const header2scale = interpolate(0.75, 1, header2Progress);
          const header2Blur = interpolate(10, 0, header2Progress);

          header2.style.transform = `translate(-50%, -50%) scale(${header2scale})`;
          header2.style.filter = `blur(${header2Blur}px)`;
          header2.style.opacity = header2Progress;
        }

        // Cubes animation
        const firstPhaseProgress = Math.min(self.progress * 2, 1);
        const secondPhaseProgress = self.progress >= 0.5 ? (self.progress - 0.5) * 2 : 0;

        Object.entries(cubesData).forEach(([cubeClass, data]) => {
          const cube = document.querySelector(`.${cubeClass}`);
          if (!cube) return;

          const { initial, final } = data;
          
          const currentTop = interpolate(initial.top, final.top, firstPhaseProgress);
          const currentLeft = interpolate(initial.left, final.left, firstPhaseProgress);
          const currentRotateX = interpolate(initial.rotateX, final.rotateX, firstPhaseProgress);
          const currentRotateY = interpolate(initial.rotateY, final.rotateY, firstPhaseProgress);
          const currentRotateZ = interpolate(initial.rotateZ, final.rotateZ, firstPhaseProgress);
          const currentZ = interpolate(initial.z, final.z, firstPhaseProgress);

          let additionalRotation = 0;
          if (cubeClass === 'cube-2') {
            additionalRotation = interpolate(0, 180, secondPhaseProgress);
          } else if (cubeClass === 'cube-4') {
            additionalRotation = interpolate(0, -180, secondPhaseProgress);
          }

          cube.style.top = `${currentTop}%`;
          cube.style.left = `${currentLeft}%`;
          cube.style.transform = `
            translate3d(-50%, -50%, ${currentZ}px)
            rotateX(${currentRotateX}deg)
            rotateY(${currentRotateY + additionalRotation}deg)
            rotateZ(${currentRotateZ}deg)
          `;
        });
      },
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <Head>
        <title>Cube Animation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <section className="sticky">
          <Logo />
          <Cubes />
          <Header1 />
          <Header2 />
        </section>
        <About />
      </main>
    </>
  );
}
