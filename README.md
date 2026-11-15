# Black & White

A tiny personality game: pick one of two words, seventeen times, and get a read on your nature.
Pure HTML, CSS and JavaScript. No build step, no dependencies.

## Put it on GitHub Pages

1. Create a new repository on GitHub (for example `black-and-white`).
2. Upload `index.html`, `style.css`, `app.js` and `data.js` to the repository root.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
5. After a minute your game is live at `https://<your-username>.github.io/black-and-white/`.

## Customise

Everything lives in `data.js`:

- **Questions**: each has an `a` and a `b` option. Add or remove pairs freely.
- **Scoring**: `w` on each option adds points to traits (`fire`, `depth`, `warmth`, `order`, `candor`, `indep`, `ground`, `vital`). Weights of 1 to 3 work well.
- **Bold / soft**: set `side` to `"bold"` or `"soft"` to feed the "Two sides of you" panel.
- **Panel colour**: set `tone` to `"light"` or `"dark"` on an option (useful for Black / White style questions).
- **Personality text**: edit each trait's `high` and `low` paragraphs, its `tag` line, and the `adj` / `noun` words that build the title (for example "Moonlit Flame").

## How the analysis works

Each trait's score is compared with the lowest and highest score possible for that trait, so every bar shows how far you leaned (0 to 100%).
The top two traits form your title, the top two write your story, and your weakest trait adds a "flip side" paragraph when it is clearly low.
