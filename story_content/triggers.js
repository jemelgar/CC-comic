function ExecuteScript(strId)
{
  switch (strId)
  {
      case "5hYft5HMXoN":
        Script1();
        break;
      case "5c7RhnVBCox":
        Script2();
        break;
      case "6CD6SMWpB97":
        Script3();
        break;
      case "61so8kEac5J":
        Script4();
        break;
      case "5lAiK85bjjm":
        Script5();
        break;
      case "6dQsUqNcnJQ":
        Script6();
        break;
      case "5V8ow6DE35Z":
        Script7();
        break;
      case "5p5Mbfg8rwT":
        Script8();
        break;
      case "6hjjUduhJKC":
        Script9();
        break;
      case "5bz1CzV2Npz":
        Script10();
        break;
      case "6X1E2HNeyMK":
        Script11();
        break;
      case "6nGCwwcBQjU":
        Script12();
        break;
      case "5cIHttHZiXp":
        Script13();
        break;
      case "6aI6E7V1Yg2":
        Script14();
        break;
      case "5aCFvHyZuh5":
        Script15();
        break;
      case "64jzPrgXHsd":
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
