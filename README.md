# STOCKIFY

## Global Styles

- Inside `styles/globals.css` under `@layer base {}`

## Fonts

- Used a variable google font which is an optimized version of regular fonts
- Install npm package: `@next/font`
- The font settings can be found under \_app.tsx
- Font sizes and configuration is under `tailwind.config.js` under `theme: {}`

## Colors

- Inside `tailwind.config.js` under `theme: {}`

## SVGs / Icons

- SVG icons are stored inside `/public/static/svgs/`
- Install svgr package `npm install --save-dev @svgr/webpack`
- Configure SVG support inside `next.config.js` under `webpack(config) {}`
- Restart server for changes to take effect
- Import as react component and apply tailwind styles
- [SVGr docs for NextJS](https://react-svgr.com/docs/next/)

## Scrollbar

- scrollbar can be hidden using the `no-scrollbar` tailwind class
- it is a custom class added under the `@layer utilities` modifier inside `styles/globals.css`
- it wont be visible under vscode auto-complete
- to scroll horizontall on PC, hold shift and use the mousewheel scroll

## Authentication

- install next auth package `npm i next-auth`
- login to google cloud `https://console.cloud.google.com/welcome`
- setup project `https://youtube.com/watch?v=t0Fs0NO78X8&feature=shares`
-
