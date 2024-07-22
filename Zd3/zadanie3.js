import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'https://cdn.jsdelivr.net/npm/cannon-es@0.18.0/dist/cannon-es.js'; // Używaj cannon-es, ponieważ wspiera ES modules

let sphereBody, sphere;

function init() {
    let container = document.querySelector('.container');

    // Scena
    const scene = new THREE.Scene();

    // Kamera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 10;

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;  // Włącz mapowanie cieni
    container.appendChild(renderer.domElement);

    // Kula
    const sphereGeometry = new THREE.SphereGeometry(0.5, 100, 100);
    const material2 = new THREE.MeshPhongMaterial({ color: 'blue' });
    sphere = new THREE.Mesh(sphereGeometry, material2);
    sphere.castShadow = true;  // Włącz rzucanie cieni dla kuli
    scene.add(sphere);

    // Podłoże (dla odbierania cieni)
    const groundGeometry = new THREE.PlaneGeometry(5, 5);
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x999999 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = - Math.PI / 2;
    ground.receiveShadow = true;  // Włącz odbieranie cieni dla podłoża
    scene.add(ground);

    // Światło
    const light = new THREE.DirectionalLight(0xFFFFFF, 1);
    light.position.set(-6, 4, 6);
    light.castShadow = true;  // Włącz rzucanie cieni dla światła
    scene.add(light);

    const helper = new THREE.DirectionalLightHelper(light);
    scene.add(helper);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    controls.enableDamping = true;

    // CANNON JS
    // Świat
    let world = new CANNON.World(); // Tworzymy świat
    world.gravity.set(0, -9.8, 0); // Ustawiamy grawitację

    // Podłoże
    let groundBody = new CANNON.Body({ mass: 0 }); // Tworzymy ciało
    let groundShape = new CANNON.Plane(); // Tworzymy kształt
    groundBody.addShape(groundShape); // Łączymy
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2); // Obracamy do poziomu
    world.addBody(groundBody); // Dodajemy ciało do świata

    // Kula
    sphereBody = new CANNON.Body({
        mass: 9,
        position: new CANNON.Vec3(0, 5, 0) // Pozycja kuli
    });
    let sphereShape = new CANNON.Sphere(0.5); // 0.5 - promień kuli
    sphereBody.addShape(sphereShape);
    world.addBody(sphereBody);

    // Raycaster do wykrywania kliknięć
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseClick(event) {
        // Obliczanie pozycji myszy w znormalizowanych współrzędnych urządzenia (-1 do +1)
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Aktualizowanie raycastera za pomocą kamery i pozycji myszy
        raycaster.setFromCamera(mouse, camera);

        // Obliczanie obiektów przecinających promień
        const intersects = raycaster.intersectObjects([sphere]);

        if (intersects.length > 0) {
            // Resetowanie pozycji i prędkości kuli
            sphereBody.position.set(0, 5, 0);
            sphereBody.velocity.set(0, 0, 0);
            sphereBody.angularVelocity.set(0, 0, 0);
        }
    }

    window.addEventListener('click', onMouseClick, false);

    function animate() {
        requestAnimationFrame(animate);
        controls.update();

        world.step(1 / 60);

        // Kula
        sphere.position.copy(sphereBody.position);
        sphere.quaternion.copy(sphereBody.quaternion);

        renderer.render(scene, camera);
    }

    animate();
}

init();
