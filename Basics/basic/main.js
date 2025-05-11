import * as THREE from 'three';

// === Scene and Camera ===
const scene = new THREE.Scene();
scene.background = new THREE.Color('#f0f0f0');

const camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// === Geometry and Default Material ===
const geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshLambertMaterial({ color: '#468585', emissive: '#468585' });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// === Renderer ===
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// === Light Setup ===
let currentLight;

function setLight(type) {
    if (currentLight) scene.remove(currentLight);

    switch (type) {
        case 'directional':
            currentLight = new THREE.DirectionalLight(0x9CDBA6, 10);
            currentLight.position.set(1, 1, 1);
            break;
        case 'point':
            currentLight = new THREE.PointLight(0x9CDBA6, 10, 1000);
            currentLight.position.set(1, 1, 1);
            break;
        case 'ambient':
            currentLight = new THREE.AmbientLight(0x9CDBA6, 10);
            break;
        case 'spot':
            currentLight = new THREE.SpotLight(0x9CDBA6, 100);
            currentLight.position.set(5, 5, 5);
            currentLight.castShadow = true;
            break;
    }

    if (currentLight) scene.add(currentLight);
}

// Set initial light
setLight('directional');

// === Material Setup ===
function setMaterial(type) {
    let newMaterial;

    switch (type) {
        case 'lambert':
            newMaterial = new THREE.MeshLambertMaterial({ color: '#468585', emissive: '#468585' });
            break;
        case 'phong':
            newMaterial = new THREE.MeshPhongMaterial({ color: '#468585', shininess: 100 });
            break;
        case 'standard':
            newMaterial = new THREE.MeshStandardMaterial({ color: '#468585', roughness: 0.3, metalness: 0.6 });
            break;
        case 'basic':
            newMaterial = new THREE.MeshBasicMaterial({ color: '#468585' }); // not affected by light
            break;
        case 'toon':
            newMaterial = new THREE.MeshToonMaterial({ color: '#468585' });
            break;
    }

    if (newMaterial) {
        cube.material.dispose();
        cube.material = newMaterial;
    }
}

// Set initial material
setMaterial('lambert');

// === Keyboard Controls ===
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        // Lights
        case '1': setLight('directional'); console.log('Light: Directional'); break;
        case '2': setLight('point'); console.log('Light: Point'); break;
        case '3': setLight('ambient'); console.log('Light: Ambient'); break;
        case '4': setLight('spot'); console.log('Light: Spot'); break;

        // Materials
        case '5': setMaterial('lambert'); console.log('Material: Lambert'); break;
        case '6': setMaterial('phong'); console.log('Material: Phong'); break;
        case '7': setMaterial('standard'); console.log('Material: Standard'); break;
        case '8': setMaterial('basic'); console.log('Material: Basic'); break;
        case '9': setMaterial('toon'); console.log('Material: Toon'); break;
    }
});

// === Animate ===
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();
