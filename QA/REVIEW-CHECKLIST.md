# Review checklist

Check on the PR's preview URL. ★ = every PR that changes something visible (~5 min).
Full pass = before launch, and once a month. A failed ★ item = request changes.

## 1. Layout
- [ ] ★ 375 px (iPhone) and 1280 px (laptop): nothing overlaps, nothing is cut, no horizontal scroll.
- [ ] ★ 360 px (small Android): nav still usable, buttons don't wrap mid-word.
- [ ] 768 px (tablet) and 1920 px: content stays centered, no stretched images.
- [ ] Longest language (when there is more than one): no text overflow in buttons or cards.

## 2. Content
- [ ] ★ No typo, no TODO, no placeholder text in the changed sections.
- [ ] ★ Store buttons open the right store page (iOS on iPhone, Google Play on Android).
- [ ] Texts match the product's real features (CLAUDE.md product claims).

## 3. Interaction
- [ ] ★ Tab through the page: every link/button reachable, focus ring visible.
- [ ] Language switcher lands on the same page in the other language.
- [ ] FAQ items open and close; anchors (Features, FAQ, Download) scroll to the right section.
- [ ] macOS/iOS "Reduce motion" on: no animation runs.

## 4. Browsers
- [ ] ★ Safari iOS and Chrome Android (real phones if possible).
- [ ] Chrome, Safari, Firefox desktop.

## 5. SEO and sharing (before launch)
- [ ] Paste the URL in Slack/Messenger: title, description and image look right.
- [ ] Lighthouse (Chrome DevTools) on the home page: Performance, Accessibility, Best Practices, SEO ≥ 90.
- [ ] `/sitemap.xml`, `/robots.txt`, `/llms.txt` open and list the real domain.
