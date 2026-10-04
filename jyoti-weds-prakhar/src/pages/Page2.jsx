import bg from '../assets/page2-bg.png'
import top from '../assets/page2-top.png'
import topAbove from '../assets/page2-topabove.png'
import topRight from '../assets/page2-topright.png'
import left from '../assets/page2-left.png'
import right from '../assets/page2-right.png'
import bottom from '../assets/page2-bottom.png'
import bottomLeft from '../assets/page2-bottomleft.png'
import bottomLeft2 from '../assets/page2-bottomleft2.png'
import couple from '../assets/page2-couple.png'
import text1 from '../assets/page2-text1.png'
import text2 from '../assets/page2-text2.png'
import text3 from '../assets/page2-text3.png'
import text4 from '../assets/page2-text4.png'
import text5 from '../assets/page2-text5.png'
import text6 from '../assets/page2-text6.png'
import text7 from '../assets/page2-text7.png'

const Page2 = () => {
  return (
    // One screen tall. All sizes follow the screen height (dvh) so it looks the same on short and long screens
    <div className="relative h-dvh w-full overflow-hidden bg-[#0a0f24]">
      {/* Background: night sky and floor */}
      <img
        src={bg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-bottom"
      />

      {/* Gold sparkles at the top */}
      <img
        src={topAbove}
        alt=""
        className="absolute top-0 left-0 h-[33dvh] w-full object-cover"
      />

      {/* Left and right curtains: full height, partly outside the screen */}
      <img
        src={left}
        alt=""
        className="absolute top-0 left-0 h-dvh w-auto max-w-none translate-x-[-52%]"
      />
      <img
        src={right}
        alt=""
        className="absolute top-0 right-0 h-dvh w-auto max-w-none translate-x-[52%]"
      />

      {/* Chandeliers and roses at the top */}
      <img
        src={top}
        alt=""
        className="absolute top-[-6dvh] left-1/2 h-[45dvh] w-auto max-w-none -translate-x-1/2"
      />

      {/* Curtain swag in the top right corner */}
      <img
        src={topRight}
        alt=""
        className="absolute top-[-3dvh] right-0 h-[45dvh] w-auto max-w-none translate-x-[35%]"
      />

      {/* Texts, stacked in the middle */}
      <div className="relative flex h-full flex-col items-center pt-[25.5dvh]">
        {/* Welcome Dinner */}
        <img
          src={text1}
          alt="Welcome Dinner"
          className="h-[clamp(1.1rem,3dvh,2rem)] w-auto max-w-none"
        />

        {/* Sunday */}
        <img
          src={text2}
          alt="Sunday"
          className="mt-[clamp(0.6rem,2dvh,1.4rem)] h-[clamp(0.75rem,2.1dvh,1.4rem)] w-auto max-w-none"
        />

        {/* 29th */}
        <img
          src={text3}
          alt="29th"
          className="mt-[clamp(0.15rem,0.6dvh,0.4rem)] h-[clamp(2.1rem,5.9dvh,3.9rem)] w-auto max-w-none"
        />

        {/* November 2026 */}
        <img
          src={text4}
          alt="November 2026"
          className="mt-[clamp(0.4rem,1.4dvh,1rem)] h-[clamp(0.6rem,1.7dvh,1.15rem)] w-auto max-w-none"
        />

        {/* 8:30 PM Onwards */}
        <img
          src={text5}
          alt="8:30 PM Onwards"
          className="mt-[clamp(0.75rem,2.4dvh,1.6rem)] h-[clamp(0.6rem,1.7dvh,1.15rem)] w-auto max-w-none"
        />

        {/* At - The Grand Ballroom */}
        <img
          src={text6}
          alt="At - The Grand Ballroom"
          className="mt-[clamp(0.7rem,2.2dvh,1.5rem)] h-[clamp(0.6rem,1.7dvh,1.15rem)] w-auto max-w-none"
        />

        {/* Attire - Retro Vibe */}
        <img
          src={text7}
          alt="Attire - Retro Vibe"
          className="mt-[clamp(0.8rem,2.6dvh,1.7rem)] h-[clamp(0.5rem,1.4dvh,0.95rem)] w-auto max-w-none"
        />
      </div>

      {/* Piano and gramophone */}
      <img
        src={bottomLeft2}
        alt=""
        className="absolute bottom-[10dvh] left-[22%] h-[29dvh] w-auto max-w-none"
      />

      {/* Mirror in the bottom left corner */}
      <img
        src={bottomLeft}
        alt=""
        className="absolute bottom-[-3dvh] left-0 h-[42dvh] w-auto max-w-none translate-x-[-12%]"
      />

      {/* Couple. This image is very wide with a lot of empty space, the couple sits 161.5dvh from its left edge,
          so this left value puts the couple's centre at 78% of the screen width */}
      <img
        src={couple}
        alt="Jyoti and Prakhar"
        className="absolute bottom-0 left-[calc(78%-161.5dvh)] h-dvh w-auto max-w-none"
      />

      {/* Candle lights along the bottom */}
      <img
        src={bottom}
        alt=""
        className="absolute bottom-0 left-1/2 h-[16dvh] w-auto max-w-none -translate-x-1/2"
      />
    </div>
  )
}

export default Page2
