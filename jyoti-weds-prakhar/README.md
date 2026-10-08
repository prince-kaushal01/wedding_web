# Jyoti Weds Prakhar

A mobile wedding invitation website for Jyoti and Prakhar (29th – 30th November 2026). Guests open an envelope, scroll through the events, and send their RSVP at the end.

It is built for phones. It also opens on a laptop, but the layout is designed for a tall, narrow screen.

## Built with

- **React 19** and **Vite** – the app and the dev server
- **Tailwind CSS 4** – all styling (no inline CSS)
- **GSAP** with **ScrollTrigger** – every animation
- **Lenis** – smooth mouse-wheel scrolling (phones use their normal scrolling)

## Run it

```bash
npm install      # once, to download the packages
npm run dev      # start the site at http://localhost:5173
npm run build    # make the final files in the dist folder
npm run preview  # look at the built site
npm run lint     # check the code for mistakes
```

## What the guest sees, in order

| # | Screen | File | What happens |
|---|--------|------|--------------|
| 1 | Loading screen | `src/pages/Loader.jsx` | Stays until every image and font has loaded, then fades out |
| 2 | Envelope | `src/pages/Envelope.jsx` | Tap the seal: it opens and the song starts |
| 3 | Welcome and invitation | `src/pages/Page1.jsx` | Logo, names, scratch card over the dates, flying birds, then the invitation text |
| 4 | Oli Ceremony | `src/pages/Page3.jsx` | 29th, 4:30 PM, with falling petals |
| 5 | Welcome Dinner | `src/pages/Page2.jsx` | 29th, 8:30 PM, curtains open to reveal the page |
| 6 | Yacht Party | `src/pages/Page5.jsx` | 30th, 10:00 AM |
| 7 | Engagement | `src/pages/Page4.jsx` | 30th, 5:00 PM |
| 8 | Blessings | `src/pages/Blessings.jsx` | Blessings and the family names |
| 9 | RSVP | `src/pages/Rsvp.jsx` | Form, map, phone numbers, countdown |
| 10 | Footer | `src/pages/Footer.jsx` | Closing message |

The page file numbers do not match the order on screen (Page3 comes before Page2, Page5 before Page4). **The order is set in `src/App.jsx`**: move the lines there to reorder the pages.

## Folders

```
index.html            page title and the Google Fonts link
src/
  main.jsx            starts the app
  App.jsx             puts the pages in order, sets up scrolling
  index.css           loads Tailwind
  pages/              one file per screen (see the table above)
  components/
    ScratchCard.jsx   the gold scratch-off card on Page1
    Countdown.jsx     the flip countdown on the RSVP page
  assets/             every image, plus song.mp3
```

Images are named after the page they belong to: `env-*` for the envelope, `page1-*` to `page5-*` for the pages, and `rsvp.webp` for the sky behind the ending.

All images in `src/assets` are **WebP**, which is about a sixth of the size of the PNGs they were made from. The original PNG files are kept in the `original-images/` folder. That folder is not part of the website, so guests never download it.

To add or replace an image, save it as `.webp` in `src/assets` (any image editor or an online "PNG to WebP" converter can do this). Keep small text images lossless, and use quality 85 – 90 for large pictures.

## Things you are likely to change

| What | Where |
|------|-------|
| Order of the pages | `src/App.jsx` |
| Where RSVP answers are sent | `SHEET_URL` in `src/pages/Rsvp.jsx` |
| "Open in Google Maps" button link | `MAPS_URL` in `src/pages/Rsvp.jsx` |
| The map shown on the page | `MAP_EMBED_URL` in `src/pages/Rsvp.jsx` |
| Countdown date and time | `WEDDING_DATE` in `src/pages/Rsvp.jsx` |
| Engagement mood choices | `MOODS` in `src/pages/Rsvp.jsx` |
| Contact phone numbers | `PHONES` in `src/pages/Rsvp.jsx` |
| Family names | `NAMES` in `src/pages/Blessings.jsx` |
| Where the song starts (in seconds) | `SONG_START` in `src/pages/Envelope.jsx` |
| Number of falling petals | `length: 28` in `src/pages/Page3.jsx` |
| Fonts the loading screen waits for | `FONTS` in `src/pages/Loader.jsx` |
| Scroll speed and smoothness | the Lenis settings in `src/App.jsx` |

Each page file has comments beside its sizes and animation values explaining what to change.

## Rules this project follows

Keep to these when editing, so new work matches the rest:

- **Tailwind only.** No inline `style`. Custom values go in square brackets, for example `h-[clamp(4rem,12svh,7rem)]`.
- **Size things by screen height** with `clamp()` and `svh` units, so the layout looks the same on short and tall phones.
- **Use `svh`, never `dvh`.** `dvh` changes whenever the phone's address bar hides or shows, which makes scrolling freeze.
- **GSAP only** for animation.
- **One file per page** in `src/pages/`.
- **Do not move an image with GSAP if it has a Tailwind `translate` class.** GSAP overwrites the translate and the image jumps out of place. Wrap the image in a `div` and animate the `div` instead (the pages already do this).
- **Do not put `overflow-hidden` on a box that contains a `sticky` element.** It stops sticky from working. Page1 uses `overflow-clip` for this reason.

## How the main features work

- **Loading screen** – finds every `<img>` on the site by itself, so new images are waited for automatically. New Google fonts must be added to its `FONTS` list.
- **Song** – browsers only allow sound to start from a tap. The song starts silently on the seal tap, then is turned up from 1:31 once the envelope has opened. When it ends it goes back to 1:31.
- **Scroll animations** – most pages animate as they scroll into view, tied to the scroll position (`scrub`). Page1 and the Welcome Dinner page stay on screen while their animation plays; the other pages scroll normally.
- **Refresh** – the site always starts again from the top (loading screen, then envelope).
- **RSVP form** – sends three fields, `name`, `attending` and `mood`, to `SHEET_URL`.

## Before sending the invitation to guests

- [ ] **Check RSVP replies reach the sheet.** Send a test reply and look for the new row. The site shows "Thank you" whether or not the row was saved, so the sheet is the only real check.
- [ ] **Test on real phones**, both iPhone and Android: the song, the scratch card, scrolling, and the map button.
- [ ] **Check the map button** opens the right venue.
- [ ] **Make the song smaller.** `song.mp3` is 8.8 MB, more than all the images together (5.8 MB). Trimming it to start at 1:31 and saving it at a lower bitrate would bring it to about 2 MB.
