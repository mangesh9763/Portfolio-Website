import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { MdArrowOutward } from "react-icons/md";
import { projects } from "../data/profile";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  useEffect(() => {
    const boxElements = Array.from(document.getElementsByClassName("work-box")) as HTMLElement[];
    if (!boxElements.length) return;

    const workContainer = document.querySelector(".work-container");
    const firstBox = boxElements[0];
    const rectLeft = workContainer?.getBoundingClientRect().left ?? 0;
    const rect = firstBox.getBoundingClientRect();
    const parentWidth = firstBox.parentElement?.getBoundingClientRect().width ?? 0;
    const padding = parseInt(window.getComputedStyle(firstBox).padding) / 2;
    const translateX = Math.max(
      0,
      rect.width * boxElements.length - (rectLeft + parentWidth) + padding
    );

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${Math.max(translateX, window.innerHeight * 0.35)}`,
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
                <div className="work-actions">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="disable"
                  >
                    Live site <MdArrowOutward />
                  </a>
                  {project.code && (
                    <a
                      href={project.code}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="disable"
                    >
                      Code <MdArrowOutward />
                    </a>
                  )}
                </div>
              </div>
              <WorkImage
                image={project.image}
                slides={project.slides}
                alt={`${project.name} ${project.title} screenshot`}
                link={project.live}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
