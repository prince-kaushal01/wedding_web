import bg from '../assets/page3-bg.png'
import top from '../assets/page3-top.png'
import left from '../assets/page3-left.png'
import right from '../assets/page3-right.png'
import bottom from '../assets/page3-bottom.png'
import text1 from '../assets/page3-text1.png'
import text2 from '../assets/page3-text2.png'
import text3 from '../assets/page3-text3.png'
import text4 from '../assets/page3-text4.png'
import text5 from '../assets/page3-text5.png'
import text6 from '../assets/page3-text6.png'

const Page3 = () => {
  return (
    // One screen tall. All sizes follow the screen height (dvh) so it looks the same on short and long screens
    <div className="relative h-dvh w-full overflow-hidden bg-[#f7e7d3]">
      {/* Background: arch, sky and floor */}
      <img
        src={bg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Flower garlands hanging from the top */}
      <img
        src={top}
        alt=""
        className="absolute top-0 left-1/2 h-[23.2dvh] w-auto max-w-none -translate-x-1/2"
      />

      {/* Texts, stacked in the middle */}
      <div className="relative flex h-full flex-col items-center pt-[25.5dvh]">
        {/* Oli Ceremony */}
        <img
          src={text1}
          alt="Oli Ceremony"
          className="h-[clamp(2.6rem,7.4dvh,4.9rem)] w-auto max-w-none"
        />

        {/* Sunday */}
        <img
          src={text2}
          alt="Sunday"
          className="mt-[clamp(0.3rem,1dvh,0.7rem)] h-[clamp(0.75rem,2.1dvh,1.4rem)] w-auto max-w-none"
        />

        {/* 29th */}
        <img
          src={text3}
          alt="29th"
          className="mt-[clamp(0.1rem,0.3dvh,0.25rem)] h-[clamp(2.1rem,5.9dvh,3.9rem)] w-auto max-w-none"
        />

        {/* November 2026 */}
        <img
          src={text4}
          alt="November 2026"
          className="mt-[clamp(0.25rem,0.8dvh,0.6rem)] h-[clamp(0.6rem,1.7dvh,1.15rem)] w-auto max-w-none"
        />

        {/* 4:30 PM Onwards */}
        <img
          src={text5}
          alt="4:30 PM Onwards"
          className="mt-[clamp(0.7rem,2.2dvh,1.5rem)] h-[clamp(0.6rem,1.7dvh,1.15rem)] w-auto max-w-none"
        />

        {/* Attire - Traditional */}
        <img
          src={text6}
          alt="Attire - Traditional"
          className="mt-[clamp(1.5rem,5dvh,3.3rem)] h-[clamp(0.5rem,1.35dvh,0.9rem)] w-auto max-w-none"
        />
      </div>

      {/* Pots and plants in the bottom right corner, partly outside the screen */}
      <img
        src={right}
        alt=""
        className="absolute right-0 bottom-[6dvh] h-[36.6dvh] w-auto max-w-none translate-x-[32%]"
      />

      {/* Pots and plants in the bottom left corner, partly outside the screen */}
      <img
        src={left}
        alt=""
        className="absolute bottom-0 left-0 h-[36.6dvh] w-auto max-w-none translate-x-[-53%]"
      />

      {/* Flower platters and pots at the bottom, in front of everything */}
      <img
        src={bottom}
        alt=""
        className="absolute bottom-[-1dvh] left-[48%] h-[23dvh] w-auto max-w-none -translate-x-1/2"
      />
    </div>
  )
}

export default Page3
