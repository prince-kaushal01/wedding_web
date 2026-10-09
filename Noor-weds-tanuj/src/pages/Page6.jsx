import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import page6Bg from "../assets/page6-bg.png";
import page6Bottom from "../assets/page6-bottom.png";
import page6BottomAbove from "../assets/page6-bottomabove.png";
import page6River from "../assets/page6-river.png";
import page6Sun from "../assets/page6-sun.png";
import page6Center from "../assets/page6-center.png";
import page6Mandap from "../assets/page6-mandap.png";
import page6Couple from "../assets/page6-couple.png";
import page6LeftTree from "../assets/page6-lefttree.png";
import page6RightTree from "../assets/page6-righttree.png";
import page6Left from "../assets/page6-left.png";
import page6Right from "../assets/page6-right.png";
import page6TopLeft from "../assets/page6-topleft.png";
import page6TopRight from "../assets/page6-topright.png";
import page6Top from "../assets/page6-top.png";
import page6Chandelier from "../assets/page6-chandelier.png";
import page6Text1 from "../assets/page6-text1.png";
import page6Text2 from "../assets/page6-text2.png";
import page6Sun2 from "../assets/page6-sun2.png";
import page6Thur from "../assets/page6-friday.png";
import page6Oct from "../assets/page6-oct.png";
import page6_23 from "../assets/page6-23.png";
import page6_2026 from "../assets/page6-2026.png";
import page6Time from "../assets/page6-time.png";

gsap.registerPlugin(ScrollTrigger);

const Page6 = () => {
  const containerRef = useRef(null);
  // from above
  const topRef = useRef(null);
  const chand1Ref = useRef(null);
  const chand2Ref = useRef(null);
  const chand3Ref = useRef(null);
  // from sides (top corners)
  const topLeftRef = useRef(null);
  const topRightRef = useRef(null);
  // from sides (trees)
  const leftTreeRef = useRef(null);
  const rightTreeRef = useRef(null);
  // from sides (bottom decorations)
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  // scale up
  const centerRef = useRef(null);
  const mandapRef = useRef(null);
  const coupleRef = useRef(null);
  // text — from above one by one
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const fridayRef = useRef(null);
  const dateRef = useRef(null);
  const timeRef = useRef(null);

  useGSAP(() => {
    // Same trigger as Page2
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Top — from above
    tl.fromTo(
      topRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      0,
    );

    // Chandeliers — from above one by one
    tl.fromTo(
      chand1Ref.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
      0.15,
    );
    tl.fromTo(
      chand2Ref.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
      0.3,
    );
    tl.fromTo(
      chand3Ref.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
      0.45,
    );

    // Top left — from left, top right — from right (together)
    tl.fromTo(
      topLeftRef.current,
      { x: -120, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      0,
    );
    tl.fromTo(
      topRightRef.current,
      { x: 120, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      0,
    );

    // Left tree — from left, right tree — from right (together)
    tl.fromTo(
      leftTreeRef.current,
      { x: -120, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9, ease: "power2.out" },
      0.1,
    );
    tl.fromTo(
      rightTreeRef.current,
      { x: 120, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9, ease: "power2.out" },
      0.1,
    );

    // Center, mandap, couple — scale up one by one
    tl.fromTo(
      centerRef.current,
      { scale: 0.75, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
      0.1,
    );
    tl.fromTo(
      mandapRef.current,
      { scale: 0.75, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
      0.25,
    );
    tl.fromTo(
      coupleRef.current,
      { scale: 0.75, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
      0.4,
    );

    // Bottom left — from left, bottom right — from right
    tl.fromTo(
      leftRef.current,
      { x: -120, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      0.2,
    );
    tl.fromTo(
      rightRef.current,
      { x: 120, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      0.2,
    );

    // Text — from above one by one
    tl.fromTo(
      text1Ref.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      0.3,
    );
    tl.fromTo(
      text2Ref.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      0.45,
    );
    tl.fromTo(
      fridayRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      0.6,
    );
    tl.fromTo(
      dateRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      0.75,
    );
    tl.fromTo(
      timeRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      0.9,
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100dvh" }}
    >
      {/* BG — no animation */}
      <img
        src={page6Bg}
        alt="bg"
        className="absolute -top-17 left-0 w-full h-full object-cover z-20"
      />

      {/* Sun — no animation */}
      <img
        src={page6Sun}
        alt="sun"
        className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-[40%] z-20"
      />
      <img
        src={page6Sun2}
        alt="sun2"
        className="absolute bottom-[27%] left-1/2 -translate-x-1/2 w-[10%] z-20"
      />

      {/* Bottom — no animation */}
      <img
        src={page6Bottom}
        alt="bottom"
        className="absolute bottom-0 left-0 w-full z-10"
      />

      {/* River — no animation */}
      <img
        src={page6River}
        alt="river"
        className="absolute bottom-[18.5%] left-0 w-full z-[15]"
      />

      {/* Bottom above — no animation */}
      <img
        src={page6BottomAbove}
        alt="bottom above"
        className="absolute bottom-0 left-0 w-full z-20"
      />

      {/* Left tree — from left */}
      <img
        ref={leftTreeRef}
        src={page6LeftTree}
        alt="left tree"
        className="absolute -left-[17vw] bottom-[20%] w-[35%] z-25"
        style={{ opacity: 0 }}
      />

      {/* Right tree — from right */}
      <img
        ref={rightTreeRef}
        src={page6RightTree}
        alt="right tree"
        className="absolute -right-[23vw] bottom-[28%] w-[40%] z-25"
        style={{ opacity: 0 }}
      />

      {/* Bottom left — from left */}
      <img
        ref={leftRef}
        src={page6Left}
        alt="left"
        className="absolute -left-[7%] bottom-0 w-[44vw] z-25"
        style={{ opacity: 0 }}
      />

      {/* Bottom right — from right */}
      <img
        ref={rightRef}
        src={page6Right}
        alt="right"
        className="absolute -right-[4%] bottom-0 w-[44vw] z-25"
        style={{ opacity: 0 }}
      />

      {/* Center — scales up */}
      <img
        ref={centerRef}
        src={page6Center}
        alt="center"
        className="absolute bottom-[17%] left-1/2 -translate-x-1/2 w-[15%] z-30"
        style={{ opacity: 0 }}
      />

      {/* Mandap — scales up */}
      <img
        ref={mandapRef}
        src={page6Mandap}
        alt="mandap"
        className="absolute bottom-[16%] left-1/2 -translate-x-1/2 w-[70%] z-20"
        style={{ opacity: 0 }}
      />

      {/* Couple — scales up */}
      <img
        ref={coupleRef}
        src={page6Couple}
        alt="couple"
        className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[35%] z-40"
        style={{ opacity: 0 }}
      />

      {/* Top left — from left */}
      <img
        ref={topLeftRef}
        src={page6TopLeft}
        alt="top left"
        className="absolute top-0 left-0 w-full h-[75vh] z-30"
        style={{ opacity: 0 }}
      />

      {/* Top right — from right */}
      <img
        ref={topRightRef}
        src={page6TopRight}
        alt="top right"
        className="absolute top-0 right-0 w-[30%] z-30"
        style={{ opacity: 0 }}
      />

      {/* Top center — from above */}
      <img
        ref={topRef}
        src={page6Top}
        alt="top"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] z-35"
        style={{ opacity: 0 }}
      />

      {/* Chandeliers — from above one by one */}
      <img
        ref={chand1Ref}
        src={page6Chandelier}
        alt="chandelier"
        className="absolute top-[1%] left-[15vw] w-[18%] z-40"
        style={{ opacity: 0 }}
      />
      <img
        ref={chand2Ref}
        src={page6Chandelier}
        alt="chandelier"
        className="absolute -top-[3%] left-1/2 -translate-x-1/2 w-[18%] z-40"
        style={{ opacity: 0 }}
      />
      <img
        ref={chand3Ref}
        src={page6Chandelier}
        alt="chandelier"
        className="absolute top-[1%] right-[16vw] w-[18%] z-40"
        style={{ opacity: 0 }}
      />

      {/* Text content — from above one by one */}
      <div className="absolute inset-0 z-50 flex flex-col items-center pt-[42%]">
        <img
          ref={text1Ref}
          src={page6Text1}
          alt="text1"
          className="w-[50vw] mb-3"
          style={{ opacity: 0 }}
        />

        <img
          ref={text2Ref}
          src={page6Text2}
          alt="text2"
          className="w-[70vw] mb-8"
          style={{ opacity: 0 }}
        />

        <div className="flex flex-col items-center gap-1">
          <img
            ref={fridayRef}
            src={page6Thur}
            alt="friday"
            className="w-[20vw] h-auto mb-3"
            style={{ opacity: 0 }}
          />

          <div
            ref={dateRef}
            className="flex items-center gap-2"
            style={{ opacity: 0 }}
          >
            <img
              src={page6Oct}
              alt="oct"
              className="w-[10vw] h-auto"
              style={{ marginTop: "6px" }}
            />
            <span
              className="text-white"
              style={{
                opacity: "0.2",
                fontSize: "30px",
                lineHeight: 1,
                marginLeft: "6px",
                marginRight: "2px",
              }}
            >
              |
            </span>
            <img src={page6_23} alt="23" className="w-[12vw] h-auto" />
            <span
              className="text-white"
              style={{
                opacity: "0.2",
                fontSize: "30px",
                lineHeight: 1,
                marginLeft: "2px",
                marginRight: "6px",
              }}
            >
              |
            </span>
            <img
              src={page6_2026}
              alt="2026"
              className="w-[10vw] h-auto"
              style={{ marginTop: "6px" }}
            />
          </div>

          <img
            ref={timeRef}
            src={page6Time}
            alt="time"
            className="w-[30vw] h-auto mb-2"
            style={{ marginTop: "22px", opacity: 0 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Page6;
