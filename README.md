# Resume SPA

Quick start:

1. Install dependencies

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

Build and deploy on Render (Static Site):

- Create a new Static Site on Render.
- Connect your repository.
- Set the build command to `npm run build` and the publish directory to `dist`.
- Ensure `resume.pdf` and your photo are in the `public/` folder before deploy so the `Download Resume` and avatar work.

Wiring your real content:

- Replace `public/resume.pdf` with your real resume named `resume.pdf`.
- Replace `public/photo.svg` with your photo named `photo.*` (jpg/png/svg) and update `src/data.js` if you change the filename.
- Edit `src/data.js` to set `linkedin`, `email`, and text fields to your real values.

Example: in `src/data.js` set `linkedin` to `https://www.linkedin.com/in/your-profile` and `email` to your address.

You can customize the content in `src/components` or change values in `src/data.js`.

Push to GitHub and deploy on Render

1. Create a GitHub repository and push this project:

```bash
git init
git add .
git commit -m "Initial commit: Resume SPA"
git branch -M main
git remote add origin <your-git-remote-url>
git push -u origin main
```

2. In Render: create a new site -> Static Site -> Connect your GitHub repo.
	- Render will detect `render.yaml` and create the service automatically.
	- Build command: `npm run build`
	- Publish directory: `dist`

3. If you prefer manual setup, create a new Static Site on Render and set the
	build command to `npm run build` and the publish directory to `dist`.

