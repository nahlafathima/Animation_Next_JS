import { useEffect } from 'react';
import { cubesData } from '../data/cubesData';

export default function Cubes() {
  useEffect(() => {
    const cubesFaces = document.querySelectorAll('.cube > div');
    let imageCounter = 1;

    cubesFaces.forEach((face) => {
      const img = document.createElement('img');
      img.src = `/assets/img${imageCounter}.jpeg`;
      img.alt = `Cube Image ${imageCounter}`;
      face.appendChild(img);
      imageCounter++;
    });
  }, []);

  return (
    <div className="cubes">
      {Object.keys(cubesData).map((cubeClass) => {
        const { initial } = cubesData[cubeClass];
        return (
          <div
            key={cubeClass}
            className={`cube ${cubeClass}`}
            style={{
              top: `${initial.top}%`,
              left: `${initial.left}%`,
              transform: `
                translate3d(-50%, -50%, ${initial.z}px)
                rotateX(${initial.rotateX}deg)
                rotateY(${initial.rotateY}deg)
                rotateZ(${initial.rotateZ}deg)
              `
            }}
          >
            <div className="front"></div>
            <div className="back"></div>
            <div className="right"></div>
            <div className="left"></div>
            <div className="top"></div>
            <div className="bottom"></div>
          </div>
        );
      })}
    </div>
  );
}
