// Secondary assets — pages 2-7
// Imported here so Vite resolves them to their hashed URLs.
// App.jsx fires new Image() for each after the loading screen reveals,
// so the browser caches them while the user is on the envelope page.

import p2Bg            from './assets/page2-bg.jpg'
import p2Above         from './assets/page2-above.png'
import p2Toptext       from './assets/page2-toptext.png'
import p2Logo          from './assets/page2-logo.png'
import p2Bottomtext    from './assets/page2-bottomtext.png'
import p2Lefttext      from './assets/page2-lefttext.png'
import p2Righttext     from './assets/page2-righttext.png'
import p2DBg           from './assets/page2-d-bg.jpg'
import p2DAbove        from './assets/page2-d-above.webp'
import p2DToptext      from './assets/page2-d-toptext.png'
import p2DLogo         from './assets/page2-d-logo.png'
import p2DBottomtext   from './assets/page2-d-bottomtext.png'
import p2DLefttext     from './assets/page2-d-lefttext.png'
import p2DRighttext    from './assets/page2-d-righttext.png'

import p3Bg            from './assets/page3-bg.jpeg'
import p3Topleft       from './assets/page3-topleft.png'
import p3Bottomright   from './assets/page3-bottomright.png'
import p3Toptext       from './assets/page3-toptext.png'
import p3Center        from './assets/page3-center.png'
import p3Text          from './assets/page3-text.png'
import p3Letter        from './assets/page3-letter.png'
import p3Letterdesign  from './assets/page3-letterdesign.png'
import p3DBg           from './assets/page3-d-bg.jpeg'
import p3DTopleft      from './assets/page3-d-topleft.png'
import p3DBottomright  from './assets/page3-d-bottomright.png'
import p3DToptext      from './assets/page3-d-toptext.png'
import p3DCenter       from './assets/page3-d-center.png'
import p3DText         from './assets/page3-d-text.png'
import p3DLetter       from './assets/page3-d-letter.png'
import p3DLetterdesign from './assets/page3-d-letterdesign.png'

import p4Bg            from './assets/page4-bg.jpg'
import p4Topleft       from './assets/page4-topleft.png'
import p4Bottomright   from './assets/page4-bottomright.png'
import p4Toptext       from './assets/page4-toptext.png'
import p4Center        from './assets/page4-center.png'
import p4Centerabove   from './assets/page4-centerabove.png'
import p4DBg           from './assets/page4-d-bg.jpg'
import p4DTopleft      from './assets/page4-d-topleft.png'
import p4DBottomright  from './assets/page4-d-bottomright.png'
import p4DToptext      from './assets/page4-d-toptext.png'
import p4DCenter       from './assets/page4-d-center.png'
import p4DCenterabove  from './assets/page4-d-centerabove.png'

import p5Bg            from './assets/page5-bg.jpg'
import p5Top           from './assets/page5-top.png'
import p5Bottom        from './assets/page5-bottom.png'
import p5Toptext       from './assets/page5-toptext.png'
import p5Center        from './assets/page5-center.png'
import p5Bottomtext    from './assets/page5-bottomtext.png'
import p5DBg           from './assets/page5-d-bg.jpg'
import p5DTop          from './assets/page5-d-top.webp'
import p5DBottom       from './assets/page5-d-bottom.webp'
import p5DBottomAbove  from './assets/page5-d-bottomabove.png'
import p5DToptext      from './assets/page5-d-toptext.png'
import p5DCenter       from './assets/page5-d-center.png'
import p5DBottomtext   from './assets/page5-d-bottomtext.png'

import p6Bg            from './assets/page6-bg.jpg'
import p6Bottom        from './assets/page6-bottom.png'
import p6Bottomright   from './assets/page6-bottomright.png'
import p6Center        from './assets/page6-center.png'
import p6Centerabove   from './assets/page6-centerabove.png'
import p6Toptext       from './assets/page6-toptext.png'
import p6DBg           from './assets/page6-d-bg.jpg'
import p6DTopleft      from './assets/page6-d-topleft.png'
import p6DBottomright  from './assets/page6-d-bottomright.webp'
import p6DCenter       from './assets/page6-d-center.png'
import p6DCenterabove  from './assets/page6-d-centerabove.png'
import p6DToptext      from './assets/page6-d-toptext.png'

import p7Bg            from './assets/page7-bg.jpg'
import p7Center        from './assets/page7-center.png'
import p7Above         from './assets/page7-above.png'
import p7Bottom        from './assets/page7-bottom.png'
import p7Logo          from './assets/page7-logo.png'
import p7Icon1         from './assets/page7-icon1.png'
import p7Icon2         from './assets/page7-icon2.png'
import p7Icon3         from './assets/page7-icon3.png'
import p7DBg           from './assets/page7-d-bg.jpg'
import p7DTopleft      from './assets/page7-d-topleft.png'
import p7DBottomright  from './assets/page7-d-bottomright.png'
import p7DCenter       from './assets/page7-d-center.png'
import p7DAbove        from './assets/page7-d-above.png'
import p7DBottom       from './assets/page7-d-bottom.png'

export const SECONDARY_ASSETS = [
  // Page 2
  p2Bg, p2Above, p2Toptext, p2Logo, p2Bottomtext, p2Lefttext, p2Righttext,
  p2DBg, p2DAbove, p2DToptext, p2DLogo, p2DBottomtext, p2DLefttext, p2DRighttext,
  // Page 3
  p3Bg, p3Topleft, p3Bottomright, p3Toptext, p3Center, p3Text, p3Letter, p3Letterdesign,
  p3DBg, p3DTopleft, p3DBottomright, p3DToptext, p3DCenter, p3DText, p3DLetter, p3DLetterdesign,
  // Page 4
  p4Bg, p4Topleft, p4Bottomright, p4Toptext, p4Center, p4Centerabove,
  p4DBg, p4DTopleft, p4DBottomright, p4DToptext, p4DCenter, p4DCenterabove,
  // Page 5
  p5Bg, p5Top, p5Bottom, p5Toptext, p5Center, p5Bottomtext,
  p5DBg, p5DTop, p5DBottom, p5DBottomAbove, p5DToptext, p5DCenter, p5DBottomtext,
  // Page 6
  p6Bg, p6Bottom, p6Bottomright, p6Center, p6Centerabove, p6Toptext,
  p6DBg, p6DTopleft, p6DBottomright, p6DCenter, p6DCenterabove, p6DToptext,
  // Page 7
  p7Bg, p7Center, p7Above, p7Bottom, p7Logo, p7Icon1, p7Icon2, p7Icon3,
  p7DBg, p7DTopleft, p7DBottomright, p7DCenter, p7DAbove, p7DBottom,
]
