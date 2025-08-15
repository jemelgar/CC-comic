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
window.Script3 = function()
{
  setTimeout(function () {
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
}, 700); // esperar un poco para que Storyline termine de renderizar

}

window.Script4 = function()
{
  const player = GetPlayer();

player.SetVar("EndTime", new Date().getTime());
var timeTaken = (player.GetVar("EndTime") - player.GetVar("startTime")) / 1000;
player.SetVar("totalTime", timeTaken);

// Configuración
var basePoints = 20;
var minPoints = 2;
var tiempoReferencia = 60;

var puntos = basePoints * (tiempoReferencia / timeTaken);
puntos = Math.max(minPoints, puntos); // Aplicar mínimo
puntos = Math.round(puntos * 10) / 10; // Redondear a 1 decimal
player.SetVar("activityPoints", puntos);

setTimeout(function() {
    
    player.SetVar("crosswordCorrect", true);
    setTimeout(function() {
    player.SetVar("allCorrect", true);
 
}, 6000);
}, 2000);
}

window.Script5 = function()
{
  var player = GetPlayer();
player.SetVar("startTime", new Date().getTime());

}

window.Script6 = function()
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

window.Script7 = function()
{
  const player = GetPlayer();
const message ="The next chapter of the Cosmic Con saga is currently being forged in the stars.✨<br>Check back soon to uncover new panels, puzzles, and cosmic adventures! 🚀"
player.SetVar("comingSoon", message)
}

window.Script8 = function()
{
  var player = GetPlayer();

let dots = 0;
let animInterval = null;
const activityDone = player.GetVar("estadoEnvio")
if(activityDone=="ya_resuelto"){
	player.SetVar("mensajeUsuarioLeaderboard", "🤨 You have already submitted this activity");
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
        mensaje = "🎉 Congratulations! You're in the top 8 of the leaderboard, position #" + posicion + ".";
      } else {
        const puntosFormateados = puntosFaltantes.toFixed(1);
        mensaje =  `Keep going! You're currently in position #${posicion} and need ${puntosFormateados} more points to reach the top 8.`;
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

window.Script9 = function()
{
  
var player = GetPlayer();
var emailCompleto = player.GetVar("emailUsuario");
var email = emailCompleto.split("@")[0]; // Elimina el dominio
var actividad = player.GetVar("currentActivity");
var puntos = player.GetVar("activityPoints");
const endpoint = player.GetVar("endpointLeaderboard"); // <-- Usamos la variable
fetch(endpoint + "?action=registrarActividad&email=" 
  + encodeURIComponent(email) 
  + "&actividad=" + encodeURIComponent(actividad) 
  + "&puntos=" + encodeURIComponent(puntos))
.then(response => response.json())
.then(data => {
  player.SetVar("puntosTotales", data.totalPuntos);
  player.SetVar("estadoEnvio", data.status);
  player.SetVar("showLeaderboard", true);
})
.catch(error => {
  console.error("Error al registrar actividad:", error);
  player.SetVar("estadoEnvio", "fallo_conexion");
});




}

};
