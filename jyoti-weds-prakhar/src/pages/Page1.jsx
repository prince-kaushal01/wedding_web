import bg from '../assets/page1-bg.png'
import logo from '../assets/page1-logo.PNG'
import text1 from '../assets/page1-text1.png'
import text2 from '../assets/page1-text2.png'
import text3 from '../assets/page1-text3.png'
import text4 from '../assets/page1-text4.png'
import text5 from '../assets/page1-text5.png'
import text6 from '../assets/page1-text6.png'
import text7 from '../assets/page1-text7.png'
import text8 from '../assets/page1-text8.png'
import text9 from '../assets/page1-text9.png'
import text10 from '../assets/page1-text10.png'
import text11 from '../assets/page1-text11.png'
import text12 from '../assets/page1-text12.png'
import bottom from '../assets/page1-bottom.png'
import bottomLeft from '../assets/page1-bottomleft.png'
import bottomRight from '../assets/page1-bottomright.png'

const Page1 = () => {
  return (
    // 165dvh tall = 65dvh of scrolling + one full screen. Background sticks to the top and the building
    // sticks to the bottom while the texts scroll. When the 165dvh is finished, everything scrolls away together.
    // To make the second texts appear sooner or later, change BOTH 65dvh values below (165 = 65 + 100).
    // overflow-clip is used (not overflow-hidden) because overflow-hidden would break sticky.
    <div className="relative flex h-[165dvh] w-full flex-col justify-between overflow-clip bg-[#d9ecf7]">
      {/* Background: sticky at the top */}
      <img
        src={bg}
        alt=""
        className="sticky top-0 h-dvh w-full shrink-0 scale-105 object-cover"
      />

      {/* Bottom building: sticky at the bottom, above the texts (z-20) so texts come out from behind it */}
      <img
        src={bottom}
        alt=""
        className="sticky bottom-0 z-20 h-[clamp(12rem,41dvh,26rem)] w-full shrink-0 object-center"
      />

      {/* Palm trees: placed at the very bottom of the page, above the building (z-30).
          They come up from below while scrolling and end up sitting on the building */}
      <img
        src={bottomLeft}
        alt=""
        className="absolute bottom-[-2dvh] left-0 z-30 h-[clamp(14rem,50dvh,32rem)] w-auto max-w-none translate-x-[-45%]"
      />
      <img
        src={bottomRight}
        alt=""
        className="absolute right-0 bottom-[-2dvh] z-30 h-[clamp(18rem,64dvh,40rem)] w-auto max-w-none translate-x-[55%]"
      />

      {/* All texts: below the building (z-10), they scroll normally */}
      <div className="absolute inset-x-0 top-0 z-10">
        {/* ---------- First texts: logo, names and date. This box is 65dvh tall,
            so the second texts start right after it instead of a full screen later ---------- */}
        <div className="flex h-[65dvh] flex-col items-center pt-22">
          {/* Logo */}
          <img
            src={logo}
            alt="Jyoti and Prakhar logo"
            className="h-[clamp(5rem,25vh,20rem)] w-auto max-w-none"
          />

          {/* Jyoti & Prakhar */}
          <img
            src={text1}
            alt="Jyoti & Prakhar"
            className="mt-[clamp(0.75rem,3.5dvh,2.25rem)] h-[clamp(3rem,2vh,7.5rem)] w-auto max-w-none"
          />

          {/* 29th - 30th */}
          <img
            src={text2}
            alt="29th - 30th"
            className="mt-[clamp(0.5rem,2.5dvh,1.5rem)] h-[clamp(0.6rem,2.4dvh,1.2rem)] w-auto max-w-none"
          />

          {/* November 2026 */}
          <img
            src={text3}
            alt="November 2026"
            className="mt-[clamp(0.4rem,1.5dvh,1rem)] h-[clamp(0.6rem,1.6dvh,1.4rem)] w-auto max-w-none"
          />
        </div>

        {/* ---------- Second texts: fill the screen once the scrolling is finished ---------- */}
        <div className="flex h-dvh flex-col items-center pt-[clamp(1.5rem,6dvh,4rem)]">
          {/* Ganesh symbol */}
          <img
            src={text4}
            alt=""
            className="h-[clamp(2.5rem,6.9dvh,4.5rem)] w-auto max-w-none"
          />

          {/* Shri Ganeshaya Namah */}
          <img
            src={text5}
            alt="Shri Ganeshaya Namah"
            className="mt-[clamp(0.5rem,2.2dvh,1.5rem)] h-[clamp(0.7rem,2.2dvh,1.4rem)] max-w-[90%] object-contain"
          />

          {/* Mantra */}
          <img
            src={text6}
            alt="Gayatri mantra"
            className="mt-[clamp(0.4rem,1.6dvh,1rem)] h-[clamp(2rem,5.2dvh,3.4rem)] max-w-[90%] object-contain"
          />

          {/* We cordially invite ... of */}
          <img
            src={text7}
            alt="We cordially invite your gracious presence to the occasion of engagement ceremony of"
            className="mt-[clamp(0.5rem,2.2dvh,1.5rem)] h-[clamp(2.75rem,7.6dvh,5rem)] max-w-[90%] object-contain"
          />

          {/* Jyoti */}
          <img
            src={text8}
            alt="Jyoti"
            className="mt-[clamp(0.1rem,0.5dvh,0.4rem)] h-[clamp(2.25rem,6.5dvh,4.25rem)] w-auto max-w-none"
          />

          {/* D/o Mrs. Kiran & Mr. Digvijay Singh */}
          <img
            src={text9}
            alt="D/o Mrs. Kiran & Mr. Digvijay Singh"
            className="mt-[clamp(0.25rem,1dvh,0.7rem)] h-[clamp(0.65rem,1.9dvh,1.25rem)] max-w-[90%] object-contain"
          />

          {/* and */}
          <img
            src={text10}
            alt="and"
            className="mt-[clamp(0.5rem,2dvh,1.3rem)] h-[clamp(0.55rem,1.6dvh,1.05rem)] w-auto max-w-none"
          />

          {/* Prakhar */}
          <img
            src={text11}
            alt="Prakhar"
            className="mt-[clamp(0.5rem,2dvh,1.3rem)] h-[clamp(1.6rem,4.6dvh,3rem)] w-auto max-w-none"
          />

          {/* S/o Mrs. Abha & Mr. Bhanu Pratap Singh */}
          <img
            src={text12}
            alt="S/o Mrs. Abha & Mr. Bhanu Pratap Singh"
            className="mt-[clamp(0.3rem,1.2dvh,0.8rem)] h-[clamp(0.65rem,1.9dvh,1.25rem)] max-w-[90%] object-contain"
          />
        </div>
      </div>
    </div>
  )
}

export default Page1
