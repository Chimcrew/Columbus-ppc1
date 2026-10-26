# Rebuild "Recent Projects" as Before & After split cards

## Goal
Replicate the reference section exactly: eyebrow "BEFORE & AFTER", huge "Recent Projects" headline, and a horizontally scrolling row of white cards. Each card shows one split image — BEFORE on the left half, AFTER on the right half — with small labels over each half, then a bold project title and gray city below. No "See all" link (per your answer).

## Changes — src/routes/index.tsx only

1. **Data**: replace the current single-image `PROJECTS` array with before/after pairs:
   - `Crown & top rebuild — Columbus, OH`
   - `Crown rebuild + new cap — Westerville, OH`
   - `Full chimney rebuild — Dublin, OH`
   - `Rebuild & flashing — Hilliard, OH`
   - `Chase to brick rebuild — Gahanna, OH`
   - `Chase cover & cap replacement — Delaware, OH`

2. **Section header**: eyebrow "Before & After", headline "Recent Projects" (keeps Space Grotesk style), drop the current descriptive paragraph and the "our crew" highlight to match the reference.

3. **Cards**: horizontal scroll row with snap (`overflow-x-auto`, fixed card width ~260–280px, last card peeks to signal scrolling). Each card:
   - `border border-border bg-card`, minimal radius, thin border style already used sitewide
   - image area = two side-by-side halves (`flex`), each `aspect-square object-cover`, with a small uppercase chip pinned top-left of each half: BEFORE on a white chip, AFTER on the yellow primary chip
   - caption below the image: bold title, muted city line
   - lazy loading, explicit width/height, no layout shift

4. **Photos**: build the section now with the existing generated chimney images as temporary stand-ins so the page looks complete. When you send the real before/after photos, I'll upload them and swap them in — the data array is built so each project takes exactly two images.

## Verification
- Playwright: scroll the section, confirm cards render with BEFORE/AFTER chips and horizontal scrolling works on desktop (1280px) and mobile (390px)
- Confirm no console errors and clean build
