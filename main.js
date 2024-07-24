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

// animate(
//     ".sidebar li",
//     {
//         opacity: [0, 1],
//     },
//     { duration: 1, delay: stagger(0.35) },
// );

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
    const element = document.querySelector(".shape-container");
    const positionInfo = element.getBoundingClientRect();
    const elementHeight = positionInfo.height;
    const elementWidth = positionInfo.width;

    // const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
    const camera = new PerspectiveCamera(70, elementWidth / elementHeight, 0.1, 100);
    const scene = new Scene();
    const renderer = new WebGLRenderer({ antialias: true });

    renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(elementWidth, elementHeight);
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

    camera.position.set(1, 1, 15);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 3;
    controls.update();

    const resize = () => {
        // camera.aspect = window.innerWidth / window.innerHeight;
        camera.aspect = elementWidth / elementHeight;
        camera.updateProjectionMatrix();
        // renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setSize(elementWidth, elementHeight);
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
    const geometry = new TorusKnotGeometry(3.5, 0.8, 300, 20, 8, 4);
    const material = new MeshLambertMaterial({ color: 0x987D9A });
    const shape = new Mesh(geometry, material);
    object(container, shape);
};

const createTwo = () => {
    const container = document.querySelector("#caillois-content .shape-container");
    const geometry = new TorusKnotGeometry(3, 2, 66, 3, 20, 1);
    const material = new MeshLambertMaterial({ color: 0xFFAAAA });
    const shape = new Mesh(geometry, material);
    object(container, shape);
};

const createThree = () => {
    const container = document.querySelector("#irigaray-content .shape-container");
    // const geometry = new TorusKnotGeometry(4, 0.8, 34, 20, 6, 9);
    const geometry = new TorusKnotGeometry(3.5, 0.6, 300, 20, 1, 7);
    const material = new MeshLambertMaterial({ color: 0xFEFBD8 });
    const shape = new Mesh(geometry, material);
    object(container, shape);
};

const createFour = () => {
    const container = document.querySelector("#tripaldi-content .shape-container");;
    const geometry = new TorusKnotGeometry(3.5, 0.8, 300, 20, 10, 12);
    const material = new MeshLambertMaterial({ color: 0xEECEB9 });
    const shape = new Mesh(geometry, material);
    object(container, shape);
};

const createFive = () => {
    const container = document.querySelector("#manin-content .shape-container");;
    const geometry = new TorusKnotGeometry(2, 2.5, 52, 8, 9, 3);
    const material = new MeshLambertMaterial({ color: 0xF6FB7A });
    const shape = new Mesh(geometry, material);
    object(container, shape);
};

const createSix = () => {
    const container = document.querySelector("#castrovillari-content .shape-container");;
    // const geometry = new TorusKnotGeometry(2.5, 2.5, 300, 3, 2, 3);
    const geometry = new TorusKnotGeometry(3.5, 0.8, 300, 20, 8, 6);
    const material = new MeshLambertMaterial({ color: 0xBEC6A0 });
    const shape = new Mesh(geometry, material);
    object(container, shape);
};

const createSeven = () => {
    const container = document.querySelector("#rigal-content .shape-container");;
    const geometry = new TorusKnotGeometry(3.2, 0.8, 300, 20, 4, 10);
    const material = new MeshLambertMaterial({ color: 0x77E4C8 });
    const shape = new Mesh(geometry, material);
    object(container, shape);
};

createOne();
createTwo();
createThree();
createFour();
createFive();
createSix();
createSeven();

const openElement = (trigger, element, className) => {
    document.getElementById(trigger).addEventListener("click", (event) => {
        document.getElementById(element).classList.toggle(className);
        event.stopPropagation();
    });
};

const drawerOpener = () => {
    const links = document.querySelectorAll(".content-index .sidebar-items");
    const drawers = document.querySelectorAll(".content-drawer");
    links.forEach(link => {
        const linkId = link.id;
        drawers.forEach(drawer => {
            const drawerId = drawer.id;
            link.addEventListener("click", () => {
                if (drawerId.includes(linkId)) {
                    drawer.classList.remove("--close");
                    drawer.classList.add("--open");
                } else {
                    drawer.classList.add("--close");
                    drawer.classList.remove("--open");
                };
            });
        });
    });
};

const inViewport = (e) => {
    const elementRect = e.getBoundingClientRect();
    return (elementRect.top < innerHeight / 2 && elementRect.bottom > 0);
};

const audioPlayer = () => {
    const audioComponent = document.querySelector(".audio-component");
    const audioText = audioComponent.querySelector(".audio-player-wrapper span");
    const playButton = audioComponent.querySelector(".play-btn");
    const audioFile = audioComponent.querySelector("audio");
    audioFile.volume = 0.3;
    const playAudio = (audio) => {
        if (audio.paused) {
            audio.play();
            audioText.innerHTML = "Sound off";
        } else {
            audio.pause();
            audioText.innerHTML = "Sound on";
        };
    };
    playButton.addEventListener("click", () => {
        playAudio(audioFile);
    });

    const section = document.querySelector(".reading-room-wrapper");
    document.addEventListener("scroll", () => {
        if (inViewport(section)) {
            audioComponent.classList.add("--translate");
        } else {
            audioComponent.classList.remove("--translate");
        };
    });
};

openElement("info-btn", "project", "open");
openElement("info-btn-mobile", "project", "open")
openElement("close-btn", "project", "open");
drawerOpener();
audioPlayer();
