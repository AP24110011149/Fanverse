const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/ANSHUL/OneDrive/Desktop/Model Web/FanVerse';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const dealPcLink = `\n                <a href="rainbow-deal.html" class="nav-link" id="nav-rainbow" style="background:-webkit-linear-gradient(left, #8b5cf6, #3b82f6, #10b981, #eab308, #ef4444); -webkit-background-clip:text; -webkit-text-fill-color:transparent; font-weight:900;">🌈 Deal</a>`;
const dealMobileLink = `\n        <a href="rainbow-deal.html" style="color:#eab308; font-weight:800;">🌈 Deal</a>`;

files.forEach(f => {
    let html = fs.readFileSync(path.join(dir, f), 'utf8');

    // Safety remove first to avoid duplicates
    html = html.replace(/<a href="rainbow-deal\.html".*?🌈 Deal<\/a>/g, '');

    // Inject PC link
    const replaceStringPc1 = '<a href="fan-edition.html">Fan Edition</a>';
    const replaceStringPc2 = '<a href="fan-edition.html" class="active">Fan Edition</a>';
    const replaceStringPc3 = '<a href="fan-edition.html" style="color:var(--pink-light);">🔥 Fan Edition</a>';
    const replaceStringPc4 = '<a href="fan-edition.html" class="nav-link" style="color:var(--pink-light);font-weight:700;">🔥 Fan Edition</a>';

    if (html.includes(replaceStringPc4)) html = html.replace(replaceStringPc4, replaceStringPc4 + dealPcLink);
    else if (html.includes(replaceStringPc3)) html = html.replace(replaceStringPc3, replaceStringPc3 + dealPcLink);
    else if (html.includes(replaceStringPc2)) html = html.replace(replaceStringPc2, replaceStringPc2 + dealPcLink);
    else if (html.includes(replaceStringPc1)) html = html.replace(replaceStringPc1, replaceStringPc1 + dealPcLink);

    // Inject Mobile link
    const replaceStringMob1 = '<a href="fan-edition.html">🔥 Fan Edition</a>';
    const replaceStringMob2 = '<a href="fan-edition.html" class="active">🔥 Fan Edition</a>';
    const replaceStringMob3 = '<a href="fan-edition.html" style="color:var(--pink-light);">🔥 Fan Edition</a>';

    if (html.includes(replaceStringMob3)) html = html.replace(replaceStringMob3, replaceStringMob3 + dealMobileLink);
    else if (html.includes(replaceStringMob2)) html = html.replace(replaceStringMob2, replaceStringMob2 + dealMobileLink);
    else if (html.includes(replaceStringMob1)) html = html.replace(replaceStringMob1, replaceStringMob1 + dealMobileLink);

    fs.writeFileSync(path.join(dir, f), html);
});
console.log('Injected safely');
