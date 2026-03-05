# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## Backend (Flask) for SMS OTP

A small Python service is included under `backend/` to handle SMS OTPs using Twilio (or any other provider). The front‑end calls it via `AuthContext`.

### Getting started

```bash
# create and activate a virtual environment (PowerShell shown)
python -m venv backend/venv
.\\backend\\venv\\Scripts\\Activate.ps1
pip install -r backend/requirements.txt
```

Set your Twilio environment variables:

```powershell
$env:TWILIO_ACCOUNT_SID="your_sid"
$env:TWILIO_AUTH_TOKEN="your_token"
$env:TWILIO_FROM_NUMBER="+1234567890"
```

(On macOS/Linux use `export` instead.)

Run the server from the `backend` folder:

```bash
flask run
```

By default it listens on port 5000. Update the React app URL if necessary or add a proxy in `vite.config.js`.

### API

- `POST /api/send-otp` with JSON `{ phone }` → generates and sends code, returns `{ ok, code }` (code echoed for dev).
- `POST /api/verify-otp` with JSON `{ phone, code }` → returns `{ valid: true/false }`.

You can replace the Twilio code with another provider – the logic is contained in `backend/app.py`.

---

