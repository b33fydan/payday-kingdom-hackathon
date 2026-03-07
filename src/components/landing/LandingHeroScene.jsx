import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { SCENE_BACKGROUND } from '../../utils/constants';
import { createBuilding, createCharacter, createMonster, createTree, createVoxel } from '../../utils/voxelBuilder';

function buildLandingIsland() {
  const root = new THREE.Group();
  const island = new THREE.Group();

  for (let x = -2; x <= 2; x += 1) {
    for (let z = -2; z <= 2; z += 1) {
      const lift = (Math.sin(x * 1.2) + Math.cos(z * 1.1)) * 0.04;
      island.add(createVoxel(x, -0.2 + lift, z, (x + z) % 2 === 0 ? '#4ade80' : '#22c55e', 0.96));
      island.add(createVoxel(x, -1.02, z, '#4b3621', 0.96));
    }
  }

  const water = new THREE.Mesh(
    new THREE.BoxGeometry(9.2, 0.32, 9.2),
    new THREE.MeshPhongMaterial({
      color: '#38bdf8',
      transparent: true,
      opacity: 0.52,
      shininess: 90,
    }),
  );
  water.position.set(0, -1.45, 0);
  water.receiveShadow = true;
  root.add(water, island);

  const building = createBuilding(-0.8, 0.4, 2, 2, 2, '#d6c39c');
  const hero = createCharacter(-0.2, -0.45, '#d1d5db', true);
  const housingMonster = createMonster(1.55, 0.3, '#ef4444', 'medium', 'housing');
  const utilityMonster = createMonster(1.2, -1.25, '#eab308', 'small', 'utilities');
  const phoneMonster = createMonster(-1.75, -0.95, '#8b5cf6', 'small', 'phone');

  root.add(
    building,
    createTree(-2.1, 1.35, 'pine'),
    createTree(2.05, 1.55, 'round'),
    createTree(-1.85, -1.7, 'oak'),
    hero,
    housingMonster,
    utilityMonster,
    phoneMonster,
    createVoxel(0.95, 0.2, 1.4, '#fbbf24', 0.42),
    createVoxel(1.28, 0.2, 1.4, '#fcd34d', 0.34),
    createVoxel(-0.95, 0.82, 1.85, '#92400e', 0.12),
    createVoxel(-0.65, 1.12, 1.85, '#fbbf24', 0.28),
  );

  return {
    root,
    hero,
    monsters: [housingMonster, utilityMonster, phoneMonster],
    water,
  };
}

export default function LandingHeroScene() {
  const containerRef = useRef(null);
  const [sceneError, setSceneError] = useState('');

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    let renderer;
    const compactViewport = (container.clientWidth || window.innerWidth) < 960;
    const pixelRatioCap = compactViewport ? 1.05 : 1.2;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: false,
        powerPreference: 'high-performance',
      });
    } catch {
      setSceneError('WebGL preview unavailable.');
      return undefined;
    }

    setSceneError('');
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, pixelRatioCap));
    renderer.setClearColor(SCENE_BACKGROUND);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog('#0b1310', 12, 24);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(7.2, 6.6, 7.8);
    camera.lookAt(0, 0.4, 0);

    scene.add(new THREE.AmbientLight('#d9f99d', 1.5));

    const sun = new THREE.DirectionalLight('#fff7d6', 2.3);
    sun.position.set(8, 10, 7);
    scene.add(sun);

    const rim = new THREE.DirectionalLight('#93c5fd', 0.8);
    rim.position.set(-6, 5, -7);
    scene.add(rim);

    const { root, hero, monsters, water } = buildLandingIsland();
    scene.add(root);

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, pixelRatioCap));
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    let frameId = 0;
    let lastRenderAt = 0;
    const renderFrame = (timestamp) => {
      if (timestamp - lastRenderAt < 1000 / 30) {
        frameId = window.requestAnimationFrame(renderFrame);
        return;
      }

      lastRenderAt = timestamp;
      root.rotation.y = Math.sin(timestamp * 0.00035) * 0.28 + 0.34;
      hero.position.y = Math.sin(timestamp * 0.0032) * 0.08;
      water.rotation.y = Math.sin(timestamp * 0.00018) * 0.08;

      monsters.forEach((monster, index) => {
        monster.position.y = Math.sin(timestamp * 0.0038 + index * 0.8) * 0.08;
        monster.rotation.y = Math.sin(timestamp * 0.0018 + index * 0.6) * 0.2;
      });

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(renderFrame);
    };

    frameId = window.requestAnimationFrame(renderFrame);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (sceneError) {
    return (
      <div className="flex h-full items-center justify-center rounded-[28px] border border-white/10 bg-black/35 px-6 text-center text-sm text-stone-200/80">
        {sceneError}
      </div>
    );
  }

  return <div ref={containerRef} className="h-full min-h-[320px] w-full" />;
}
