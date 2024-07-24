import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';


let scene, camera, renderer;

let particles, particleSystem;
const particleCount = 150; 
const waveSpeed = 0.003; 
const amplitude = 2; 

init();
animate();

function init() {
    // Ustawienia sceny
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); 

    // Ustawienia kamery
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10; 
    camera.position.y = -20; 
    camera.lookAt(new THREE.Vector3(0, 0, 0)); 

    // Ustawienia renderera
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight); 
    document.body.appendChild(renderer.domElement); 

    // Ustawienia cząsteczek
    const geometry = new THREE.BufferGeometry(); // Geometria cząsteczek
    const positions = []; // Tablica pozycji cząsteczek

    for (let i = 0; i < particleCount; i++) {
        const x = (i % 30) - 15; // Współrzędna X
        const y = Math.floor(i / 50) - 10; // Współrzędna Y
        const z = 0; // Współrzędna Z
        positions.push(x, y, z); // Dodanie współrzędnych do tablicy
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3)); // Ustawienie atrybutu pozycji

    // Ładowanie tekstury cząsteczek
    const textureLoader = new THREE.TextureLoader();
    const particleTexture = textureLoader.load('https://threejs.org/examples/textures/sprites/disc.png');

    // Materiał dla cząsteczek
    const material = new THREE.PointsMaterial({
        size: 1.5, 
        map: particleTexture, 
        alphaTest: 0.5, // Test alfy dla przezroczystości
        transparent: true, // Przezroczystość
        color: 0x0077ff 
    });

    particleSystem = new THREE.Points(geometry, material); // Utworzenie systemu cząsteczek
    scene.add(particleSystem); // Dodanie systemu cząsteczek do sceny
}

function animate() {
    requestAnimationFrame(animate); 

    const positions = particleSystem.geometry.attributes.position.array; // Pobranie tablicy pozycji

    for (let i = 0; i < particleCount * 3; i += 3) {
        const x = positions[i]; // Współrzędna X
        positions[i + 4] = amplitude * Math.sin(x * 0.5 + performance.now() * waveSpeed); // Aktualizacja współrzędnej Z dla efektu fali
    }

    particleSystem.geometry.attributes.position.needsUpdate = true; // Oznaczenie atrybutu pozycji jako wymagającego aktualizacji

    renderer.render(scene, camera); 
}