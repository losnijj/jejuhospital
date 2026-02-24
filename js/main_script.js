// =========================
// 1) Main Visual Swiper
// =========================
const mainslide = new Swiper(".wrap__bg", {
  loop: true,
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: "#nextBtn",
    prevEl: "#prevBtn",
  },
});

// =========================
// 2) Hamburger Full Menu (menu_open)
// =========================
const burger = document.querySelector(".burger");
const megaOverlay = document.getElementById("megaOverlay");

function openBurgerMenu() {
  // 드롭메뉴 열려있으면 닫고 햄버거 열기
  closeAllMenu();

  document.body.classList.add("menu_open");
  megaOverlay?.setAttribute("aria-hidden", "false");
}

function closeBurgerMenu() {
  document.body.classList.remove("menu_open");
  megaOverlay?.setAttribute("aria-hidden", "true");
}

function toggleBurgerMenu() {
  const isOpen = document.body.classList.contains("menu_open");
  isOpen ? closeBurgerMenu() : openBurgerMenu();
}

burger?.addEventListener("click", toggleBurgerMenu);

// =========================
// 3) GNB 통일 드롭메뉴 (all_open) - HOVER 버전
//    + 클릭한 메뉴 아래로 컬럼 정렬
// =========================
const allMenu = document.getElementById("allMenu");
const allGrid = document.querySelector(".all_grid");
const gnb = document.querySelector(".gnb");
const gnbLinks = document.querySelectorAll(".gnb a");

let hoverCloseTimer = null;

function openAllMenu() {
  // 햄버거 메뉴가 열려있으면 드롭은 열지 않기
  if (document.body.classList.contains("menu_open")) return;

  document.body.classList.add("all_open");
  allMenu?.setAttribute("aria-hidden", "false");
}

function closeAllMenu() {
  document.body.classList.remove("all_open");
  allMenu?.setAttribute("aria-hidden", "true");
  if (allGrid) allGrid.style.transform = "translateX(0px)";
}

function alignColumnToLink(index) {
  if (!allGrid) return;

  const cols = allGrid.querySelectorAll(".all_col");
  const link = gnbLinks[index];
  const col = cols[index];
  if (!link || !col) return;

  const linkRect = link.getBoundingClientRect();
  const colRect = col.getBoundingClientRect();

  const linkCenter = linkRect.left + linkRect.width / 2;
  const colCenter = colRect.left + colRect.width / 2;

  let dx = linkCenter - colCenter;

  // 컨테이너 범위 안에서만 이동하도록 클램프
  const gridRect = allGrid.getBoundingClientRect();
  const container = allGrid.closest(".container");
  const containerRect = container ? container.getBoundingClientRect() : gridRect;

  const maxLeftShift = containerRect.left - gridRect.left;     // 오른쪽 이동 최대(+)
  const maxRightShift = containerRect.right - gridRect.right;  // 왼쪽 이동 최대(+)

  const minDx = -maxRightShift;
  const maxDx = maxLeftShift;

  if (dx < minDx) dx = minDx;
  if (dx > maxDx) dx = maxDx;

  allGrid.style.transform = `translateX(${dx}px)`;
}

// ✅ 메뉴 hover → 즉시 열고 정렬
gnbLinks.forEach((a, idx) => {
  a.addEventListener("mouseenter", () => {
    if (hoverCloseTimer) clearTimeout(hoverCloseTimer);

    openAllMenu();
    requestAnimationFrame(() => alignColumnToLink(idx));
  });

  // 클릭 시 페이지 이동 막고 싶으면 유지 (원하면 지워도 됨)
  a.addEventListener("click", (e) => e.preventDefault());
});

// ✅ gnb 또는 allMenu 밖으로 나가면 닫기 (깜빡임 방지 딜레이)
function scheduleCloseAllMenu() {
  if (hoverCloseTimer) clearTimeout(hoverCloseTimer);
  hoverCloseTimer = setTimeout(() => {
    closeAllMenu();
  }, 140); // 0~200 조절 가능
}

gnb?.addEventListener("mouseleave", scheduleCloseAllMenu);
allMenu?.addEventListener("mouseleave", scheduleCloseAllMenu);

// 다시 들어오면 닫기 취소
gnb?.addEventListener("mouseenter", () => {
  if (hoverCloseTimer) clearTimeout(hoverCloseTimer);
});
allMenu?.addEventListener("mouseenter", () => {
  if (hoverCloseTimer) clearTimeout(hoverCloseTimer);
});

// =========================
// 4) 공통: ESC로 닫기
// =========================
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  closeAllMenu();
  closeBurgerMenu();
});

// =========================
// 5) 리사이즈 시 정렬 리셋
// =========================
window.addEventListener("resize", () => {
  if (document.body.classList.contains("all_open") && allGrid) {
    allGrid.style.transform = "translateX(0px)";
  }
});