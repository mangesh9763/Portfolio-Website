import { useEffect, useState } from "react";
import { MdArrowOutward, MdChevronLeft, MdChevronRight } from "react-icons/md";

interface Props {
  image: string;
  slides?: string[];
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = props.slides?.length ? props.slides : [props.image];

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % slides.length);
    }, 3500);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      const response = await fetch(`src/assets/${props.video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setVideo(blobUrl);
    }
  };

  const goToSlide = (index: number) => {
    setSlideIndex((index + slides.length) % slides.length);
  };

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
        target="_blank"
        rel="noreferrer"
        data-cursor={"disable"}
      >
        {props.link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        <img src={slides[slideIndex]} alt={props.alt} />
        {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
      </a>
      {slides.length > 1 && (
        <div className="work-slider" data-cursor="disable">
          <button
            type="button"
            aria-label="Previous project screenshot"
            onClick={() => goToSlide(slideIndex - 1)}
          >
            <MdChevronLeft />
          </button>
          <div className="work-slider-dots">
            {slides.map((slide, index) => (
              <button
                type="button"
                aria-label={`Show screenshot ${index + 1}`}
                className={index === slideIndex ? "active" : ""}
                key={slide}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next project screenshot"
            onClick={() => goToSlide(slideIndex + 1)}
          >
            <MdChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkImage;
