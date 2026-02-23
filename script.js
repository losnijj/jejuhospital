// 배경 슬라이드(원하면 삭제 가능)
const slides = ["hero.jpg", "hero2.jpg", "hero3.jpg"];
let idx = 0;

const heroBg = document.getElementById("heroBg");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function render() {
    if (!heroBg) return;

    heroBg.style.backgroundImage =
        `linear-gradient(90deg, rgba(0,0,0,.72) 0%, rgba(0,0,0,.35) 45%, rgba(0,0,0,.1) 100%), url("${slides[idx]}")`;
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
        idx = (idx - 1 + slides.length) % slides.length;
        render();
    });

    nextBtn.addEventListener("click", () => {
        idx = (idx + 1) % slides.length;
        render();
    });
}

render();
