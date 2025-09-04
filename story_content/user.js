window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
window.Script5 = function()
{
  if (window.leaderboardInterval) {
  clearInterval(window.leaderboardInterval);
}

var player = GetPlayer();
let dots = 0;
let animInterval = null;

function iniciarAnimacionActualizando() {
  animInterval = setInterval(function () {
    dots = (dots + 1) % 4;
    let mensaje = "updating" + ".".repeat(dots);
    player.SetVar("estadoActualizacion", mensaje);
  }, 500);
}

function detenerAnimacionActualizando() {
  clearInterval(animInterval);
  player.SetVar("estadoActualizacion", "");
}

function actualizarLeaderboard() {
  iniciarAnimacionActualizando();

  const endpoint = player.GetVar("endpointLeaderboard"); // <-- Usamos la variable

  fetch(endpoint + "?action=getLeaderboard")
    .then(res => res.json())
    .then(data => {
      const top8 = data.top8;
      for (let i = 0; i < top8.length && i < 8; i++) {
        var nombre = top8[i][0];
        var puntos = top8[i][1];
        player.SetVar("puesto" + (i + 1), nombre + " - " + puntos + " pts");
      }

      // Si quieres mostrar algo para quien está fuera del top8, también puedes:
      if (data.posicion && data.posicion > 8) {
        player.SetVar("posicionGeneral", data.posicion);
        player.SetVar("faltanParaTop8", data.puntosFaltantes);
      }

      detenerAnimacionActualizando();
    })
    .catch(() => {
      detenerAnimacionActualizando();
      player.SetVar("estadoActualizacion", "error fetching data");
    });
}


actualizarLeaderboard();
window.leaderboardInterval = setInterval(actualizarLeaderboard, 10000);

}

window.Script6 = function()
{
  const player = GetPlayer();

player.SetVar("EndTime", new Date().getTime());
var timeTaken = (player.GetVar("EndTime") - player.GetVar("startTime")) / 1000;
player.SetVar("totalTime", timeTaken);

// Configuración
var basePoints = 20;
var maxPoints = 20; 
var minPoints = 2;
var tiempoReferencia = 240;

var puntos = basePoints * (tiempoReferencia / timeTaken);
puntos = Math.max(minPoints, Math.min(maxPoints, puntos));

//puntos = Math.max(minPoints, puntos); // Aplicar mínimo
puntos = Math.round(puntos * 10) / 10; // Redondear a 1 decimal
player.SetVar("activityPoints", puntos);


player.SetVar("crosswordCorrect", true);


/*
setTimeout(function() {
    
    player.SetVar("crosswordCorrect", true);
    setTimeout(function() {
    player.SetVar("allCorrect", true);
 
}, 6000);
}, 10000);
*/

// === Settings you can tweak ===
const duration   = 3;          // seconds
const fromScale  = 1;
const toScale    = 3;
const targetX0   = 355;        // FIRST letter X in ORIGINAL slide coords
const targetY    = 150;        // Row Y in ORIGINAL slide coords
const gapPx      = 5;          // desired gap at original scale (will scale with player)

// === Your objects, in order ===
const ids = [
  '5oEzyBNl9Qx', // l
  '61q7sSuN27F', // e
  '5gYpKFJCEKo', // a
  '65irUJ32zor', // d
  '6V35Ei11FLP', // e2
  '6Wg3Ez8zYGU'  // r
];

// --- Helpers ---

const getVar = (n, f=null) => (player ? player.GetVar(n) : f);
const object = (id) => document.querySelector(`[data-model-id='${id}']`);

// --- Resolve stage & content area ---
const contentArea = document.querySelector('.slide-layer.base-layer.shown');
if (!contentArea) { console.warn('No content area'); return; }

const ORIGINAL_W = Number(getVar('playerWidth'))  || 960;
const ORIGINAL_H = Number(getVar('playerHeight')) || 540;

function getStageScale() {
  const sx = contentArea.clientWidth  / ORIGINAL_W;
  const sy = contentArea.clientHeight / ORIGINAL_H;
  // Storyline preserves aspect ratio; use sx for horizontal spacing
  return { sx, sy };
}

// Collect valid elements in order
const els = ids.map(object).filter(Boolean);
if (!els.length) { console.warn('No target letters found'); return; }

// We’ll anchor scaling on the LEFT EDGE so gaps stay exact while scaling
els.forEach(el => {
  el.style.transformOrigin = '0% 50%';
  if (el.tagName.toLowerCase() === 'svg') el.style.transformBox = 'fill-box';
});

// Layout + animate all
let allDone = false;
layoutAndAnimate();

function layoutAndAnimate() {
  const { sx, sy } = getStageScale();

  // Convert target row coords to current pixels
  let xCursor = targetX0 * sx;
  const yPx   = targetY  * sy;
  const gap   = gapPx * sx;

  // 1) Normalize starting scale to preserve Storyline’s base matrix
  els.forEach(el => {
    const baseX = gsap.getProperty(el, 'scaleX') || 1;
    const baseY = gsap.getProperty(el, 'scaleY') || 1;
    gsap.set(el, { scaleX: baseX * fromScale, scaleY: baseY * fromScale });
  });

  // 2) Measure widths at start scale, compute final widths, and target Xs
  const finalWidths = els.map((el) => {
    const startW = el.getBoundingClientRect().width;        // rendered width now
    return startW * (toScale / fromScale);                   // final rendered width
  });

  const targets = els.map((el, i) => {
    const x = (i === 0) ? xCursor : (xCursor += finalWidths[i-1] + gap);
    return { el, x, y: yPx };
  });

  // 3) Animate all to their computed slots, while scaling to final
  let completed = 0;
  targets.forEach(({ el, x, y }) => {
    const baseX = gsap.getProperty(el, 'scaleX') || 1;
    const baseY = gsap.getProperty(el, 'scaleY') || 1;

    gsap.to(el, {
      x, y,
      scaleX: baseX * toScale,
      scaleY: baseY * toScale,
      duration,
      ease: 'none',
      onComplete: () => {
        completed++;
        if (completed === targets.length) allDone = true;
      }
    });
  });
}

// 4) Keep layout correct after resize (re-measure & re-position at final scale)
let rezId;
window.addEventListener('resize', () => {
  if (!allDone) return;                 // only relayout after the animation finished
  clearTimeout(rezId);
  rezId = setTimeout(() => {
    const { sx, sy } = getStageScale();
    let xCursor = targetX0 * sx;
    const yPx   = targetY  * sy;
    const gap   = gapPx * sx;

    // widths at final scale now:
    const widthsNow = els.map(el => el.getBoundingClientRect().width);

    els.forEach((el, i) => {
      const x = (i === 0) ? xCursor : (xCursor += widthsNow[i-1] + gap);
      gsap.set(el, { x, y: yPx });
    });
  }, 120);
});

}

window.Script7 = function()
{
  var player = GetPlayer();
player.SetVar("startTime", new Date().getTime());

}

window.Script8 = function()
{
  var player = GetPlayer();
var coords = [
    {cell: "a5", answer: "g"},
    {cell: "a7", answer: "p"},
    {cell: "b1", answer: "d"},
    {cell: "b2", answer: "e"},
    {cell: "b3", answer: "v"},  
    {cell: "b4", answer: "s"},
    {cell: "b5", answer: "e"},
    {cell: "b6", answer: "c"},
    {cell: "b7", answer: "o"},
    {cell: "b8", answer: "p"},
    {cell: "b9", answer: "s"},
    {cell: "c5", answer: "n"},
    {cell: "c7", answer: "w"},
    {cell: "d2", answer: "v"},
    {cell: "d3", answer: "o"},
    {cell: "d4", answer: "y"},
    {cell: "d5", answer: "a"},
    {cell: "d6", answer: "g"},
    {cell: "d7", answer: "e"},
    {cell: "e5", answer: "i"},
    {cell: "e7", answer: "r"},
    {cell: "f7", answer: "b"},
    {cell: "g3", answer: "m"},
    {cell: "g4", answer: "u"},
    {cell: "g5", answer: "l"},
    {cell: "g6", answer: "t"},
    {cell: "g7", answer: "i"},
    {cell: "g8", answer: "c"},
    {cell: "g9", answer: "l"},
    {cell: "g10", answer: "o"},
    {cell: "g11", answer: "u"},
    {cell: "g12", answer: "d"},
    {cell: "h12", answer: "a"},
    {cell: "i12", answer: "t"},
    {cell: "j12", answer: "a"},
  
];

var allCorrect = coords.every(function(o){
  var userInput = player.GetVar("v_" + o.cell);
  // case-insensitive?
  return userInput && userInput.toLowerCase() === o.answer;
});

if(allCorrect) {
  player.ShowLayer("You Got It!");
} else {
  player.ShowLayer("Try Again");
}

}

window.Script9 = function()
{
  //setTimeout(function () {
  // 1) Buscar todos los inputs visibles
  let inputs = Array.from(document.querySelectorAll('input[type="text"]')).filter(el => {
    const s = window.getComputedStyle(el);
    return s.visibility !== 'hidden' && s.display !== 'none' && !el.disabled;
  });

  if (!inputs.length) return;

  // 2) Ordenar por el tabindex definido en Storyline
  inputs.sort((a, b) => {
    let ta = parseInt(a.getAttribute('tabindex') || 0);
    let tb = parseInt(b.getAttribute('tabindex') || 0);
    return ta - tb;
  });

  // 3) Guardar índice en cada input
  inputs.forEach((el, i) => el.dataset.idx = i);

  // Funciones para moverse en el orden del Tab
  function focusNext(current) {
    const i = +current.dataset.idx;
    if (i < inputs.length - 1) {
      inputs[i + 1].focus();
      inputs[i + 1].select?.();
    }
  }
  function focusPrev(current) {
    const i = +current.dataset.idx;
    if (i > 0) {
      inputs[i - 1].focus();
      inputs[i - 1].select?.();
    }
  }

  // 4) Listeners por input
  inputs.forEach(input => {
    // Bloquear más de un carácter
    input.addEventListener('keydown', function (e) {
      if (input.value.length >= 1 && e.key.length === 1 && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
      }
      // Retroceso en vacío -> ir al anterior
      if (e.key === 'Backspace' && input.value.length === 0) {
        e.preventDefault();
        focusPrev(input);
      }
    });

    // Saltar al siguiente cuando se escribe
    input.addEventListener('input', function () {
      if (input.value.length > 1) {
        input.value = input.value.slice(0, 1);
      }
      if (input.value.length === 1) {
        setTimeout(() => focusNext(input), 0);
      }
    });

    // Pegar -> solo 1 carácter y saltar
    input.addEventListener('paste', function (e) {
      e.preventDefault();
      const pasted = (e.clipboardData || window.clipboardData).getData('text') || '';
      input.value = pasted.charAt(0);
      setTimeout(() => focusNext(input), 0);
    });
  });
//}, 1500); // esperar un poco para que Storyline termine de renderizar

}

window.Script10 = function()
{
  setTimeout(function() {
  player.SetVar("allCorrect", true);
}, 6000);
}

window.Script11 = function()
{
  const player = GetPlayer();
const message ="The next chapter of the Cosmic Con saga is currently being forged in the stars.✨<br>Check back soon to uncover new panels, puzzles, and cosmic adventures! 🚀"
player.SetVar("comingSoon", message)
}

window.Script12 = function()
{
  var player = GetPlayer();
const myCode = (player.GetVar("myReferralCode") || "No data").toUpperCase();

let dots = 0;
let animInterval = null;
const activityDone = player.GetVar("estadoEnvio")
if(activityDone=="ya_resuelto"){
	player.SetVar("mensajeUsuarioLeaderboard", "🤨 You have already submitted this activity.");
	return;
}

function iniciarAnimacionActualizando() {
  animInterval = setInterval(function () {
    dots = (dots + 1) % 4;
    let mensaje = "updating" + ".".repeat(dots);
    player.SetVar("estadoActualizacion", mensaje);
  }, 500);
}

function detenerAnimacionActualizando() {
  clearInterval(animInterval);
  player.SetVar("estadoActualizacion", ""); // Ocultar mensaje
}

// Función principal de actualización
function actualizarLeaderboard() {
  iniciarAnimacionActualizando();
  const emailCompleto = player.GetVar("TextEntry5") || "";
  const email = emailCompleto.trim().toLowerCase().split("@")[0];
  const endpoint = player.GetVar("endpointLeaderboard"); // <-- Usamos la variable

  fetch(endpoint + "?action=getLeaderboard&email=" + encodeURIComponent(email))

    .then(res => res.json())
    .then(data => {
    console.log(data)
      detenerAnimacionActualizando();
      const top8 = data.top8;
      const posicion = data.posicion;
      const puntosFaltantes = data.puntosFaltantes;
      const player = GetPlayer();

      // Actualizar los primeros 8 lugares
      for (let i = 0; i < top8.length && i < 8; i++) {
        var nombre = top8[i][0];
        var puntos = top8[i][1];
        player.SetVar("puesto" + (i + 1), nombre + " - " + puntos + " pts");
      }

      // Generar mensaje personalizado
      let mensaje = "";
      if (posicion <= 8) {
        mensaje =`You are a LEADER in the fight against Entropy! Current rank: ${posicion}`;
//Together we’ll strike Entropy harder and rise faster!
      } else {
        const puntosFormateados = puntosFaltantes.toFixed(1);
        mensaje =  `Keep going! You're currently in position #${posicion}.`;
      }

      // Asignar mensaje a variable de Storyline
      player.SetVar("mensajeUsuarioLeaderboard", mensaje);

      
    })
    .catch(() => {
      detenerAnimacionActualizando();
      player.SetVar("estadoActualizacion", "error fetching data");
    });
}



// Ejecutar una vez al inicio y luego cada 4 segundos
actualizarLeaderboard();
setInterval(actualizarLeaderboard, 10000);

}

window.Script13 = function()
{
  const shareCard = object('6pT6DsVuoDX');

(function copyShareCardMultiLayer(){
  // ===== Config =====
  var TARGET_LABEL = 'ShareCard'; // default Alt Text if you don't use Object reference
  var PIXEL_RATIO  = Math.max(2, window.devicePixelRatio || 1);
  var LIBS = [
    'https://cdn.jsdelivr.net/npm/html-to-image@1.11.11/dist/html-to-image.min.js',
    'https://unpkg.com/html-to-image@1.11.11/dist/html-to-image.min.js'
  ];
  // Optional hard-coded model-id fallback if you want:
  // var SHARECARD_MODEL_ID = '6pT6DsVuoDX';

  // ===== Helpers =====
  function loadLib(){
    return new Promise((resolve, reject)=>{
      if (window.htmlToImage) return resolve();
      var i=0; (function inject(){
        var s=document.createElement('script'); s.src=LIBS[i++];
        s.onload=resolve;
        s.onerror=()=>{ (i<LIBS.length)?inject():reject(new Error('Could not load html-to-image library')); };
        document.head.appendChild(s);
      })();
    });
  }
  function fontsReady(){ return (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve(); }
  function waitFrames(n){ return new Promise(r=>{ (function step(k){ if(!k) return r(); requestAnimationFrame(()=>step(k-1)); })(n||2); }); }

  // Error stringifier (handles raw Event objects from html-to-image)
  function errToString(e){
    try{
      if (!e) return 'Unknown error';
      if (e.message) return e.message;
      if (e.type && e.target?.tagName) return `${e.type} loading <${e.target.tagName.toLowerCase()}>`;
      if (e.type) return String(e.type);
      return String(e);
    }catch{ return 'Unknown error'; }
  }

  function resolveDomEl(ref){
    if (!ref) return null;
    if (ref.nodeType === 1) return ref;
    if (ref.element && ref.element.nodeType === 1) return ref.element;
    if (ref.el && ref.el.nodeType === 1) return ref.el;
    if (typeof ref === 'string') {
      return document.querySelector('[data-model-id="'+ref+'"]') || document.getElementById(ref);
    }
    return null;
  }

  function getElems(){
    // 1) Prefer Storyline Object reference if present
    var cropEl = (typeof shareCard !== 'undefined') ? resolveDomEl(shareCard) : null;

    // 2) Try an optional hard-coded model-id
    if (!cropEl && typeof SHARECARD_MODEL_ID !== 'undefined') {
      cropEl = resolveDomEl(String(SHARECARD_MODEL_ID));
    }

    // 3) Fallback: search all *shown* layers by Alt Text label (case-insensitive contains)
    if (!cropEl) {
      var layers = Array.from(document.querySelectorAll('.slide-layer.shown')); // any visible layer
      var candidates = [];
      layers.forEach(layer=>{
        candidates.push(...layer.querySelectorAll('[data-acc-text],[aria-label]'));
      });
      // ignore accessibility shadow wrappers
      candidates = candidates.filter(el => !el.closest('.acc-shadow-el'));

      var label = String(TARGET_LABEL).toLowerCase();
      var matches = candidates.filter(el=>{
        var txt = (el.getAttribute('data-acc-text') || el.getAttribute('aria-label') || '').toLowerCase();
        return txt.includes(label);
      });

      // largest visible element wins
      function visible(el){ const r=el.getBoundingClientRect(); return r.width>0 && r.height>0; }
      matches = matches.filter(visible).sort((a,b)=>{
        const ra=a.getBoundingClientRect(), rb=b.getBoundingClientRect();
        return (rb.width*rb.height)-(ra.width*ra.height);
      });

      cropEl = matches[0] || null;

      if (!cropEl) {
        console.log('ShareCard search – looking for:', TARGET_LABEL,
          '\nCandidates seen:', candidates.map(el => el.getAttribute('data-acc-text')||el.getAttribute('aria-label')));
      }
    }

    if (!cropEl) throw new Error('Could not find the capture marker "'+TARGET_LABEL+'".');

    // 4) Root to render: prefer the shown layer that contains the ShareCard; else whole slide
    const root = cropEl.closest('.slide-layer.shown') ||
                 document.querySelector('.slide-container') ||
                 cropEl.closest('.slides') ||
                 cropEl.closest('.slide') ||
                 cropEl.closest('.slide-layer') ||
                 document.body;

    return { root, cropEl };
  }

  // Inline <svg><image> assets → data URLs (so they render into canvas)
  async function inlineSvgImages(root){
    const imgs = Array.from(root.querySelectorAll('svg image'));
    const revokers=[];
    await Promise.all(imgs.map(async img=>{
      try{
        const href = img.getAttribute('href')||img.getAttribute('xlink:href');
        if (!href || href.startsWith('data:')) return;
        const res  = await fetch(href, {credentials:'include'});
        const blob = await res.blob();
        const fr   = new FileReader();
        const dataUrl = await new Promise(res2=>{ fr.onload=()=>res2(fr.result); fr.readAsDataURL(blob); });
        const orig=href;
        img.setAttribute('data-orig-href',orig);
        img.setAttribute('href',dataUrl);
        img.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href',dataUrl);
        revokers.push(()=>{ img.setAttribute('href',orig); img.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href',orig); img.removeAttribute('data-orig-href'); });
      }catch(_){}
    }));
    return ()=>revokers.forEach(fn=>{ try{fn();}catch{} });
  }

  function tryClipboard(blob){
    if (!window.isSecureContext) return Promise.reject(new Error('This must run under HTTPS or localhost'));
    if (!(window.ClipboardItem && navigator.clipboard?.write))
      return Promise.reject(new Error('Clipboard API not supported in this browser'));
    return navigator.clipboard.write([ new ClipboardItem({'image/png': blob}) ]);
  }

  function downloadBlob(blob,name){
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a'); a.href=url; a.download=name||'achievement.png'; a.click();
    URL.revokeObjectURL(url);
  }

  function openPopup(){
    const w=window.open('','_blank','width=520,height=420'); if(!w) return null;
    const d=w.document;
    d.open(); d.write('<!doctype html><meta charset="utf-8"><title>Share Achievement</title>'+
      '<body style="font-family:system-ui,sans-serif;padding:16px">'+
      '<h3>Achievement Ready!</h3>'+
      '<p>Click "Copy" to copy your badge to the clipboard. Share it on Teams or Viva Engage to rally your crew against Entropy. '+
      'Take on <strong>"Decode the Message"</strong> in the <strong>Cosmic Book</strong> and keep the momentum going.</p>'+
      '<img id="preview" style="max-width:100%;display:block;margin:12px 0">'+
      '<button id="copyBtn" style="padding:8px 14px;border:0;border-radius:10px;cursor:pointer">Copy</button>'+
      '<span id="status" style="margin-left:8px;color:#444"></span></body>');
    d.close();
    return w;
  }

  function sendToPopup(win,blob){
    return blob.arrayBuffer().then(buf=>{
      const bytes=new Uint8Array(buf);
      const url=(win.URL||URL).createObjectURL(new Blob([bytes],{type:'image/png'}));
      const d=win.document;
      d.getElementById('preview').src=url;
      function doCopy(){
        try{
          if(!(win.ClipboardItem && win.navigator.clipboard?.write)) throw new Error('Clipboard not supported in popup');
          return win.navigator.clipboard.write([ new win.ClipboardItem({'image/png': new Blob([bytes],{type:'image/png'})}) ])
            .then(()=>{ d.getElementById('status').textContent='Copied ✅ Now share your victory!'; });
        }catch(err){ win.alert('Copy failed: '+(errToString(err))); }
      }
      doCopy(); d.getElementById('copyBtn').onclick=doCopy;
    });
  }

  // ===== Main =====
  (async function main(){
    try{
      await loadLib();
      const {root, cropEl} = getElems();
      await fontsReady(); await waitFrames(3); // bump to 4–5 for very heavy slides

      const restore = await inlineSvgImages(root);
      let croppedBlob;
      try{
        // Render current layer (or whole slide) with robust image options
        const fullCanvas = await window.htmlToImage.toCanvas(root, {
          pixelRatio: PIXEL_RATIO,
          cacheBust: true,
          backgroundColor: '#ffffff',
          useCORS: true,
          fetchRequestInit: { credentials: 'include' },
          imagePlaceholder:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAFJgIh7zA1VQAAAABJRU5ErkJggg==',
          onClone(doc){
            // Make <img> CORS-friendly in the cloned DOM
            doc.querySelectorAll('img').forEach(img=>{
              if (!img.getAttribute('crossorigin')) img.setAttribute('crossorigin','anonymous');
            });
          }
        });

        // Crop to the ShareCard rectangle
        const rootBox = root.getBoundingClientRect();
        const cropBox = cropEl.getBoundingClientRect();
        const sx = (cropBox.left - rootBox.left) * PIXEL_RATIO;
        const sy = (cropBox.top  - rootBox.top ) * PIXEL_RATIO;
        const sw =  cropBox.width * PIXEL_RATIO;
        const sh =  cropBox.height* PIXEL_RATIO;

        const out = document.createElement('canvas');
        out.width  = Math.round(sw);
        out.height = Math.round(sh);
        out.getContext('2d').drawImage(fullCanvas, sx, sy, sw, sh, 0, 0, out.width, out.height);

        croppedBlob = await new Promise(res=>out.toBlob(res,'image/png'));
      } finally { restore(); }

      if(!croppedBlob) throw new Error('Could not generate image');

      try{
        await tryClipboard(croppedBlob);
        alert('Achievement copied ✅\n\nShare it on Teams or Viva Engage to inspire your teammates. Every share helps us fight Entropy. Don’t forget to tackle "Decode the Message" in the Cosmic Book!');
      }catch(e1){
        if(String(e1).toLowerCase().includes('permissions policy')){
          const pop=openPopup();
          if(!pop){ downloadBlob(croppedBlob,'achievement.png'); alert('Popup blocked. Image downloaded instead.'); return; }
          await sendToPopup(pop,croppedBlob);
        } else {
          downloadBlob(croppedBlob,'achievement.png');
          alert('Clipboard copy failed. The image was downloaded instead.\nDetails: '+errToString(e1));
        }
      }
    }catch(err){
      console.error(err);
      alert('Something went wrong: '+errToString(err));
    }
  })();
})();

}

window.Script14 = function()
{
  // === Paste directly into the Storyline button's JS trigger ===
(function () {
  var player = GetPlayer && GetPlayer();
  var myCode = (player && player.GetVar("myReferralCode")) ? String(player.GetVar("myReferralCode")).toUpperCase() : "NO-CODE";

  // Your real links here
  var decodeLink   = "https://gmfinancial.sharepoint.com/sites/ITTraining/SitePages/Cosmic-Con--Inspired-Tech-Learning.aspx?xsdata=MDV8MDJ8fGQ0ODdlZjI3MTlhODRlZTFkM2JhMDhkZGU2NjBjYWU0fGU0NWNiY2MxMTc2MDQxOWFhMTZiMzU4MDIyODViM2IzfDB8MHw2Mzg5MjAwMjU1NTE3Mjc1MjF8VW5rbm93bnxWR1ZoYlhOVFpXTjFjbWwwZVZObGNuWnBZMlY4ZXlKRFFTSTZJbFJsWVcxelgwRlVVRk5sY25acFkyVmZVMUJQVEU5R0lpd2lWaUk2SWpBdU1DNHdNREF3SWl3aVVDSTZJbGRwYmpNeUlpd2lRVTRpT2lKUGRHaGxjaUlzSWxkVUlqb3hNWDA9fDF8TDNSbFlXMXpMekU1T2xWWVdUVjZla1oxZG1KdmJqVndkRzU2Wm5GelRYVkZZMGgzTFd0cmRYaDNRVVppV0hKUWMxOVBMVUV4UUhSb2NtVmhaQzUwWVdOMk1pOWphR0Z1Ym1Wc2N5OHhPVG80TXpNek1qY3pNVGxqTTJRME5UUXlZbVJqWmpnMFpqSXlZV0l4TXpoa09VQjBhSEpsWVdRdWRHRmpkakl2YldWemMyRm5aWE12TVRjMU5qUXdOVGMxTkRjeU5nPT18ZjNmODZiNzY2NjJhNDJmOTUwODgwOGRkZTY2MGNhZTR8MDBjYmU4NmNiNmJhNDk4MWFkYjNjZjkxNjMxOTMwMTk%3D&sdata=UXk3VDV5d2lrOWJJVU5yK3VmZUc1SzFnaTVIcjlaZGs3aFh3a0ptQUo3OD0%3D&ovuser=e45cbcc1-1760-419a-a16b-35802285b3b3%2Cenrique.melgar%40gmfinancial.com&OR=Teams-HL&CT=1756759185898&clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiI0OS8yNTA3MzExNzQxMyJ9#join-the-adventure";
  var registerLink = "https://forms.office.com/Pages/ResponsePage.aspx?id=wbxc5GAXmkGhazWAIoWzs9d7RL_pchhPr3WaulQPwypUME41VjFKQzQzUENDV003VDFHT1hZTVlMUy4u";

  // Plain-text (for older clients that strip HTML)
  var textMsg =
"I’ve cracked the code — now it’s your turn!\n" +
"Use my mission code " + myCode + " in the Decode the Message challenge and claim your +1 Power-Up.\n" +
"Decode the Message: " + decodeLink + "\n" +
"Together we’ll climb the leaderboard and strike back at Entropy!\n\n" +
"Not registered yet for Cosmic Con? Join now and don’t miss the mission: " + registerLink;

  // HTML version (Teams keeps <a> links when pasting HTML)
  var htmlMsg =
'<div style="font-family:Segoe UI,system-ui,sans-serif;line-height:1.35;font-size:14px;">' +
  '<p>I’ve cracked the code — now it’s your turn!</p>' +
  '<p>Use my mission code <strong>' + myCode + '</strong> in the ' +
  '<a href="' + decodeLink + '">Decode the Message challenge</a> and claim your ' +
  '<strong>+1 Power-Up</strong>. Together we’ll climb the leaderboard and strike back at ' +
  '<em>Entropy</em>!</p>' +
  '<p>Not registered yet for <a href="' + registerLink + '">Cosmic Con</a>? Join now and don’t miss the mission.</p>' +
'</div>';

  // 1) Try rich clipboard (works only if allowed by Permissions Policy + HTTPS)
  if (navigator.clipboard && window.ClipboardItem && window.isSecureContext) {
    (async function(){
      try {
        const item = new ClipboardItem({
          "text/html": new Blob([htmlMsg], { type: "text/html" }),
          "text/plain": new Blob([textMsg], { type: "text/plain" })
        });
        await navigator.clipboard.write([item]);
        alert("Copied (with links)! Paste in Teams.");
        return;
      } catch (e) {
        // fall through to popup
        openHelperPopup(htmlMsg, textMsg);
      }
    })();
  } else {
    // 2) Popup helper for manual copy (preserves HTML links)
    openHelperPopup(htmlMsg, textMsg);
  }

  function openHelperPopup(html, text) {
    var w = window.open("", "_blank", "width=560,height=480");
    if (!w) return; // If popup blocked, just exit
    var d = w.document;
    d.open();
    d.write(
      '<!doctype html><meta charset="utf-8"><title>Copy Message</title>' +
      '<body style="font-family:Segoe UI,system-ui,sans-serif;margin:16px;">' +
      '<h3 style="margin:0 0 8px;">Copy your message</h3>' +
      '<p style="margin:0 0 12px;">Press <b>Ctrl/Cmd + C</b> to copy the selected message below, then paste into Teams.</p>' +
      '<div id="content" contenteditable="true" ' +
        'style="border:1px solid #ddd;border-radius:8px;padding:12px;min-height:120px;outline:none;">' +
        html +
      '</div>' +
      '<div style="margin-top:10px;display:flex;gap:8px;align-items:center;">' +
        '<button id="selectBtn" style="padding:8px 12px;border:0;border-radius:8px;cursor:pointer;">Select All</button>' +
        '<button id="copyBtn" style="padding:8px 12px;border:0;border-radius:8px;cursor:pointer;">Copy</button>' +
        '<span id="status" style="color:#444;"></span>' +
      '</div>' +
      '</body>'
    );
    d.close();

    // Auto-select content
    var selAll = function(){
      var range = d.createRange();
      range.selectNodeContents(d.getElementById("content"));
      var sel = w.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    };
    selAll();

    d.getElementById("selectBtn").onclick = selAll;
    d.getElementById("copyBtn").onclick = function(){
      try {
        selAll();
        var ok = d.execCommand ? d.execCommand("copy") : w.document.execCommand("copy");
        d.getElementById("status").textContent = ok ? "Copied ✅" : "Please press Ctrl/Cmd+C";
      } catch (e) {
        d.getElementById("status").textContent = "Press Ctrl/Cmd+C to copy";
      }
    };
  }
})();

}

window.Script15 = function()
{
  (function limitStorylineInput(){
  var maxChars = 13; // change this to your limit
  var targetAlt = "UserName"; // Alt Text of your text entry box in Storyline

  // Wait until Storyline renders the input
  setTimeout(function(){
    // Find the text input by its accessibility label
    var input = Array.from(document.querySelectorAll('input[type="text"]'))
      .find(el => (el.getAttribute("aria-label") || "").includes(targetAlt) ||
                  (el.getAttribute("data-acc-text") || "").includes(targetAlt));
    
    if (!input) {
      console.warn("Input not found. Check the Alt Text in Storyline.");
      return;
    }

    // Prevent typing beyond the limit
    input.addEventListener("input", function(){
      if (this.value.length > maxChars) {
        this.value = this.value.substring(0, maxChars); // block extra chars
      }
    });

    // Also block pasting long text
    input.addEventListener("paste", function(e){
      e.preventDefault();
      var pasted = (e.clipboardData || window.clipboardData).getData("text") || "";
      this.value = pasted.substring(0, maxChars);
    });

  }, 800); // wait ~0.8s for rendering (adjust if needed)
})();

}

window.Script16 = function()
{
  var player = GetPlayer();
var emailCompleto = player.GetVar("emailUsuario") || "";
var email = emailCompleto.split("@")[0];
var actividad = player.GetVar("currentActivity");
var puntos = player.GetVar("activityPoints");
const endpoint = player.GetVar("endpointLeaderboard");

//let ref = ""
let ref = (player.GetVar("referralInputCode") || "").trim().toUpperCase();
console.log(ref)
fetch(
  endpoint + "?action=registrarActividad"
  + "&email=" + encodeURIComponent(email)
  + "&actividad=" + encodeURIComponent(actividad)
  + "&puntos=" + encodeURIComponent(puntos)
  + (ref ? "&ref=" + encodeURIComponent(ref) : "")
)
  .then(response => response.json())
  .then(data => {
  console.log(data)
    // Backend total already includes referral +1 when data.referral.ok === true
    player.SetVar("puntosTotales", data.totalPuntos);
    player.SetVar("estadoEnvio", data.status);
    player.SetVar("showLeaderboard", true);

    // Save my code for sharing (normalize to uppercase)
    if (data.myReferralCode) {
      player.SetVar("myReferralCode", String(data.myReferralCode).toUpperCase());
    }

    // Referral feedback (no local point bump here)
    if (data.referral && data.referral.ok) {
      player.SetVar("referralStatus", "ok");
      if (typeof data.referral.remaining === "number") {
        player.SetVar("refRemaining", data.referral.remaining);
      }
      player.SetVar("referralRedeemed", true);
    } else if (data.referral && data.referral.error) {
      player.SetVar("referralStatus", String(data.referral.error).toLowerCase());
    } else {
      player.SetVar("referralStatus", "");
    }
  })
  .catch(error => {
    console.error("Error al registrar actividad:", error);
    player.SetVar("estadoEnvio", "fallo_conexion");
  });

}

};
