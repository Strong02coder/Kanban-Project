# PorjectTrack

## Overview

This project is built using modern web technologies and tools. It leverages the power of React, TypeScript, and Tailwind CSS to create a responsive and dynamic web application. The project is bundled and served using Vite, and it uses Bun as the package manager and runtime.

## Features

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Vite**: A fast and modern build tool for web projects.
- **Bun**: A fast all-in-one JavaScript runtime.

## Project Structure

```
.gitignore
bun.lockb
components.json
eslint.config.js
index.html
package.json
postcss.config.js
tailwind.config.ts
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
public/
    favicon.ico
    placeholder.svg
src/
    App.css
    App.tsx
    index.css
    main.tsx
    vite-env.d.ts
    components/
        CreateProjectDialog.tsx
        Navbar.tsx
        ProgressBar.tsx
        ProjectCard.tsx
        ProjectDateEditor.tsx
        TaskList.tsx
        ThemeProvider.tsx
        ThemeToggle.tsx
        ui/
    hooks/
        use-mobile.tsx
        ...
    lib/
        ...
    pages/
```

## Packages Used

- **React**: `react`, `react-dom`
- **TypeScript**: `typescript`
- **Tailwind CSS**: `tailwindcss`, `postcss`, `autoprefixer`
- **Vite**: `vite`
- **Bun**: `bun`

## Getting Started

To get started with this project, follow these steps:

1. **Install Bun**: Make sure you have Bun installed. You can download it from [Bun's official website](https://bun.sh/).
2. **Install Dependencies**: Run the following command to install the project dependencies:
   ```sh
   bun install
   ```
3. **Run the Development Server**: Start the development server using Vite:
   ```sh
   bun run dev
   ```
4. **Build the Project**: To build the project for production, run:
   ```sh
   bun run build
   ```

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.