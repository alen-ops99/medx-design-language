---
name: medx-design
description: Med&X design language with ready templates. Use for any Med&X, Plexus, Plexus Week, Plexus Conference, Med&X Gala, Building Bridges or Biomedical Forum visual, such as an Instagram or LinkedIn post, story, carousel slide, speaker announcement, event card, flyer, poster, invitation image or banner, in Croatian or English. Gives the colours, fonts, spacing and components of the approved Med&X posts and renders exact-size PNGs (1080x1350 feed, 1080x1920 story) with headless Chrome.
---

# Med&X design (medx-design)

Make Med&X visuals that look like the approved Med&X posts. Paths below are relative to this skill's folder.

## Before you design

1. Read `DESIGN.md` in full. It holds the colours, faces, type sizes, spacing, components, photo treatment, and the do and don't list, all copied from the approved posts.
2. Look at the matching render in `examples/` so you know the target.
3. Pick the template that fits the message:
   - a number or two that people must see at once (points, seats, years, results): `big-number-feed` or `big-number-story`
   - urgency or tickets for an event (last seats, registration closing): `ticket-feed` or `ticket-story`
   - a person (keynote speaker, panelist, award) or an event announcement: `photo-card-feed` or `photo-card-story`
4. If nothing fits, build a new layout from `tokens.css` and the rules in `DESIGN.md`, in Open Sans (the Med&X default face for new designs). Do not take a template and only swap its fonts.

## Make a post

1. Copy the example values file, for example `cp examples/photo-card-feed.json /path/to/work/my-post.json`.
2. Fill in the text and set `PHOTO` to a real Med&X photograph (a path, relative to the JSON file or absolute). Use `PHOTO_POSITION` to choose the crop. Every key is listed at the end of `DESIGN.md`.
3. Render: `templates/render.sh photo-card-feed /path/to/work/my-post.json /path/to/work/my-post.png`. Add `--scale 2` for a high-resolution copy.
4. Open the PNG and look at it at full size and at phone size. Fix and render again until it reads in five seconds.

`render.sh` needs Google Chrome (or Chromium, set `CHROME=/path`) and python3. It stops with an error when a font or photo did not load, text runs off the canvas or out of its bar, a placeholder is left empty, or the PNG is not the exact size. On a computer without Apple's New York font it uses Newsreader and says so.

## Rules

- Never invent a fact (date, venue, price, points, a count of seats). Ask for it or leave it out.
- Use real Med&X photographs. Never stock photos or AI-made people. A stand-in photo is marked as a sample.
- Keep the one crimson accent, the cream ground and the faces of the template. No new fonts or colours.
- Short plain words, full Croatian letters (č ć š ž đ), no semicolons, en dashes only in ranges.
- www.medx.hr is the only address on a post.
- Nothing is posted by this skill. Posting is a person's decision.
