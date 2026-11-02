// Hand-drawn-style props (own artwork made for this test, no third-party licence).
// Ink outline + brand palette. Local origin documented per prop.
export const C = { blue: '#146EF5', deep: '#0B3FA8', light: '#7CB9FF', tint: '#EEF4FF', ink: '#13161B', paper: '#F5F8FA', white: '#FFFFFF', red: '#FF4444', green: '#15803D', grey: '#7C8492' };
const S = `stroke="${C.ink}" stroke-linejoin="round" stroke-linecap="round"`;
export const PROPS = {
  // HEAD props: Open Peeps head canvas 473x567, ear ~ (105,320)
  headset: (o = {}) => `<g>
    <path d="M92 330 C40 110 250 -40 445 150" fill="none" ${S} stroke-width="30"/>
    <path d="M92 330 C40 110 250 -40 445 150" fill="none" stroke="${o.c || C.blue}" stroke-width="14" stroke-linecap="round"/>
    <path d="M120 395 Q170 500 300 470" fill="none" ${S} stroke-width="14"/>
    <circle cx="305" cy="468" r="22" fill="${C.ink}"/>
    <rect x="62" y="270" width="80" height="125" rx="34" fill="${o.c || C.blue}" ${S} stroke-width="12"/></g>`,
  // NECK props: origin = base of neck centre
  headphonesNeck: (o = {}) => `<g>
    <path d="M-190 -40 C-170 110 170 110 190 -40" fill="none" ${S} stroke-width="30"/>
    <path d="M-190 -40 C-170 110 170 110 190 -40" fill="none" stroke="${o.c || C.deep}" stroke-width="14"/>
    <rect x="-240" y="-90" width="85" height="110" rx="36" fill="${o.c || C.deep}" ${S} stroke-width="12" transform="rotate(-20 -197 -35)"/>
    <rect x="155" y="-90" width="85" height="110" rx="36" fill="${o.c || C.deep}" ${S} stroke-width="12" transform="rotate(20 197 -35)"/></g>`,
  lanyard: (o = {}) => `<g>
    <path d="M-110 0 L-20 330 M110 0 L20 330" fill="none" stroke="${o.c || C.blue}" stroke-width="18" stroke-linecap="round"/>
    <rect x="-75" y="310" width="150" height="190" rx="14" fill="${C.white}" ${S} stroke-width="10"/>
    <rect x="-75" y="310" width="150" height="55" rx="10" fill="${o.c || C.blue}" ${S} stroke-width="10"/>
    <text x="0" y="455" font-family="Arial Black,Arial" font-weight="900" font-size="78" text-anchor="middle" fill="${C.ink}">AI</text></g>`,
  // HAND props: origin = bottom-centre (where the palm supports it)
  laptopFront: () => `<g>
    <path d="M-230 0 L230 0 L200 -40 L-200 -40 Z" fill="${C.grey}" ${S} stroke-width="12"/>
    <rect x="-200" y="-330" width="400" height="290" rx="18" fill="${C.ink}" ${S} stroke-width="12"/>
    <rect x="-175" y="-305" width="350" height="230" rx="8" fill="${C.deep}"/>
    <path d="M-150 -270 h120 M-150 -235 h200 M-120 -200 h150 M-120 -165 h90 M-150 -130 h170" stroke="${C.light}" stroke-width="16" stroke-linecap="round"/>
    <path d="M-30 -270 h60" stroke="${C.green}" stroke-width="16" stroke-linecap="round"/></g>`,
  laptopLap: () => `<g>
    <path d="M-260 0 L200 0 L240 -30 L-220 -30 Z" fill="${C.grey}" ${S} stroke-width="12"/>
    <path d="M200 0 L330 -330 L300 -345 L170 -20 Z" fill="${C.ink}" ${S} stroke-width="12"/>
    <circle cx="255" cy="-175" r="16" fill="${C.light}"/></g>`,
  laptopClosed: () => `<g>
    <rect x="-45" y="-330" width="60" height="420" rx="14" fill="${C.grey}" ${S} stroke-width="12"/>
    <rect x="15" y="-320" width="22" height="400" rx="8" fill="${C.ink}"/>
    <circle cx="-15" cy="-120" r="14" fill="${C.light}"/></g>`,
  tabletChart: () => `<g>
    <rect x="-150" y="-400" width="300" height="400" rx="30" fill="${C.ink}" ${S} stroke-width="12"/>
    <rect x="-125" y="-370" width="250" height="330" rx="10" fill="${C.white}"/>
    <rect x="-100" y="-130" width="40" height="70" fill="${C.light}"/><rect x="-45" y="-180" width="40" height="120" fill="${C.blue}"/>
    <rect x="10" y="-230" width="40" height="170" fill="${C.deep}"/><rect x="65" y="-290" width="40" height="230" fill="${C.green}"/>
    <path d="M-100 -230 L-30 -280 L30 -260 L100 -340" fill="none" stroke="${C.red}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M-110 -55 h220" stroke="${C.ink}" stroke-width="8"/></g>`,
  document: (o = {}) => `<g>
    <path d="M-140 -420 L90 -420 L150 -360 L150 0 L-140 0 Z" fill="${C.white}" ${S} stroke-width="12"/>
    <path d="M90 -420 L90 -360 L150 -360" fill="${C.tint}" ${S} stroke-width="10"/>
    <rect x="-105" y="-380" width="160" height="50" rx="8" fill="${o.c || C.blue}"/>
    <path d="M-105 -290 h210 M-105 -250 h180 M-105 -210 h210 M-105 -170 h140" stroke="${C.grey}" stroke-width="14" stroke-linecap="round"/>
    <path d="M-100 -60 L-40 -110 L10 -85 L95 -150" fill="none" stroke="${C.green}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/></g>`,
  calculator: () => `<g>
    <rect x="-120" y="-330" width="240" height="330" rx="26" fill="${C.blue}" ${S} stroke-width="12"/>
    <rect x="-90" y="-300" width="180" height="70" rx="8" fill="${C.tint}" ${S} stroke-width="8"/>
    <text x="75" y="-247" font-family="Courier New,monospace" font-weight="700" font-size="48" text-anchor="end" fill="${C.ink}">1,240</text>
    ${[0, 1, 2, 3].map(r => [0, 1, 2].map(c => `<rect x="${-90 + c * 64}" y="${-205 + r * 50}" width="50" height="38" rx="8" fill="${r === 3 && c === 2 ? C.green : C.white}" ${S} stroke-width="6"/>`).join('')).join('')}</g>`,
  ledger: () => `<g>
    <path d="M-260 0 L0 -30 L260 0 L260 -300 L0 -330 L-260 -300 Z" fill="${C.white}" ${S} stroke-width="12"/>
    <path d="M0 -30 L0 -330" ${S} stroke-width="10"/>
    <path d="M-225 -255 L-35 -275 M-225 -205 L-35 -225 M-225 -155 L-35 -175 M-225 -105 L-35 -125 M35 -275 L225 -255 M35 -225 L225 -205 M35 -175 L225 -155 M35 -125 L225 -105" stroke="${C.light}" stroke-width="10"/>
    <path d="M-120 -290 L-120 -60 M140 -290 L140 -60" stroke="${C.red}" stroke-width="6"/></g>`,
  fileStack: () => `<g>
    <rect x="-170" y="-150" width="340" height="150" rx="10" fill="${C.light}" ${S} stroke-width="12"/>
    <rect x="-160" y="-260" width="320" height="120" rx="10" fill="${C.blue}" ${S} stroke-width="12"/>
    <rect x="-175" y="-350" width="330" height="100" rx="10" fill="${C.deep}" ${S} stroke-width="12"/>
    <rect x="-40" y="-110" width="80" height="40" rx="6" fill="${C.white}" ${S} stroke-width="6"/></g>`,
  bubbleQ: (o = {}) => `<g>
    <path d="M-150 -330 h300 a50 50 0 0 1 50 50 v160 a50 50 0 0 1 -50 50 h-170 l-70 70 l10 -70 h-70 a50 50 0 0 1 -50 -50 v-160 a50 50 0 0 1 50 -50 z" fill="${C.white}" ${S} stroke-width="12"/>
    <text x="0" y="-130" font-family="Arial Black,Arial" font-weight="900" font-size="170" text-anchor="middle" fill="${o.c || C.blue}">?</text></g>`,
  // WORLD props: drawn directly in the pose canvas coords
  chair: (o = {}) => `<g>
    <path d="M330 1780 L830 1780 M580 860 L580 1780" ${S} stroke-width="30"/>
    <circle cx="330" cy="1805" r="38" fill="${C.ink}"/><circle cx="830" cy="1805" r="38" fill="${C.ink}"/><circle cx="580" cy="1805" r="38" fill="${C.ink}"/>
    <rect x="200" y="250" width="130" height="600" rx="50" fill="${o.c || C.deep}" ${S} stroke-width="14"/>
    <rect x="230" y="760" width="700" height="120" rx="50" fill="${o.c || C.deep}" ${S} stroke-width="14"/></g>`,
  desk: () => `<g>
    <rect x="1000" y="760" width="950" height="70" rx="10" fill="${C.paper}" ${S} stroke-width="14"/>
    <path d="M1060 830 L1060 1842 M1890 830 L1890 1842" ${S} stroke-width="30"/>
    <rect x="1380" y="400" width="440" height="300" rx="20" fill="${C.ink}" ${S} stroke-width="12"/>
    <rect x="1405" y="425" width="390" height="250" rx="8" fill="${C.tint}"/>
    <path d="M1440 475 h150 M1440 520 h270 M1440 565 h210" stroke="${C.blue}" stroke-width="18" stroke-linecap="round"/>
    <circle cx="1740" cy="625" r="26" fill="${C.green}"/>
    <path d="M1570 700 L1550 760 L1650 760 L1630 700 Z" fill="${C.grey}" ${S} stroke-width="10"/></g>`,
  board: () => `<g>
    <path d="M1700 1500 L1850 900 M2350 1500 L2200 900" ${S} stroke-width="22"/>
    <rect x="1600" y="-120" width="850" height="1050" rx="24" fill="${C.white}" ${S} stroke-width="16"/>
    <text x="1680" y="10" font-family="Arial Black,Arial" font-weight="900" font-size="90" fill="${C.deep}">PLAN</text>
    ${[0, 1, 2].map(i => `<circle cx="1720" cy="${150 + i * 150}" r="38" fill="${[C.blue, C.light, C.green][i]}" ${S} stroke-width="10"/><path d="M1800 ${150 + i * 150} h${380 - i * 60}" stroke="${C.grey}" stroke-width="26" stroke-linecap="round"/>`).join('')}
    <rect x="1700" y="640" width="70" height="200" fill="${C.light}"/><rect x="1800" y="590" width="70" height="250" fill="${C.blue}"/><rect x="1900" y="520" width="70" height="320" fill="${C.deep}"/><rect x="2000" y="440" width="70" height="400" fill="${C.green}"/>
    <path d="M1690 840 h460" stroke="${C.ink}" stroke-width="10"/></g>`,
};
