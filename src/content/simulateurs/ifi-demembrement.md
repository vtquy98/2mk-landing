---
title: "Calculateur IFI avec optimisation demembrement"
name: "Simulateur IFI 2026: calcul patrimoine immobilier, SCPI, démembrement."
excerpt: "Calculez votre IFI 2026: patrimoine net taxable, barème, abattement résidence principale et décote. Démembrement inclus. Gratuit, sans inscription."
category: "Démembrements"
highlights: ["Réduisez votre IFI grâce au démembrement de propriété","Estimer en quelques clics l'économie potentielle","Simple, rapide, accessible sans connaissance fiscale"]
order: 26
seo: {"title":"Simulateur IFI 2026: calcul gratuit de votre patrimoine","description":"Calculez votre IFI 2026: patrimoine net taxable, barème, abattement résidence principale et décote. Démembrement inclus. Gratuit, sans inscription.","canonical":"https://2ndmarket.fr/simulateurs/ifi-demembrement","robots":"max-image-preview:large","ogTitle":"Simulateur IFI 2026: calcul gratuit de votre patrimoine","ogDescription":"Calculez votre IFI 2026: patrimoine net taxable, barème, abattement résidence principale et décote. Démembrement inclus. Gratuit, sans inscription.","ogImage":"/assets/68cd3b3510c084dec3e8d81f_2nd-market-logo-1200x600.png","ogType":"website","twitterTitle":"Simulateur IFI 2026: calcul gratuit de votre patrimoine","twitterDescription":"Calculez votre IFI 2026: patrimoine net taxable, barème, abattement résidence principale et décote. Démembrement inclus. Gratuit, sans inscription.","jsonLd":["{ \"@context\": \"https://schema.org\", \"@type\": \"FAQPage\", \"mainEntity\": [ { \"@type\": \"Question\", \"name\": \"Qui déclare l'IFI en cas de démembrement, l'usufruitier ou le nu-propriétaire ?\", \"acceptedAnswer\": { \"@type\": \"Answer\", \"text\": \"En principe, l'usufruitier. L'article 968 du Code général des impôts prévoit que les actifs grevés d'un usufruit sont compris dans son patrimoine pour leur valeur en pleine propriété. Le nu-propriétaire ne déclare rien à ce titre. Trois exceptions limitativement énumérées par ce même article permettent une imposition répartie entre les deux, chacun déclarant alors la valeur de son droit selon le barème de l'article 669 du Code général des impôts. L'application de ces règles à une situation donnée se valide avec un notaire ou un fiscaliste.\" } }, { \"@type\": \"Question\", \"name\": \"Comment se calcule la valeur d'un usufruit pour l'IFI ?\", \"acceptedAnswer\": { \"@type\": \"Answer\", \"text\": \"Lorsque l'imposition est répartie entre usufruitier et nu-propriétaire, la valeur de chaque droit résulte du barème de l'article 669 du Code général des impôts, qui dépend de l'âge de l'usufruitier au 1er janvier. Pour un usufruit constitué pour une durée fixe, l'article 669 II retient 23 % de la valeur en pleine propriété par période de dix ans, sans fractionnement.\" } }, { \"@type\": \"Question\", \"name\": \"À partir de quel patrimoine l'IFI est-il dû, et quel est le barème ?\", \"acceptedAnswer\": { \"@type\": \"Answer\", \"text\": \"L'IFI est dû lorsque le patrimoine immobilier net taxable au 1er janvier dépasse 1 300 000 €. Le barème s'applique ensuite par tranches, de 0,5 % à 1,5 %, à compter de 800 000 €. Un abattement de 30 % s'applique à la valeur de la résidence principale. Entre 1 300 000 € et 1 400 000 €, une décote réduit l'impôt selon la formule 17 500 € diminués de 1,25 % du patrimoine net taxable.\" } }, { \"@type\": \"Question\", \"name\": \"Les parts de SCPI entrent-elles dans l'assiette de l'IFI ?\", \"acceptedAnswer\": { \"@type\": \"Answer\", \"text\": \"Oui, à hauteur de la fraction de leur valeur représentative des actifs immobiliers imposables détenus par la société. Chaque société de gestion communique ce coefficient à ses associés. En cas de démembrement de parts de SCPI, la règle de l'article 968 du Code général des impôts s'applique de la même manière qu'à un immeuble détenu en direct.\" } } ]}"]}
lastmod: "2026-10-15"
---

<div class="simulator">
<div><!-- =========================================================================
     BLOC 1 — Simulateur IFI
     Page : /simulateurs/ifi-demembrement — Emplacement : remplace l'embed
     du simulateur actuel, en tête de page.
     v1.1 : compatible Lead Capture Universel v3.5.4 (hook .results-container
     révélé à la première saisie, ids lisibles res-* pour l'email de
     résultats) ; champs en 16 px sous 600 px (pas de zoom iOS).
     ========================================================================= -->
<style>
.tm-ifi{--b:#104A65;--c:#5BB5D5;--su:#F4F7F9;--bd:#E2E8F0;--tx:#334155;--mu:#64748B;--pos:#1E6B2E;--neg:#B1221F;
  font-family:inherit;font-size:.97rem;line-height:1.6;color:var(--tx);
  background:#fff;border:1px solid var(--bd);border-radius:14px;padding:1.8rem;margin:2.2rem 0}
.tm-ifi *,.tm-ifi *::before,.tm-ifi *::after{box-sizing:border-box}
.tm-ifi h2{color:var(--b);font-size:1.28rem;font-weight:700;margin:0 0 .35rem;line-height:1.3}
.tm-ifi h3{color:var(--b);font-size:1rem;font-weight:700;margin:0 0 .8rem}
.tm-ifi .tm-sub{color:var(--mu);font-size:.9rem;margin:0 0 1.4rem}
.tm-ifi .tm-grid{display:grid;gap:1.6rem;grid-template-columns:1.05fr .95fr;align-items:start}
.tm-ifi .tm-two{display:grid;gap:0 1rem;grid-template-columns:1fr 1fr}
.tm-ifi .tm-f{margin-bottom:.9rem}
.tm-ifi label{display:block;font-size:.83rem;font-weight:600;color:var(--b);margin-bottom:.3rem}
.tm-ifi .tm-in{position:relative}
.tm-ifi input{width:100%;padding:.6rem 2rem .6rem .75rem;font-family:inherit;font-size:.97rem;color:var(--tx);
  background:#fff;border:1px solid var(--bd);border-radius:8px;appearance:none;transition:border-color .15s,box-shadow .15s}
.tm-ifi input:focus{outline:none;border-color:var(--c);box-shadow:0 0 0 3px rgba(91,181,213,.22)}
.tm-ifi input[aria-invalid="true"]{border-color:var(--neg)}
.tm-ifi .tm-u{position:absolute;right:.75rem;top:50%;transform:translateY(-50%);font-size:.9rem;color:var(--mu);pointer-events:none}
.tm-ifi .tm-hint{display:block;font-size:.78rem;color:var(--mu);margin-top:.25rem}
.tm-ifi .tm-err{display:none;font-size:.78rem;color:var(--neg);margin-top:.25rem}
.tm-ifi .tm-err[data-show]{display:block}
.tm-ifi hr{height:1px;background:var(--bd);border:0;margin:1.1rem 0}
.tm-ifi .tm-out{background:var(--su);border:1px solid var(--bd);border-left:4px solid var(--c);border-radius:10px;padding:1.25rem}
.tm-ifi .tm-k{display:block;font-size:.72rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--mu)}
.tm-ifi .tm-v{display:block;font-size:1.85rem;font-weight:700;color:var(--b);line-height:1.15;font-variant-numeric:tabular-nums}
.tm-ifi .tm-v--s{font-size:1.25rem}
.tm-ifi .tm-v--p{color:var(--pos)}
.tm-ifi .tm-note{display:block;font-size:.78rem;color:var(--mu);margin-top:.15rem}
.tm-ifi .tm-kpi+.tm-kpi{margin-top:.9rem;padding-top:.9rem;border-top:1px solid var(--bd)}
.tm-ifi dl{margin:0}
.tm-ifi .tm-r{display:flex;justify-content:space-between;align-items:baseline;gap:.75rem;padding:.4rem 0;font-size:.9rem}
.tm-ifi .tm-r+.tm-r{border-top:1px solid var(--bd)}
.tm-ifi .tm-r dt{margin:0;color:var(--tx)}
.tm-ifi .tm-r dd{margin:0;font-weight:600;color:var(--b);font-variant-numeric:tabular-nums;white-space:nowrap}
.tm-ifi .tm-sc{margin-top:1.1rem;padding-top:1rem;border-top:1px solid var(--bd)}
.tm-ifi .tm-lc{display:none;min-height:1px}
.tm-ifi .tm-fine{margin:1.4rem 0 0;padding-top:.9rem;border-top:1px solid var(--bd);font-size:.78rem;line-height:1.5;color:var(--mu)}
.tm-ifi .tm-fine strong{color:var(--tx);font-weight:600}
@media (max-width:600px){.tm-ifi{padding:1.3rem}.tm-ifi input{font-size:16px;min-height:44px}.tm-ifi .tm-grid{grid-template-columns:1fr}.tm-ifi .tm-two{grid-template-columns:1fr}}
</style>
<div class="tm-ifi" data-tm="ifi">
  <h2>Simulateur IFI 2027 : patrimoine au 1er janvier 2027</h2>
  <p class="tm-sub">Barème en vigueur, inchangé dans le projet de loi de finances pour 2027. Abattement résidence principale, plafonnement des dettes, décote et réduction pour dons inclus.</p>
  <div class="tm-grid">
    <div>
      <h3>Patrimoine immobilier</h3>
      <div class="tm-f">
        <label for="ifi-rp">Résidence principale, valeur vénale</label>
        <div class="tm-in"><input id="ifi-rp" data-f="rp" type="text" inputmode="decimal" value="900 000" autocomplete="off"><span class="tm-u">€</span></div>
        <span class="tm-hint">Abattement de 30 % appliqué automatiquement (art. 973 CGI).</span>
        <span class="tm-err" data-err="rp"></span>
      </div>
      <div class="tm-f">
        <label for="ifi-dir">Autres biens détenus en direct</label>
        <div class="tm-in"><input id="ifi-dir" data-f="direct" type="text" inputmode="decimal" value="600 000" autocomplete="off"><span class="tm-u">€</span></div>
        <span class="tm-hint">Résidences secondaires, biens locatifs, terrains. Un bien détenu en usufruit compte pour sa valeur en pleine propriété (art. 968 CGI), hors trois cas d'exception.</span>
        <span class="tm-err" data-err="direct"></span>
      </div>
      <div class="tm-f">
        <label for="ifi-scpi">Parts de SCPI, OPCI et SCI, valeur imposable</label>
        <div class="tm-in"><input id="ifi-scpi" data-f="scpi" type="text" inputmode="decimal" value="400 000" autocomplete="off"><span class="tm-u">€</span></div>
        <span class="tm-hint">Nombre de parts multiplié par la valeur IFI par part publiée par la société de gestion, qui ne retient que la fraction immobilière de la part. Les parts détenues en nue-propriété ne se déclarent pas, hors exceptions.</span>
        <span class="tm-err" data-err="scpi"></span>
      </div>
      <hr>
      <h3>Passif et réduction</h3>
      <div class="tm-f">
        <label for="ifi-det">Dettes déductibles au 1er janvier</label>
        <div class="tm-in"><input id="ifi-det" data-f="dettes" type="text" inputmode="decimal" value="300 000" autocomplete="off"><span class="tm-u">€</span></div>
        <span class="tm-hint">Capital restant dû des prêts immobiliers, travaux facturés et impôts fonciers dus au 1er janvier (art. 974 CGI).</span>
        <span class="tm-err" data-err="dettes"></span>
      </div>
      <div class="tm-f">
        <label for="ifi-don">Dons à des organismes éligibles</label>
        <div class="tm-in"><input id="ifi-don" data-f="dons" type="text" inputmode="decimal" value="0" autocomplete="off"><span class="tm-u">€</span></div>
        <span class="tm-hint">Réduction de 75 % du montant versé, plafonnée à 50 000 € (art. 978 CGI).</span>
        <span class="tm-err" data-err="dons"></span>
      </div>
      <hr>
      <h3>Scénario nue-propriété</h3>
      <div class="tm-f">
        <label for="ifi-np">Actifs imposables réinvestis en nue-propriété de SCPI</label>
        <div class="tm-in"><input id="ifi-np" data-f="np" type="text" inputmode="decimal" value="0" autocomplete="off"><span class="tm-u">€</span></div>
        <span class="tm-hint">Montant retiré de l'assiette pendant la durée du démembrement. Une donation de nue-propriété avec réserve d'usufruit ne réduit pas l'IFI du donateur.</span>
        <span class="tm-err" data-err="np"></span>
      </div>
    </div>
    <div class="tm-out" aria-live="polite">
      <div class="tm-kpi">
        <span class="tm-k">IFI estimé</span>
        <span class="tm-v" data-o="ifi">—</span>
        <span class="tm-note" data-o="ifiNote"></span>
      </div>
      <div class="tm-kpi">
        <span class="tm-k">Patrimoine net taxable</span>
        <span class="tm-v tm-v--s" data-o="base">—</span>
      </div>
      <hr>
      <dl>
        <div class="tm-r"><dt>Actifs bruts déclarés</dt><dd data-o="brut">—</dd></div>
        <div class="tm-r"><dt>Abattement résidence principale</dt><dd data-o="abat">—</dd></div>
        <div class="tm-r"><dt>Dettes admises en déduction</dt><dd data-o="dettesAdm">—</dd></div>
        <div class="tm-r"><dt>IFI selon le barème</dt><dd data-o="bareme">—</dd></div>
        <div class="tm-r"><dt>Décote</dt><dd data-o="decote">—</dd></div>
        <div class="tm-r"><dt>Réduction pour dons</dt><dd data-o="redDons">—</dd></div>
      </dl>
      <span class="tm-note" data-o="plafNote"></span>
      <div class="tm-sc">
        <span class="tm-k">Avec le scénario nue-propriété</span>
        <span class="tm-v tm-v--s" data-o="ifiNp">—</span>
        <span class="tm-note" data-o="ecart"></span>
      </div>
    </div>
  </div>
  <div class="results-container tm-lc" style="display:none" aria-hidden="true"></div>
  <p class="tm-fine">
    <strong>Simulation non contractuelle.</strong> Le résultat est établi à partir des seules valeurs saisies et des
    règles générales des articles 964 à 983 du code général des impôts. Il ne couvre ni les biens professionnels
    exonérés, ni le plafonnement de l'IFI en fonction des revenus, ni les règles propres aux non-résidents.
    Le barème appliqué est celui en vigueur, sous réserve de la loi de finances pour 2027. Investir en SCPI
    comporte un risque de perte en capital ; la valeur des parts évolue à la hausse comme à la baisse et leur
    liquidité n'est pas garantie. La qualification de chaque bien et de chaque dette relève du notaire ou d'un
    conseil fiscal. Aucune donnée saisie n'est transmise ni conservée. 2nd Market n'est ni conseiller en gestion
    de patrimoine, ni société de gestion, et ne fournit aucun conseil en investissement, fiscal ou comptable.
  </p>
</div>
<script>
/* =========================================================================
 * tm-core.js — Noyau JS des embeds Webflow 2nd Market
 * Namespace unique : window.TM  (aucune autre variable globale)
 *
 * Inliné dans chaque embed calculateur (règle « self-contained, no external
 * dependencies »). Idempotent : deux embeds sur la même page réutilisent la
 * première instance chargée au lieu de s'écraser.
 *
 * Zéro dépendance. Ne touche pas à jQuery (Webflow embarque jQuery 3.5.1).
 * Testé par scripts/test-finance.js — toute modification du bloc FINANCE
 * repasse cette suite avant livraison.
 * ========================================================================= */
(function (root) {
  'use strict';
  if (root.TM && root.TM.__v) return; // idempotent : double inclusion sans effet
  var TM = {};
  TM.__v = '1.0.0';
  /* ---------------------------------------------------------------------
   * 1. NOMBRES ET FORMATAGE (locale fr-FR)
   * ------------------------------------------------------------------- */
  /**
   * Parse une saisie utilisateur française en Number.
   * Accepte : "1 234,56", "1234.56", "1.234,56", "12 €", "3,5 %", "" -> null
   * Retourne null si la valeur n'est pas un nombre exploitable — jamais NaN,
   * pour que l'appelant distingue « vide » de « zéro ».
   */
  TM.parseNum = function (value) {
    if (value === null || value === undefined) return null;
    if (typeof value === 'number') return isFinite(value) ? value : null;
    var s = String(value).trim();
    if (!s) return null;
    // Supprime espaces (dont insécables), symboles monétaires et %
    s = s.replace(/[\s  ]/g, '').replace(/[€$%]/g, '');
    var hasComma = s.indexOf(',') !== -1;
    var hasDot = s.indexOf('.') !== -1;
    if (hasComma && hasDot) {
      // Le dernier séparateur rencontré est le séparateur décimal
      s = s.lastIndexOf(',') > s.lastIndexOf('.')
        ? s.replace(/\./g, '').replace(',', '.')   // 1.234,56
        : s.replace(/,/g, '');                     // 1,234.56
    } else if (hasComma) {
      s = s.replace(',', '.');
    }
    var n = Number(s);
    return isFinite(n) ? n : null;
  };
  var _fmt = function (opts) {
    try { return new Intl.NumberFormat('fr-FR', opts); } catch (e) { return null; }
  };
  var _eur0 = _fmt({ style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 });
  var _eur2 = _fmt({ style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 });
  /** Montant en euros. decimals = 0 (défaut) ou 2. */
  TM.eur = function (n, decimals) {
    if (n === null || n === undefined || !isFinite(n)) return '—';
    var f = decimals === 2 ? _eur2 : _eur0;
    if (f) return f.format(n);
    return TM.num(n, decimals === 2 ? 2 : 0) + ' €';
  };
  /** Nombre brut, d décimales, séparateur de milliers fr. */
  TM.num = function (n, d) {
    if (n === null || n === undefined || !isFinite(n)) return '—';
    d = d === undefined ? 2 : d;
    var f = _fmt({ minimumFractionDigits: d, maximumFractionDigits: d });
    if (f) return f.format(n);
    return n.toFixed(d).replace('.', ',');
  };
  /**
   * Pourcentage. `rate` est une FRACTION décimale (0.0512 -> "5,12 %").
   * Convention interne : tous les taux circulent en fraction, jamais en points.
   * On ne convertit qu'à l'affichage — c'est la source n°1 d'erreurs d'un facteur 100.
   */
  TM.pct = function (rate, d) {
    if (rate === null || rate === undefined || !isFinite(rate)) return '—';
    d = d === undefined ? 2 : d;
    return TM.num(rate * 100, d) + ' %';
  };
  /** Arrondi commercial à d décimales, robuste au flottant (0.145 -> 0.15). */
  TM.round = function (n, d) {
    if (!isFinite(n)) return n;
    d = d === undefined ? 2 : d;
    var p = Math.pow(10, d);
    return Math.round((n * p + (n >= 0 ? 1 : -1) * 1e-9)) / p;
  };
  TM.clamp = function (n, min, max) { return Math.min(Math.max(n, min), max); };
  /* ---------------------------------------------------------------------
   * 2. DATES
   * ------------------------------------------------------------------- */
  /** "2026-03-31" ou Date -> Date UTC à minuit (évite les dérives de fuseau). */
  TM.date = function (v) {
    if (v instanceof Date) return new Date(Date.UTC(v.getFullYear(), v.getMonth(), v.getDate()));
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(v));
    if (m) return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
    var m2 = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(String(v).trim()); // jj/mm/aaaa
    if (m2) return new Date(Date.UTC(+m2[3], +m2[2] - 1, +m2[1]));
    var d = new Date(v);
    return isNaN(d.getTime()) ? null : new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  };
  /** Nombre de jours calendaires entre deux dates (Actual). */
  TM.days = function (from, to) {
    var a = TM.date(from), b = TM.date(to);
    if (!a || !b) return null;
    return Math.round((b - a) / 86400000);
  };
  /** Ajoute n mois en conservant la fin de mois (31 janv + 1 mois = 28/29 févr). */
  TM.addMonths = function (d, n) {
    var x = TM.date(d);
    var day = x.getUTCDate();
    var t = new Date(Date.UTC(x.getUTCFullYear(), x.getUTCMonth() + n, 1));
    var last = new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth() + 1, 0)).getUTCDate();
    t.setUTCDate(Math.min(day, last));
    return t;
  };
  /* ---------------------------------------------------------------------
   * 3. FINANCE
   * Convention : un flux = { date: Date|"YYYY-MM-DD", amount: Number }
   * amount < 0 = décaissement investisseur, amount > 0 = encaissement.
   * ------------------------------------------------------------------- */
  /** Valeur actuelle nette d'une série de flux datés, au taux annuel `rate`.
   *  Actualisation Actual/365 — même convention qu'Excel XIRR. */
  TM.xnpv = function (rate, flows) {
    if (!flows || !flows.length) return null;
    var t0 = TM.date(flows[0].date);
    var sum = 0;
    for (var i = 0; i < flows.length; i++) {
      var dt = TM.days(t0, flows[i].date) / 365;
      sum += flows[i].amount / Math.pow(1 + rate, dt);
    }
    return sum;
  };
  /**
   * TRI de flux datés (équivalent Excel XIRR), en fraction décimale.
   *
   * Méthode : Newton-Raphson amorcé à `guess`, avec repli sur une bisection
   * bornée si Newton diverge ou sort du domaine. La bisection garantit la
   * convergence dès qu'un changement de signe existe sur [-0,9999 ; 10] ;
   * c'est ce filet qui évite les « NaN » silencieux sur des flux atypiques
   * (revente à perte, dividendes irréguliers, durée < 1 an).
   *
   * Retourne null — jamais NaN — si le TRI n'est pas défini :
   *  - moins de 2 flux,
   *  - tous les flux de même signe (aucune racine),
   *  - aucun changement de signe de la VAN sur le domaine exploré.
   * Un null doit être affiché « non calculable », jamais 0 %.
   */
  TM.xirr = function (flows, guess) {
    if (!flows || flows.length < 2) return null;
    var f = flows.slice().sort(function (a, b) { return TM.date(a.date) - TM.date(b.date); });
    var hasNeg = false, hasPos = false;
    for (var i = 0; i < f.length; i++) {
      if (!isFinite(f[i].amount)) return null;
      if (f[i].amount < 0) hasNeg = true;
      if (f[i].amount > 0) hasPos = true;
    }
    if (!hasNeg || !hasPos) return null;
    var LO = -0.9999, HI = 10, TOL = 1e-9, r = (guess === undefined ? 0.1 : guess);
    // --- Newton-Raphson
    for (var k = 0; k < 60; k++) {
      var t0 = TM.date(f[0].date), npv = 0, d1 = 0;
      for (var j = 0; j < f.length; j++) {
        var t = TM.days(t0, f[j].date) / 365;
        var disc = Math.pow(1 + r, t);
        npv += f[j].amount / disc;
        d1 -= t * f[j].amount / (disc * (1 + r));
      }
      if (Math.abs(npv) < 1e-8) return r;
      if (!isFinite(d1) || d1 === 0) break;
      var next = r - npv / d1;
      if (!isFinite(next) || next <= LO || next > HI) break;
      if (Math.abs(next - r) < TOL) return next;
      r = next;
    }
    // --- Repli : bisection sur [LO, HI]
    var lo = LO, hi = HI;
    var flo = TM.xnpv(lo, f), fhi = TM.xnpv(hi, f);
    if (!isFinite(flo) || !isFinite(fhi) || flo * fhi > 0) return null;
    for (var b = 0; b < 300; b++) {
      var mid = (lo + hi) / 2, fm = TM.xnpv(mid, f);
      if (Math.abs(fm) < 1e-9 || (hi - lo) < 1e-10) return mid;
      if (flo * fm < 0) { hi = mid; fhi = fm; } else { lo = mid; flo = fm; }
    }
    return (lo + hi) / 2;
  };
  /** VAN de flux périodiques réguliers (values[0] à t=0). */
  TM.npv = function (rate, values) {
    var s = 0;
    for (var i = 0; i < values.length; i++) s += values[i] / Math.pow(1 + rate, i);
    return s;
  };
  /**
   * TRI de flux périodiques réguliers (équivalent Excel IRR).
   * `values[0]` à t=0, puis une période par valeur. Retourne un taux PAR PÉRIODE
   * (mensuel si les flux sont mensuels) — annualiser avec TM.annualize.
   * Périodes entières : on n'emprunte pas le chemin xirr, dont le day-count
   * Actual/365 introduirait un biais sur les années bissextiles.
   */
  TM.irr = function (values, guess) {
    if (!values || values.length < 2) return null;
    var hasNeg = false, hasPos = false;
    for (var i = 0; i < values.length; i++) {
      if (!isFinite(values[i])) return null;
      if (values[i] < 0) hasNeg = true;
      if (values[i] > 0) hasPos = true;
    }
    if (!hasNeg || !hasPos) return null;
    var LO = -0.9999, HI = 10, r = (guess === undefined ? 0.1 : guess);
    for (var k = 0; k < 60; k++) {
      var npv = 0, d1 = 0;
      for (var j = 0; j < values.length; j++) {
        npv += values[j] / Math.pow(1 + r, j);
        d1 -= j * values[j] / Math.pow(1 + r, j + 1);
      }
      if (Math.abs(npv) < 1e-10) return r;
      if (!isFinite(d1) || d1 === 0) break;
      var next = r - npv / d1;
      if (!isFinite(next) || next <= LO || next > HI) break;
      if (Math.abs(next - r) < 1e-12) return next;
      r = next;
    }
    var lo = LO, hi = HI, flo = TM.npv(lo, values), fhi = TM.npv(hi, values);
    if (!isFinite(flo) || !isFinite(fhi) || flo * fhi > 0) return null;
    for (var b = 0; b < 300; b++) {
      var mid = (lo + hi) / 2, fm = TM.npv(mid, values);
      if (Math.abs(fm) < 1e-11 || (hi - lo) < 1e-12) return mid;
      if (flo * fm < 0) { hi = mid; fhi = fm; } else { lo = mid; flo = fm; }
    }
    return (lo + hi) / 2;
  };
  /** Taux annuel équivalent d'un taux périodique (m périodes par an). */
  TM.annualize = function (periodRate, m) { return Math.pow(1 + periodRate, m) - 1; };
  /** Taux périodique équivalent d'un taux annuel. */
  TM.deannualize = function (annualRate, m) { return Math.pow(1 + annualRate, 1 / m) - 1; };
  /** Mensualité d'un prêt amortissable. rateAnnual en fraction, n en mois. */
  TM.mensualite = function (capital, rateAnnual, nMois) {
    if (!isFinite(capital) || !isFinite(nMois) || nMois <= 0) return null;
    var i = rateAnnual / 12;                       // convention crédit immobilier fr : taux proportionnel
    if (Math.abs(i) < 1e-12) return capital / nMois;
    return capital * i / (1 - Math.pow(1 + i, -nMois));
  };
  /* ---------------------------------------------------------------------
   * 4. DOM / CYCLE DE VIE DES EMBEDS
   * ------------------------------------------------------------------- */
  /**
   * Initialise chaque instance d'un embed, une seule fois.
   * Indispensable en Collection List : Webflow répète le bloc Embed, donc le
   * <script> s'exécute N fois sur N wrappers. On marque chaque wrapper traité
   * plutôt que de supposer une instance unique.
   *
   *   TM.init('tri-scpi', function (root) { ... });
   */
  TM.init = function (name, fn) {
    var run = function () {
      var nodes = document.querySelectorAll('[data-tm="' + name + '"]:not([data-tm-ready])');
      for (var i = 0; i < nodes.length; i++) {
        nodes[i].setAttribute('data-tm-ready', '1');
        try { fn(nodes[i]); } catch (e) {
          if (root.console && console.error) console.error('[TM:' + name + ']', e);
        }
      }
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', run);
    } else { run(); }
  };
  var _uid = 0;
  /**
   * Rend uniques les couples id / for / aria-*="…" à l'intérieur d'un wrapper.
   * Un embed dupliqué (Collection List, ou simplement deux fois sur la page)
   * produirait sinon des id identiques : les <label for> pointeraient tous
   * vers la première instance et les clics agiraient sur le mauvais champ.
   * À appeler en première ligne de chaque init d'embed contenant des id.
   */
  TM.uniquifyIds = function (root) {
    var suffix = '-' + (++_uid);
    var map = {};
    TM.qa(root, '[id]').forEach(function (n) {
      var old = n.id; map[old] = old + suffix; n.id = old + suffix;
    });
    ['for', 'aria-labelledby', 'aria-describedby', 'aria-controls'].forEach(function (attr) {
      TM.qa(root, '[' + attr + ']').forEach(function (n) {
        var next = n.getAttribute(attr).split(/\s+/).map(function (v) {
          return map[v] || v;
        }).join(' ');
        n.setAttribute(attr, next);
      });
    });
  };
  /** Raccourcis scopés au wrapper — jamais de document.getElementById dans un embed
   *  (les id sont dupliqués en Collection List). */
  TM.q = function (root, sel) { return root.querySelector(sel); };
  TM.qa = function (root, sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); };
  /** Cherche un id dans le périmètre du wrapper, jamais dans tout le document. */
  TM.byId = function (root, id) {
    if (!id) return null;
    var esc = (typeof CSS !== 'undefined' && CSS.escape) ? CSS.escape(id) : id.replace(/([^\w-])/g, '\\$1');
    return root.querySelector('#' + esc);
  };
  /** Échappe une chaîne avant injection HTML. Toute donnée CMS/API passe par là. */
  TM.esc = function (s) {
    return String(s === null || s === undefined ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };
  TM.debounce = function (fn, wait) {
    var t; return function () {
      var ctx = this, args = arguments;
      clearTimeout(t); t = setTimeout(function () { fn.apply(ctx, args); }, wait || 150);
    };
  };
  /* ---------------------------------------------------------------------
   * 5. RÉSEAU
   * ------------------------------------------------------------------- */
  /**
   * GET JSON avec timeout, cache de session optionnel et erreurs typées.
   * opts : { timeout: ms (8000), cacheKey: string, cacheTtl: ms }
   * Aucun secret ne transite ici : un embed est du code public.
   */
  TM.getJSON = function (url, opts) {
    opts = opts || {};
    var ttl = opts.cacheTtl || 0, key = opts.cacheKey;
    if (key && ttl) {
      try {
        var hit = JSON.parse(sessionStorage.getItem('tm:' + key) || 'null');
        if (hit && (Date.now() - hit.t) < ttl) return Promise.resolve(hit.d);
      } catch (e) { /* sessionStorage indisponible : on ignore le cache */ }
    }
    var ctrl = (typeof AbortController !== 'undefined') ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, opts.timeout || 8000);
    return fetch(url, {
      method: 'GET',
      signal: ctrl ? ctrl.signal : undefined,
      // Pas de header custom : cela déclencherait un preflight CORS que
      // les Web Apps Apps Script ne gèrent pas.
      credentials: 'omit'
    }).then(function (r) {
      clearTimeout(timer);
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }).then(function (d) {
      if (key && ttl) {
        try { sessionStorage.setItem('tm:' + key, JSON.stringify({ t: Date.now(), d: d })); } catch (e) {}
      }
      return d;
    }).catch(function (e) {
      clearTimeout(timer);
      throw e;
    });
  };
  root.TM = TM;
  /* Export CommonJS pour les tests Node (scripts/test-finance.js). */
  if (typeof module !== 'undefined' && module.exports) module.exports = TM;
})(typeof window !== 'undefined' ? window : globalThis);
(function () {
  'use strict';
  /* CONFIG — paramètres légaux, à revoir à chaque loi de finances.
     Barème art. 977 CGI, seuil art. 964, décote art. 977, abattement RP
     art. 973, plafonnement des dettes art. 974 III, dons art. 978. */
  var CONFIG = {
    seuil: 1300000,
    bareme: [            // [plancher de tranche, taux en fraction]
      [0, 0],
      [800000, 0.005],
      [1300000, 0.007],
      [2570000, 0.01],
      [5000000, 0.0125],
      [10000000, 0.015]
    ],
    decote: { plafond: 1400000, constante: 17500, taux: 0.0125 },
    abattementRP: 0.30,
    plafDettes: { patrimoine: 5000000, ratio: 0.60, admisExcedent: 0.50 },
    dons: { taux: 0.75, plafond: 50000 },
    max: 1e10
  };
  function impotBareme(base) {
    var t = CONFIG.bareme, impot = 0;
    for (var k = 0; k < t.length; k++) {
      var bas = t[k][0], haut = k + 1 < t.length ? t[k + 1][0] : Infinity;
      if (base > bas) impot += (Math.min(base, haut) - bas) * t[k][1];
    }
    return impot;
  }
  /* Calcul pur : entrées validées -> résultat. */
  function calculer(i, retrait) {
    var abat = i.rp * CONFIG.abattementRP;
    var actifs = Math.max(i.rp - abat + i.direct + i.scpi - retrait, 0);
    // Art. 974 III : au-delà de 5 M€ d'actifs taxables, la fraction des
    // dettes excédant 60 % de leur valeur n'est admise qu'à 50 %.
    // Valeur retenue : actifs après abattement RP (à confirmer).
    var dettesAdm = i.dettes, plafonne = false, p = CONFIG.plafDettes;
    if (actifs > p.patrimoine && i.dettes > actifs * p.ratio) {
      dettesAdm = actifs * p.ratio + (i.dettes - actifs * p.ratio) * p.admisExcedent;
      plafonne = true;
    }
    var base = Math.max(actifs - dettesAdm, 0);
    var redevable = base > CONFIG.seuil;
    var bareme = redevable ? impotBareme(base) : 0;
    var decote = (redevable && base < CONFIG.decote.plafond)
      ? Math.min(CONFIG.decote.constante - CONFIG.decote.taux * base, bareme) : 0;
    var apresDecote = bareme - decote;
    var redDons = Math.min(i.dons * CONFIG.dons.taux, CONFIG.dons.plafond, apresDecote);
    return {
      brut: i.rp + i.direct + i.scpi - retrait, abat: abat, dettesAdm: dettesAdm,
      plafonne: plafonne, base: base, redevable: redevable,
      bareme: bareme, decote: decote, redDons: redDons,
      ifi: Math.max(apresDecote - redDons, 0)
    };
  }
  function valider(v) {
    var e = {};
    ['rp', 'direct', 'scpi', 'dettes', 'dons', 'np'].forEach(function (k) {
      if (v[k] === null || v[k] < 0) e[k] = 'Montant positif ou nul requis.';
      else if (v[k] > CONFIG.max) e[k] = 'Valeur hors plage.';
    });
    if (!e.np && !e.rp && !e.direct && !e.scpi && v.np > v.rp + v.direct + v.scpi) {
      e.np = 'Le montant dépasse les actifs déclarés.';
    }
    return e;
  }
  // Expose le calcul pour les tests hors navigateur.
  if (typeof window !== 'undefined') window.TM_IFI = { calculer: calculer, impotBareme: impotBareme, CONFIG: CONFIG };
  TM.init('ifi', function (root) {
    TM.uniquifyIds(root);
    var out = {};
    TM.qa(root, '[data-o]').forEach(function (n) { out[n.getAttribute('data-o')] = n; });
    /* Lead Capture Universel : ids lisibles, repris comme libellés dans
       l'email de résultats (préfixe res- retiré, tirets -> espaces).
       Posés une seule fois sur la page, après uniquifyIds. */
    var LC_IDS = { ifi: 'res-IFI-estimé', base: 'res-Patrimoine-net-taxable',
      bareme: 'res-IFI-selon-le-barème', decote: 'res-Décote',
      redDons: 'res-Réduction-pour-dons', ifiNp: 'res-IFI-avec-nue-propriété' };
    Object.keys(LC_IDS).forEach(function (k) {
      if (out[k] && !document.getElementById(LC_IDS[k])) out[k].id = LC_IDS[k];
    });
    var hook = TM.q(root, '.tm-lc'), revele = false;
    function reveler() { if (!revele && hook) { revele = true; hook.style.display = 'block'; } }
    function lire() {
      var v = {};
      TM.qa(root, '[data-f]').forEach(function (n) {
        var raw = n.value.trim();
        v[n.getAttribute('data-f')] = raw === '' ? 0 : TM.parseNum(raw);
      });
      return v;
    }
    function afficherErreurs(errs) {
      TM.qa(root, '[data-err]').forEach(function (n) {
        var k = n.getAttribute('data-err'), msg = errs[k];
        n.textContent = msg || '';
        if (msg) n.setAttribute('data-show', '1'); else n.removeAttribute('data-show');
        var champ = TM.q(root, '[data-f="' + k + '"]');
        if (champ) champ.setAttribute('aria-invalid', msg ? 'true' : 'false');
      });
    }
    function vider() {
      Object.keys(out).forEach(function (k) { out[k].textContent = /Note|ecart/.test(k) ? '' : '—'; });
      out.ifiNp.className = 'tm-v tm-v--s';
    }
    function rendre() {
      var v = lire(), errs = valider(v);
      afficherErreurs(errs);
      if (Object.keys(errs).length) return vider();
      var r = calculer(v, 0);
      out.ifi.textContent = TM.eur(r.ifi, 0);
      out.ifiNote.textContent = r.redevable ? '' :
        'Non redevable : le patrimoine net taxable ne dépasse pas ' + TM.eur(CONFIG.seuil, 0) +
        (r.base > 0 ? ' (écart de ' + TM.eur(CONFIG.seuil - r.base, 0) + ').' : '.');
      out.base.textContent = TM.eur(r.base, 0);
      out.brut.textContent = TM.eur(r.brut, 0);
      out.abat.textContent = (r.abat > 0 ? '−' : '') + TM.eur(r.abat, 0);
      out.dettesAdm.textContent = (r.dettesAdm > 0 ? '−' : '') + TM.eur(r.dettesAdm, 0);
      out.bareme.textContent = TM.eur(r.bareme, 0);
      out.decote.textContent = (r.decote > 0 ? '−' : '') + TM.eur(r.decote, 0);
      out.redDons.textContent = (r.redDons > 0 ? '−' : '') + TM.eur(r.redDons, 0);
      out.plafNote.textContent = r.plafonne
        ? 'Dettes plafonnées : au-delà de 5 M€ d\'actifs, la fraction excédant 60 % de leur valeur n\'est retenue qu\'à moitié.' : '';
      if (v.np > 0) {
        var s = calculer(v, v.np), diff = r.ifi - s.ifi;
        out.ifiNp.textContent = TM.eur(s.ifi, 0);
        out.ifiNp.className = 'tm-v tm-v--s' + (diff > 0 ? ' tm-v--p' : '');
        out.ecart.textContent = diff > 0 ? 'Soit ' + TM.eur(diff, 0) + ' de moins par an, à patrimoine et barème constants.'
                                         : 'Aucun effet sur l\'IFI avec ces valeurs.';
      } else {
        out.ifiNp.textContent = '—';
        out.ifiNp.className = 'tm-v tm-v--s';
        out.ecart.textContent = 'Saisir un montant pour comparer.';
      }
    }
    var maj = TM.debounce(rendre, 120);
    TM.qa(root, '[data-f]').forEach(function (n) {
      n.addEventListener('input', maj);
      n.addEventListener('input', reveler);
      n.addEventListener('change', rendre);
    });
    rendre();
  });
})();
</script></div>
</div>

<div class="guide">

<div><div id="s2m-ifi-2025"><style> #s2m-ifi-2025, #s2m-ifi-2025 * { box-sizing: border-box; } #s2m-ifi-2025{ --brand:#104A65; --text:#111827; --muted:#4B5563; --bg:#ffffff; --subtle:#F8FAFC; --border:#E5E7EB; --ok:#065f46; --warn:#92400e; --accent:#0ea5e9; --r1:.5rem; --r2:.875rem; --r3:1.25rem; --r4:2rem; --radius:12px; --radius-sm:8px; --shadow:0 1px 3px rgba(0,0,0,.08); font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif; color:var(--text); background:var(--bg); line-height:1.6; max-width:980px; margin:0 auto; padding:var(--r4) var(--r3); } #s2m-ifi-2025 h2,#s2m-ifi-2025 h2,#s2m-ifi-2025 h3{ margin:0 0 0.5rem 0; line-height:1.25; font-weight:700; } #s2m-ifi-2025 h2{ font-size:clamp(22px,3.6vw,34px); color:var(--brand); margin-bottom:var(--r3); } #s2m-ifi-2025 h2.s2m-main-h2{ font-size:clamp(22px,3.6vw,34px); color:var(--brand); margin-bottom:var(--r3); margin-top:0; } #s2m-ifi-2025 h2{ font-size:clamp(18px,2.6vw,24px); margin-top:var(--r4); color:var(--brand); } #s2m-ifi-2025 h3{ font-size:clamp(16px,2.2vw,20px); margin-top:var(--r3); } #s2m-ifi-2025 p{ margin:.75rem 0; font-size:16px; color:var(--text); } #s2m-ifi-2025 ul{ margin:.5rem 0 1rem; padding-left:1.1rem; } #s2m-ifi-2025 li{ margin:.35rem 0; } #s2m-ifi-2025 a{ color:var(--brand); text-decoration:underline; } #s2m-ifi-2025 .s2m-intro{ background:var(--subtle); border:1px solid var(--border); border-radius:var(--radius); padding:var(--r3); } #s2m-ifi-2025 .s2m-meta{ font-size:14px; color:var(--muted); } #s2m-ifi-2025 .s2m-toc{ background:var(--subtle); border:1px solid var(--border); border-radius:var(--radius); padding:var(--r3); margin:var(--r3) 0 var(--r4); } #s2m-ifi-2025 .s2m-toc ul{ list-style:none; padding:0; margin:0; } #s2m-ifi-2025 .s2m-toc li{ margin:.35rem 0; } #s2m-ifi-2025 .s2m-grid{ display:grid; grid-template-columns:1fr; gap:var(--r3); } #s2m-ifi-2025 .s2m-card{ border:1px solid var(--border); border-radius:var(--radius); padding:var(--r3); background:#fff; } #s2m-ifi-2025 .s2m-cta{ display:inline-block; padding:.65rem 1rem; border-radius:10px; border:1px solid var(--brand); color:#fff; background:var(--brand); text-decoration:none; font-size:14px; } #s2m-ifi-2025 .s2m-cta--ghost{ color:var(--brand); background:transparent; } #s2m-ifi-2025 .s2m-note{ font-size:14px; color:var(--muted); } #s2m-ifi-2025 table{ width:100%; border-collapse:collapse; font-size:15px; margin-top:.5rem; } #s2m-ifi-2025 th,#s2m-ifi-2025 td{ border:1px solid var(--border); padding:.6rem .5rem; text-align:left; } #s2m-ifi-2025 th{ background:var(--subtle); } #s2m-ifi-2025 .s2m-json{ margin-top:.75rem; overflow:auto; } #s2m-ifi-2025 .s2m-seo{ border:1px dashed var(--border); border-radius:var(--radius); padding:var(--r3); margin:0 0 var(--r3) 0; background:#fff; } #s2m-ifi-2025 .s2m-steps{ margin:var(--r4) 0; } #s2m-ifi-2025 .s2m-result{ border-radius:var(--radius); padding:1.25rem; } #s2m-ifi-2025 .s2m-steps-grid{ display:grid; gap:.9rem; grid-template-columns:1fr; } #s2m-ifi-2025 .s2m-step{ border-radius:10px; padding:.9rem 1rem; border:1px solid transparent; } #s2m-ifi-2025 .s2m-k{ display:block; font-weight:700; } #s2m-ifi-2025 .s2m-v{ font-size:.95rem; margin:.25rem 0 0; opacity:.95; } #s2m-ifi-2025 .s2m-steps a{ font-weight:600; text-decoration:underline; text-underline-offset:2px; } #s2m-ifi-2025 .s2m-steps a:focus-visible{ outline:3px solid #60A5FA; outline-offset:3px; border-radius:6px; } #s2m-ifi-2025 .s2m-dark{ background:linear-gradient(135deg,#0B2230 0%, #123446 100%); color:#F8FAFC; } #s2m-ifi-2025 .s2m-dark h2{ color:#fff; } #s2m-ifi-2025 .s2m-dark .s2m-step{ background:rgba(255,255,255,.06); border-color:rgba(255,255,255,.12); } #s2m-ifi-2025 .s2m-dark .s2m-k{ color:#fff; } #s2m-ifi-2025 .s2m-dark .s2m-v{ color:#D1D5DB; } #s2m-ifi-2025 .s2m-dark a{ color:#BFE3F2; } #s2m-ifi-2025 .s2m-dark .s2m-hint{ color:#D1D5DB; font-size:.9rem; margin-top:.75rem; } #s2m-ifi-2025 .s2m-light{ background:#F8FAFC; color:var(--text); border:1px solid var(--border); } #s2m-ifi-2025 .s2m-light h2{ color:var(--brand); } #s2m-ifi-2025 .s2m-light .s2m-step{ background:#fff; border-color:var(--border); } #s2m-ifi-2025 .s2m-light a{ color:var(--brand); } #s2m-ifi-2025 .s2m-light .s2m-hint{ color:var(--muted); font-size:.9rem; margin-top:.75rem; } @media (min-width:720px){ #s2m-ifi-2025 .s2m-steps-grid{ grid-template-columns:repeat(3,1fr); } #s2m-ifi-2025 .s2m-grid{ grid-template-columns:repeat(2,1fr); } } </style><header class="s2m-intro"><h2 class="s2m-main-h2">Simulateur IFI 2025 : calculez et comparez l’impact du démembrement</h2><p class="s2m-meta">Barème IFI 2025 • Articles 968 et 669 CGI • Résultats indicatifs</p><p>Estimez votre IFI et mesurez l’effet d’un démembrement de propriété. Saisissez vos actifs, dettes, âge et pourcentage démembré pour comparer « avant / après ».</p></header><div class="s2m-result s2m-dark"><div class="s2m-steps" aria-label="Résultats instantanés"><h2>Résultats instantanés en 3 étapes</h2><div class="s2m-steps-grid" role="list"><div class="s2m-step" role="listitem"><span class="s2m-k">1. Patrimoine net taxable</span><p class="s2m-v">Calcul selon barème 2025. <a href="/simulateurs/ifi-demembrement">Simuler maintenant</a></p></div><div class="s2m-step" role="listitem"><span class="s2m-k">2. IFI estimé sans optimisation</span><p class="s2m-v">Base : actifs déclarés. <a href="/simulateurs/ifi-demembrement">Voir l’estimation</a></p></div><div class="s2m-step" role="listitem"><span class="s2m-k">3. Économie potentielle</span><p class="s2m-v">Effet démembrement. <a href="/simulateurs/ifi-demembrement">Calculer l’impact</a></p></div></div><p style="text-align:center; margin-top:1.25rem;"><a class="s2m-cta s2m-cta--ghost" href="#s2m-bareme-669">📊 Voir le barème complet art. 669 CGI</a> <a class="s2m-cta s2m-cta--ghost" href="#s2m-decote" style="margin-left:.5rem;">💰 Comprendre la décote IFI</a></p></div></div><div class="s2m-toc" role="navigation" aria-label="Sommaire"><h2>Sommaire</h2><ul><li><a href="#s2m-calculateur">Calculateur IFI (aperçu des champs)</a></li><li><a href="#s2m-champs">Données à renseigner</a></li><li><a href="#s2m-eligibilite">Qui doit payer l’IFI en 2025 ?</a></li><li><a href="#s2m-demembrement-ifi">Comment le démembrement réduit l’IFI</a></li><li><a href="#s2m-bareme-669">Barème usufruit article 669 CGI</a></li><li><a href="#s2m-art968">Article 968 CGI et IFI</a></li><li><a href="#s2m-vigilance">Points de vigilance 2025</a></li><li><a href="#s2m-erreurs-ifi">Erreurs fréquentes dans le calcul IFI</a></li><li><a href="#s2m-dettes">Dettes déductibles de l’assiette IFI</a></li><li><a href="#s2m-bareme">Barème IFI 2025</a></li><li><a href="#s2m-decote">Décote IFI entre 1,3 M€ et 1,4 M€</a></li><li><a href="#s2m-comparaison">Deux situations comparées</a></li><li><a href="#s2m-economie">Estimation de l’économie d’IFI</a></li><li><a href="#s2m-limites">Limites et avertissements</a></li><li><a href="#s2m-cta">Accéder aux simulateurs</a></li></ul></div><div class="s2m-result s2m-light" style="border-left:4px solid #104A65; margin:var(--r3) 0;"><h2 id="s2m-vigilance" style="font-size:18px; margin-bottom:.5rem;">⚠️ Points de vigilance 2025</h2><ul style="margin:0; font-size:15px;"><li>La décote IFI s’applique automatiquement entre 1,3 M€ et 1,4 M€ (jusqu’à 625 € d’économie).</li><li>Le barème usufruit dépend de l’âge exact de l’usufruitier au 1er janvier.</li><li>En cas de démembrement, l’usufruitier déclare la pleine propriété ; le nu-propriétaire ne déclare rien, sauf exceptions de l’article 968.</li><li>Date de référence : 1er janvier 2025 pour tous les actifs et dettes.</li></ul></div><h2 id="s2m-eligibilite">Êtes-vous concerné par l’IFI en 2025 ?</h2><ul><li>Seuil d’imposition : 1 300 000 € de patrimoine immobilier net taxable.</li><li>Résidence fiscale en France, ou biens immobiliers situés en France.</li><li>Biens pris en compte : résidence principale et secondaire, immobilier locatif, SCPI, SCI, OPCI.</li><li>Abattement résidence principale : 30 % appliqué sur la valeur de la RP.</li></ul><h3>Exemples détaillés 2025</h3><table aria-label="Exemples IFI 2025 avec calculs"><thead><tr><th>Situation</th><th>Patrimoine brut</th><th>Dettes</th><th>Net taxable</th><th>Calcul IFI</th><th>IFI net</th></tr></thead><tbody><tr><td>Couple, RP uniquement</td><td>1 500 000 €</td><td>200 000 €</td><td>1 050 000 €<br><span class="s2m-note">(après –30 % RP)</span></td><td>Non imposable</td><td><strong>0 €</strong></td></tr><tr><td>Célibataire, RP + SCPI</td><td>2 000 000 €</td><td>500 000 €</td><td>1 350 000 €</td><td>2 850 € brut<br>– 625 € décote</td><td><strong>2 225 €</strong></td></tr><tr><td>Couple, portefeuille diversifié</td><td>3 500 000 €</td><td>800 000 €</td><td>2 700 000 €</td><td>(500k×0,5 %) + (1 270k×0,7 %) + (130k×1 %)</td><td><strong>12 690 €</strong></td></tr></tbody></table><p class="s2m-note">Ces exemples sont indicatifs. Utilisez le simulateur pour un calcul personnalisé incluant tous vos actifs et dettes.</p><h2 id="s2m-demembrement-ifi">Réduire votre IFI avec le démembrement</h2><h3>Principe</h3><ul><li><strong>Usufruit</strong> : droit d’usage et de percevoir les revenus.</li><li><strong>Nue-propriété</strong> : propriété sans jouissance immédiate.</li><li><strong>IFI</strong> : l’usufruitier déclare le bien pour sa valeur en pleine propriété ; le nu-propriétaire ne déclare rien, sauf exceptions limitatives (<span class="s2m-note">article 968 CGI</span>).</li></ul><h3>Exemple chiffré</h3><ul><li><strong>Situation initiale</strong> : patrimoine net taxable de 2 000 000 €, dont 500 000 € de parts de SCPI en pleine propriété → IFI de 7 400 €.</li><li><strong>Donation de la nue-propriété avec réserve d’usufruit</strong> : l’usufruitier déclare toujours 500 000 € → IFI inchangé (7 400 €).</li><li><strong>Parts détenues en nue-propriété</strong> (règle générale de l’article 968) : les 500 000 € sortent de l’assiette → base de 1 500 000 € → IFI de 3 900 €, soit 3 500 € de moins par an.</li><li><strong>Cas d’exception de l’article 968</strong>, usufruitier âgé de 55 ans (barème art. 669 : 50 % / 50 %) : le nu-propriétaire déclare 250 000 € → base de 1 750 000 € → IFI de 5 650 €, soit 1 750 € de moins par an.</li></ul><p class="s2m-note">Cet exemple suppose un patrimoine total qui reste dans la même tranche d’imposition. Le calcul réel dépend de l’ensemble de votre patrimoine immobilier.</p><h3>Stratégies possibles</h3><ol><li>Acquisition de parts de SCPI en nue-propriété (démembrement temporaire).</li><li>Viager occupé.</li><li>Donation avec réserve d’usufruit : outil de transmission, sans effet sur l’IFI du donateur, qui reste imposé sur la pleine propriété.</li></ol><p><a class="s2m-cta s2m-cta--ghost" href="/simulateurs/ifi-demembrement">Simuler le démembrement SCPI</a></p><h2 id="s2m-bareme-669">Barème officiel usufruit/nue-propriété (article 669 CGI)</h2><table aria-label="Barème usufruit article 669 CGI"><thead><tr><th>Âge de l’usufruitier</th><th>Valeur usufruit</th><th>Valeur nue-propriété</th></tr></thead><tbody><tr><td>Moins de 21 ans</td><td>90 %</td><td>10 %</td></tr><tr><td>De 21 à 30 ans</td><td>80 %</td><td>20 %</td></tr><tr><td>De 31 à 40 ans</td><td>70 %</td><td>30 %</td></tr><tr><td>De 41 à 50 ans</td><td>60 %</td><td>40 %</td></tr><tr><td>De 51 à 60 ans</td><td><strong>50 %</strong></td><td><strong>50 %</strong></td></tr><tr><td>De 61 à 70 ans</td><td>40 %</td><td>60 %</td></tr><tr><td>De 71 à 80 ans</td><td>30 %</td><td>70 %</td></tr><tr><td>De 81 à 90 ans</td><td>20 %</td><td>80 %</td></tr><tr><td>Plus de 91 ans</td><td>10 %</td><td>90 %</td></tr></tbody></table><p class="s2m-note"><strong>Usufruit temporaire</strong> : pour une durée fixe, la valeur est de 23 % par période de 10 ans, sans fractionnement (article 669-II CGI).</p><h2 id="s2m-art968">Article 968 CGI : qui paie l’IFI en cas de démembrement ?</h2><h3>Principe</h3><p>En cas de démembrement de propriété, l’usufruitier déclare le bien pour sa valeur en pleine propriété. Le nu-propriétaire ne déclare rien. Par exception, la valeur est répartie entre usufruitier et nu-propriétaire selon le barème de l’article 669 du CGI dans trois cas limitativement énumérés : usufruit légal du conjoint survivant, vente d’un bien avec réserve d’usufruit à un acquéreur qui n’est pas présomptif héritier, don ou legs à l’État ou à un organisme d’intérêt général avec réserve d’usufruit.</p><div class="s2m-grid" style="margin-top:1rem;"><div class="s2m-card"><h3>Usufruitier</h3><ul><li>Déclare le bien pour sa valeur en pleine propriété (valeur de l’usufruit seule dans les cas d’exception).</li><li>Perçoit les revenus : loyers, dividendes de SCPI.</li><li>Peut déduire les dettes lui incombant sur ces biens (article 974 CGI).</li></ul></div><div class="s2m-card"><h3>Nu-propriétaire</h3><ul><li>Aucune déclaration IFI sur le bien démembré, sauf dans les cas d’exception.</li><li>Ne perçoit aucun revenu du bien pendant l’usufruit.</li><li>Récupère la pleine propriété au décès de l’usufruitier ou à l’expiration de l’usufruit temporaire.</li></ul></div></div><h3 style="margin-top:1.5rem;">Cas complexes</h3><p>En présence d’usufruit successif, de quasi-usufruit ou de montages spécifiques, l’analyse de l’IFI nécessite un avis personnalisé. Le simulateur ne couvre pas ces situations particulières.</p><h2 id="s2m-erreurs-ifi">Les principales erreurs de calcul IFI</h2><h3>1) Oublier l’abattement de 30 % sur la résidence principale</h3><p>Surévaluer une RP à 1 000 000 € sans abattement augmente artificiellement le patrimoine net taxable et donc l’IFI.</p><h3>2) Ne pas déduire les dettes immobilières</h3><p>Prêts immobiliers, travaux et impôts fonciers dus peuvent réduire l’assiette IFI s’ils sont correctement renseignés.</p><h3>3) Mal valoriser les parts de SCPI</h3><p>Il faut déclarer la valeur de retrait au 1er janvier, telle que publiée par la société de gestion, et non le prix de souscription.</p><h3>4) Ignorer les participations en SCI</h3><p>Vous devez déclarer votre quote-part de la valeur des immeubles détenus par les SCI ou OPCI.</p><h3>5) Oublier l’impact d’un héritage ou d’une donation</h3><p>Une transmission importante peut faire basculer au-dessus du seuil IFI. Le démembrement anticipé est un levier possible.</p><p class="s2m-note">Le simulateur aide à intégrer ces points pour limiter les erreurs les plus fréquentes.</p><h2 id="s2m-calculateur">Calculateur IFI : structure des champs</h2><div class="s2m-grid"><div><h3>Actifs immobiliers à déclarer</h3><ul><li>Résidence principale (avec abattement).</li><li>Résidences secondaires.</li><li>Immobilier locatif détenu en direct.</li><li>Parts de SCPI, SCI, OPCI.</li></ul></div><div><h3>Paramètres d’optimisation</h3><ul><li>Age de l’usufruitier pour le démembrement.</li><li>Pourcentage démembré en nue-propriété.</li><li>Répartition des biens entre usufruitier et nu-propriétaire.</li></ul></div></div><p class="s2m-note">L’outil applique automatiquement le barème IFI 2025, la règle de l’article 968 du CGI et, pour les seuls cas d’exception, le barème usufruit/nue-propriété de l’article 669.</p><h2 id="s2m-champs">Données à renseigner dans le simulateur</h2><p>Renseignez pour chaque bien sa valeur au 1er janvier 2025, la nature de détention (pleine propriété, usufruit, nue-propriété), ainsi que les dettes associées. Indiquez également votre âge et, le cas échéant, celui de l’usufruitier principal.</p><h2 id="s2m-dettes">Dettes déductibles de l’assiette IFI</h2><div class="s2m-grid"><div><h3>Dettes déductibles (article 974 CGI)</h3><ul><li>Prêts immobiliers : capital restant dû au 1er janvier.</li><li>Travaux d’amélioration, construction ou agrandissement facturés avant le 1er janvier.</li><li>Impôts fonciers dus au 1er janvier, même non encore payés.</li><li>Dépôts de garantie reçus des locataires.</li><li>Charges de copropriété appelées et non encore payées au 1er janvier.</li></ul></div><div><h3>Dettes non déductibles</h3><ul><li>Crédits à la consommation.</li><li>Dettes professionnelles sans lien avec un immeuble taxable.</li><li>Prêts familiaux sans preuve d’effectivité des flux.</li><li>Dettes contractées pour des biens exonérés d’IFI.</li></ul></div></div><p class="s2m-note">Toutes les valeurs, actives et passives, sont appréciées au 1er janvier 2025 pour la déclaration IFI 2025.</p><h2 id="s2m-bareme">Barème IFI 2025 officiel</h2><table aria-label="Barème IFI 2025 complet"><thead><tr><th>Tranche de patrimoine net taxable</th><th>Taux d’imposition</th></tr></thead><tbody><tr><td>De 0 à 800 000 €</td><td>0 %</td></tr><tr><td>De 800 001 € à 1 300 000 €</td><td>0,5 %</td></tr><tr><td>De 1 300 001 € à 2 570 000 €</td><td>0,7 %</td></tr><tr><td>De 2 570 001 € à 5 000 000 €</td><td>1 %</td></tr><tr><td>De 5 000 001 € à 10 000 000 €</td><td>1,25 %</td></tr><tr><td>Au-delà de 10 000 000 €</td><td>1,5 %</td></tr></tbody></table><p class="s2m-note">Le seuil d’assujettissement est fixé à 1 300 000 € de patrimoine net taxable, mais pour les redevables, le calcul s’applique dès 800 000 €.</p><h2 id="s2m-decote">Décote IFI 2025 pour patrimoines entre 1,3 M€ et 1,4 M€</h2><p>Si votre patrimoine net taxable se situe entre 1 300 000 € et 1 400 000 €, une décote réduit automatiquement l’IFI brut calculé.</p><h3>Formule de calcul</h3><p><strong>Décote = 17 500 € – (1,25 % × patrimoine net taxable)</strong></p><h3>Exemple chiffré</h3><div class="s2m-grid"><div class="s2m-card"><span class="s2m-k">Patrimoine net taxable</span><p class="s2m-v">1 350 000 €</p></div><div class="s2m-card"><span class="s2m-k">IFI brut</span><p class="s2m-v">(500 000 € × 0,5 %) + (50 000 € × 0,7 %) = 2 850 €</p></div><div class="s2m-card"><span class="s2m-k">Décote appliquée</span><p class="s2m-v">17 500 € – (1,25 % × 1 350 000 €) = 625 €</p></div></div><p style="margin-top:1rem;"><strong>IFI net à payer : 2 850 € – 625 € = 2 225 €</strong></p><p class="s2m-note">La décote est calculée et appliquée automatiquement par l’administration fiscale pour les patrimoines dans cette tranche.</p><h2 id="s2m-comparaison">Deux situations comparées</h2><p>Le simulateur présente côte à côte la situation A (sans démembrement) et la situation B (avec démembrement). Vous visualisez la différence de base taxable, d’IFI brut, de décote éventuelle et d’IFI net.</p><h2 id="s2m-economie">Estimation de l’économie d’IFI</h2><p>L’outil chiffre l’économie potentielle d’IFI sur une année, puis la projette sur 10 ans, à paramètres constants. Cela permet de mettre en regard le coût d’un démembrement avec le gain fiscal estimé.</p><h2 id="s2m-limites">Limites et avertissements</h2><p>Les résultats fournis par ce simulateur sont indicatifs et basés sur les règles connues pour 2025 (barème IFI, articles 669, 968 et 974 du CGI). Ils ne tiennent pas compte de toutes les situations particulières et ne constituent pas un conseil fiscal, juridique ou patrimonial.</p><p>Les données saisies restent sous votre responsabilité. En cas de doute, il est recommandé de confronter les résultats à une déclaration officielle ou à un avis de professionnel.</p><h2 id="s2m-cta">Accéder aux simulateurs 2nd Market</h2><p><a class="s2m-cta" href="/simulateurs/ifi-demembrement">Ouvrir le simulateur IFI &amp; démembrement</a> <a class="s2m-cta s2m-cta--ghost" href="/simulateurs" style="margin-left:.75rem;">Voir tous les simulateurs</a></p><p class="s2m-note">2nd Market n'est ni conseiller en gestion de patrimoine ni société de gestion. Aucune recommandation personnalisée. Les parts de SCPI présentent un risque de perte en capital et de liquidité.</p></div></div>

<div><style>.ifq{--b:#104A65;--c:#5BB5D5;--ink:#1A1A1A;--mut:#5B6B78;--ln:#E2E8F0;font-family:inherit;color:var(--ink);line-height:1.6;font-size:1rem;margin:2rem 0 0}.ifq h2{font-size:1.28rem;line-height:1.3;font-weight:700;color:var(--b);margin:0 0 0.8rem;letter-spacing:-.01em}.ifq .list{border-top:1px solid var(--ln)}.ifq details{border-bottom:1px solid var(--ln)}.ifq summary{cursor:pointer;list-style:none;padding:1rem 2.2rem 1rem 0;font-weight:600;color:var(--b);position:relative;font-size:.98rem;line-height:1.4}.ifq summary::-webkit-details-marker{display:none}.ifq summary::after{content:"+";position:absolute;right:.3rem;top:.9rem;font-size:1.4rem;font-weight:400;color:var(--c);line-height:1}.ifq details[open] summary::after{content:"–"}.ifq .a{padding:0 0 1.1rem;color:#334155;font-size:.95rem}.ifq .a p{margin:0 0 0.7rem}.ifq .a p:last-child{margin:0}.ifq .src{margin-top:1.1rem;font-size:.8rem;color:var(--mut);line-height:1.55}@media (min-width:640px){.ifq{font-size:1.02rem}.ifq h2{font-size:1.5rem;margin:0 0 0.9rem}.ifq summary{font-size:1rem}.ifq .a{font-size:.97rem}}</style><div class="ifq"><h2>Questions fréquentes sur l'IFI et le démembrement</h2><div class="list"><details><summary>Qui déclare l'IFI en cas de démembrement, l'usufruitier ou le nu-propriétaire ?</summary><div class="a"><p>En principe, l'usufruitier. L'article 968 du Code général des impôts prévoit que les actifs grevés d'un usufruit sont compris dans son patrimoine pour leur valeur en pleine propriété. Le nu-propriétaire ne déclare rien à ce titre. Trois exceptions limitativement énumérées par ce même article permettent une imposition répartie entre les deux, chacun déclarant alors la valeur de son droit selon le barème de l'article 669 du Code général des impôts. L'application de ces règles à une situation donnée se valide avec un notaire ou un fiscaliste.</p></div></details><details><summary>Comment se calcule la valeur d'un usufruit pour l'IFI ?</summary><div class="a"><p>Lorsque l'imposition est répartie entre usufruitier et nu-propriétaire, la valeur de chaque droit résulte du barème de l'article 669 du Code général des impôts, qui dépend de l'âge de l'usufruitier au 1er janvier. Pour un usufruit constitué pour une durée fixe, l'article 669 II retient 23 % de la valeur en pleine propriété par période de dix ans, sans fractionnement.</p></div></details><details><summary>À partir de quel patrimoine l'IFI est-il dû, et quel est le barème ?</summary><div class="a"><p>L'IFI est dû lorsque le patrimoine immobilier net taxable au 1er janvier dépasse 1 300 000 €. Le barème s'applique ensuite par tranches, de 0,5 % à 1,5 %, à compter de 800 000 €. Un abattement de 30 % s'applique à la valeur de la résidence principale. Entre 1 300 000 € et 1 400 000 €, une décote réduit l'impôt selon la formule 17 500 € diminués de 1,25 % du patrimoine net taxable.</p></div></details><details><summary>Les parts de SCPI entrent-elles dans l'assiette de l'IFI ?</summary><div class="a"><p>Oui, à hauteur de la fraction de leur valeur représentative des actifs immobiliers imposables détenus par la société. Chaque société de gestion communique ce coefficient à ses associés. En cas de démembrement de parts de SCPI, la règle de l'article 968 du Code général des impôts s'applique de la même manière qu'à un immeuble détenu en direct.</p></div></details></div><p class="src">Sources : articles 669, 964 à 983 du Code général des impôts. 2nd Market est une plateforme de mise en relation entre investisseurs et ne fournit aucun conseil en investissement ni conseil fiscal. Le traitement applicable dépend de la situation de chacun et peut évoluer.</p></div></div>

<div><div id="s2m-guides-connexes"><style> /* === Scope: #s2m-guides-connexes (aucun style global) === */ #s2m-guides-connexes, #s2m-guides-connexes * { box-sizing: border-box; } #s2m-guides-connexes { --brand:#104A65; --text:#111827; --muted:#4b5563; --bg:#ffffff; --subtle:#f8fafc; --border:#e5e7eb; --r1:.5rem; --r2:.875rem; --r3:1.25rem; --r4:2rem; --radius:12px; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif; color:var(--text); background:var(--bg); line-height:1.6; max-width:980px; margin:var(--r4) auto 0; padding:0 var(--r3); } #s2m-guides-connexes .s2m-related { border:1px solid var(--border); background:var(--subtle); border-radius:var(--radius); padding:var(--r3); } #s2m-guides-connexes h2 { font-size:clamp(1.25rem,3vw,1.5rem); margin:0 0 0.75rem 0; line-height:1.25; } #s2m-guides-connexes ul { list-style:none; padding:0; margin:0; display:grid; gap:.5rem; } #s2m-guides-connexes a { display:block; text-decoration:none; color:var(--brand); border:1px solid var(--border); background:#fff; border-radius:10px; padding:.75rem .875rem; } #s2m-guides-connexes a:hover { background:var(--subtle); } /* Bloc "Aller plus loin" (optionnel) */ #s2m-guides-connexes .see-also-block { margin-top:var(--r3); border:1px dashed var(--border); border-radius:var(--radius); padding:var(--r3); background:#fff; } #s2m-guides-connexes .see-also-block h3 { margin:0 0 0.5rem 0; font-size:clamp(1.125rem,2.5vw,1.375rem); } @media (min-width:720px){ #s2m-guides-connexes ul { grid-template-columns:1fr 1fr; } } </style><div class="s2m-related" aria-label="Guides connexes"><h2>Guides connexes</h2><ul><li><a href="/guide-scpi/revente">Revente SCPI : guide pratique</a></li><li><a href="/simulateurs/frais-scpi">Simulateur des frais SCPI</a></li><li><a href="/simulateurs/fiscalite-scpi">Fiscalité SCPI : calculs</a></li><li><a href="/simulateurs/arbitrage-scpi">Arbitrer ses SCPI</a></li><li><a href="https://app.2ndmarket.fr/create" target="_blank" rel="noopener">Créer une annonce</a></li><li><a href="https://app.2ndmarket.fr/auth/register" target="_blank" rel="noopener">Créer un compte</a></li><li><a href="/contact">Contacter l’équipe</a></li></ul></div><div class="see-also-block" aria-label="Aller plus loin"><h3>Aller plus loin</h3><ul><li><a href="/guide-scpi/comparatif-scpi-viager-sci">Comparer SCPI, viager &amp; SCI</a></li><li><a href="/simulateurs/frais-scpi">Simulateur frais SCPI</a></li><li><a href="/landing-pages/faq-investissement-immobilier">Questions fréquentes (FAQ)</a></li><li><a href="/landing-pages/scpi-2nd-market">Témoignage vendeur SCPI</a></li><li><a href="/actualites-conseils">Actualités du marché SCPI</a></li></ul></div></div></div>

</div>
