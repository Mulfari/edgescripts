import React, { useEffect, useRef } from 'react';
import Delaunator from 'delaunator';

const Stars = ({ width, height }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let mouse = { x: width / 2, y: height / 2 };
    const particleCount = 40, flareCount = 10, motion = 0.05, tilt = 0.05, color = '#FFEED4',
          particleSizeBase = 1, particleSizeMultiplier = 0.5, lineWidth = 1, linkChance = 75, linkLengthMin = 5,
          linkLengthMax = 7, linkOpacity = 0.25, linkFade = 90, linkSpeed = 1, glareAngle = -60,
          glareOpacityMultiplier = 0.05, renderParticles = true, renderParticleGlare = true, renderLinks = true,
          renderMesh = false, flicker = true, flickerSmoothing = 15, blurSize = 0, orbitTilt = true,
          randomMotion = true, noiseLength = 1000, noiseStrength = 1, renderFlares = true;

    let c = 1000, n = 0, nAngle = (Math.PI * 2) / noiseLength, nRad = 100, nScale = 0.5, nPos = {x: 0, y: 0},
        points = [], vertices = [], triangles = [], links = [], particles = [], flares = [];

    const random = (min, max, float) => float ? Math.random() * (max - min) + min : Math.floor(Math.random() * (max - min + 1)) + min;

    class Particle {
      constructor() {
        this.x = random(-0.1, 1.1, true);
        this.y = random(-0.1, 1.1, true);
        this.z = random(0, 4);
        this.color = color;
        this.opacity = random(0.1, 1, true);
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

    class Flare {
      constructor() {
        this.x = random(-0.25, 1.25, true);
        this.y = random(-0.25, 1.25, true);
        this.z = random(0, 2);
        this.color = color;
        this.opacity = random(0.001, 0.01, true);
      }

      render() {
        const pos = position(this.x, this.y, this.z);
        const r = ((this.z * particleSizeMultiplier) + particleSizeBase) * (sizeRatio() / 1000);

        context.globalAlpha = this.opacity;
        context.beginPath();
        context.arc(pos.x, pos.y, r, 0, 2 * Math.PI, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
        context.globalAlpha = 1;
      }
    }

    class Link {
      constructor(startVertex, numPoints) {
        this.length = numPoints;
        this.verts = [startVertex];
        this.stage = 0;
        this.linked = [startVertex];
        this.distances = [];
        this.traveled = 0;
        this.fade = 0;
        this.finished = false;
      }

      render() {
        const stages = {
          0: this.vertexCollectionStage,
          1: this.renderLineStage,
          2: this.fadeOutStage,
          3: this.finishedStage,
        };

        stages[this.stage].call(this);
      }

      vertexCollectionStage() {
        const last = particles[this.verts[this.verts.length - 1]];

        if (last && last.neighbors && last.neighbors.length > 0) {
          const neighbor = last.neighbors[random(0, last.neighbors.length - 1)];

          if (this.verts.indexOf(neighbor) === -1) {
            this.verts.push(neighbor);
          }
        } else {
          this.stage = 3;
          this.finished = true;
        }

        if (this.verts.length >= this.length) {
          for (let i = 0; i < this.verts.length - 1; i++) {
            const p1 = particles[this.verts[i]];
            const p2 = particles[this.verts[i + 1]];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            this.distances.push(dist);
          }

          this.stage = 1;
        }
      }

      renderLineStage() {
        if (this.distances.length > 0) {
          const points = [];
          this.traveled += linkSpeed * 0.00001 * canvas.width;
          const d = this.distances[this.linked.length - 1];

          if (this.traveled >= d) {
            this.traveled = 0;
            this.linked.push(this.verts[this.linked.length]);
            const p = particles[this.linked[this.linked.length - 1]];
            const pos = position(p.x, p.y, p.z);
            points.push([pos.x, pos.y]);

            if (this.linked.length >= this.verts.length) {
              this.stage = 2;
            }
          } else {
            const a = particles[this.linked[this.linked.length - 1]];
            const b = particles[this.verts[this.linked.length]];
            const t = d - this.traveled;
            const x = ((this.traveled * b.x) + (t * a.x)) / d;
            const y = ((this.traveled * b.y) + (t * a.y)) / d;
            const z = ((this.traveled * b.z) + (t * a.z)) / d;

            const pos = position(x, y, z);
            points.push([pos.x, pos.y]);
          }

          this.drawLine(points);
        } else {
          this.stage = 3;
          this.finished = true;
        }
      }

      fadeOutStage() {
        if (this.verts.length > 1) {
          if (this.fade < linkFade) {
            this.fade++;
            const points = [];
            const alpha = (1 - (this.fade / linkFade)) * linkOpacity;
            for (let i = 0; i < this.verts.length; i++) {
              const p = particles[this.verts[i]];
              const pos = position(p.x, p.y, p.z);
              points.push([pos.x, pos.y]);
            }
            this.drawLine(points, alpha);
          } else {
            this.stage = 3;
            this.finished = true;
          }
        } else {
          this.stage = 3;
          this.finished = true;
        }
      }

      finishedStage() {
        this.finished = true;
      }

      drawLine(points, alpha) {
        if (typeof alpha !== 'number') alpha = linkOpacity;

        if (points.length > 1 && alpha > 0) {
          context.globalAlpha = alpha;
          context.beginPath();
          for (let i = 0; i < points.length - 1; i++) {
            context.moveTo(points[i][0], points[i][1]);
            context.lineTo(points[i + 1][0], points[i + 1][1]);
          }
          context.strokeStyle = color;
          context.lineWidth = lineWidth;
          context.stroke();
          context.closePath();
          context.globalAlpha = 1;
        }
      }
    }

    const init = () => {
      resize();
      mouse.x = canvas.clientWidth / 2;
      mouse.y = canvas.clientHeight / 2;

      for (let i = 0; i < particleCount; i++) {
        const p = new Particle();
        particles.push(p);
        points.push([p.x * canvas.width, p.y * canvas.height]);
      }

      const delaunay = Delaunator.from(points);
      vertices = delaunay.triangles;

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

      if (renderFlares) {
        for (let i = 0; i < flareCount; i++) {
          flares.push(new Flare());
        }
      }

      if ('ontouchstart' in document.documentElement && window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (e) => {
          mouse.x = (canvas.clientWidth / 2) - ((e.gamma / 90) * (canvas.clientWidth / 2) * 2);
          mouse.y = (canvas.clientHeight / 2) - ((e.beta / 90) * (canvas.clientHeight / 2) * 2);
        }, true);
      } else {
        document.body.addEventListener('mousemove', (e) => {
          mouse.x = e.clientX;
          mouse.y = e.clientY;
        });
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

      if (renderMesh) {
        context.beginPath();
        for (let v = 0; v < vertices.length - 1; v++) {
          if ((v + 1) % 3 === 0) continue;

          const p1 = particles[vertices[v]];
          const p2 = particles[vertices[v + 1]];

          const pos1 = position(p1.x, p1.y, p1.z);
          const pos2 = position(p2.x, p2.y, p2.z);

          context.moveTo(pos1.x, pos1.y);
          context.lineTo(pos2.x, pos2.y);
        }
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.stroke();
        context.closePath();
      }

      if (renderLinks) {
        if (random(0, linkChance) === linkChance) {
          const length = random(linkLengthMin, linkLengthMax);
          const start = random(0, particles.length - 1);
          startLink(start, length);
        }

        for (let l = links.length - 1; l >= 0; l--) {
          if (links[l] && !links[l].finished) {
            links[l].render();
          } else {
            delete links[l];
          }
        }
      }

      if (renderFlares) {
        for (let j = 0; j < flareCount; j++) {
          flares[j].render();
        }
      }
    }

    const resize = () => {
      canvas.width = width;
      canvas.height = height;
    }

    const startLink = (vertex, length) => {
      links.push(new Link(vertex, length));
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
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-10"
      id="stars"
    />
  );
}

export default Stars;
