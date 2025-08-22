function ExecuteScript(strId)
{
  switch (strId)
  {
      case "5whkyNZB4NL":
        Script1();
        break;
      case "5kpDbIAxMBc":
        Script2();
        break;
      case "5mc6lFFspSq":
        Script3();
        break;
      case "6qnSbQ9H7sU":
        Script4();
        break;
      case "6rUKPxcm0F8":
        Script5();
        break;
      case "6pdo8wNMRDM":
        Script6();
        break;
      case "61VWsVAG8qa":
        Script7();
        break;
      case "5fQBhM9GtyZ":
        Script8();
        break;
      case "6S6m34MQ04L":
        Script9();
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

};
