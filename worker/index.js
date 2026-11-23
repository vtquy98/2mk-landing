// Runs only for requests that match no file in dist/ (Cloudflare serves existing pages and public/_redirects first).
// Webflow redirected unknown SCPI listing URLs to the directory; Cloudflare's _redirects can't express
// "only when the page doesn't exist", so it is done here. Everything else gets the 404 page.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/scpi-listing/')) return Response.redirect(new URL('/repertoire', url).href, 301);
    return env.ASSETS.fetch(request);
  },
};
