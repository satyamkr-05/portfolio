const revealItems = document.querySelectorAll("[data-reveal]");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = [...document.querySelectorAll("main section[id]")];
const yearNode = document.querySelector("#year");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const setActiveLink = () => {
  const scrollPoint = window.scrollY + 140;

  sections.forEach((section) => {
    const id = section.getAttribute("id");
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (!link) {
      return;
    }

    if (scrollPoint >= top && scrollPoint < bottom) {
      navLinks.forEach((navLink) => navLink.classList.remove("is-active"));
      link.classList.add("is-active");
    }
  });
};

window.addEventListener("scroll", setActiveLink, { passive: true });
window.addEventListener("load", setActiveLink);
