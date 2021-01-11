const sizes = document.querySelectorAll(".size");
const colors = document.querySelectorAll(".color");
const shoes = document.querySelectorAll(".shoe");
const gradients = document.querySelectorAll(".gradient");

let prevColor = "blue";
let animationEnd = true;

function changeSize() {
  sizes.forEach((size) => size.classList.remove("active"));
  this.classList.add("active");
}

function changeColor() {
  //if(animationEnd === false) return;
  if (!animationEnd) return; //same

  const primary = this.getAttribute("primary");
  let color = this.getAttribute("color");
  const shoe = document.querySelector(`.shoe[color="${color}"]`);
  const gradient = document.querySelector(`.gradient[color="${color}"]`);
  let prevGradient = document.querySelector(`.gradient[color="${prevColor}"]`);

  // * change color
  colors.forEach((color) => color.classList.remove("active"));
  this.classList.add("active");

  // * change primary color
  document.documentElement.style.setProperty("--primary", primary);

  // * change shoe
  shoes.forEach((s) => s.classList.remove("show"));
  shoe.classList.add("show");

  // * change gradient color
  gradients.forEach((g) => g.classList.remove("show-gradient", "second"));
  gradient.classList.add("show-gradient");
  prevGradient.classList.add("second");

  prevColor = color;

  // * stop animation
  animationEnd = false;
  gradient.addEventListener("animationend", () => {
    animationEnd = true;
  });
}

sizes.forEach((size) => size.addEventListener("click", changeSize));
colors.forEach((color) => color.addEventListener("click", changeColor));

// * RESPONSIVE ESSENTIAL

// sub -> now we need to change the shoe-background element height, in which, its height will be almost the same height of the shoe

// select shoe background element
const shoeBg = document.querySelector(".shoe-background");

let x = window.matchMedia("(max-width: 1000px)");

function changeHeight() {
  if (x.matches) {
    let shoeHeight = shoes[0].offsetHeight;
    //console.log(shoeHeight);
    shoeBg.style.height = `${shoeHeight * 0.9}px`;
  } else {
    shoeBg.style.height = "475px";
  }
}
// when we say x.matches, its like saying: @media(max-width: 1000px){};
changeHeight();
window.addEventListener("resize", changeHeight);
