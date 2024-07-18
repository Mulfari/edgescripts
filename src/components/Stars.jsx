import React, { useEffect, useRef } from 'react';

const Stars = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let mouse = { x: 0, y: 0 };
    const particleCount = 40, flareCount = 10, motion = 0.05, tilt = 0.05, color = '#FFEED4',
          particleSizeBase = 1, particleSizeMultiplier = 0.5, lineWidth = 1, linkChance = 75, linkLengthMin = 5,
          linkLengthMax = 7, linkOpacity = 0.25, linkFade = 90, linkSpeed = 1, glareAngle = -60,
          glareOpacityMultiplier = 0.05, renderParticles = true, renderParticleGlare = true, renderLinks = true,
          renderMesh = false, flicker = true, flickerSmoothing = 15, blurSize = 0, orbitTilt = true,
          randomMotion = true, noiseLength = 1000, noiseStrength = 1;
    
    let c = 1000, n = 0, nAngle = (Math.PI * 2) / noiseLength, nRad = 100, nScale = 0.5, nPos = {x: 0, y: 0},
        points = [], vertices = [], triangles = [], links = [], particles = [], flares = [];

    const random = (min, max, float) => float ? Math.random() * (max - min) + min : Math.floor(Math.random() * (max - min + 1)) + min;

    class Particle {
      constructor() {
        this.x = random(-0.1, 1.1, true);
        this.y = random(-0.1, 1.1, true);
        this.z = random(0,4);
        this.color = color;
        this.opacity = random(0.1,1,true);
        this.flicker = 0;
        this.neighbors = [];
      }

      render() {
        const pos = position(this.x, this.y, this.z);
        let r = ((this.z * particleSizeMultiplier) + particleSizeBase) * (sizeRatio() / 1000);
        let o = this.opacity;

        if (flicker) {
          const newVal = random(-0.5, 0.5, true);
          this.flicker += (newVal - this.flicker) / flickerSmoothing;
          if (this.flicker > 0.5) this.flicker = 0.5;
          if (this.flicker < -0.5) this.flicker = -0.5;
          o += this.flicker;
          if (o > 1) o = 1;
          if (o < 0) o = 0;
        }

        context.fillStyle = this.color;
        context.globalAlpha = o;
        context.beginPath();
        context.arc(pos.x, pos.y, r, 0, 2 * Math.PI, false);
        context.fill();
        context.closePath();

        if (renderParticleGlare) {
          context.globalAlpha = o * glareOpacityMultiplier;
          context.ellipse(pos.x, pos.y, r * 100, r, (glareAngle - ((nPos.x - 0.5) * noiseStrength * motion)) * (Math.PI / 180), 0, 2 * Math.PI, false);
          context.fill();
          context.closePath();
        }

        context.globalAlpha = 1;
      }
    }

    const init = () => {
      resize();
      mouse.x = canvas.clientWidth / 2;
      mouse.y = canvas.clientHeight / 2;

      for (let i = 0; i < particleCount; i++) {
        const p = new Particle();
        particles.push(p);
        points.push([p.x*c, p.y*c]);
      }

      vertices = Delaunay.triangulate(points);
      let tri = [];
      for (let i = 0; i < vertices.length; i++) {
        if (tri.length === 3) {
          triangles.push(tri);
          tri = [];
        }
        tri.push(vertices[i]);
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = 0; j < triangles.length; j++) {
          let k = triangles[j].indexOf(i);
          if (k !== -1) {
            triangles[j].forEach((value) => {
              if (value !== i && particles[i].neighbors.indexOf(value) === -1) {
                particles[i].neighbors.push(value);
              }
            });
          }
        }
      }

      if (randomMotion) {
        n = 0;
      }

      (function animloop(){
        requestAnimationFrame(animloop);
        resize();
        render();
      })();
    }

    const render = () => {
      if (randomMotion) {
        n++;
        if (n >= noiseLength) {
          n = 0;
        }

        nPos = noisePoint(n);
      }

      context.clearRect(0, 0, canvas.width, canvas.height);

      if (blurSize > 0) {
        context.shadowBlur = blurSize;
        context.shadowColor = color;
      }

      if (renderParticles) {
        for (let i = 0; i < particleCount; i++) {
          particles[i].render();
        }
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
      canvas.height = canvas.width * (canvas.clientHeight / canvas.clientWidth);
    }

    const noisePoint = (i) => {
      const a = nAngle * i;
      const cosA = Math.cos(a);
      const sinA = Math.sin(a);
      const rad = nRad;
      return {
        x: rad * cosA,
        y: rad * sinA
      };
    }

    const position = (x, y, z) => {
      return {
        x: (x * canvas.width) + ((((canvas.width / 2) - mouse.x + ((nPos.x - 0.5) * noiseStrength)) * z) * motion),
        y: (y * canvas.height) + ((((canvas.height / 2) - mouse.y + ((nPos.y - 0.5) * noiseStrength)) * z) * motion)
      };
    }

    const sizeRatio = () => {
      return canvas.width >= canvas.height ? canvas.width : canvas.height;
    }

    if (canvas) init();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="block w-full h-screen relative z-10"
      id="stars"
    />
  );
}

export default Stars;
