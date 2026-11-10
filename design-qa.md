# Homepage visual QA — dark direction 02

final result: passed

## Scope and visual truth
- Source: /Users/nikki/.codex/generated_images/01a0852e-9d5a-7770-8488-315c6d957a66/exec-965db611-230e-4d10-969f-e0ade2787d8b.png
- Implementation: http://localhost:4176/
- Implementation capture: /tmp/nikki-dark-preview/desktop-comparison-final.png
- Combined comparison: /tmp/nikki-dark-preview/comparison-final.png
- Source is 946 × 1663 px. Implementation is 946 × 1664 px at 946 × 1664 CSS viewport, 1× density. One-pixel source padding only. Both show the default top-of-homepage state.
- Mobile: /tmp/nikki-dark-preview/mobile-top.png and mobile-sop.png, 390 × 844 CSS/px. Additional 320 × 740 overflow check. Normal browser size restored to 1208 × 752.
- Final handoff capture: /tmp/nikki-dark-preview/homepage-preview.png.

## Intentional content adaptations
- The user has a real 3C case but has not provided its assets. The fictional dashcam was removed. The same split feature layout currently showcases their existing EAST OAK wireless meat probe, linked to its actual case. Its supplied light-background product image remains unaltered. New 3C case creation is pending supplied material.
- Generated DH20 and EAST OAK mock images were replaced by original project assets. EAST OAK shows its actual responsive website design, not a fabricated laptop scene.
- ACACIA night image is an AI-expanded landscape treatment of the original campaign cover. Original project page remains unchanged. Product is smaller than the direction image; photographic identity and scene are retained.
- Existing brand, KIKI, LELIAN, three SUNON exhibition cases, AI workflow and about links remain available below the mock's visible extent.
- Underlined text links replace decorative arrow glyphs. No invented business results.

## Findings and fixes
1. [P2, fixed] Mobile hero cropped the right side of the tent at 71% image position. Changed to 88%; final 390 px capture shows the complete tent.
2. [P2, fixed] Header and hardware copy were too tall compared with the direction. Desktop header reduced from 76 to 60 px; redundant feature description removed; heading hierarchy strengthened. Re-captured and compared after fixes.
3. [P2, fixed] Back-to-top anchor targeted main below the header. Anchor moved to the page wrapper. Browser click now places header at y=0.
4. [P2, fixed] Potential 320 px feature-title wrapping. Mobile display sizes now use clamps; browser measured no text/link overflow at 320 px.
5. [P3] Exact imagery and line endings differ from the generated mood direction to preserve real projects. This is a reviewed, intentional adaptation, not a missing asset.

## Required surfaces
- Typography: native Chinese sans-serif, bold large two-line hero, distinct yellow-green role, smaller muted descriptor. Desktop header/feature title proportions refined. All core copy readable in mobile captures.
- Spacing/layout: full-width photographic hero; balanced half-width hardware feature; paired project cards; spacious category groups. Mobile single-column with no horizontal overflow. Original case details are outside this homepage-only change.
- Color: near-black #0b0d0e, panel #131618, white #f4f5f3, muted #aeb3b6, accent #dfff60. Contrast and accent hierarchy match the chosen direction; source product photography retains its own colors.
- Images: original project assets preserved; landscape hero inspected. All image nodes loaded at desktop verification. No CSS-generated images or invented product logos.
- Copy: role, branding/new-product/digital-experience focus, actual case titles and team-attributed DH20 880 / 110% retained. No invented 3C client, product outcomes or efficiency claims.

## Comparison history
- Initial combined evidence: /tmp/nikki-dark-preview/comparison.png. Revealed excessive header/feature height; addressed as above.
- Final combined evidence: /tmp/nikki-dark-preview/comparison-final.png. Opened and visually compared side-by-side at same scale. Core layout, palette and hierarchy pass with documented real-asset adaptations.
- Focused evidence: desktop-top.png, mobile-top-before.png versus mobile-top.png, mobile-sop.png. Focused inspection verified text, crop, menu spacing and workflow card density.
- A capture immediately after reload showed pending images; discarded and re-captured after DOM confirmed all image nodes loaded. Final comparison uses loaded images.

## Interaction and integrity checks
- Browser tested hero CTA to #work, hardware case opening, back navigation, AI category jump, full AI workflow link and back-to-top.
- Local href/src and fragment check: no missing local resources or anchors; all 12 existing project destinations retained.
- No browser console errors during homepage inspection.
- Desktop 946 px and mobile 390/320 px had document width equal to viewport width; no overflowing headings/paragraphs/links at 320 px.
- No new scripts, external fonts, tracking, dependencies or runtime network services added to the website. Static preview only; not deployed.

# Project-page visual unification — 2026-11-10

final result: passed with documented browser-log limitation

## Scope
12 public project pages now share project-theme.css: ACACIA, DH20, EAST OAK, LELIAN, wireless meat probe, BIG TOMATO, OP GLOBAL, KIKI, SUNON overview and its three detail cases. Local preview only. About, AI SOP and internal review pages are outside this project-page pass.

## Visual direction and evidence
- Source: selected dark direction 02, same image path recorded above.
- Combined direction + project evidence: /tmp/nikki-project-unification/qa/source-project-comparison.jpg. Source shown at native 946 × 1663; ACACIA and SUNON are 1208 × 800 desktop captures at native size, stacked alongside. This compares shared palette, type hierarchy, borders and image treatment; the homepage composition is intentionally adapted to case-study content.
- User preview: output/portfolio-preview/project-pages-preview.jpg in the ChatGPT project workspace.
- Focused captures: acacia-collaboration.png, dh20-results-mobile.png, kiki-desktop-final.png, lelian-results-final.png and probe-evidence-final.png in the same QA directory.
- Initial full-page captures contain unloaded lazy images and are inspection aids only, not final visual proof. Focused captures were taken after navigating to the relevant content. A stale header raster on KIKI cleared on reload; the final capture shows it correctly.

## Shared presentation
- One navigation, split intro, responsibility row, chapter links and next-project footer.
- Near-black editorial shell, white headings, muted body text and lime accents. Shared chapter typography, spacing and result hierarchy.
- Original artwork/brand colors retained, including light evidence boards and embedded demos. Three SUNON detail intros use existing event photos. EAST OAK intro uses its actual website design.
- No project business metrics rewritten. Scope notes and team attribution remain. Existing scripts preserved byte-for-byte; no added runtime library or external font.

## Checks and fixes
- Browser checked all 12 pages on desktop, 390 px and 320 px. Document width equals viewport width on both mobile sizes; all navigation headers fit.
- LELIAN intentional horizontally scrollable comparison rails remain bounded within the page. DH20 direction tabs changed to stacked mobile buttons; selection behavior verified for direction 01 and 03.
- Fixed LELIAN light-background captions after the existing script moves its showcase into a new section. Computed caption color now #303b35 on white.
- Fixed OP GLOBAL overview anchor lost during hero replacement.
- ACACIA tab click switches to its actual product-page iframe. Back-to-top restores scrollY=0 and header y=0. Original visibility/pause script unchanged.
- All existing image nodes retained; the three SUNON detail pages gain a hero image. Local resource checks found no missing files. Original scripts are unchanged. The single OP GLOBAL anchor issue found was fixed.
- One meat-probe image initially reported unloaded/failed during rapid page navigation; focused A+ section verification reported no broken images.
- Browser logs contained two unattributed MutationObserver errors during multi-page navigation. The relevant project code contains no MutationObserver; ACACIA uses IntersectionObserver. Tested controls worked. Log origin could not be attributed by the browser API, so this report does not claim a completely clean console.
- Animation pause logic was inspected and preserved; no new animation was added. Background-tab suspension was not separately re-tested in this styling pass.

## Homepage cover correction — user-selected imagery
- Restored EAST OAK homepage cover to the original outdoor fire-pit photograph (`east-oak-cover-d4d8bc4635ffc82e.webp`), replacing the website/device montage. Removed montage-specific padding/contain treatment.
- Checked all 11 linked homepage project covers against the pre-redesign choices: all match. Dark layout retained; project detail pages unchanged by this correction.
- Browser verified original image loaded and zero image padding. Final screenshot: ChatGPT project output/portfolio-preview/home-covers-restored.png. Local only; not deployed.
- This correction supersedes the earlier QA note describing the EAST OAK homepage website screenshot.

## About page — dark theme follow-through
- Reused project-theme.css for the navigation/footer and added about-dark.css for biography, portrait, timeline and contact sections. Intro/experience spacing and hierarchy now follow the same dark/lime portfolio system.
- Main content text and all original image/iframe sources were programmatically compared with the pre-change About page and are identical. The drum illustration receives a monochrome inverted CSS treatment to suit the dark surface; its original app code and hit areas are unchanged.
- Visually checked desktop 1208 px and mobile 390/320 px. No document overflow or overflowing text links. Journey/contact navigation checked. Native mail/tel targets retained. No missing local resources or same-page anchors; git diff --check passed.
- Fixed the contact drum thumbnail blend background after mobile inspection. No audio playback claim: this pass verified rendering and page navigation, not audible output.
- Proof: ChatGPT project output/portfolio-preview/about-dark-desktop.png and about-dark-mobile.png. Local preview only; not deployed.

## Image clarity, dividers and English line — 2026-11-10
- Restored 147 image references across homepage, About and 12 public project pages to their existing original source files recorded in the optimization manifest. The same images/crops remain; no generated replacement, upscaling or new compression was performed. Portrait/drum thumbnails retain their existing appropriately small responsive treatment.
- Main portfolio image srcset variants were removed so high-density displays receive the full available source. SUNON evidence boards similarly load their full 2560 px file. Existing loading=lazy and async decoding retained. This deliberately trades larger per-image transfers for portfolio detail; the referenced original set is approximately 36.7 MB across all pages, not a single page load.
- Matched image preloads updated to avoid downloading both the old optimized version and the original hero. All 174 img src references checked: no missing local files. Browser verified homepage OP GLOBAL at 2560 px, DH20 2000 px, EAST OAK 1800 px, and meat-probe intro at 1620 px.
- Original-source limits remain: expanded homepage night hero 1586 px; ACACIA case hero 853 px; ACACIA cover 1076 px and SUNON anniversary photo 790 px. No larger same-image file found in the inspected repository sources. These cannot gain genuine detail from export scaling alone.
- Removed project-facts borders and chapter-nav top border, reduced facts-to-navigation spacing, kept one lower chapter divider. Browser computed borders: facts 0 px, nav top 0 px, nav bottom 1 px.
- Added English hero line: “Bringing good products to market.” Desktop plus 390/320 px checked; the line remains one line on both phone widths and does not overlap hero credit or CTA.
- Proof in ChatGPT project output/portfolio-preview: home-english-clarity.png and project-spacing-fixed.png. Stylesheet versions bumped to avoid stale cached CSS. Local only; not deployed.

## Supplied ACACIA high-resolution photography
- User supplied a 12787 × 7981 night original and 2160 × 1536 daytime original. External originals are untouched.
- Night original exported without creative edits at 1600/2560/3200 px, JPEG quality 97, 4:4:4, progressive. Homepage hero and ACACIA card now reference this real photo, replacing the generated small hero and low-resolution card crop. Max 3200 px supports the 1600 CSS-pixel desktop shell at 2×.
- Daytime photograph copied byte-for-byte to the website and used for ACACIA case intro, with contain to preserve tent, vehicle and setting.
- Desktop 1280 px and mobile 390 px visually checked. Mobile object position 77% keeps the whole tent visible without covering copy. After restoring the browser’s actual 2× device scale, verified selection of the 2560 px night asset. No horizontal overflow.
- Proof: output/portfolio-preview/home-original-hires.png and home-original-hires-mobile.png in the ChatGPT workspace. This supersedes earlier notes about the limited 1586 px night hero and 853 px ACACIA intro. Local only, not deployed.


## 2026-11-10 · Homepage hero typography refinement
- Removed the hero English tagline per latest feedback. Reduced title sizing; first line weight 400, second line 600, supporting copy and role lighter.
- Kept one primary CTA to #work; ACACIA is a quiet bottom-right linked project credit. Original photograph unchanged.
- Browser verified 1280, 390 and 320 px layouts: no horizontal overflow. Primary CTA lands on #work with 24 px offset. Mobile photograph retains the tent. Local preview only.
- Screenshots: output/portfolio-preview/home-refined-typography.png and home-refined-typography-mobile.png in the ChatGPT project workspace.


## 2026-11-10 · Clickable hero, original print pages and intro backgrounds
- Homepage banner photograph now links directly to ACACIA; primary #work CTA retains its destination. Verified both by browser clicks, including mobile.
- Removed the #151a1d fill from all 12 project intro image containers; transparent PNGs now sit directly on the page #0b0d0e. EAST OAK verified visually. Artwork colors are retained.
- ACACIA print-system.webp was a 2290px enlargement of a 1145px collage. Replaced it with six exports from the matching original Illustrator PDF at /Volumes/NIKKI/ACACIA2023/ACACIA众筹项目/mediakit/AC现在已有的图片/ac品牌书/20230407品牌书加封套_转曲的副本_复制.pdf. Export region excludes empty page margins; source PDF unchanged. Native export widths 1488–2058px. Text/line art rerendered from vectors; embedded photographs retain original source limits.
- Desktop three-column layout, mobile one-column layout; direct large-image links verified. 1280 and 390px browser checks show no horizontal overflow; images loaded successfully. Screenshots in project workspace output/portfolio-preview/acacia-print-originals.png, acacia-print-originals-mobile.png and east-oak-unified-background.png. Local only.


## 2026-11-10 · Complete original-image audit (supersedes earlier compression notes)
- Audited 14 public pages / 179 static image references and four embedded web demos. Restored 348 old references across 21 files; 176 pre-optimization embedded assets recovered byte for byte and SHA-256 validated. Main pages have no generated assets/webp references or srcset alternatives.
- Night photograph uses the supplied 12787 × 7981 JPEG verbatim. KIKI uses matching source PNGs, meat-probe A+ uses 4096 × 1679 PNGs. Existing source artwork was not overwritten or recompressed.
- Exported 40 SVGs directly from original PDFs for SUNON, OP GLOBAL, Big Tomato and ACACIA print pages. All text is paths; embedded photographs retain source detail. SUNON cover crops matched the existing selections, with source rectangles recorded in /tmp/nikki-image-audit/kv-crops.json.
- Replaced SUNON live-photo WebPs with byte-preserved JPEG image streams extracted from the supplied PDF. Source-photo limits remain (anniversary 790 × 420, entry 704 × 528); ACACIA media cards remain 279–336 px originals. Their forced enlargement is removed. SVG and raster examples visually checked in browser.
- Native width/aspect metadata reserves space for lazy images and prevents stretched small evidence images. 14 mobile checks at 390px: no overflow or broken visible images. Desktop checks at 1440px: no overflow. Four embedded demos: no broken visible images. All changed HTML img paths exist; git diff --check passed.
- Old optimize-web-images.py is deliberately disabled; repository AGENTS.md records the user requirement to preserve image originals. This is a local revision, not deployed. Full Chinese audit report saved in the ChatGPT project output/portfolio-preview/图片清晰度检查.md.


## 2026-11-10 · Simplified homepage project hierarchy
- Removed the “更多品牌与展会作品” banner, Explore introduction, category numbering and generic repeated category descriptions. Three compact index links lead directly to 品牌设计 / 电商与独立站 / 展会体验. Each heading is followed immediately by its projects.
- AI 协作工作流 is a separate main-level working-method section after the work collection, excluded from project classification. SUNON overview remains available beside its category heading.
- Image attributes and sources were compared before/after and are identical. No image processing or recompression. Desktop 1280px and mobile 390px checked; no horizontal overflow. All three index anchors verified by actual browser clicks. Screenshots: ChatGPT project output/portfolio-preview/home-simplified-work.png and home-simplified-work-mobile.png. Local only.
