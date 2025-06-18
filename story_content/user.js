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
window.Script1 = function()
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

window.Script2 = function()
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

window.Script3 = function()
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

window.Script4 = function()
{
  var player = GetPlayer();
player.SetVar("startTime", new Date().getTime());

}

window.Script5 = function()
{
  var player = GetPlayer();

const expected = {
  // Word 1: coalition
  "TextEntry": "c",
  "TextEntry1": "o",
  "TextEntry2": "a",
  "TextEntry3": "l",
  "TextEntry4": "i",
  "TextEntry9": "t",
  "TextEntry8": "i",
  "TextEntry7": "o",
  "TextEntry6": "n",

  // Word 2: entropy
  "n5": "e",
  "n4": "n",
  "n3": "t",
  "n1": "r",
  "n2": "p",
  "p1": "y", // Corrected from earlier
  // "TextEntry7": "o", // reused from word1-o
  // "TextEntry6": "n", // reused from word1-n

  // Word 3: navigators
  "c1": "a",
  "o2": "v",
  "a1": "i",
  "l1": "g",
  "i2": "a",
  "t1": "t",
  "i1": "o",
  "o1": "r",
  "n6": "s"
};

let allCorrect = true;

Object.entries(expected).forEach(([varName, correctLetter]) => {
  let input = player.GetVar(varName);
  if (typeof input === "string") {
    input = input.trim().toLowerCase();
  } else {
    input = "";
  }

  if (input !== correctLetter) {
    player.SetVar(varName, ""); // Clear incorrect entry
    allCorrect = false;
  }
});

// Set Storyline variable to trigger Success layer
player.SetVar("allCorrect", allCorrect);
if(allCorrect){
player.SetVar("EndTime", new Date().getTime());
var timeTaken = (player.GetVar("EndTime") - player.GetVar("startTime")) / 1000;
player.SetVar("totalTime", timeTaken);

// Configuración
var basePoints = 10;
var minPoints = 2;
var tiempoReferencia = 40;

var puntos = basePoints * (tiempoReferencia / timeTaken);
puntos = Math.max(minPoints, puntos); // Aplicar mínimo
puntos = Math.round(puntos * 10) / 10; // Redondear a 1 decimal
player.SetVar("activityPoints", puntos);
}

}

};
