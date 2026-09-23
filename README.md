# AMIX 2026 – Department Fest Registration

A modern, responsive event registration platform built with vanilla HTML, CSS, and JavaScript. Features UPI payment integration, QR codes for check-in, and browser-based ticket storage.

## ✨ Features

- **Event Browsing** – View 5 departmental events with details, timing, venue, and fees
- **Registration Form** – Collect participant details with real-time validation
- **UPI Payment** – Generate dynamic QR codes for instant payment
- **Digital Tickets** – Auto-generate check-in QR codes and ticket stubs
- **Local Storage** – Save registrations on device (no backend needed)
- **Responsive Design** – Mobile-first layout, works on all screen sizes
- **Dark Mode** – Automatic theme switching based on system preferences
- **Accessibility** – ARIA labels, focus management, keyboard navigation

## 📁 Project Structure

```
amix-fest/
├── index.html      # Main HTML structure
├── styles.css      # All styling (CSS variables for theming)
├── app.js          # Business logic & event handling
└── README.md       # This file
```

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/amix-fest.git
   cd amix-fest
   ```

2. **Open in browser**
   ```bash
   # Option A: Just open the file
   open index.html
   
   # Option B: Use a local server (recommended)
   python3 -m http.server 8000
   # Then visit http://localhost:8000
   ```

3. **Configure (optional)**
   Edit the `CONFIG` object in `app.js`:
   ```javascript
   const CONFIG = {
     college: 'Your College Name',
     dept: 'Your Department Name',
     fest: 'Your Fest Name',
     upiId: 'your-upi@bank',      // Replace with actual UPI ID
     payee: 'Your Organization Name'
   };
   ```

## ⚙️ Customization

### Add/Edit Events

Open `app.js` and modify the `EVENTS` array:

```javascript
{
  id: 'event-id',           // Unique identifier
  name: 'Event Name',       // Display name
  tag: 'Category',          // Event category/type
  desc: 'Description...',   // Short description
  date: '2026-10-10T11:30', // ISO datetime
  venue: 'Location',        // Event venue
  fee: 100,                 // Fee in INR
  min: 1,                   // Min team size
  max: 2,                   // Max team size
  c: '#2B3AE7',             // Brand color (hex)
  on: '#fff',               // Text color (hex)
  extra: {
    id: 'field-id',
    label: 'Custom Field',
    type: 'text' | 'select',
    opts: ['Option 1', 'Option 2'], // For select type
    optional: false         // If true, field is optional
  }
}
```

### Add Departments

Edit the `DEPTS` array in `app.js`:

```javascript
const DEPTS = [
  'Computer Science',
  'Electronics',
  'Mechanical',
  // ... add more
];
```

### Modify Colors & Theme

Edit CSS variables in `styles.css`:

```css
:root {
  --brand: #2B3AE7;    /* Primary color */
  --bg: #F5F6FB;       /* Background */
  --surface: #fff;     /* Card background */
  --ink: #10132B;      /* Text color */
  /* ... more variables ... */
}
```

## 💾 Data Storage

- Registrations are stored in **browser localStorage** (`amix` key)
- Each registration includes: name, email, phone, roll number, event, fee, UPI QR, check-in QR
- **No data is sent to any server** – completely local
- Clear browser data to reset

## 🔐 Security Notes

- This is a **frontend-only app** – suitable for low-traffic events
- For high-traffic scenarios, add a backend to:
  - Verify payments via UPI API
  - Store registrations securely
  - Prevent duplicate registrations
  - Send confirmation emails

## 📱 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Dark Mode

Automatically switches based on system preference. Force light mode by adding `data-theme="light"` to the `<html>` tag.

## 📦 Dependencies

- **QRCode.js** – CDN-hosted (no npm required)
- **Google Fonts** – Bricolage Grotesque & DM Sans
- Everything else is vanilla JS/CSS

## 🛠️ Development

No build step needed! Just edit files and refresh your browser.

### Local Testing

```bash
# Serve with Python
python3 -m http.server 8000

# Or with Node (if installed)
npx http-server
```

## 📄 License

MIT – Feel free to modify and use for your event!

## 🤝 Contributing

Found a bug or want to improve? Submit an issue or pull request!

## 📞 Support

For issues or questions:
1. Check the code comments in `app.js`
2. Review the config section at the top of `app.js`
3. Open a GitHub issue

---

**Made with ❤️ for AMIX 2026**
