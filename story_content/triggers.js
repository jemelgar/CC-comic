function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6ckhPPYSynI":
        Script1();
        break;
      case "6MGa31LyGlJ":
        Script2();
        break;
      case "5fO26SgQWQx":
        Script3();
        break;
      case "6BcJT7AvSYt":
        Script4();
        break;
      case "5kTYolGumat":
        Script5();
        break;
      case "63t19zsa6ml":
        Script6();
        break;
      case "5ekNiM9wEx1":
        Script7();
        break;
      case "6heecfapkGq":
        Script8();
        break;
      case "62RFoA8djz9":
        Script9();
        break;
      case "5YhxwDmLbxB":
        Script10();
        break;
      case "5etZgmP49Qv":
        Script11();
        break;
      case "6SiE8YMorDK":
        Script12();
        break;
      case "6kO0PrX8n8w":
        Script13();
        break;
      case "5ZQeuZNynUe":
        Script14();
        break;
      case "6UaGUwWHwhf":
        Script15();
        break;
      case "6adfEMAffvT":
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
