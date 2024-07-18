import { animate, stagger } from 'motion';
import {
    BoxGeometry,
    BufferGeometry,
    MathUtils,
    Mesh,
    MeshLambertMaterial,
    PerspectiveCamera,
    PointLight,
    Scene,
    SphereGeometry,
    TorusKnotGeometry,
    WebGLRenderer
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

animate(
    'section.cover',
    {
        opacity: [0, 1],
    },
    { duration: 1 },
);

animate(
    'main.content',
    {
        opacity: [0, 1],
    },
    { duration: 1, delay: 1, },
);

animate(
    ".grid-menu div",
    {
        y: [-100, 0],
        opacity: [0, 1],
    },
    { duration: 1, delay: 0.5, delay: stagger(0.5) },
);

// LAYERS
const main = document.querySelector('main.content');
const container = document.createElement('div');
main.appendChild(container);

const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
camera.layers.enable(0); // enabled by default
camera.layers.enable(1);
// camera.layers.enable(2);

const scene = new Scene();

const renderer = new WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
container.appendChild(renderer.domElement);

const light = new PointLight(0xffffff, 3, 0, 0);
light.layers.enable(0);
light.layers.enable(1);
light.layers.enable(2);

scene.add(camera);
camera.add(light);

const colors = [0xffffff, 0xffffff, 0xff0055];
const geometry = new BoxGeometry(0.1, 0.01, 1);

for (let i = 0; i < 200; i++) {

    const layer = (i % 2);

    const object = new Mesh(geometry, new MeshLambertMaterial({ color: colors[layer] }));

    object.position.x = Math.random() * 40 - 20;
    object.position.y = Math.random() * 40 - 20;
    object.position.z = Math.random() * 40 - 20;

    object.rotation.x = Math.random() * 2 * Math.PI;
    object.rotation.y = Math.random() * 2 * Math.PI;
    object.rotation.z = Math.random() * 2 * Math.PI;

    object.scale.x = Math.random() + 0.5;
    object.scale.y = Math.random() + 0.5;
    object.scale.z = Math.random() + 0.5;

    object.layers.set(layer);

    scene.add(object);
};

camera.position.set(0, 10, 1);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 1;
controls.update();

const resize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};

const render = () => {
    controls.update();
    requestAnimationFrame(render);
    // renderer.setAnimationLoop(render);
    // camera.lookAt(scene.position);
    renderer.render(scene, camera);
};

render();
window.addEventListener("resize", resize);
