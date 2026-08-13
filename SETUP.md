# Steve Cook Fiction — GitHub Pages setup

This folder is a static rebuild of [stevecookfiction.com](https://stevecookfiction.com) for GitHub Pages. Audio and podcast sections from the original Squarespace site are omitted.

## What's included

- Single-page site with section navigation (`index.html`)
- All images and PDFs in `assets/`
- Contact form wired for [FormSubmit](https://formsubmit.co) (free, no backend required)
- `CNAME` file for custom domain `stevecookfiction.com`

## 1. Create the GitHub repository

1. On GitHub, create a new **public** repository (e.g. `stevecookfiction`).
2. Push this folder's contents to the repository root (not inside a subfolder).

```bash
cd stevecookfiction
git init
git add .
git commit -m "Initial GitHub Pages site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/stevecookfiction.git
git push -u origin main
```

## 2. Enable GitHub Pages

1. Open the repo on GitHub → **Settings** → **Pages**.
2. Under **Build and deployment**:
   - **Source**: Deploy from a branch
   - **Branch**: `main` / `/ (root)`
3. Save. After a minute or two the site will be live at:

   `https://YOUR_USERNAME.github.io/stevecookfiction/`

   (or your custom domain once DNS is configured)

## 3. Custom domain (stevecookfiction.com)

The `CNAME` file already contains `stevecookfiction.com`.

1. In **Settings → Pages**, enter `stevecookfiction.com` as the custom domain and save.
2. At your domain registrar (where you bought the domain), add DNS records:

   | Type | Name | Value |
   |------|------|-------|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | CNAME | `www` | `YOUR_USERNAME.github.io` |

3. Wait for DNS to propagate (often 15–60 minutes, sometimes longer).
4. Back in GitHub Pages settings, enable **Enforce HTTPS** once the certificate is issued.

## 4. Point the domain away from Squarespace

When the GitHub site works on the custom domain:

1. Cancel or disconnect the domain from Squarespace (or remove Squarespace DNS records).
2. Keep only the GitHub Pages DNS records above.

## 5. Contact form — email setup

The contact form uses [FormSubmit](https://formsubmit.co), which forwards submissions to your inbox.

### Configure your email

1. Open `index.html`.
2. Find the contact form `action` URL:

   ```html
   action="https://formsubmit.co/YOUR_EMAIL@example.com"
   ```

3. Replace `YOUR_EMAIL@example.com` with your real email address.
4. Commit and push the change.

### First-time activation

The first time someone submits the form, FormSubmit sends you a **confirmation email**. Click the link in that email to activate forwarding. After that, every submission is emailed to you.

### Optional FormSubmit settings

Add hidden fields inside the `<form>` tag:

```html
<input type="hidden" name="_next" value="https://stevecookfiction.com/#contact">
<input type="hidden" name="_template" value="table">
```

- `_next` — redirect URL after a non-AJAX submit (the site uses AJAX by default).
- `_template` — `table` or `box` for email layout.

### Alternative: Formspree

If you prefer Formspree:

1. Sign up at [formspree.io](https://formspree.io).
2. Create a form and copy your form ID.
3. Change the form tag to:

   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

4. Remove the `data-ajax="true"` attribute (or keep it — Formspree supports AJAX with `Accept: application/json`).

## 6. Local preview

Open `index.html` in a browser, or use a simple static server:

```bash
# Python
python -m http.server 8080

# Node (if npx available)
npx serve .
```

Then visit `http://localhost:8080`.

Note: the contact form only works when the site is served over HTTPS (GitHub Pages) or when testing FormSubmit from a deployed URL.

## 7. Updating content

| Change | Edit |
|--------|------|
| Section text | `index.html` |
| Images | `assets/img/` (keep paths in sync with HTML) |
| Downloadable PDFs | `assets/docs/` |
| Styles | `assets/css/style.css` |
| Contact email | `index.html` form `action` URL |

## Assets note

Most images are stored locally in `assets/img/`. A few images (You Are Two Cats gallery, bio photo) still load from Squarespace CDN URLs. To make the site fully self-contained before you cancel Squarespace:

1. Download those images from the live site.
2. Save them under `assets/img/`.
3. Update the `src` paths in `index.html`.

Similarly, ensure `assets/docs/Uplifted.pdf` exists — download it from the current site's short-stories page if it is missing locally.

## Repository layout

```
stevecookfiction/
├── index.html
├── CNAME
├── SETUP.md
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   ├── docs/          # PDF downloads
│   └── img/           # images by section
```
