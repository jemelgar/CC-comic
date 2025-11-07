function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6JGwxeU2OcA":
        Script1();
        break;
      case "5orXePyh0tS":
        Script2();
        break;
      case "6MkvxXDaIFR":
        Script3();
        break;
      case "6rGpc3BNyss":
        Script4();
        break;
      case "5d5pwKEzqVh":
        Script5();
        break;
      case "5ZNlpUKliAD":
        Script6();
        break;
      case "5csJoaAFnpV":
        Script7();
        break;
      case "6kc1K0rA407":
        Script8();
        break;
      case "6mCOUY2zXyg":
        Script9();
        break;
      case "6cP53axIQHU":
        Script10();
        break;
      case "69gKGREKqZI":
        Script11();
        break;
      case "6Gc8WmVVErN":
        Script12();
        break;
      case "5mRbEwwonKc":
        Script13();
        break;
      case "5UkBaXk9HKC":
        Script14();
        break;
      case "6SkgEIyQLTX":
        Script15();
        break;
      case "5vfiGJ3sqJL":
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
