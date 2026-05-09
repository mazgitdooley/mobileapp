# Innovation — Movie App (G00473384)

This document describes implemented features beyond the core assignment specification.

## 1. Swipe-to-delete on Favourites

On the **Favourites** page, each saved movie is shown inside an `ion-item-sliding` row. Swiping left reveals a **Remove** action (danger styling) with a trash icon. Tapping **Remove** deletes the movie from the persisted favourites list in `localStorage` and refreshes the UI immediately.

## 2. Age calculation on Person Details

The **Person Details** page formats birth and death dates into readable long form (e.g. *9 July 1956*). When a birthday is present:

- If the person is living, the app shows **(age X)** using today’s date.
- If a death date is present, the app shows **(aged X at death)** using the death date as the end of the interval.

Place of birth is appended to the “Born …” line when available.

## 3. Biography expand / collapse

Long biographies are clamped to **five lines** with an ellipsis. A **Read more** control expands the full biography; **Read less** collapses it again. This keeps the screen scannable while still allowing access to full TMDB biography text.

## 4. Initials placeholder for missing images

When cast or crew members have no `profile_path`, or when a person has no profile image, the UI shows a **dark circular or square placeholder** with **two-letter initials** derived from the person’s name, styled in the app’s gold accent. This avoids broken-image gaps and keeps the grid visually balanced.

## 5. Cinematic dark theme with Playfair Display typography

The app uses a **permanent cinematic dark palette** (ink background, warm off-white body text, gold primary actions) defined in `variables.scss`. **DM Sans** is used for body and UI copy; **Playfair Display** is used for film-like headings (toolbar titles, hero names, empty-state headings). Toolbar chrome uses a subtle bottom hairline and gold navigation accents for a cohesive “cinema ticket” feel.

---

*Export this file to PDF as `innovation.pdf` in the `src` folder for Moodle submission if required.*
