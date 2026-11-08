// Inline SVG art so nothing depends on emoji fonts.
(function(){
const INK='#3b2a4d';
function eyes(m){
  if(m==='happy')return `<path d="M9.5 16.5q2-3 4 0M18.5 16.5q2-3 4 0" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>`;
  if(m==='grumpy')return `<path d="M8.5 13.5l5 2M23.5 13.5l-5 2" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="17.5" r="1.7" fill="${INK}"/><circle cx="20" cy="17.5" r="1.7" fill="${INK}"/>`;
  if(m==='sad')return `<path d="M9.5 17.5l4 -1.2M22.5 17.5l-4 -1.2" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/><path d="M11 19.5v2M21 19.5v2" stroke="#6ec3ff" stroke-width="1.6" stroke-linecap="round"/>`;
  if(m==='love'){const h=x=>`<path transform="translate(${x} 15.2)" d="M0 1.6C-3 -1 -1.2 -3.2 0 -1.6 1.2 -3.2 3 -1 0 1.6z" fill="#ff3d8b" stroke="#ff3d8b" stroke-width="1.4" stroke-linejoin="round"/>`;return h(11.5)+h(20.5)}
  return `<circle cx="12" cy="16.5" r="1.7" fill="${INK}"/><circle cx="20" cy="16.5" r="1.7" fill="${INK}"/>`;
}
function mouth(m){
  if(m==='grumpy'||m==='sad')return `<path d="M13 23.6q3 -2.4 6 0" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>`;
  return `<path d="M13 21.8q1.5 2 3 0 1.5 2 3 0" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`;
}
window.catSVG=function(mood,fur){
  fur=fur||'#ffc48a';
  return `<svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden="true" focusable="false">
  <path d="M4.5 14L5 2.5l8 5.5zM27.5 14L27 2.5l-8 5.5z" fill="${fur}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>
  <path d="M7 9l.3-3.8 3 2.2zM25 9l-.3-3.8-3 2.2z" fill="#ff9ecb"/>
  <ellipse cx="16" cy="18" rx="12.2" ry="10.6" fill="${fur}" stroke="${INK}" stroke-width="1.8"/>
  ${eyes(mood)}
  <path d="M14.8 19.4h2.4l-1.2 1.4z" fill="#ff6fa8"/>
  ${mouth(mood)}
  <circle cx="7.4" cy="21" r="1.7" fill="#ff9ecb" opacity=".75"/><circle cx="24.6" cy="21" r="1.7" fill="#ff9ecb" opacity=".75"/>
  <path d="M2.5 18.5l4 .8M2.8 22l3.8-.6M29.5 18.5l-4 .8M29.2 22l-3.8-.6" stroke="${INK}" stroke-width="1" stroke-linecap="round"/>
  </svg>`;
};
window.fishSVG=function(){
  return `<svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden="true" focusable="false">
  <path d="M5 16C9 8.5 19 8.5 24 16 19 23.5 9 23.5 5 16z" fill="#6ec3ff" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>
  <path d="M23 16l6.5-5.5v11z" fill="#8ff0d0" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>
  <circle cx="10.5" cy="14.5" r="1.5" fill="${INK}"/><path d="M15 12.5q2 3.5 0 7" fill="none" stroke="${INK}" stroke-width="1.3" stroke-linecap="round"/></svg>`;
};
window.pawSVG=function(c){
  c=c||'#ff5fb8';
  return `<svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden="true" focusable="false" fill="${c}">
  <ellipse cx="16" cy="21" rx="7.5" ry="6"/><ellipse cx="6.5" cy="14" rx="3" ry="4" transform="rotate(-20 6.5 14)"/><ellipse cx="12.5" cy="8.5" rx="3" ry="4.2"/><ellipse cx="19.5" cy="8.5" rx="3" ry="4.2"/><ellipse cx="25.5" cy="14" rx="3" ry="4" transform="rotate(20 25.5 14)"/></svg>`;
};
window.crossSVG=function(){return `<svg viewBox="0 0 32 32" width="70%" height="70%" aria-hidden="true"><path d="M8 8l16 16M24 8L8 24" stroke="#e0364f" stroke-width="4" stroke-linecap="round"/></svg>`};
})();
