# RooMate – Find Your Perfect Shared Home in India 🏠

**RooMate** is a modern, interactive web application designed to simplify the process of finding shared accommodation and compatible flatmates across India's top urban hubs (Mumbai, Bengaluru, Delhi, Hyderabad, Pune, Chennai). Built with a focus on editorial visual design, lifestyle synergy, and habit compatibility, it offers a seamless way to browse listings and connect with like-minded individuals.

Live Link: https://roomate2.netlify.app/
---

## 🌟 Key Features

### 1. Smart Room Listings & Dynamic Filters
Browse verified room listings in major Indian cities.
- **Dynamic Filtering:** Instant search by location, maximum budget, and room configuration (1BHK, 2BHK, 3BHK).
- **Listing Insights:** View per-person rent, security deposits, safety scores, and house rules.
- **Save for Later:** Bookmark favorite listings with responsive toast confirmations.

### 2. Swipe-to-Match Discovery (Find People)
Finding a roommate made intuitive with a Tinder-style card deck.
- **Card Swiping:** Drag or swipe right to like, left to pass on potential flatmates.
- **3D Compatibility Blueprint:** An interactive modal comparing lifestyle traits (hygiene, sleep cycles, work style) with 3D room animations highlighting matches and clashes.
- **Live Dialogue Simulation:** Floating chat widget simulating real-time conversations with matched peers.

### 3. Lifestyle Compatibility Assessment (Quiz)
A structured 7-step diagnostic questionnaire to evaluate residential synergy.
- **Parameter Check:** Sleep rhythm, social habits, hygiene standards, WFH requirements, pets, and financial split style.
- **Algorithmic Alignment Index:** Calculates a compatibility percentage and recommends top-matched prospective roommates.

### 4. Resident Profile & Utility Splitter
Manage your preferences and plan shared household finances.
- **Proportional Utility Splitter:** Calculates per-person shares for electricity, WiFi, water, and gas based on the number of roommates.
- **Lifestyle Tags:** Toggle habit badges to update your public resident profile.

---

## 💻 Technology Stack

### Frontend
- **Markup & Layout:** Semantic HTML5 multi-page architecture.
- **Styling:** Modern Vanilla CSS3 utilizing CSS Custom Properties (variables), CSS Grid, Flexbox, and 3D card transforms (`perspective`, `rotateY`).
- **Typography & Theme:** Editorial magazine aesthetic with dark/accent palettes and micro-interactions.
- **Interactivity:** Vanilla JavaScript (ES6+) with zero heavy external dependencies.
- **APIs & Animations:**
  - `IntersectionObserver` API for viewport-triggered statistics counting.
  - `requestAnimationFrame` with quartic ease-out curve for smooth numerical animations.
  - Pointer/Touch event listeners for gesture-based swipe physics.

### Backend / Data Architecture
- **Architecture:** Client-side JAMstack architecture.
- **Data Models:** Structured in-memory JavaScript data collections (`listingsData`, `peopleData`, `BASE_UTILITIES`).
- **State Handling:** Client-side state tracking for filters, bookmarks, modal transitions, and quiz responses.

---

## 🚀 Getting Started Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Aryaabhadane21/RooMate.git
   ```

2. **Navigate to the directory:**
   ```bash
   cd RooMate
   ```

3. **Open the project:**
   Simply open `index.html` in any modern web browser or run with Live Server:
   ```bash
   npx serve .
   ```

---

## 📂 Project Structure

```text
RooMate/
├── index.html         # Hero landing page & featured rooms
├── listings.html      # Search and filter room listings
├── people.html        # Tinder-style roommate swipe deck
├── property.html      # Individual listing details & specifications
├── quiz.html          # 7-question compatibility assessment
├── profile.html       # Resident dashboard & utility bill splitter
├── css/
│   └── style.css      # Design system, tokens, and animations
├── js/
│   ├── listings.js    # Filter logic & counter animations
│   ├── people.js      # Swipe gestures & 3D compatibility blueprint
│   ├── quiz.js        # Multi-stage quiz logic & score calculation
│   └── profile.js     # Utility calculator & trait toggling
└── assets/
    └── 2.png          # Architectural imagery
```

---

