## Flowzen

A minimal, modern Vite + React + TypeScript starter focused on clean structure, fast DX, and reusable UI primitives.

---

## 🚀 Features

- **Modern stack**: Vite, React, TypeScript, ESLint
- **Clean structure**: `src/modules`, `src/routes`, and `src/layouts` for clear separation of concerns
- **UI components**: Reusable inputs, buttons, dialogs, and toasts in `src/components/ui`
- **Example modules**:
  - **Counter**: Simple state and event handling example
  - **Timer**: Interval-based state updates
  - **Tasks**: Data, schema, and UI for task-style flows
  - **Experiment**: Small focus/UX experiments

---

## 🧱 Project Structure (high level)

- **`src/app.tsx`**: App entry layout and routing shell
- **`src/main.tsx`**: React + Vite bootstrap
- **`src/layouts`**: Shared layout components
- **`src/modules`**: Feature modules (`task`, `timer`, `counter`, etc.)
- **`src/routes`**: Route-level components (e.g. `about`, `task-id`)
- **`src/components/ui`**: Base UI building blocks

---

## 🛠 Prerequisites

- **Node.js**: Recommended LTS (via nvm is ideal)
- **npm**: Comes with Node

You can verify:

```bash
node -v
npm -v
```

---

## 🏁 Getting Started

1. **Clone the repo**

   ```bash
   git clone https://github.com/thalhahs/flowzen.git
   cd flowzen
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the dev server**

   ```bash
   npm run dev
   ```

   Then open the URL Vite prints, typically:

   - `http://localhost:5173/`

---

## 📦 Available Scripts

- **`npm run dev`**: Start Vite dev server
- **`npm run build`**: Create a production build
- **`npm run preview`**: Preview the production build locally
<!-- Add `npm run lint` here if/when you add a lint script -->

---

## 🧩 Customization Tips

- **Add new pages**: Create a component in `src/routes` and wire it into `app.tsx`
- **Add new features**: Create a folder in `src/modules` and keep UI/data/logic close together
- **Adjust styling**: Tweak global styles in `src/index.css` and extend the UI primitives in `src/components/ui`

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch
3. Commit your changes with clear messages
4. Open a pull request describing your change

---

## 📄 License

This project is open source; feel free to use it as a starting point for your own experiments and internal tools.






