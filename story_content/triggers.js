function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6708w6yC6mv":
        Script1();
        break;
      case "6hwitcIRr0B":
        Script2();
        break;
      case "6OAYZPVrnrt":
        Script3();
        break;
      case "6NUmcmARN1o":
        Script4();
        break;
      case "6ku8KDSfA0p":
        Script5();
        break;
      case "5kySrXTD2ZE":
        Script6();
        break;
      case "6kXbitOa6L7":
        Script7();
        break;
      case "5p91YvbbXLp":
        Script8();
        break;
      case "5aeN1CNQmba":
        Script9();
        break;
      case "66sZVDc7ofy":
        Script10();
        break;
      case "5uXX1lCPnUh":
        Script11();
        break;
      case "5rai34EOanJ":
        Script12();
        break;
      case "6MSp1UKNQYb":
        Script13();
        break;
      case "600DOMECJ2d":
        Script14();
        break;
      case "5ZTF3hD7W2S":
        Script15();
        break;
      case "6rak3M51f4c":
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
