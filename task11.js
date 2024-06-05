import * as THREE from "https://esm.sh/three";
import { OrbitControls } from "https://esm.sh/three/examples/jsm/controls/OrbitControls";
document.body.style.margin = 0;
document.body.style.overflow = 'hidden';
document.documentElement.style.margin = 0;
document.documentElement.style.overflow = 'hidden';
const scene = new THREE.Scene;
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometryCube = new THREE.BoxGeometry(1, 1, 1);
const geometrySphere = new THREE.SphereGeometry(1, 1, 1);
const geometryCone = new THREE.ConeGeometry(1, 1, 3);
const geometryTorusKnot = new THREE.TorusKnotGeometry(0.4, 0.4, 3, 3);
const geometryCylinder = new THREE.CylinderGeometry(1, 1, 1);
const geometriesArray = [
    geometryCone,
    geometryCube,
    geometrySphere,
    geometryCylinder,
    geometryTorusKnot
]
var randomGeometry = geometriesArray[Math.floor(Math.random() * geometriesArray.length)];
const material = new THREE.MeshBasicMaterial({color: getRandomColor()});
const geometry = new THREE.Mesh(randomGeometry, material);

function getPosition(){
    var xPos = THREE.MathUtils.randFloat(-6, 6);
    var yPos = THREE.MathUtils.randFloat(-4, 4);
    geometry.position.set(xPos, yPos, 0);
}
getPosition();

scene.add(geometry);

camera.position.z = 5;
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enabled = true;

function getRandomColor(){
    var randColor = '#'
    var letters = '0123456789ABCDEF'
    for (var i=0; i<6; i++){
        randColor += letters[Math.floor(Math.random() * 16)]
    }
    return randColor;
}
getRandomColor();

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

const raycaster = new THREE.Raycaster();

document.addEventListener("mousedown", onMouseDown);

function onMouseDown(event){
    const coordinates = new THREE.Vector2(
        (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
        -((event.clientY / renderer.domElement.clientHeight) * 2 - 1),
    );
    raycaster.setFromCamera(coordinates,camera);

    const intersections = raycaster.intersectObjects(scene.children, true);

    if(intersections.length > 0){
        var newGeometry;

        const selectedObject = intersections[0].object;

        const color = new THREE.Color(Math.random(),Math.random(),Math.random());
        selectedObject.material.color = color;

        newGeometry = geometriesArray[Math.floor(Math.random() * geometriesArray.length)];
        selectedObject.geometry = newGeometry;

        getPosition();
    }
}
