# Saturday Date invitation

A zero-dependency, mobile-first static invitation site inspired by the supplied Tbilisi poster.

## Edit the wording

All visitor-facing text is collected in [`COPY.md`](./COPY.md), grouped by screen.
Use it to choose replacement wording, then update the corresponding text in `index.html`.

## Preview locally

Open `index.html` in a browser. No build step is required.

## Connect the RSVP inbox

This site deliberately will **not claim a response was saved** until its Google Apps Script endpoint is configured.

1. Create a private Google Sheet with a tab named `RSVPs`.
2. Add this header row to it:

   ```text
   Received at | Meet-up preference | Coffee | Comment | Submitted at
   ```

3. Copy the spreadsheet ID from the Sheet URL (the text between `/d/` and `/edit`).
4. In the Sheet, select **Extensions → Apps Script**.
5. Replace the default code with [`rsvp-apps-script.js`](./rsvp-apps-script.js), adding the spreadsheet ID where indicated.
6. Select **Deploy → New deployment → Web app**:
   - **Execute as:** Me
   - **Who has access:** Anyone
7. Authorize the script and copy the Web app URL.
8. In [`script.js`](./script.js), set `RSVP_ENDPOINT` to that URL.

Submit a test RSVP and confirm that it appears in the private Sheet before sharing the site.

## Public link

The invitation is live at:

```text
https://htmlpreview.github.io/?https://github.com/iona-bartishvili/saturday-date/blob/main/index.html
```

This is rendered for free from the public GitHub repository. Future changes pushed to `main` are available automatically.

## Publish with GitHub Pages instead

1. Create an empty GitHub repository named `saturday-date` (do not initialize it with a README).
2. From this folder, run:

   ```bash
   git init
   git add .
   git commit -m "Create Saturday date invitation"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/saturday-date.git
   git push -u origin main
   ```

3. In GitHub, open **Settings → Pages** and configure:
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/ (root)`

The invitation will be published at:

```text
https://YOUR-USERNAME.github.io/saturday-date/
```

Open the public URL on a phone and submit another test response before sending it.
