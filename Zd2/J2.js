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
const stoneTexture = textureLoader.load('1626899463_24-kartinkin-com-p-tekstura-planeti-besshovnaya-krasivo-32.jpg');
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
plane.position.y = -1.3; // Umieszczenie płaszczyzny pod kulą
scene.add(plane); 

//  (Cylinder)
const baseGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.2, 32);
const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
const base = new THREE.Mesh(baseGeometry, baseMaterial);
base.position.y = -1.1; 
scene.add(base);

const cylinderGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.3, 32);
const cylinderMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinder.position.y = 1; 
scene.add(cylinder);

const supportGeometry = new THREE.TorusGeometry(1.2, 0.05, 8, 100);
const supportMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
const support = new THREE.Mesh(supportGeometry, supportMaterial);
scene.add(support);

// Dodanie kontroli orbity
const controls = new OrbitControls(camera, renderer.domElement);

//Background
const backgroundTexture = textureLoader.load('back5.jpg');
scene.background = backgroundTexture;


// Animowanie kuli
function animate() {
  requestAnimationFrame(animate);

  sphere.rotation.y += 0.02;
  plane.rotation.z += 0.02;
  base.rotation.y += 0.02;
  support.rotation.y -= 0.02;
  // Aktualizacja kontroli
  controls.update();

  renderer.render(scene, camera);
}

// Uruchomienie animacji
animate();

