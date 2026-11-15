# Med&X design language

## Hrvatski

Ovdje je vizualni jezik Med&X objava: boje, fontovi, razmaci i dijelovi triju odobrenih objava (HLK bodovi, Gala "Posljednja mjesta", kartice glavnih govornika), s gotovim predlošcima koji izrađuju PNG točne veličine (1080x1350 za objavu, 1080x1920 za story).

Što je unutra:

- `DESIGN.md`: boje, fontovi, veličine slova, razmaci, dijelovi, obrada fotografija, što da i što ne.
- `SKILL.md`: upute za Claude Code.
- `templates/`: šest HTML predložaka i `render.sh`.
- `examples/`: primjeri s probnim tekstom i probnim fotografijama.
- `fonts/`, `assets/`: fontovi sa slobodnom licencom (uz licence) i Med&X logotipi.

Kako ga koristiti s Claude Codeom:

1. U Terminalu: `git clone <REPO_URL> ~/.claude/skills/medx-design`
2. Pokrenite novi Claude Code.
3. Recite mu, na primjer: "Koristi medx-design i napravi Instagram objavu i story za [događaj], s ovom fotografijom: [putanja]."

Potrebni su Google Chrome i python3 (na Macu dolazi s Xcode Command Line Tools). Font New York je Appleov i nije uključen: Mac ga već ima, a na drugim računalima predlošci sami koriste Newsreader.

## English

This is the visual language of Med&X posts: the colours, fonts, spacing and parts of three approved posts (the HLK points post, the Gala "last seats" post, the keynote speaker cards), with ready templates that render PNGs at the exact size (1080x1350 feed, 1080x1920 story).

What is inside:

- `DESIGN.md`: colours, fonts, type sizes, spacing, components, photo treatment, do and don't.
- `SKILL.md`: instructions for Claude Code.
- `templates/`: six HTML templates and `render.sh`.
- `examples/`: renders with placeholder text and sample photos.
- `fonts/`, `assets/`: fonts with an open licence (licences included) and the Med&X logos.

How to use it with Claude Code:

1. In Terminal: `git clone <REPO_URL> ~/.claude/skills/medx-design`
2. Start a new Claude Code session.
3. Tell it, for example: "Use medx-design to make an Instagram post and story for [event], with this photo: [path]."

It needs Google Chrome and python3 (on a Mac, python3 comes with the Xcode Command Line Tools). Apple's New York font is not included: every Mac has it, and on other computers the templates use Newsreader by themselves.

Quick test after cloning:

```
~/.claude/skills/medx-design/templates/render.sh photo-card-feed ~/.claude/skills/medx-design/examples/photo-card-feed.json ~/Desktop/medx-test.png
```
