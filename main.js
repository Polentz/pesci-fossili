import { animate, stagger, inView } from 'motion';
import {
    DirectionalLight,
    Mesh,
    MeshLambertMaterial,
    PerspectiveCamera,
    Scene,
    TorusKnotGeometry,
    WebGLRenderer
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

animate(
    '.grid-menu',
    {
        opacity: [0, 1],
    },
    { duration: 1 },
);

animate(
    ".sidebar li",
    {
        opacity: [0, 1],
    },
    { duration: 1, delay: stagger(0.35) },
);

// animate(
//     ".introduction-container",
//     {
//         y: [100, 0],
//         opacity: [0, 1],
//     },
//     { duration: 1 },
// );

// animate('.introduction-container p', { opacity: 0 });

// inView('.introduction-container p', (info) => {
//     animate(info.target, { opacity: 1 }, { duration: 1, delay: 0.25 })
// });

const object = (container, shape) => {
    const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
    const scene = new Scene();
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);

    const keyLight = new DirectionalLight(0xffffff, 1);
    keyLight.position.set(-1, 1, 3);
    camera.add(keyLight);

    const fillLigth = new DirectionalLight(0xffffff, 1);
    fillLigth.position.set(1, 1, 3);
    camera.add(fillLigth);

    const backLight = new DirectionalLight(0xffffff, 1);
    backLight.position.set(-1, 3, -1);
    camera.add(backLight);

    scene.add(camera);
    scene.add(shape);

    camera.position.set(0, 12, 12);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 3;
    controls.update();

    const resize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const render = () => {
        controls.update();
        renderer.setAnimationLoop(render);
        renderer.render(scene, camera);
    };

    render();
    window.addEventListener("resize", resize);
};

const createOne = () => {
    const container = document.querySelector("#bennet-content .shape-container");
    const geometry = new TorusKnotGeometry(3, 0.8, 300, 20, 8, 4);
    const material = new MeshLambertMaterial({ color: 0x987D9A });
    const shape = new Mesh(geometry, material);
    object(container, shape);
};

const createTwo = () => {
    const container = document.querySelector("#irigaray-content .shape-container");;
    // const geometry = new TorusKnotGeometry(2, 2, 300, 3, 2, 3);
    const geometry = new TorusKnotGeometry(3, 1, 300, 20, 10, 15);
    const material = new MeshLambertMaterial({ color: 0xFEFBD8 });
    const shape = new Mesh(geometry, material);
    object(container, shape);
};

const createThree = () => {
    const container = document.querySelector("#tripaldi-content .shape-container");;
    const geometry = new TorusKnotGeometry(3.5, 0.5, 300, 20, 10, 12);
    const material = new MeshLambertMaterial({ color: 0xEECEB9 });
    const shape = new Mesh(geometry, material);
    object(container, shape);
};

createOne();
createTwo();
createThree();

const drawerOpener = () => {
    const links = document.querySelectorAll(".link");
    const drawers = document.querySelectorAll(".content-drawer");
    const closeBtns = document.querySelectorAll(".close-btn");
    const mainContent = document.querySelector(".introduction-section");
    const mainContentParagraphs = mainContent.querySelectorAll("p");
    links.forEach(link => {
        const linkId = link.id;
        drawers.forEach(drawer => {
            const drawerId = drawer.id;
            link.addEventListener("click", () => {
                mainContent.classList.add("--opacity");
                if (drawerId.includes(linkId)) {
                    drawer.classList.add("--open");
                } else {
                    drawer.classList.remove("--open");
                };
            });
        });
    });
    closeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            drawers.forEach(drawer => {
                drawer.classList.remove("--open");
            });
            mainContent.classList.remove("--opacity");
        });
    });
};

drawerOpener();
