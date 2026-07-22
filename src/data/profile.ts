import { getPublicAssetUrl } from "../utils/publicAsset";

export const profile = {
  name: "Mangesh Panchal",
  initials: "MP",
  location: "Nanded, Maharashtra",
  email: "2022bcs077@sggs.ac.in",
  phone: "+91 9763125923",
  github: "https://github.com/mangesh9763",
  linkedin: "https://www.linkedin.com/in/mangesh-panchal/",
  resume: getPublicAssetUrl("/Mangesh-Panchal-Resume.pdf"),
};

export const projects = [
  {
    name: "LaalPari",
    title: "Bus Tracking System",
    category: "Real-time GPS tracking",
    image: getPublicAssetUrl("/images/project-slides/laalpari-home.png"),
    slides: [
      getPublicAssetUrl("/images/project-slides/laalpari-home.png"),
      getPublicAssetUrl("/images/project-slides/laalpari-buses.png"),
      getPublicAssetUrl("/images/project-slides/laalpari-map.png"),
      getPublicAssetUrl("/images/project-slides/laalpari-hero-alt.png"),
    ],
    live: "https://mangesh9763.github.io/LAALPARI/",
    code: "https://github.com/mangesh9763/LAALPARI.git",
    tools:
      "HTML, CSS, JavaScript, Firebase, OpenStreetMap API, ESP32, GPS, Arduino IDE",
  },
  {
    name: "Zenith",
    title: "SGGS Annual Sports Website",
    category: "Event website",
    image: getPublicAssetUrl("/images/project-slides/zenith-gameverse.png"),
    slides: [
      getPublicAssetUrl("/images/project-slides/zenith-gameverse.png"),
      getPublicAssetUrl("/images/project-slides/zenith-about.png"),
      getPublicAssetUrl("/images/project-slides/zenith-vip.png"),
      getPublicAssetUrl("/images/project-slides/zenith-intro.png"),
    ],
    live: "https://zenithsggs.in",
    tools:
      "HTML, CSS, JavaScript, live schedules, registrations, results, media gallery",
  },
  {
    name: "LiveFlow",
    title: "Blood Bank Management System",
    category: "React web app",
    image: getPublicAssetUrl("/images/project-slides/lifeflow-dashboard.png"),
    slides: [
      getPublicAssetUrl("/images/project-slides/lifeflow-dashboard.png"),
      getPublicAssetUrl("/images/project-slides/lifeflow-inventory.png"),
      getPublicAssetUrl("/images/project-slides/lifeflow-requests.png"),
      getPublicAssetUrl("/images/project-slides/lifeflow-donors.png"),
      getPublicAssetUrl("/images/project-slides/lifeflow-users.png"),
    ],
    live: "https://mangesh9763.github.io/lifeflow-blood-bank/",
    code: "https://github.com/mangesh9763/lifeflow-blood-bank.git",
    tools:
      "React, Vite, EmailJS OTP, GitHub Actions, GitHub Pages, responsive dashboard",
  },
];
