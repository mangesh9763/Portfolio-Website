import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;

  const paras = document.querySelectorAll<HTMLElement>(".para");
  const titles = document.querySelectorAll<HTMLElement>(".title");
  const triggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const toggleAction = "play pause resume reverse";

  paras.forEach((para) => {
    para.classList.add("visible");
    gsap.killTweensOf(para);
    gsap.fromTo(
      para,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: toggleAction,
          start: triggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
      }
    );
  });

  titles.forEach((title) => {
    gsap.killTweensOf(title);
    gsap.fromTo(
      title,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: toggleAction,
          start: triggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
      }
    );
  });
}
