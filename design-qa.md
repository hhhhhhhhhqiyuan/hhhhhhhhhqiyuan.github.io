# Meat Probe case — design QA

**Source visual truth**
- Figma frame: `https://www.figma.com/design/UnbIOQnXiVESO8z9SrgEe6/Untitled?node-id=775-102&t=85Wi6w3aUmlRWwmI-1`
- Source imagery: EAST OAK product-page square gallery, saved in `assets/portfolio/meat-probe/official-square/`, plus the existing `assets/portfolio/meat-probe/aplus/` artwork.
- Source pixels: official square gallery assets 1620 × 1620 px; A+ assets 4096 × 1679 px.

**Rendered implementation**
- Local route / browser-rendered capture target: `http://localhost:4173/projects/meat-probe.html`
- Homepage entry capture target: `http://localhost:4173/?v=20260902-meat-probe-r2#visual-work`
- Implementation screenshot evidence: Codex in-app browser captures from tabs 9 and 10 in this task; the browser provider did not expose a persistent filesystem path.
- Desktop state: 1280 × 720 CSS px, normal page state, DPR 2 during visual capture.
- Mobile state: 390 × 844 CSS px, normal page state, DPR 1.
- Density normalization: source artwork was exported at native size and downsampled only for web delivery; layout was judged at CSS size rather than by comparing raw source-pixel density.

**Full-view comparison evidence**
- The page keeps the portfolio's existing dark/paper/white chapter rhythm, compact uppercase labels, orange CTA, rounded media frames, and generous section spacing.
- The source artwork is shown without reconstructed graphics or placeholder assets. PDP cards retain their square canvas; A+ banners retain their original wide aspect ratio.
- Homepage V02 uses the original product-overview art with a dark readability gradient and remains visually equal in footprint to the other commercial-visual cards.

**Focused region comparison evidence**
- Hero: original product/app image remains sharp and undistorted; the square crop is intentional and keeps the receiver and app interface as the dominant recognition cue.
- PDP grid: headings, feature imagery, and bottom icon rows remain inside the image bounds at the two-column desktop layout and one-column mobile layout.
- Mobile navigation: PDP and A+ remain visible; the lower-priority Process link is hidden to prevent crowding.

**Findings**
- No actionable P0/P1/P2 visual or interaction issues remain.
- [P3] The homepage cover uses artwork that already contains large English type, so the overlay title adds a second text layer. This is acceptable for the first review and can be revisited after the user chooses the final cover crop.

**Comparison history**
- Pass 1 found one mobile information-priority issue: the A+ navigation link was hidden while Process remained visible.
- Fix: changed the mobile rule to keep PDP and A+ and hide the third, lower-priority Process link.
- Post-fix evidence: mobile accessibility tree at 390 × 844 shows NIKKI / PORTFOLIO, PDP, and A+; the first-screen capture has no horizontal overflow or clipped controls.
- Pass 2 found an image-ratio bug caused by the HTML `height` attributes winning over the responsive width while CSS did not explicitly reset height. Hero rendered at 520 × 1800 and PDP images at 495 × 1500, visibly compressing and cropping the square artwork.
- Fix: added `height: auto`, preserved `aspect-ratio: 1 / 1`, and changed fitting to `contain` for the Hero and PDP image selectors.
- Post-fix evidence: at the annotated 1177 × 784 viewport, Hero renders at 520 × 520 and all four PDP images render at 495 × 495; original 1800 × 1800 / 1500 × 1500 source content is fully visible.
- Pass 3 applied the user's content-density annotation to the A+ chapter.
- Fix: removed the conceptual section headline, supporting paragraph, and all three image captions; retained only `02 · A+ CONTENT` and the original artwork.
- Post-fix evidence: at 1177 × 784, the A+ chapter now moves directly from the chapter label into the full-width visual work with no redundant text beneath the images.
- Pass 4 replaced the Hero and PDP artwork with the official EAST OAK product-page square gallery at 1620 × 1620 px.
- Fix: mapped the official product/App composition to Hero and the five official feature images to the PDP grid; retained `height:auto`, `aspect-ratio:1/1`, and `object-fit:contain`. The fifth PDP card is centered on desktop and returns to full width on mobile.
- Post-fix evidence: HTTP and local asset checks pass, and every replacement asset reports 1620 × 1620 px. A fresh browser-rendered comparison could not be captured because the in-app browser's administrator security check was temporarily unavailable.

**Primary interactions tested**
- Homepage V02 card opens the Meat Probe case route.
- In-page PDP and A+ anchors resolve.
- Full-resolution source images are linked from the displayed assets.
- Amazon CTA resolves to the supplied live listing URL.
- Back-to-top target resolves to `#top`.

**Console and asset checks**
- Browser console warnings/errors: none.
- Local HTML `src` / `href` asset resolution: no missing files.
- `git diff --check`: passed.

**Implementation checklist**
- [x] Homepage visual card
- [x] Dedicated short case page
- [x] PDP, A+, and usage-story presentation
- [ ] Fresh desktop and mobile visual capture after official-image replacement
- [x] Working internal navigation and external listing CTA

final result: blocked

# LELIAN Codex build command center — design QA

## 2026-09-05 correction: target the two dialogue cards

- Supersedes the command-center implementation below: user identified `.codex-proof__evidence` as the intended target.
- Removed the previous runtime command-center replacement and its CSS. Restored the preceding workflow card and retained the original proof section.
- Replaced the two clipped screenshot cards in static HTML with complete, responsive typeset dialogue summaries, explicitly labeled as edited from real conversation.
- The source screenshot was inspected at 1578 × 1618. Input requirements, four collections, five text buttons, entry checks, HTTP 200 historical result, configurable section settings, and 5 files / +902 lines are preserved.
- Full original screenshot remains in a native expandable details element, rendered at proportional width and automatic height with no crop.
- Static verification passed: JavaScript syntax, whitespace, two static cards, no screenshot-crop wrappers, no runtime removal of proof section, and balanced CSS.
- Browser visual verification remains pending: CUA state request timed out before a screenshot could be captured. No visual pass claimed.

**Source visual truth**
- Shared Codex URL supplied by the user: `https://chatgpt.com/s/cx_6a9bd2d7aa3481918b65f6df7e0e1850`; the public shell did not expose the conversation body to the available reader.
- Real local project evidence: `assets/v2/lelian/codex-shopify-conversation-evidence.jpg`, 1578 × 1618 px.
- Existing portfolio language retained: dark process chapter, restrained borders, compact technical labels, and the site’s current sans-serif typography.

**Implemented direction**
- Replaced the editorial two-card proof layout with one integrated dark build workspace.
- Added a five-stage flow: Select, Specify, Codex, Verify, Deploy.
- Kept the real Codex conversation as one complete image inside a scrollable evidence window instead of cropping it into two fragments.
- Added a source-backed delivery manifest: 4 Collection hubs, 5 modified files, +902 lines, 200 live status, and desktop/tablet/mobile QA.
- Added a responsive mobile treatment: the workflow rail scrolls horizontally and the conversation remains legible through two-axis scrolling rather than destructive scaling or cropping.

**Static verification**
- JavaScript syntax: pass.
- HTML parsing: pass.
- CSS brace balance: pass.
- Local LELIAN route: HTTP 200.
- Conversation evidence asset: HTTP 200 and intrinsic dimensions confirmed.
- `git diff --check`: pass.

**Finding**
- [P2] Fresh desktop and mobile browser-rendered captures are unavailable.
  Location: `projects/lelian.html#build-pipeline`.
  Evidence: the selected Codex in-app browser timed out repeatedly while loading the existing long page and reset before a screenshot could be captured.
  Impact: the new command-center composition has source and asset validation, but it cannot receive final visual sign-off in this turn.
  Fix: rerun the desktop and mobile capture comparison when the in-app browser can load the route reliably.

final result: blocked

# Homepage equal-work grid — design QA

**Source visual truth**
- Selected mock: `/Users/nikki/.codex/generated_images/019ff141-7292-79e3-85e4-f72bd05aca0c/exec-0a62b485-84e0-4666-981e-fa28e835e354.png`
- Source pixels: 864 × 1821 px; desktop portfolio page showing the portrait-led hero and equal two-column work grid.

**Rendered implementation**
- Local route: `http://localhost:4173/`
- Intended desktop viewport: 1280 × 720 CSS px for the current in-app browser window.
- Intended mobile viewport: 390 × 844 CSS px.
- Implementation screenshot path: unavailable because the in-app browser's administrator security check became unavailable after the accepted first-screen capture.
- State: normal homepage; seven existing projects, with IP and photography intentionally omitted until real assets and routes are supplied.

**Full-view comparison evidence**
- The accepted first-screen browser capture shows the selected portrait-led hero, flat warm background, PingFang-first Chinese typography, original portrait crop, enlarged contact information, and matching navigation structure.
- The browser accessibility tree confirms one uninterrupted work section with seven project links in this order: ACACIA, EARLY BIRD, EAST OAK, BIG TOMATO, LELIAN, OP GLOBAL, MEAT PROBE.
- A rendered full-work-grid capture could not be accepted after the browser security check stopped responding.

**Focused region comparison evidence**
- Hero was visually inspected in the in-app browser at 1280 × 720: portrait, headline, biography, contact block, spacing, and flat background render correctly with no clipping.
- Work-grid imagery and mobile reflow could not be visually captured; those regions were checked statically for asset resolution, equal card sizing, object-fit behavior, and one-column responsive rules.

**Required fidelity surfaces**
- Fonts and typography: homepage now uses `PingFang SC` first, with Chinese sans-serif fallbacks; hero hierarchy matches the selected direction. Full grid typography still needs a fresh rendered capture.
- Spacing and layout rhythm: desktop uses two equal 500 px-high columns and mobile uses one column; seven cards intentionally leave an unpaired final card until future work is added.
- Colors and visual tokens: the page keeps the existing flat `#f2f1ef` paper surface; no new page-background gradient was added.
- Image quality and asset fidelity: all seven cards use existing source assets; the square Meat Probe artwork uses `object-fit: cover` without dimension distortion. Final crop approval needs browser evidence.
- Copy and content: section labels no longer divide work into core/small or commercial categories; project titles and destinations match the confirmed order.

**Findings**
- [P2] Full desktop work-grid and mobile screenshots are missing.
  Location: homepage `#work` at desktop and mobile breakpoints.
  Evidence: the first-screen browser capture succeeded and the accessibility tree confirmed the correct order, but subsequent browser captures were blocked by the administrator security-check outage.
  Impact: image crops, final grid rhythm, and mobile rendering cannot receive visual sign-off yet.
  Fix: rerun desktop and 390 × 844 captures when the in-app browser security check is available, then compare them with the selected mock.

**Static verification**
- Homepage, all seven case routes, and all seven homepage image assets return HTTP 200 from the local server.
- HTML parsing succeeds, CSS braces are balanced, and `git diff --check` passes.

**Comparison history**
- Pass 1: the initial browser capture confirmed the hero implementation and contact sizing.
- Revision: merged the previous core/commercial sections into one equal-size work grid and applied the user-specified project order.
- Post-revision evidence: DOM order and local route/asset checks pass; full rendered comparison remains blocked by the browser security check.

**Implementation checklist**
- [x] One equal-weight project section.
- [x] Seven existing projects in the confirmed order.
- [x] PingFang-first homepage typography.
- [x] Existing project links and source imagery retained.
- [ ] Fresh desktop work-grid and mobile visual capture.
- [ ] Add IP and photography only after real titles, covers, and routes are supplied.

final result: blocked

# OP GLOBAL branding case — design QA

**Source visual truth**
- Source PDF: `/Volumes/NIKKI/NIKKI💕/OP-LOGO/opg-LOGO_复制.pdf`
- Source format: 23-page landscape brand presentation; PDF reports a 1920 × 1080 pt canvas, with three pages using slightly different crop boxes.
- Source inspection evidence: all 23 pages were rendered into `tmp/pdfs/opg-logo/contact-sheet.jpg` and inspected together as a complete visual sequence.

**Rendered implementation**
- Local route: `http://localhost:4173/projects/op-global.html?v=20260902-op-global-r1`
- Homepage entry: `http://localhost:4173/#visual-work`
- Implementation screenshot path: unavailable because the Codex in-app browser's administrator security check was temporarily unavailable on every local navigation attempt.
- Intended desktop viewport: 1200 × 784 CSS px.
- Intended mobile viewport: 390 × 844 CSS px.
- Export density: source pages rendered at 96 DPI to 2560 × 1440 px; pages 07–09 preserve their native crop-box dimensions of 2582 × 1451, 2595 × 1462, and 2571 × 1406 px.

**Full-view comparison evidence**
- The source contact sheet confirms a complete sequence from initial symbol exploration through the final wordmark, grid, palette, stationery, signage, freight, and social applications.
- The implementation maps every source page one-for-one, in the original order, with zero inter-page gap for the Behance-style long presentation.
- The homepage card uses the final blue OP GLOBAL identity board and links to the dedicated case rather than retaining the old ONE PORT label.

**Focused region comparison evidence**
- Image fidelity was checked directly on the exported page assets: no page is reconstructed in HTML, and no source artwork is replaced or cropped.
- Pages 07–09 were given their exact intrinsic width and height so their distinct PDF crop boxes are not forced into 16:9.
- A browser-rendered focused-region comparison remains unavailable because local browser navigation was blocked by the security-check outage.

**Findings**
- No missing page, file-resolution, HTML parsing, or asset-ratio issue was found in static validation.
- [P2] Browser-rendered desktop/mobile evidence is missing, so final typography, responsive spacing, and runtime image loading cannot be visually approved yet.
  Location: `projects/op-global.html` at the two intended viewports.
  Evidence: local HTTP returns 200 and all 23 assets resolve, but the chosen in-app browser refused local navigation before capture.
  Impact: the page cannot receive a visual QA pass without rendered evidence.
  Fix: rerun the desktop and mobile captures when the in-app browser security check is available.

**Primary interactions checked statically**
- Homepage OP GLOBAL card resolves to the new case route.
- Overview, Brand System, Applications, All Work, and Back to Top targets are present.
- Every displayed presentation page links to its full-resolution source export.

**Implementation checklist**
- [x] Rename the visual-work entry from ONE PORT to OP GLOBAL.
- [x] Add a dedicated Behance-style branding case.
- [x] Preserve all 23 source pages and intrinsic crop-box ratios.
- [x] Add responsive editorial framing around the source deck.
- [ ] Capture and compare desktop and mobile browser renders.

**Comparison history**
- Revision 2 clarified the two concepts after direction review: pages 01–13 are now explicitly labeled `DIRECTION 01 · EXPLORATION` and shown in a lower-emphasis two-column process grid.
- Pages 14–18 are labeled `DIRECTION 02 · FINAL IDENTITY` and retain full-width presentation priority.
- Pages 19–23 now follow a dedicated `BRAND APPLICATIONS` chapter, connecting the selected identity to stationery, signage, freight, vehicle, and social touchpoints.
- Mobile collapses the exploration grid to one column so every source page remains complete and readable without cropping.
- Static post-fix evidence: local route returns HTTP 200, HTML parsing passes, source order assertions pass, all 23 image assets resolve, and `git diff --check` passes.
- Revision 3 shortened Direction 01 from 13 displayed pages to six representative frames (01, 03, 04, 07, 08, 13) and changed the desktop process grid from two to three columns. This reduces the exploration chapter from seven image rows to two while preserving concept, construction, key visual, stationery, and signage evidence.
- Post-fix static evidence: the exploration wrapper contains exactly six images, Direction 02 still begins with page 14, the local route returns HTTP 200, HTML parsing passes, and `git diff --check` passes. Browser capture remains blocked by the same temporary in-app security check.

final result: blocked
