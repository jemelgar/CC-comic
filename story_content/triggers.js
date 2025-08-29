function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6N19hPqUPwa":
        Script1();
        break;
      case "5hAHlUoMG2H":
        Script2();
        break;
      case "6c4L5KTOy1F":
        Script3();
        break;
      case "6DyYGAaoqaw":
        Script4();
        break;
      case "6rFCc7bDen3":
        Script5();
        break;
      case "5b3hVwhOmBJ":
        Script6();
        break;
      case "6g9HyZSDP4e":
        Script7();
        break;
      case "5WyjtDdX0wn":
        Script8();
        break;
      case "5mC08GjNM7R":
        Script9();
        break;
      case "6In32UMqyy5":
        Script10();
        break;
      case "6EC5PSDNWBU":
        Script11();
        break;
      case "5hjsThA16aC":
        Script12();
        break;
      case "6rRiBFO3ZfH":
        Script13();
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
