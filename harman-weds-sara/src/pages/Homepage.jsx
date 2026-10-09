import { useEffect, useRef, useState, useCallback } from "react";

import bg from "../assets/page1_bg.jpeg";
import water from "../assets/page1_water.jpeg";
import leftTemple from "../assets/page1_lefttemple.png";
import rightTemple from "../assets/page1_righttemple.png";

/* ── All 11 text lines ─────────────────────────────────────────────── */


// Homepage has 4 images: bg, water, leftTemple, rightTemple
const HOMEPAGE_IMAGE_COUNT = 4

const Homepage = ({ introComplete, onReady }) => {
  /* entered = true  → elements slide into their visible positions
     entered = false → they hold / return to their starting positions  */
  const [entered, setEntered] = useState(false);
  const sectionRef = useRef(null);
  const loadedCount = useRef(0);

  const handleImageLoad = useCallback(() => {
    loadedCount.current += 1
    if (loadedCount.current >= HOMEPAGE_IMAGE_COUNT) onReady?.()
  }, [onReady])

  /* ── Trigger entrance when envelope finishes ── */
  useEffect(() => {
    if (introComplete) setEntered(true);
  }, [introComplete]);

  /* ── Scroll-based exit: when user has scrolled past 80 % of the
        first screen, pull everything back to its starting position ── */
  useEffect(() => {
    if (!introComplete) return;

    const onScroll = () => {
      const threshold = window.innerHeight * 0.8;
      setEntered(window.scrollY <= threshold);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [introComplete]);

  /* Shared transition config */
  const slide = (delay = 0) =>
    `opacity 0.55s ease ${delay}s, transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s`;

  const templeSlide = (delay = 0) =>
    `transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s`;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100dvh" }}
    >
      {/* ── Background ── */}
      <img
        src={bg}
        alt=""
        draggable={false}
        onLoad={handleImageLoad}
        onError={handleImageLoad}
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
      />

      {/* ── Water — bottom, continuous wave animation ── */}
      <div
        className="absolute -bottom-3 left-0 w-full pointer-events-none"
        style={{
          zIndex: 10,
          animation: "waterWave 3.8s ease-in-out infinite",
          transformOrigin: "bottom center",
        }}
      >
        <img
          src={water}
          alt=""
          draggable={false}
          onLoad={handleImageLoad}
          onError={handleImageLoad}
          className="max-w-[420px] block select-none h-auto"
          style={{ objectFit: "cover", display: "block" }}
        />
      </div>

      {/* ── Left Temple — slides in from left ── */}
      <div
        className="absolute bottom-18 left-0 pointer-events-none "
        style={{
          zIndex: 20,
          transition: templeSlide(0.1),
          transform: entered ? "translateX(0)" : "translateX(-110%)",
        }}
      >
        <img
          src={leftTemple}
          alt=""
          draggable={false}
          onLoad={handleImageLoad}
          onError={handleImageLoad}
          className="block select-none"
          style={{ height: "48vh", width: "auto", objectFit: "contain" }}
        />
      </div>

      {/* ── Right Temple — slides in from right ── */}
      <div
        className="absolute bottom-25 -right-3 pointer-events-none"
        style={{
          zIndex: 10,
          transition: templeSlide(0.1),
          transform: entered ? "translateX(0)" : "translateX(110%)",
        }}
      >
        <img
          src={rightTemple}
          alt=""
          draggable={false}
          onLoad={handleImageLoad}
          onError={handleImageLoad}
          className="block select-none"
          style={{ height: "38vh", width: "auto", objectFit: "contain" }}
        />
      </div>

      {/* ── Text block — drops in line-by-line from above ── */}
      <div
        className="absolute inset-x-0 flex flex-col items-center text-center"
        style={{
          top: "8%",
          zIndex: 30,
          /* horizontal padding so text never touches the temple images */
          paddingLeft: "18%",
          paddingRight: "18%",
        }}
      >
        <div
  className="flex flex-col items-center justify-center text-center "
  style={{
    width: "120%",
    height: "40vh",
  }}
>
  <p
    style={{
      color: "#BD8321",
      fontSize: "0.52rem",
      fontWeight: "400",
      lineHeight: 1.55,
      opacity: entered ? 1 : 0,
      transform: entered ? "translateY(0px)" : "translateY(-38px)",
      transition: slide(0.05),
      marginBottom: "0.2rem",
      fontFamily:'Raavi',
    }}
  >
    ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ॥
  </p>

  <p
    className="mb-5"
    style={{
      color: "#BD8321",
      fontSize: "0.52rem",
      fontWeight: "400",
      lineHeight: 1.55,
      opacity: entered ? 1 : 0,
      transform: entered ? "translateY(0px)" : "translateY(-38px)",
      transition: slide(0.13),
    }}
  >
    ਨਾਨਕ ਸਤਿਗੁਰ ਤਿਨ ਮਿਲਾਇਆ ਜਿਨਾਂ ਧੁਰੇ ਪਾਇਆ ਸੰਜੋਗ॥
  </p>

  <p
    style={{
      color: "#634B00",
      fontSize: "0.52rem",
      fontWeight: "400",
      lineHeight: 1.55,
      opacity: entered ? 1 : 0,
      transform: entered ? "translateY(0px)" : "translateY(-38px)",
      transition: slide(0.21),
      fontFamily: 'Noto Serif',
    }}
  >
    With the blessings of
  </p>

  <p
    style={{
      color: "#634B00",
      fontSize: "0.58rem",
      fontWeight: "600",
      lineHeight: 1.55,
      opacity: entered ? 1 : 0,
      transform: entered ? "translateY(0px)" : "translateY(-38px)",
      transition: slide(0.29),
      fontFamily: 'Noto Serif',
    }}
  >
    Sardarni Swaran Kaur
  </p>

  <p
    className="mb-4"
    style={{
      color: "#634B00",
      fontSize: "0.60rem",
      fontWeight: "600",
      lineHeight: 1.55,
      opacity: entered ? 1 : 0,
      transform: entered ? "translateY(0px)" : "translateY(-38px)",
      transition: slide(0.37),
      fontFamily: 'Noto Serif',
    }}
  >
    (w/o Late Sardar Surjeet Singh Bajwa)
  </p>

  <p
    style={{
      color: "#634B00",
      fontSize: "0.60rem",
      fontWeight: "500",
      lineHeight: 1.55,
      opacity: entered ? 1 : 0,
      transform: entered ? "translateY(0px)" : "translateY(-38px)",
      transition: slide(0.45),
      fontFamily: 'Noto Serif',
    }}
  >
    with Mr. Arvinder Singh Bajwa & Mrs. Jaswinder Kaur
  </p>

  <p
    className="mb-4"
    style={{
      color: "#634B00",
      fontSize: "0.60rem",
      fontWeight: "500",
      lineHeight: 1.55,
      opacity: entered ? 1 : 0,
      transform: entered ? "translateY(0px)" : "translateY(-38px)",
      transition: slide(0.53),
      fontFamily: 'Noto Serif',
    }}
  >
    cordially invite you to celebrate the wedding of their beloved son
  </p>

  <p
    style={{
      color: "#C99333",
      fontSize: "1.15rem",
      fontWeight: "400",
      letterSpacing: "0.02em",
      lineHeight: 1.55,
      opacity: entered ? 1 : 0,
      transform: entered ? "translateY(0px)" : "translateY(-38px)",
      transition: slide(0.61),
      fontFamily: "Dancing Script",
    }}
  >
    Harman Singh Bajwa
  </p>

  <p
    style={{
      color: "#634B00",
      fontSize: "0.72rem",
      fontWeight: "400",
      lineHeight: 1.55,
      opacity: entered ? 1 : 0,
      transform: entered ? "translateY(0px)" : "translateY(-38px)",
      transition: slide(0.69),
      fontFamily: 'Noto Serif',
    }}
  >
    With
  </p>

  <p
    style={{
      color: "#C99333",
      fontSize: "1.15rem",
      fontWeight: "700",
      letterSpacing: "0.02em",
      lineHeight: 1.55,
      opacity: entered ? 1 : 0,
      transform: entered ? "translateY(0px)" : "translateY(-38px)",
      transition: slide(0.77),
      fontFamily: "Dancing Script",
    }}
  >
    Sara Jain
  </p>

  <p
    className="mb-2"
    style={{
      color: "#634B00",
      fontSize: "0.60rem",
      fontWeight: "500",
      lineHeight: 1.55,
      opacity: entered ? 1 : 0,
      transform: entered ? "translateY(0px)" : "translateY(-38px)",
      transition: slide(0.85),
      fontFamily: 'Noto Serif',
    }}
  >
    D/o Mr. Saurav Jain & Mrs. Shikha Jain
  </p>
</div>
      </div>
    </section>
  );
};

export default Homepage;
