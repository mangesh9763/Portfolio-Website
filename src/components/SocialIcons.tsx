import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect, type MouseEvent as ReactMouseEvent } from "react";
import HoverLinks from "./HoverLinks";
import { MdEmail } from "react-icons/md";
import { profile } from "../data/profile";

const SocialIcons = () => {
  const handleEmailClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", "#contact");
      return;
    }

    window.location.hash = "contact";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const social = document.getElementById("social");
    if (!social) return;

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: globalThis.MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);

      updatePosition();

      return () => {
        elem.removeEventListener("mousemove", onMouseMove);
      };
    });
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href={profile.github} target="_blank" rel="noreferrer">
            <FaGithub />
          </a>
        </span>
        <span>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a href="#contact" onClick={handleEmailClick}>
            <MdEmail />
          </a>
        </span>
      </div>
      <a
        className="resume-button"
        href={profile.resume}
        target="_blank"
        rel="noreferrer"
      >
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
