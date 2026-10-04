import bg from '../assets/page4-bg.png'
import top from '../assets/page4-top.png'
import left from '../assets/page4-left.png'
import right from '../assets/page4-right.png'
import bottomLeft from '../assets/page4-bottomleft.png'
import bottomRight from '../assets/page4-bottomright.png'
import couple from '../assets/page4-couple.png'
import text1 from '../assets/page4-text1.png'
import text2 from '../assets/page4-text2.png'
import text3 from '../assets/page4-text3.png'
import text4 from '../assets/page4-text4.png'
import text5 from '../assets/page4-text5.png'
import text6 from '../assets/page4-text6.png'
import text7 from '../assets/page4-text7.png'

const Page4 = () => {
  return (
    // One screen tall. All sizes follow the screen height (dvh) so it looks the same on short and long screens
    <div className="relative h-dvh w-full overflow-hidden bg-[#f6d9c8]">
      {/* Background: pillars, sky and path */}
      <img
        src={bg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Flowers along the top */}
      <img
        src={top}
        alt=""
        className="absolute top-0 left-1/2 h-[17.8dvh] w-auto max-w-none -translate-x-1/2"
      />

      {/* Flowers on the left edge, partly outside the screen */}
      <img
        src={left}
        alt=""
        className="absolute top-[15dvh] left-0 h-[33.7dvh] w-auto max-w-none translate-x-[-40%]"
      />

      {/* Tree branch and flowers on the right edge */}
      <img
        src={right}
        alt=""
        className="absolute top-0 right-0 h-[48.4dvh] w-auto max-w-none translate-x-[18%]"
      />

      {/* Texts, stacked from the top */}
      <div className="relative flex h-full flex-col items-center pt-[12.5dvh]">
        {/* Engagement */}
        <img
          src={text1}
          alt="Engagement"
          className="h-[clamp(2.6rem,7.3dvh,4.8rem)] w-auto max-w-none"
        />

        {/* Monday */}
        <img
          src={text2}
          alt="Monday"
          className="mt-[clamp(0.7rem,2.2dvh,1.5rem)] h-[clamp(0.75rem,2.1dvh,1.4rem)] w-auto max-w-none"
        />

        {/* 30 */}
        <img
          src={text3}
          alt="30"
          className="mt-[clamp(0.15rem,0.6dvh,0.4rem)] h-[clamp(1.9rem,5.4dvh,3.6rem)] w-auto max-w-none"
        />

        {/* November 2026 */}
        <img
          src={text4}
          alt="November 2026"
          className="mt-[clamp(0.3rem,0.9dvh,0.6rem)] h-[clamp(0.6rem,1.7dvh,1.15rem)] w-auto max-w-none"
        />

        {/* 5:00 PM Onwards */}
        <img
          src={text5}
          alt="5:00 PM Onwards"
          className="mt-[clamp(0.75rem,2.3dvh,1.55rem)] h-[clamp(0.6rem,1.7dvh,1.15rem)] w-auto max-w-none"
        />

        {/* At - North Central Lawns */}
        <img
          src={text6}
          alt="At - North Central Lawns"
          className="mt-[clamp(0.75rem,2.3dvh,1.55rem)] h-[clamp(0.6rem,1.7dvh,1.15rem)] w-auto max-w-none"
        />

        {/* Attire - Soft Hues, Neutrals, Pastels Indo Western Indian */}
        <img
          src={text7}
          alt="Attire - Soft Hues, Neutrals, Pastels Indo Western Indian"
          className="mt-[clamp(0.75rem,2.3dvh,1.55rem)] h-[clamp(2.8rem,7.9dvh,5.2rem)] w-auto max-w-none"
        />
      </div>

      {/* Couple: max-w keeps it inside the screen on narrow phones */}
      <img
        src={couple}
        alt="Jyoti and Prakhar"
        className="absolute bottom-[4.5dvh] left-1/2 h-[43dvh] max-w-[96%] -translate-x-1/2 object-contain object-bottom"
      />

      {/* Flowers in the bottom corners, in front of the couple */}
      <img
        src={bottomLeft}
        alt=""
        className="absolute bottom-0 left-0 h-[24.7dvh] w-auto max-w-none"
      />
      <img
        src={bottomRight}
        alt=""
        className="absolute right-0 bottom-0 h-[24.4dvh] w-auto max-w-none"
      />
    </div>
  )
}

export default Page4
