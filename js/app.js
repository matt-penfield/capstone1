const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in-scroll').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(32px)';
  el.style.transition = 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
  observer.observe(el);
});

// --- Weather Widget ---
(function () {
  var SVG = {
    sun:       '<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="13" fill="#D94F2B"/><g stroke="#D94F2B" stroke-width="2.5" stroke-linecap="round"><line x1="40" y1="7" x2="40" y2="17"/><line x1="40" y1="63" x2="40" y2="73"/><line x1="7" y1="40" x2="17" y2="40"/><line x1="63" y1="40" x2="73" y2="40"/><line x1="17.4" y1="17.4" x2="24.5" y2="24.5"/><line x1="55.5" y1="55.5" x2="62.6" y2="62.6"/><line x1="62.6" y1="17.4" x2="55.5" y2="24.5"/><line x1="24.5" y1="55.5" x2="17.4" y2="62.6"/></g></svg>',
    sun_cloud: '<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="54" cy="26" r="10" fill="#C8A96F"/><g stroke="#C8A96F" stroke-width="2" stroke-linecap="round"><line x1="54" y1="10" x2="54" y2="16"/><line x1="54" y1="36" x2="54" y2="42"/><line x1="38" y1="26" x2="44" y2="26"/><line x1="64" y1="26" x2="70" y2="26"/><line x1="43.9" y1="15.9" x2="48.2" y2="20.2"/><line x1="59.8" y1="31.8" x2="64.1" y2="36.1"/><line x1="64.1" y1="15.9" x2="59.8" y2="20.2"/><line x1="48.2" y1="31.8" x2="43.9" y2="36.1"/></g><path d="M 12,68 C 4,68 2,56 10,50 C 8,40 18,32 30,36 C 34,28 48,26 54,36 C 64,34 72,44 66,52 C 72,56 70,68 60,68 Z" fill="#ECE7DF" stroke="#D5CFC8" stroke-width="1.5"/></svg>',
    cloud:     '<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M 10,58 C 2,58 0,46 8,40 C 6,30 16,22 28,26 C 32,18 46,16 52,26 C 62,24 70,34 64,42 C 70,46 68,58 58,58 Z" fill="#D5CFC8" stroke="#8C7E72" stroke-width="1.5"/></svg>',
    fog:       '<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M 16,36 C 8,36 6,24 12,20 C 10,12 18,6 28,10 C 32,4 44,2 48,10 C 56,8 64,16 58,24 C 62,26 60,36 52,36 Z" fill="#D5CFC8" stroke="#8C7E72" stroke-width="1.5"/><g stroke="#8C7E72" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="48" x2="68" y2="48"/><line x1="18" y1="58" x2="62" y2="58"/><line x1="24" y1="68" x2="56" y2="68"/></g></svg>',
    rain:      '<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M 10,44 C 2,44 0,32 8,26 C 6,16 16,8 28,12 C 32,4 46,2 52,12 C 62,10 70,20 64,28 C 70,32 68,44 58,44 Z" fill="#D5CFC8" stroke="#8C7E72" stroke-width="1.5"/><g stroke="#8C7E72" stroke-width="2" stroke-linecap="round"><line x1="22" y1="54" x2="18" y2="68"/><line x1="36" y1="54" x2="32" y2="68"/><line x1="50" y1="54" x2="46" y2="68"/><line x1="64" y1="54" x2="60" y2="68"/></g></svg>',
    snow:      '<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M 10,44 C 2,44 0,32 8,26 C 6,16 16,8 28,12 C 32,4 46,2 52,12 C 62,10 70,20 64,28 C 70,32 68,44 58,44 Z" fill="#D5CFC8" stroke="#8C7E72" stroke-width="1.5"/><g fill="#8C7E72"><circle cx="22" cy="56" r="3"/><circle cx="40" cy="56" r="3"/><circle cx="58" cy="56" r="3"/><circle cx="31" cy="68" r="3"/><circle cx="49" cy="68" r="3"/></g></svg>',
    thunder:   '<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M 10,44 C 2,44 0,32 8,26 C 6,16 16,8 28,12 C 32,4 46,2 52,12 C 62,10 70,20 64,28 C 70,32 68,44 58,44 Z" fill="#8C7E72" stroke="#17120E" stroke-width="1.5"/><polygon points="46,44 34,62 42,62 30,78 50,58 42,58" fill="#C8A96F"/></svg>',
    drizzle:   '<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M 10,44 C 2,44 0,32 8,26 C 6,16 16,8 28,12 C 32,4 46,2 52,12 C 62,10 70,20 64,28 C 70,32 68,44 58,44 Z" fill="#D5CFC8" stroke="#8C7E72" stroke-width="1.5"/><g stroke="#8C7E72" stroke-width="1.5" stroke-linecap="round"><line x1="26" y1="54" x2="24" y2="62"/><line x1="40" y1="54" x2="38" y2="62"/><line x1="54" y1="54" x2="52" y2="62"/></g></svg>'
  };

  var WMO = {
    0:  { label: 'Clear sky',          icon: 'sun' },
    1:  { label: 'Mainly clear',       icon: 'sun_cloud' },
    2:  { label: 'Partly cloudy',      icon: 'sun_cloud' },
    3:  { label: 'Overcast',           icon: 'cloud' },
    45: { label: 'Foggy',              icon: 'fog' },
    48: { label: 'Freezing fog',       icon: 'fog' },
    51: { label: 'Light drizzle',      icon: 'drizzle' },
    53: { label: 'Drizzle',            icon: 'drizzle' },
    55: { label: 'Heavy drizzle',      icon: 'rain' },
    61: { label: 'Light rain',         icon: 'rain' },
    63: { label: 'Rain',               icon: 'rain' },
    65: { label: 'Heavy rain',         icon: 'rain' },
    71: { label: 'Light snow',         icon: 'snow' },
    73: { label: 'Snow',               icon: 'snow' },
    75: { label: 'Heavy snow',         icon: 'snow' },
    77: { label: 'Snow grains',        icon: 'snow' },
    80: { label: 'Light showers',      icon: 'drizzle' },
    81: { label: 'Rain showers',       icon: 'rain' },
    82: { label: 'Violent showers',    icon: 'thunder' },
    85: { label: 'Snow showers',       icon: 'snow' },
    86: { label: 'Heavy snow showers', icon: 'snow' },
    95: { label: 'Thunderstorm',       icon: 'thunder' },
    96: { label: 'Thunderstorm',       icon: 'thunder' },
    99: { label: 'Thunderstorm',       icon: 'thunder' }
  };

  function cToF(c) { return Math.round(c * 9 / 5 + 32); }

  var loadEl = document.getElementById('weather-loading');
  var contEl = document.getElementById('weather-content');
  var errEl  = document.getElementById('weather-error');

  function show(el) {
    loadEl.hidden = true;
    contEl.hidden = true;
    errEl.hidden  = true;
    el.hidden = false;
  }

  if (!navigator.geolocation) { show(errEl); return; }

  navigator.geolocation.getCurrentPosition(function (pos) {
    var lat = pos.coords.latitude;
    var lon = pos.coords.longitude;

    fetch('https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&latitude=' + lon + '&current_weather=true')
      .then(function (r) { if (!r.ok) throw new Error('weather'); return r.json(); })
      .then(function (d) {
        var cw   = d.current_weather;
        var info = WMO[cw.weathercode] || { label: 'Weather', icon: 'sun' };

        document.getElementById('weather-emoji').innerHTML       = SVG[info.icon] || '';
        document.getElementById('weather-temp').textContent      = cToF(cw.temperature);
        document.getElementById('weather-condition').textContent = info.label;

        // Reverse geocode via Nominatim
        fetch('https://nominatim.openstreetmap.org/reverse?lat=' + lat + '&lon=' + lon + '&format=json', { headers: { 'Accept-Language': 'en' } })
          .then(function (r) { return r.json(); })
          .then(function (g) {
            var a    = g.address || {};
            var city  = a.city || a.town || a.village || a.county || '';
            var state = a.state || '';
            document.getElementById('weather-location').textContent = [city, state].filter(Boolean).join(', ');
          })
          .catch(function () {
            document.getElementById('weather-location').textContent = '';
          });

        show(contEl);
      })
      .catch(function () { show(errEl); });

  }, function (err) {
    if (err.code === 1) {
      document.getElementById('weather-error-msg').textContent = 'Enable location to see your weather';
    }
    show(errEl);
  }, { timeout: 8000 });
}());
