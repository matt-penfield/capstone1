# Matt Penfield — Personal Site

A clean, minimal personal portfolio site for Matt Penfield, a DesignOps leader and UX strategist.

## Overview

Static HTML/CSS/JS site with no build tools or frameworks. Designed with a warm editorial aesthetic using Cormorant Garamond for display type and DM Sans for body copy.

## Pages

- **Home** — Hero with headshot, selected work preview, services overview, and a live local weather widget
- **Work** — Three detailed case studies covering DesignOps implementation, mobile feature strategy, and delivery transformation
- **About** — Bio, skills grid, and values
- **Contact** — Inquiry form and LinkedIn link

## Features

- Live weather widget in the nav bar using the browser Geolocation API, Open-Meteo (no API key required), and Nominatim reverse geocoding
- Fully responsive layout with mobile-first breakpoints
- Unsplash photography for project card thumbnails

## Structure

```
index.html          # Homepage
pages/
  work.html         # Work portfolio
  about.html        # About page
  contact.html      # Contact form
css/
  style.css         # All styles
js/
  app.js            # Scroll animations + weather widget
img/                # Project photos and headshot
```

## Stack

- Vanilla HTML, CSS, JavaScript
- Google Fonts (Cormorant Garamond, DM Sans)
- Open-Meteo API — weather data
- Nominatim / OpenStreetMap — reverse geocoding

