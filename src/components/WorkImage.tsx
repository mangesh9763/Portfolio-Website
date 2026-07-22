import { useEffect, useMemo, useState } from "react";
import { MdArrowOutward, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { getPublicAssetUrl } from "../utils/publicAsset";

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
  const [imageError, setImageError] = useState(false);

  const slides = useMemo(() => {
    const slideList = props.slides?.length ? props.slides : [props.image];
    return slideList.map((slide) => getPublicAssetUrl(slide));
  }, [props.image, props.slides]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % slides.length);
    }, 3500);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    setImageError(false);
  }, [slideIndex]);

  const handleMouseEnter = () => {
    if (props.video) {
      setIsVideo(true);
      setVideo(getPublicAssetUrl(props.video));
    }
  };

  const goToSlide = (index: number) => {
    setSlideIndex((index + slides.length) % slides.length);
  };

  const imageSrc = imageError
    ? getPublicAssetUrl("/images/placeholder.webp")
    : slides[slideIndex];

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
        <img src={imageSrc} alt={props.alt} onError={() => setImageError(true)} />
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
