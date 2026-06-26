'use client';
import { useEffect, useRef } from 'react';

export default function HeroSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    let THREE: typeof import('three');
    let renderer: import('three').WebGLRenderer;
    let scene: import('three').Scene;
    let camera: import('three').PerspectiveCamera;
    let sphere: import('three').Points;
    let frameId: number;

    const init = async () => {
      THREE = await import('three');
      const canvas = canvasRef.current;
      if (!canvas) return;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
      camera.position.z = 2.8;

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(500, 500);
      renderer.setClearColor(0x000000, 0);

      // Build point-cloud sphere
      const geometry = new THREE.SphereGeometry(1, 64, 64);
      const positions = geometry.attributes.position;
      const colors: number[] = [];
      const color = new THREE.Color();

      for (let i = 0; i < positions.count; i++) {
        const t = i / positions.count;
        color.setHSL(0.54 + t * 0.05, 0.3, 0.7 + t * 0.2);
        colors.push(color.r, color.g, color.b);
      }

      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.018,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true,
      });

      sphere = new THREE.Points(geometry, material);
      scene.add(sphere);

      // Ambient glow ring
      const ringGeo = new THREE.TorusGeometry(1.15, 0.006, 16, 200);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xffc801, transparent: true, opacity: 0.4 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2.5;
      scene.add(ring);

      let t = 0;
      const animate = () => {
        frameId = requestAnimationFrame(animate);
        t += 0.004;
        sphere.rotation.y = t * 0.4;
        sphere.rotation.x = Math.sin(t * 0.3) * 0.15;
        ring.rotation.z = t * 0.12;
        renderer.render(scene, camera);
      };
      animate();
      animRef.current = frameId;
    };

    init();

    return () => {
      cancelAnimationFrame(animRef.current);
      renderer?.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="hero-sphere-canvas"
      aria-hidden="true"
      style={{
        width: '100%',
        maxWidth: '500px',
        height: 'auto',
        aspectRatio: '1',
        display: 'block',
      }}
    />
  );
}
