// const inViewport = (e) => {
//     const elementRect = e.getBoundingClientRect();
//     return (elementRect.bottom < innerHeight);
// };

const shader = () => {
    const cover = document.querySelector(".cover");
    const canvas = document.createElement("canvas");
    const sandbox = new GlslCanvas(canvas);
    cover.appendChild(canvas);

    sandbox.load(frag);
    sandbox.setUniform("seed", Math.random());

    const checkbox = document.querySelector(".menu-switcher input");
    const checkboxLabel = document.querySelector(".menu-switcher-label");
    checkbox.addEventListener("change", () => {
        if (checkbox.checked == true) {
            canvas.remove();
            checkboxLabel.innerHTML = "Turn on background";
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            checkboxLabel.innerHTML = "Turn off background";
            document.documentElement.setAttribute('data-theme', 'light');
            setTimeout(() => {
                cover.appendChild(canvas);
            }, 500);
        };
    });

    // const section = document.querySelector(".reading-room");
    // const switcher = document.querySelector(".menu-switcher");
    // document.addEventListener("scroll", () => {
    //     if (inViewport(section)) {
    //         canvas.remove();
    //         document.documentElement.setAttribute('data-theme', 'dark');
    //         switcher.classList.add("--hide");
    //     } else {
    //         cover.appendChild(canvas);
    //         document.documentElement.setAttribute('data-theme', 'light');
    //         switcher.classList.remove("--hide");
    //     };
    // });
};
shader();