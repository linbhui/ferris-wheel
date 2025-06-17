# 🎡 Ferris Wheel ~ scroll-based animation with React

This project features a Ferris wheel where all the components (from the background to smallest details) are ever changing as you scroll while the routes get updated accordingly. It was a good practice for me to get more comfortable with React component lifecycles, refs & the DOM, side effects, state management, umounting & cleanup as well as sharpening the good ol' web trio HTML, CSS, JavaScript. I hope to develop further animations if any more good & creative idea pops up.

### 🌐 Live Demo: [weewoo-ferriswheeeel](https://tranquil-youtiao-bcbeb4.netlify.app/)
---

## ✨ Features

- Scroll-based interactive portfolio with animated transitions.
- Curved scroll path for text intro (`AboutMe`).
- (`Tools`) used are displayed in stylized animated "cabins".
- Transition logic and scroll lock for scene-by-scene flow.
- Easily extensible structure for adding more sections (projects, contact, etc.).


## 🧱 Component Overview

All components are manipulated by scrolling with implementations of pausing detection to avoid infinite render & wasting CPU.

### 🌄 Background & Ferris Wheel (Global Elements)

These components are always mounted and visually persistent across all routes. They are animated and synced with scroll behavior.

- **`Background.jsx`**
  - Renders a full-screen sky with gradient transitions across day, night, sunrise, and sunset.
  - Scroll-driven sky transitions with color interpolation via `changeColor()`.

- **`FerrisWheel.jsx`**
  - Positioned at the center of the scene; rotates continuously.
  - Holds project cabins and reacts to scroll when in the `/tools` route.
- **`Helper functions`**
  - `setDayNight(x, y, radius)` to dynamically update CSS variables based on sun/moon orbit.
  - `changeColor(color1, color2, factor)` to smoothly interpolates between two RGB arrays with a 0–1 factor.


### 🛣️ Routes (Scroll Pages)

These represent distinct sections of the portfolio, revealed through vertical or horizontal scrolling. Each route handles its own animations and transitions.

- **`/` (Landing)**
  - Entry scene styled as an amusement park entrance.
  - Includes a loading animation that plays a fast reverse sequence of the whole park.

- **`AboutMe.jsx`**
  - Route shown right after the first scene, reverse animation when accessed from the route after `Tools`.
  - Contains a barbie-style intro text revealed letter-by-letter; color changing adapts with background via scroll.

- **`Tools.jsx`**
  - Route scrolled in from `AboutMe` and scroll out to the landing page (`/`) prompting to restart.
  - Wheel cabins change colors & animated labels appear during scroll and disappear on reset.



### 🌀 `ScrollManager.js` (Scroll Logic)

Controls the custom scroll system powering the site's transitions:

- Locks and unlocks scroll between scenes to allow animations to complete.
- Maps scroll delta (`e.deltaY`) to position updates across pages.
- Emits scroll status to components (e.g., `notifyReady`, `notifyReverse`, `reverse`) to sync timing.
- Supports continuous loop scroll across sections.
- Handles scene pausing and smooth transitioning for orbit, animations, and transitions.

---

### 👤 Author
**[Linh Bui]([https://tranquil-youtiao-bcbeb4.netlify.app/](https://github.com/linbhui))** ~ _I'm always hungry >~<_
