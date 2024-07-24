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
        console.log("clicked")
        if (checkbox.checked == true) {
            canvas.remove();
            checkboxLabel.innerHTML = "Turn on background";
            document.documentElement.style.setProperty("--font-color", "#fff");
            document.documentElement.style.setProperty("--bg-color", "#000");
            document.documentElement.style.setProperty("--header-decoration", "solid 1px rgba(255, 255, 255, 0.6)");
            document.documentElement.style.setProperty("--text-box-box-shadow", "none");
            document.documentElement.style.setProperty("--inset-box-shadow", "none");
            document.documentElement.style.setProperty("--gallery-box-shadow", "none");
            // document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            checkboxLabel.innerHTML = "Turn off background";
            document.documentElement.style.setProperty("--font-color", "#000");
            document.documentElement.style.setProperty("--bg-color", "#fff");
            document.documentElement.style.setProperty("--header-decoration", "solid 1px rgba(0, 0, 0, 0.3)");
            document.documentElement.style.setProperty("--text-box-box-shadow", "0 0 15px 6px rgb(47 44 115 / 10%)");
            document.documentElement.style.setProperty("--inset-box-shadow", "inset 0 0 15px 6px rgb(47 44 115 / 10%)");
            document.documentElement.style.setProperty("--gallery-box-shadow", "0px 0px 24px 8px rgba(255, 255, 255, 0.5)");
            // document.documentElement.setAttribute('data-theme', 'light');
            setTimeout(() => {
                cover.appendChild(canvas);
            }, 500);
        };
    });
};
shader();