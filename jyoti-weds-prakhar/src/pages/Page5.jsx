import bg from '../assets/page5-bg.png'
import top from '../assets/page5-top.png'
import left from '../assets/page5-left.png'
import right from '../assets/page5-right.png'
import centerRight from '../assets/page5-centerright.png'
import bottomLeft from '../assets/page5-bottomleft.png'
import bottomRight from '../assets/page5-bottomright.png'
import couple from '../assets/page5-couple.png'
import text1 from '../assets/page5-text1.png'
import text2 from '../assets/page5-text2.png'
import text3 from '../assets/page5-text3.png'
import text4 from '../assets/page5-text4.png'
import text5 from '../assets/page5-text5.png'
import text6 from '../assets/page5-text6.png'
import text7 from '../assets/page5-text7.png'

const Page5 = () => {
  return (
    // One screen tall. All sizes follow the screen height (dvh) so it looks the same on short and long screens
    <div className="relative h-dvh w-full overflow-hidden bg-[#a9cdea]">
      {/* Background: sky, sea and yacht deck */}
      <img
        src={bg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-bottom"
      />

      {/* Island on the right, behind the couple. The bottom value keeps it sitting on the
          horizon line of the background (the background is sized by height or by width, whichever is bigger) */}
      <img
        src={centerRight}
        alt=""
        className="absolute right-0 bottom-[max(28.5dvh,61.1vw)] h-[13.2dvh] w-auto max-w-none translate-x-[16%]"
      />

      {/* Blue drapes in the top left and top right corners */}
      <img
        src={left}
        alt=""
        className="absolute top-[-3dvh] left-0 h-[51.7dvh] w-auto max-w-none translate-x-[-10%]"
      />
      <img
        src={right}
        alt=""
        className="absolute top-[-3dvh] right-0 h-[51.7dvh] w-auto max-w-none translate-x-[10%]"
      />

      {/* Peach drapes and lights along the top */}
      <img
        src={top}
        alt=""
        className="absolute top-0 left-1/2 h-[10.4dvh] w-auto max-w-none -translate-x-1/2"
      />

      {/* Texts, stacked from the top */}
      <div className="relative flex h-full flex-col items-center pt-[14.7dvh]">
        {/* Yacht Party */}
        <img
          src={text1}
          alt="Yacht Party"
          className="h-[clamp(2.9rem,8.1dvh,5.3rem)] w-auto max-w-none"
        />

        {/* Monday */}
        <img
          src={text2}
          alt="Monday"
          className="mt-[clamp(0.1rem,0.4dvh,0.3rem)] h-[clamp(0.75rem,2.1dvh,1.4rem)] w-auto max-w-none"
        />

        {/* 30 */}
        <img
          src={text3}
          alt="30"
          className="mt-[clamp(0.1rem,0.4dvh,0.3rem)] h-[clamp(1.9rem,5.4dvh,3.6rem)] w-auto max-w-none"
        />

        {/* November 2026 */}
        <img
          src={text4}
          alt="November 2026"
          className="mt-[clamp(0.25rem,0.8dvh,0.55rem)] h-[clamp(0.6rem,1.7dvh,1.15rem)] w-auto max-w-none"
        />

        {/* 10:00 AM Onwards */}
        <img
          src={text5}
          alt="10:00 AM Onwards"
          className="mt-[clamp(0.7rem,2.1dvh,1.4rem)] h-[clamp(0.6rem,1.7dvh,1.15rem)] w-auto max-w-none"
        />

        {/* At - RA 11 */}
        <img
          src={text6}
          alt="At - RA 11"
          className="mt-[clamp(0.45rem,1.4dvh,0.95rem)] h-[clamp(0.6rem,1.7dvh,1.15rem)] w-auto max-w-none"
        />

        {/* Attire - Coastal/ Breezy/ Western */}
        <img
          src={text7}
          alt="Attire - Coastal/ Breezy/ Western"
          className="mt-[clamp(0.65rem,2dvh,1.35rem)] h-[clamp(0.6rem,1.7dvh,1.15rem)] w-auto max-w-none"
        />
      </div>

      {/* Couple: max-w keeps it inside the screen on narrow phones */}
      <img
        src={couple}
        alt="Jyoti and Prakhar"
        className="absolute bottom-[9dvh] left-[56%] h-[44.5dvh] max-w-[88%] -translate-x-1/2 object-contain object-bottom"
      />

      {/* Disco balls and flowers in the bottom corners, in front of the couple */}
      <img
        src={bottomLeft}
        alt=""
        className="absolute bottom-[-2dvh] left-0 h-[20.5dvh] w-auto max-w-none translate-x-[-8%]"
      />
      <img
        src={bottomRight}
        alt=""
        className="absolute right-0 bottom-[-2dvh] h-[21dvh] w-auto max-w-none translate-x-[8%]"
      />
    </div>
  )
}

export default Page5
