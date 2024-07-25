const shader = () => {
    const cover = document.querySelector(".cover");
    const canvas = document.createElement("canvas");
    const sandbox = new GlslCanvas(canvas);
    cover.appendChild(canvas);

    sandbox.load(frag);
    sandbox.setUniform("seed", Math.random());
};
shader();