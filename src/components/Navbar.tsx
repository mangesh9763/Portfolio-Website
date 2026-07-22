import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import "./styles/Navbar.css";
import { profile } from "../data/profile";

const Navbar = () => {
  useEffect(() => {
    const linkElements = document.querySelectorAll<HTMLAnchorElement>(".header ul a");

    const handleLinkClick = (event: Event) => {
      const target = event.currentTarget as HTMLAnchorElement;
      const section = target.getAttribute("data-href");

      if (!section || window.innerWidth <= 1024) {
        return;
      }

      event.preventDefault();
      const element = document.querySelector(section);
      element?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    linkElements.forEach((link) => {
      link.addEventListener("click", handleLinkClick);
    });

    return () => {
      linkElements.forEach((link) => {
        link.removeEventListener("click", handleLinkClick);
      });
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href={import.meta.env.BASE_URL || "#"} className="navbar-title" data-cursor="disable">
          {profile.initials}
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="navbar-connect"
          data-cursor="disable"
        >
          {profile.email}
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
