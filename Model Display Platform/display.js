import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

// Loading screen variables
const loadingScreen = document.getElementById('loading-screen');
const loadingMessage = document.getElementById('loading-message');

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff); // Set background color to white
document.body.appendChild(renderer.domElement);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 4); // soft white light
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
scene.add(directionalLight);

// Resize handler
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

// Model loader
function loadModel(modelData) {
    // Show loading screen
    loadingScreen.style.display = 'flex';
    loadingMessage.textContent = 'Loading...';

    const mtlLoader = new MTLLoader();
    mtlLoader.load(modelData.mtl, function (materials) {
        materials.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(modelData.obj, function (object) {
            const boundingBox = new THREE.Box3().setFromObject(object);
            const size = new THREE.Vector3();
            boundingBox.getSize(size);
            
            const desiredSize = 9;
            const scaleFactor = desiredSize / size.length();
            console.log(scaleFactor);
            object.scale.set(scaleFactor, scaleFactor, scaleFactor);

            const center = new THREE.Vector3();
            boundingBox.getCenter(center);

            const centerY = scaleFactor / center.y
            console.log(centerY)

            camera.position.set(0, centerY, 11)
            controls.update();

            scene.add(object);
            //hide loading screen once model is loaded
            loadingScreen.style.display = 'none';

        }, onProgress, onError);
    });
}

function onProgress(xhr) {
    if (xhr.lengthComputable) {
        const percentComplete = xhr.loaded / xhr.total * 100;
        console.log('Model ' + Math.round(percentComplete, 2) + '% downloaded');
    }
}

function onError() {
    console.error('An error happened during model loading.');
}

// Fetch model data from JSON file
fetch('models.json')
    .then(response => response.json())
    .then(data => {
        const urlParams = new URLSearchParams(window.location.search);
        const modelKey = urlParams.get('model');
        console.log(modelKey)
        if (modelKey && data.models[modelKey]) {
            loadModel(data.models[modelKey]);
        } else {
            console.error('Model not found or no model specified');
        }
    })
    .catch(error => console.error('Error fetching model configurations:', error));


// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();