import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Tworzenie sceny
const scene = new THREE.Scene();

// Tworzenie kamery
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// Pozycja kamery
camera.position.z = 5;
camera.position.y = 3;
camera.lookAt(0, 0, 0);

// Tworzenie renderera
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Dodanie światła
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 5, 5);
scene.add(light);

// Ładowanie tekstur
const textureLoader = new THREE.TextureLoader();
const stoneTexture = textureLoader.load('zemia.jpg');
const metalTexture = textureLoader.load('metal-5.jpg');

// Tworzenie geometrii kuli i materiału
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshPhongMaterial({ map: stoneTexture });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

scene.add(sphere); // Dodanie kuli do sceny

// Tworzenie geometrii płaszczyzny i materiału
const planeGeometry = new THREE.PlaneGeometry(5, 5);
const planeMaterial = new THREE.MeshPhongMaterial({ map: metalTexture });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; // Obrót płaszczyzny o 90 stopni
plane.position.y = -1; // Umieszczenie płaszczyzny pod kulą
scene.add(plane); 

// Dodanie kontroli orbity
const controls = new OrbitControls(camera, renderer.domElement);

// Animowanie kuli
function animate() {
  requestAnimationFrame(animate);

  sphere.rotation.y += 0.03;

  // Aktualizacja kontroli
  controls.update();

  renderer.render(scene, camera);
}

// Uruchomienie animacji
animate();
