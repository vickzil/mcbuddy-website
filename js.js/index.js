const bar = document.getElementById("bar");
const closed = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (closed) {
  closed.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}
const header = document.querySelector("header");

window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 80);
});

let menu = document.querySelector("#menu-icon");
let navbars = document.querySelector(".navbar");

if (menu) {
  menu.onclick = () => {
    menu.classList.toggle("bx-x");
    navbars.classList.toggle("open");
  };
}

const numbers = document.querySelectorAll(".value-counter");
const speed = 130000;

$(window).scroll(() => {
  if (document.querySelector(".offer")) {
    let theTop = $(".offer").offset().top - window.innerHeight;
    if ($(window).scrollTop() > theTop) {
      if (numbers) {
        numbers.forEach((number) => {
          const updateCount = () => {
            const target = +number.getAttribute("data-count");
            const count = +number.innerText;
            const inc = target / speed;
            if (count < target) {
              number.innerText = Math.ceil(count + inc);
              setTimeout(updateCount, 0);
            } else {
              count.innerText = target;
            }
          };
          updateCount();
        });
      }
    }
  }
});
