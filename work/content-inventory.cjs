const fs=require('fs');
const clean=s=>s.replace(/<[^>]+>/g,' ').replace(/\{[^}]*\}/g,' ').replace(/\s+/g,' ').replace(/&nbsp;/g,' ').trim();
let doc='# Content migration and editorial review\n\n16 September 2026. Source HTML preserved verbatim under docs/source. Proposed content is a draft for owner/editorial review. All original biography and service sections remain represented.\n\n';
for(const [source,target] of [['about','ueber-mich'],['services','angebote'],['impressum','impressum']]){
 const old=fs.readFileSync(`docs/source/${source}.html`,'utf8');const now=fs.readFileSync(`app/${target}/page.tsx`,'utf8');
 const extract=s=>Array.from(s.matchAll(/<(h[1-6]|p)\b[^>]*>([\s\S]*?)<\/\1>/g)).map(m=>clean(m[2])).filter(Boolean);
 doc+=`## ${source}.html → /${target}\n\n| Original paragraphs and headings (source order) | Proposed paragraphs and headings (destination order) |\n|---|---|\n`;
 const a=extract(old),b=extract(now);for(let i=0;i<Math.max(a.length,b.length);i++)doc+=`| ${(a[i]||'—').replace(/\|/g,'\\|')} | ${(b[i]||'—').replace(/\|/g,'\\|')} |\n`;
 doc+='\nRows are sequential inventories, not claims that each row is a one-to-one rewrite; section mapping and substantive changes follow.\n\n';
}
doc+=`## Section mapping and substantive changes

- Meine Wurzeln und Familie → /ueber-mich: full first-person family and practice-opening paragraphs restored. René accent and punctuation normalised. No family names removed.
- Meine Reise / Vom Patienten zum Therapeuten → /ueber-mich: personal journey retained in a concise account. Full external press excerpts replaced with summaries and original links. New conversation-at-start passage is proposed practice copy and requires owner confirmation.
- Akupunktur statt Fußball → /ueber-mich: original press topic retained with Salzburg24 link, not wholesale republication.
- Introductory APM explanation → /angebote#methode: original no-needles and founder explanation retained. Claims that every body region receives exactly the required energy are reframed as the traditional model.
- Energie-Blockaden → /angebote#energie-blockaden: Qi, assessment, meridians, stimulation, individual treatment and whole-person topics remain, including the former hidden text. Assertions of resolving illness/blockages are attributed to the model.
- Wirbelsäule → /angebote#wirbelsaeule: sacroiliac joint, manual examination, gentle passive movements, no intentional cracking, reassessment and home exercises remain. Guaranteed elimination of restrictions is replaced by checking change in movement.
- Immunsystem → /angebote#immunsystem: internal doctor, self-regulation, whole-body connections and prophylaxis remain. “Sie hat keine unerwünschten Nebenwirkungen” is replaced by explicit non-guarantee wording. No claim of scientifically proven immune-system improvement is introduced.
- Preise → /angebote#preise: private service, 90 €, generally up to 60 minutes, possible supplementary insurance reimbursement remain. Insurer-specific eligibility must be checked.
- Hero: service name, subtitle, descriptive paragraph and quotation unchanged. Appointment link added; only one photographic Yin-Yang.
- Impressum: owner-confirmed provider facts kept. German TMG/RStV and obsolete ODR boilerplate removed. Austrian law link and media purpose added; exact professional-law/register/ADR duties remain an owner/legal verification item.

## Asset mapping

- Rene_Home.jpg: hero and biography; documentary photograph unchanged.
- DSC03472.jpg: practice/method sections.
- DSC03652_slider.jpg + DSC03538.jpg: energy-blockage treatment photos.
- DSC03737_slider.jpg: spine section.
- DSC03832_horizontal.jpg: immune-system section.
- APM_AUFHAUSER_Tafel_150x65cm.jpg: original educational panel.
- APM_AUFHAUSER_Logo1.png: original transparent wordmark. Header/favicon SVG viewBox displays the original mark area, preserving the source pixels; no redrawn identity. Apple icon lays the same asset onto a square background.
- LOGO.png: rejected for use because its corner pixel is opaque RGB 32/32/32. Alpha channel did not establish background transparency.
`;
fs.writeFileSync('docs/CONTENT-REVIEW.md',doc);
