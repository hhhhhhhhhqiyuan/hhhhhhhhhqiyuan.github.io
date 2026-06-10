# Deploy to GitHub Pages

This portfolio is a static website. The simplest GitHub Pages setup is to put
the contents of this folder at the root of a GitHub repository.

## Recommended Setup

1. Create a new GitHub repository.
   Suggested name: `nikki-fu-portfolio`

2. Upload or push the contents of this folder to the repository root.
   The repository root should contain:

   ```text
   index.html
   work.html
   data/
   projects/
   styles/
   .nojekyll
   ```

3. On GitHub, open the repository settings.

4. Go to `Pages`.

5. Under `Build and deployment`, set:

   ```text
   Source: Deploy from a branch
   Branch: main
   Folder: /root
   ```

6. Save and wait for GitHub Pages to publish.

The public URL will usually look like:

```text
https://YOUR-GITHUB-USERNAME.github.io/nikki-fu-portfolio/
```

## Important

Do not publish from `/Users/nikki/Documents/...`; that is only a local file path.
GitHub Pages needs the files inside a GitHub repository.

If you want the shorter URL:

```text
https://YOUR-GITHUB-USERNAME.github.io/
```

name the repository exactly:

```text
YOUR-GITHUB-USERNAME.github.io
```
