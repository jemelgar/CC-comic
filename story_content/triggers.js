function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6iYkxxHWW01":
        Script1();
        break;
      case "6Gr0mg9C6he":
        Script2();
        break;
      case "6I90bDVLycs":
        Script3();
        break;
      case "5hsoIGKVnIj":
        Script4();
        break;
      case "5sgigRlMHqv":
        Script5();
        break;
      case "6jKRDkSUDTp":
        Script6();
        break;
      case "6ZbOsRQtXO1":
        Script7();
        break;
      case "6l4rb2yOc0B":
        Script8();
        break;
      case "5qtojrv8Ery":
        Script9();
        break;
      case "6jW4MRJkTml":
        Script10();
        break;
      case "60GfQdJqtm1":
        Script11();
        break;
      case "6R1HT4C8hH1":
        Script12();
        break;
      case "5Vx5e10Hvps":
        Script13();
        break;
      case "5c5lCY9dJ4E":
        Script14();
        break;
      case "6YQ8PxJktfW":
        Script15();
        break;
      case "6f9PN1zhuHR":
        Script16();
        break;
  }
}

window.InitExecuteScripts = function()
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
  const target = object('6aqck7spt7P');
const duration = 750;
const easing = 'ease-out';
const id = '5iKnM5EeMvV';
player.addForTriggers(
id,
target.animate(
[ {opacity: 1 }, 
{opacity: 0 }, 
{opacity: 1 }, 
{opacity: 0 }, 
{opacity: 1 } ]
,
  { fill: 'forwards', duration, easing }
)
);
}

window.Script2 = function()
{
  const target = object('6aqck7spt7P');
const duration = 750;
const easing = 'ease-out';
const id = '5iKnM5EeMvV';
player.addForTriggers(
id,
target.animate(
[ {opacity: 1 }, 
{opacity: 0 }, 
{opacity: 1 }, 
{opacity: 0 }, 
{opacity: 1 } ]
,
  { fill: 'forwards', duration, easing }
)
);
}

window.Script3 = function()
{
  player.once(() => {
const target = object('6RdICGfjPPU');
const duration = 750;
const easing = 'cubic-bezier(0.25, 1, 0.5, 1)';
const id = '660V9uWgqx3';
const growAmount = 1;
const delay = 0;
addToTimeline(
target.animate(
player.emphasis.elastic(growAmount)
,
  { fill: 'forwards', delay, duration, easing }
), id
);
});
}

window.Script4 = function()
{
  const target = object('6RdICGfjPPU');
const duration = 750;
const easing = 'cubic-bezier(0.25, 1, 0.5, 1)';
const id = '660V9uWgqx3';
const growAmount = 1;
player.addForTriggers(
id,
target.animate(
player.emphasis.elastic(growAmount)
,
  { fill: 'forwards', duration, easing }
)
);
}

};
