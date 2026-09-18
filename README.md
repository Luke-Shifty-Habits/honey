# L & A B Honey

A one-page site for selling honey direct, built to be scanned off a jar label.
Plain HTML/CSS/JS — no build step, no dependencies.

```
index.html          the whole site
assets/css/style.css
assets/js/order.js   live total + builds the order email
assets/img/          web-sized photos (originals left in the repo root)
tools/make-qr.py     generates the label QR code
```

## Publishing to GitHub Pages

1. Create a repo on GitHub (e.g. `honey`) — public.
2. From this folder:

   ```bash
   git remote add origin https://github.com/<you>/honey.git
   git branch -M main
   git push -u origin main
   ```

3. Repo → **Settings** → **Pages** → Source: **Deploy from a branch**, Branch: **main**, folder: **/ (root)** → Save.
4. A minute later it's live at `https://<you>.github.io/honey/`.

Every later change is just `git add -A && git commit -m "..." && git push`.

### Using your own domain

Put the domain in a file called `CNAME` (one line, e.g. `lnabhoney.com`), push, then
point the domain's DNS at GitHub Pages and set it under Settings → Pages → Custom domain.

## The QR code for the labels

```bash
pip install segno
python tools/make-qr.py https://<you>.github.io/honey/
```

Use `qr-label.svg` for printing — it stays sharp at any size. Print it at least
2 cm across and keep a clear white margin around it so phones lock on quickly.

**Tip:** if you ever move the site, a QR code already printed on jars can't be changed.
Buying a cheap domain now and pointing it at Pages means the code keeps working forever.

## How ordering works

The form doesn't charge anyone. It validates the entries, works out the total, and
opens the customer's own email app with the order written out to
`luke.briggs.honey@gmail.com` — they just press send. Nothing to sign up for, nothing
to pay for, and no customer data passes through a third party.

There are also Text / Call / Email buttons underneath for anyone who'd rather do that.

### If you'd rather the form submitted straight to your inbox

Sign up at [formspree.io](https://formspree.io) (free tier), then in `assets/js/order.js`
replace the `window.location.href = 'mailto:...'` block with a `fetch()` POST to your
Formspree endpoint. A few people's phones handle `mailto:` poorly, so this is worth
doing if you ever see orders go quiet.

## Editing the common things

| What | Where |
|---|---|
| Prices | `index.html` (the `.pricing` list) **and** the `ITEMS` prices in `assets/js/order.js` |
| Adding Blackberry/Clover or Manuka | copy the `<article class="product">` block, and add an entry to `ITEMS` + a `.qty` row in the form |
| Phone / email | `index.html` (contact row + footer) and `EMAIL` in `assets/js/order.js` |
| Colours | the `:root` variables at the top of `assets/css/style.css` |

Prices live in two places on purpose — the page shows them, the script totals them.
Change both together.
