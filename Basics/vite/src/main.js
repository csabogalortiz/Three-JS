import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const canvas = document.getElementById('canvas');

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFFFFF);


// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Object
const geometry = new THREE.DodecahedronGeometry();  
let material = new THREE.MeshLambertMaterial({ color: '#468585', emissive: '#537DFF' });
const dodecahedron = new THREE.Mesh(geometry, material);

const BoxGeometry = new THREE.BoxGeometry(2, 0.1, 2);
let boxMaterial = new THREE.MeshBasicMaterial({ 
    color: '#A55BF7', 
    emissive: '#A55BF7' 
  });const box = new THREE.Mesh(BoxGeometry, boxMaterial);
box.position.y = -1.5;

scene.add(dodecahedron)
scene.add(box);

// Light
const light = new THREE.SpotLight(0xFFFFFF, 10);
light.position.set(1,1,1)
scene.add(light);

const bottomLight = new THREE.SpotLight(0xffffff, 0.5);
bottomLight.position.set(0, -5, 5);  // below the object
scene.add(bottomLight);



// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);


// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;    
controls.enablePan = true;  

// Animation
function animate() {
    requestAnimationFrame(animate); // ⬅️ keep the loop going
  
    dodecahedron.rotation.x += 0.01;
    dodecahedron.rotation.y += 0.01;
  
    box.rotation.y += 0.005;
    controls.update();
  
    renderer.render(scene, camera);
  }

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

animate ()