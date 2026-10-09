import { useEffect, useRef, useState } from "react";

import bg from "../assets/page3_bg.jpeg";
import imgBottom from "../assets/page3_bottom.png";
import imgLightBg from "../assets/page3_lightbg.png";
import imgLight from "../assets/page3_light.png";
import imgTopLeft from "../assets/page3_topleft.png";
import imgTopRight from "../assets/page3_topright.png";
import imgDisco1 from "../assets/page3_leftball.png";
import imgDisco2 from "../assets/page3_leftball2.png";
import imgBotLeft from "../assets/page3_bottomleft.png";
import imgTable from "../assets/page3_table.png";
import imgBotRight from "../assets/page3_bottomright.png";
import imgDisco3 from "../assets/page3_rightball.png";
import imgDisco4 from "../assets/page3_rightball2.png";

const Shaggan = () => {
  const sectionRef = useRef(null);
  const tableTimer = useRef(null);
  const discoTimer = useRef(null);

  const [inView, setInView] = useState(false);
  const [tableState, setTableState] = useState("hidden"); // hidden | entering | looping
  const [discoState, setDiscoState] = useState("hidden"); // hidden | entering | looping

  // IntersectionObserver — animate in at 20%, out below 20%
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.2,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // State machine — table & disco get a looping animation after entrance
  useEffect(() => {
    clearTimeout(tableTimer.current);
    clearTimeout(discoTimer.current);
    if (inView) {
      setTableState("entering");
      setDiscoState("entering");
      tableTimer.current = setTimeout(() => setTableState("looping"), 1100);
      discoTimer.current = setTimeout(() => setDiscoState("looping"), 1100);
    } else {
      setTableState("hidden");
      setDiscoState("hidden");
    }
    return () => {
      clearTimeout(tableTimer.current);
      clearTimeout(discoTimer.current);
    };
  }, [inView]);

  // Dynamic slide styles — only transforms & transitions are dynamic
  const fromTop = (d = 0) => ({
    transform: inView ? "translateY(0)" : "translateY(-115%)",
    transition: `transform .9s ease ${d}s`,
  });
  const fromBottom = (d = 0) => ({
    transform: inView ? "translateY(0)" : "translateY(115%)",
    transition: `transform .9s ease ${d}s`,
  });
  const fromLeft = (d = 0) => ({
    transform: inView ? "translateX(0)" : "translateX(-115%)",
    transition: `transform .9s ease ${d}s`,
  });
  const fromRight = (d = 0) => ({
    transform: inView ? "translateX(0)" : "translateX(115%)",
    transition: `transform .9s ease ${d}s`,
  });

  // Object-lookup replaces switch statements
  const tableAnim = {
    hidden: {
      transform: "translateX(-115%)",
      transition: "transform .35s ease",
    },
    entering: {
      transform: "translateX(0)",
      transition: "transform .9s ease .1s",
    },
    looping: { animation: "tableZoom 2.6s ease-in-out infinite" },
  }[tableState];

  const discoAnim = {
    hidden: {
      transform: "translateY(-170%)",
      transition: "transform .35s ease",
    },
    entering: {
      transform: "translateY(0)",
      transition: "transform .85s ease .35s",
    },
  }[discoState];

  // Text drop-in — opacity + translateY with staggered delay
  const txt = (d) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "none" : "translateY(-26px)",
    transition: `opacity .5s ease ${d}s, transform .5s ease ${d}s`,
  });

  return (
    <section ref={sectionRef} className="relative w-full h-dvh overflow-hidden">
      {/* Background */}
      <img
        src={bg}
        alt=""
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      {/* Light background — from top */}
      <div className="absolute inset-x-0 -top-20 z-[15]" style={fromTop(0)}>
        <img
          src={imgLightBg}
          alt=""
          draggable={false}
          className="w-full block pointer-events-none select-none"
        />
      </div>

      {/* Light — centred on lightbg, from top */}
      <div
        className="absolute inset-x-0 -top-24 z-[16] flex justify-center"
        style={fromTop(0.1)}
      >
        <img
          src={imgLight}
          alt=""
          draggable={false}
          className="h-[36vh] w-auto object-contain pointer-events-none select-none"
        />
      </div>

      {/* Top left — from left */}
      <div className="absolute top-0 left-0 z-[17]" style={fromLeft(0.05)}>
        <img
          src={imgTopLeft}
          alt=""
          draggable={false}
          className="h-[40vh] w-auto object-contain pointer-events-none select-none"
        />
      </div>

      {/* Top right — from right */}
      <div className="absolute top-0 right-0 z-[17]" style={fromRight(0.05)}>
        <img
          src={imgTopRight}
          alt=""
          draggable={false}
          className="h-[40vh] w-auto object-contain pointer-events-none select-none"
        />
      </div>

      {/* Left Disco — from top, then bobs */}
      <div
        className="absolute top-4 -left-4 z-[18] flex justify-center"
        style={discoAnim}
      >
        <img
          src={imgDisco1}
          alt=""
          draggable={false}
          className="h-[14vh] w-auto object-contain pointer-events-none select-none"
        />
      </div>
      <div
        className="absolute top-6 left-10 z-[18] flex justify-center"
        style={discoAnim}
      >
        <img
          src={imgDisco2}
          alt=""
          draggable={false}
          className="h-[24vh] w-auto object-contain pointer-events-none select-none"
        />
      </div>
      <div
        className="absolute -top-12 left-6 z-[17] flex justify-center"
        style={discoAnim}
      >
        <img
          src={imgDisco2}
          alt=""
          draggable={false}
          className="h-[20vh] w-auto object-contain pointer-events-none select-none"
        />
      </div>

      {/* Right Disco — from top, then bobs */}
      <div
        className="absolute top-4 -right-4 z-[18] flex justify-center"
        style={discoAnim}
      >
        <img
          src={imgDisco3}
          alt=""
          draggable={false}
          className="h-[14vh] w-auto object-contain pointer-events-none select-none"
        />
      </div>
      <div
        className="absolute top-18 right-10 z-[18] flex justify-center"
        style={discoAnim}
      >
        <img
          src={imgDisco3}
          alt=""
          draggable={false}
          className="h-[16vh] w-auto object-contain pointer-events-none select-none"
        />
      </div>
      <div
        className="absolute -top-12 right-6 z-[17] flex justify-center"
        style={discoAnim}
      >
        <img
          src={imgDisco4}
          alt=""
          draggable={false}
          className="h-[20vh] w-auto object-contain pointer-events-none select-none"
        />
      </div>

      {/* Bottom strip — from below */}
      <div className="absolute inset-x-0 bottom-0 z-[19]" style={fromBottom(0)}>
        <img
          src={imgBottom}
          alt=""
          draggable={false}
          className="w-full block pointer-events-none select-none"
        />
      </div>

      {/* Bottom left — from left */}
      <div className="absolute bottom-8 -left-34 z-[15]" style={fromLeft(0.08)}>
        <img
          src={imgBotLeft}
          alt=""
          draggable={false}
          className="h-[40vh] w-auto object-contain pointer-events-none select-none"
        />
      </div>

      {/* Table — from left, then zooms */}
      <div className="absolute bottom-14 left-[3%] z-[16]" style={tableAnim}>
        <img
          src={imgTable}
          alt=""
          draggable={false}
          className="h-[40vh] w-auto object-contain pointer-events-none select-none"
        />
      </div>

      {/* Bottom right — from right */}
      <div
        className="absolute bottom-8 -right-56 z-[15]"
        style={fromRight(0.08)}
      >
        <img
          src={imgBotRight}
          alt=""
          draggable={false}
          className="h-[40vh] w-auto object-contain pointer-events-none select-none"
        />
      </div>

      {/* Text — centred strip */}
      <div className="absolute top-[28%] left-1/2 -translate-x-1/2 w-[60%] h-[68%] z-30 flex flex-col items-center text-center text-[#F0E4CB]">

        {/* Heading */}
        <h1
          style={{ ...txt(0.08), fontFamily: "'Great Vibes', cursive" }}
          className="text-[2rem] leading-none font-normal m-0 mb-1 text-white"
        >
          Shaggan
        </h1>

        {/* Description */}
        <p
          style={{ ...txt(0.20), fontFamily: "'Cormorant Garamond', serif" }}
          className="text-[0.70rem] leading-[1.35] tracking-[0.02em] m-0 mb-1"
        >
          A sacred beginning filled with blessings,
          <br />
          love, and cherished traditions.
        </p>

        {/* Day */}
        <p
          style={{ ...txt(0.34), fontFamily: "'Cormorant Garamond', serif" }}
          className="text-[0.9rem] tracking-[0.05em] leading-none m-0 mb-[2px]"
        >
          Tuesday
        </p>

        {/* Date block — JUNE · 30 · 2026 · 11:00 AM */}
        <div
          style={{ ...txt(0.42), fontFamily: "'Cormorant Garamond', serif" }}
          className="flex items-center justify-center text-[#F0E4CB] mb-1"
        >
          <span className="text-[0.75rem] tracking-[0.1em] mb-2">JUNE</span>

          <div className="flex flex-col items-center leading-none">
            <span className="text-[1.8rem] leading-none text-white">30</span>
            <span className="text-[0.7rem] tracking-[0.1em] whitespace-nowrap mt-[2px]">11:00 AM</span>
          </div>

          <span className="text-[0.75rem] tracking-[0.08em] mb-2">2026</span>
        </div>
      </div>
    </section>
  );
};

export default Shaggan;
