# Med&X design language

The look of three approved Med&X social posts, written down so that anyone (or their Claude Code) can make new posts in the same style. Every value below is copied from the source CSS of those posts. Nothing here is invented. Where two designs use different values for a similar part, both are listed.

## The three approved designs

1. **Big-number post.** The HLK points post for Plexus Week (15 Nov 2026, version 4). "20 bodova aktivni sudionici / 12 bodova pasivni sudionici" in cream over a lecture photograph, a crimson rule on the left, the med&x logo top left. Template: `templates/big-number-feed.html`, `templates/big-number-story.html`.
2. **Ticket post.** The Gala "Posljednja mjesta" post (14 Nov 2026, round 3). A crimson ticket tilted 4 degrees, the event name in the serif, the dark date bar "5. PROSINCA Subota | Od 19:00 Hotel Esplanade, Zagreb", one call to action. Template: `templates/ticket-feed.html`, `templates/ticket-story.html`.
3. **Photo card.** The Plexus Week 2026 keynote speaker cards and the Gala event card (24 Oct 2026, v3). Cream page, photograph on top fading into the cream, red "Keynote speaker" pill, large serif name, role and institution, dark rounded date bar "4–5 DEC Fri–Sat | Plexus Week 2026 Zagreb, Croatia", med&x logo pill. Template: `templates/photo-card-feed.html`, `templates/photo-card-story.html`.

Renders of every template with placeholder text and sample photos are in `examples/`.

## Formats

- **Feed post:** 1080 x 1350 px (4:5).
- **Story:** 1080 x 1920 px (9:16). Instagram covers the top 250 px and the bottom 340 px with its own buttons. Keep text out of those bands.
- **High resolution copy:** the same page at 2x (2160 x 2700, 2160 x 3840) with `render.sh ... --scale 2`. The photo must then be twice as large to stay sharp.
- Export PNG for review. For posting, a JPG at quality 95 or more with an sRGB profile is fine.

## Colour

All three designs share one palette. One accent only: crimson.

- `--ink #191512`: text on cream, dark ground of the big-number post.
- `--cream #f7f1e6`: page ground of the ticket and the card, all light text on photographs, the logo pill.
- `--card #fdfaf3`: lighter card paper (inner cards on later carousel slides).
- `--crimson #9b1b22`: the keynote pill, the ticket, the rule on the big-number post. Never a second accent next to it.
- `--gold #c9a962`: the month word and the divider line inside a date bar. Only on dark grounds.
- `--gold-dark #6e5626`: gold when it must sit on cream.
- `--soft #4a4239`: role and institution lines under a name.
- `--muted #6d6459`: small captions.
- `--hair-soft rgba(25,21,18,.1)`: hairlines between fact rows.
- `--bar-ticket #221d19`: date bar under the ticket.
- `--bar-card #2b211c`: date bar on the photo card.
- Photo overlay on the big-number post: `rgb(20,16,13)` at 0.12 to 0.8 opacity (see Photo treatment).
- Multiply grade for portraits: `#eddcc2`. For events and rooms the grade is the cream itself.
- Inside the logo only: crimson `#9e1b22` and amber `#f8b018`. Do not use the amber anywhere else.

All tokens live in `tokens.css`.

## Type

Two families per piece at most. One serif moment per piece at most (the name or the event title).

**Faces as approved**

- Big-number post: **Open Sans** only. ExtraBold 800 for the figures, Bold 700 for units and the bold half of the headline, Medium 500 for everything else.
- Ticket and photo card: **Inter** for all text (Medium 500, SemiBold 600, Bold 700, Black 900 for the ticket words) plus one serif line in **New York Medium** (Apple), set at optical size 64 and weight 500.
- Figures and dates use tabular numerals (`font-variant-numeric: tabular-nums`).

**Open Sans for new designs.** Since 15 Nov 2026 Open Sans is the Med&X default face for new designs (posts, stories, flyers, the site). The templates here keep the faces of the approved posts. A brand-new layout starts in Open Sans. Do not take the ticket or the card and only swap its faces to Open Sans: a face swap without a matching layout change was tried and turned down. Change the layout with the face.

**Font files and licences**

- Inter 4.1, SIL Open Font License 1.1: included in `fonts/inter/` with `LICENSE.txt`.
- Open Sans, SIL Open Font License 1.1: included in `fonts/open-sans/` with `OFL.txt`.
- Newsreader, SIL Open Font License 1.1: included in `fonts/newsreader/` with `OFL.txt`. It stands in for New York on any computer that does not have New York.
- **New York is not included.** It is Apple's font. Its licence does not allow passing the file on, and it also limits what the font may be used for, so read Apple's terms before you rely on it outside a Mac mockup. Every Mac has it at `/System/Library/Fonts/NewYork.ttf`, and the templates load it from there (Apple's download page: https://developer.apple.com/fonts/). Without it (Windows, Linux) the templates fall back to Newsreader by themselves, and `render.sh` says so. `examples/photo-card-feed-newsreader.png` shows that look.

**Type scale, big-number post** (Open Sans, cream on photo, absolute positions in the template)

- Figure: 300 px, 800, letter-spacing 0.005em, line-height 1.
- Unit ("bodova"): 64 px, 700, -0.025em.
- Label ("aktivni sudionici"): 48 px, 500, -0.014em.
- Headline, two lines 74 px apart: 66 px, -0.02em, first words 700 then 500, second line 700.
- Date line: 54 px, 500, -0.012em.
- Site line: 48 px, 500 with the address in 700.
- Smallest word is 48 px, about 16 px on a phone.

**Type scale, ticket post** (Inter unless noted)

- Ticket words: Inter Black 900, letter-spacing -0.05em, line-height 0.84, sized to fill 660 x 246 px (story 660 x 261).
- Ticket stub: 36 px, 700, letter-spacing 0.04em, turned 90 degrees.
- Event title: New York 500, -0.015em, line-height 1.04, sized to 952 px wide, capped at 104 px (story 112 px).
- Date bar: day 104 px 600 (-0.03em), month 42 px 600 gold (0.04em, capitals), weekday 42 px 500, right column 42 px 500 at line-height 1.28.
- Call to action: 48 px, 500, address in 700.

**Type scale, photo card** (Inter unless noted)

- Pill: 34 px, 600, letter-spacing 0.005em.
- Name: New York 500, 130 px, -0.02em, line-height 1.02, two lines. Shrinks only when a line is wider than 952 px.
- Role and institution: 42 px, 500, line-height 1.25, colour `--soft`, two lines.
- Fact rows (story only): 38 px, 500, line-height 1.3, with a 40 px line icon.
- Date bar: number 80 px 700 (-0.035em, line-height 0.9), month 36 px 700 gold (0.08em, capitals), days 36 px 600, right column 38 px (first line 600, second 500, line-height 1.15).

## Spacing

The sources use fixed pixel positions on the 1080 px canvas rather than a strict grid. The values that repeat:

- Side margin: **64 px** on the ticket and the card (content 952 px wide). The big-number post sets its ink at 73 to 80 px with the crimson rule at 44 px.
- Logo pill: **56 px** from the top and left edge.
- Bottom margin: 52 to 56 px on the feed designs. The card's date bar ends 56 px above the bottom edge, the ticket stack 52 px.
- Gaps on the ticket post: ticket to title 46 px, title to date bar 26 px, date bar to call to action 28 px.
- Gaps on the card: pill to name 28 px (story 26), name to role 24 px (story 20), role to fact rows 30 px.
- Card feed: text block bottom sits 228 px above the canvas bottom, date bar at y 1166, 128 px tall.
- Card story: text block bottom 974 px above the canvas bottom, date bar at y 978, photo tile from y 1146, 710 px tall, 64 px above the bottom.
- Corner radii: date bar 20 px (card) or 26 px (ticket), photo tile 28 px, pills fully round (999 px).

## Components

**Logo.** `assets/logo/`. On a dark photograph: the colour-on-dark SVG with no pill, 56 px tall (big-number post). On cream: the ink PNG, 48 px tall with no pill (ticket story). Over a photograph that turns light: the ink logo in a cream pill.

**Logo pill.** Two versions. Card: padding 16 x 26 px, cream ground, shadow `0 0 0 1px rgba(25,21,18,.1), 0 2px 4px rgba(25,21,18,.08), 0 8px 22px rgba(25,21,18,.16)`, logo 36 px tall. Ticket: 68 px tall, padding 0 29 px, ground `rgba(250,246,238,.94)`, shadow `0 6px 24px -10px rgba(25,21,18,.35)`, logo 42 px tall. Always top left, 56 px in (story card: inside the photo tile, 24 px from its corner).

**Keynote pill.** Crimson, white text, 34 px Inter 600, padding 18 x 32 px, fully round. Two or three words: "Keynote speaker", "Plexus Week 2026". It sits directly over the faded edge of the photograph.

**Name or title.** One serif line or two, New York 500, ink. Break the name by hand into first and last name.

**Role lines.** Two lines in Inter 500, colour `--soft`: the role, then the institution. No full stops.

**Date bar.** A dark rounded bar with four parts in one row: a large number (day or range), a column with the month in gold capitals over the weekday, a 3 px gold divider, and a right column with two lines (event and place, or time and place). Card version: 952 x 128 px, `#2b211c`, radius 20, shadow `0 1px 2px rgba(25,21,18,.08), 0 14px 32px rgba(25,21,18,.14)`, contents start 40 px in. Ticket version: 952 x 178 px, `#221d19`, radius 26, padding 0 28 px, larger type.

**Ticket.** Crimson block 330 px tall (story 350), turned -4 degrees, with a half-circle notch of 30 px radius (story 32) cut into each short side. The main part holds two words in Inter Black. A 136 px stub on the right is set off by a 3 px dashed cream line at 60 % opacity and carries a short label turned 90 degrees ("GALA 2026"). Shadow `drop-shadow(0 18px 24px rgba(60,10,12,.30))`.

**Big-number block.** Figure, unit, label, repeated twice, left aligned in cream, then a two-line headline, a date line and the site line. An 8 px crimson rule runs down the left edge beside the whole block. A leading "1" in a figure is moved 6 px left (`FIGURE_2_X 67` against 73) so the ink lines up.

**Call to action.** One line, 48 px, the address in bold. The only address is www.medx.hr.

**Fact rows** (card story). Up to two rows, each with a hairline above and one under the last row, a globe icon (row 1) or a pin icon (row 2) and one line of text. Leave a row out and it disappears.

**Photo tile** (card story). 952 x 710 px, radius 28, shadow `0 1px 2px rgba(25,21,18,.06), 0 18px 40px rgba(25,21,18,.12)`, cream multiply grade, logo pill inside.

## Photo treatment

- **Big-number post:** the photograph fills the canvas. A left shade from `rgba(20,16,13,.66)` at the edge to clear at 60 % of the width (masked lighter near the top so the logo area keeps the photograph), a foot shade from clear at y 784 to 0.7 at y 1054 and 0.8 at the bottom, and a soft round patch behind the second figure. Story: the same in story positions, with two patches.
- **Ticket post:** a 760 px band at the top (story: 720 px at the bottom), fully visible to 44 % of its height and fading into the cream by 72 % (story: fades upward over its top 20 %). No grade.
- **Photo card:** a 760 px band at the top, fully visible to 560 px, fading to the cream by 760 px. A multiply grade (cream for events and rooms, `#eddcc2` for portraits) and a half-strength desaturation band over its last 120 px.
- Per-photo fixes in the approved posts (a colour wash on one portrait's blue background, a vignette on another) are left out of the templates. Add them by hand only when a photograph needs them.
- `PHOTO_POSITION` (CSS object-position, for example `50% 20%`) chooses the part of the photograph you see, and `PHOTO_ZOOM` (1 or more) crops in further. The check warns when a photograph is enlarged more than 1.2 times.

## Do

- Use real Med&X event photographs at scale: the stage, the room, the people.
- Keep one crimson accent, cream or a dark photograph as the ground, the gold only inside date bars.
- Keep words few and short. A busy reader should get the point in five seconds.
- Write Croatian with every letter (č ć š ž đ). The render checks that the faces have them.
- Check every fact (date, venue, points, price) against the official source before posting.
- Look at every render at full size and at phone size before posting.

## Don't

- Don't use Playfair Display, Cormorant, Fraunces or other display serifs. Don't pick a new face.
- Don't use the navy and gold template: navy header, gold letter-spaced eyebrow, short gold rule under a title.
- Don't add gradient blobs, glows, glass on everything, emoji icons, three-card grids or centred everything.
- Don't use stock photos, AI-made people or a fake product photo. Mark any stand-in as a sample.
- Don't flip or retouch photographs. Keep text off faces and off banners or signage in the photograph.
- Don't invent numbers. "Posljednja mjesta" without a count, unless a real count exists.
- Don't use semicolons or long dashes in post text. Use en dashes only in ranges (4–5 DEC).
- Don't put a second address or a QR code next to www.medx.hr.

## Template keys

Write a JSON file with these keys and run `templates/render.sh`. Keys with a default may be left out. Text is inserted as plain text.

- **big-number-feed, big-number-story:** `PHOTO`, `PHOTO_POSITION` (50% 50%), `PHOTO_ZOOM` (1), `FIGURE_1`, `FIGURE_1_UNIT`, `FIGURE_1_LABEL`, `FIGURE_2`, `FIGURE_2_UNIT`, `FIGURE_2_LABEL`, `FIGURE_1_X` (73), `FIGURE_2_X` (67), `HEADLINE_BOLD`, `HEADLINE_REST` (empty), `HEADLINE_LINE_2`, `DATE_LINE`, `SITE_TEXT` (Više na), `SITE_BOLD` (www.medx.hr).
- **ticket-feed, ticket-story:** `PHOTO`, `PHOTO_POSITION`, `PHOTO_ZOOM`, `TICKET_LINE_1`, `TICKET_LINE_2` (empty), `STUB_TEXT`, `TITLE`, `BAR_DAY`, `BAR_MONTH`, `BAR_WEEKDAY`, `BAR_LINE_1`, `BAR_LINE_2` (empty), `CTA_TEXT`, `CTA_BOLD` (www.medx.hr).
- **photo-card-feed, photo-card-story:** `PHOTO`, `PHOTO_POSITION` (50% 30%), `PHOTO_ZOOM`, `GRADE` (#f7f1e6), `PILL`, `TITLE_LINE_1`, `TITLE_LINE_2` (empty), `SUB_LINE_1`, `SUB_LINE_2` (empty), `BAR_NUM`, `BAR_MONTH`, `BAR_DAYS`, `BAR_LINE_1`, `BAR_LINE_2` (empty). Story only: `ROW_1`, `ROW_2` (both optional).

Text that is too long for its place shrinks to fit (ticket words, titles, the big-number headline and date lines). Other lines stay at their size, and `render.sh` stops with an error when they leave the canvas or their bar.
