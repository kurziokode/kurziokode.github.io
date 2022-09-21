//* --------------------------------------- PIXI APP
//* --------------------------------------- PIXI APP
console.clear();
let resized = true;
let updatePosition = true;
let h = window.innerHeight;
let w = window.innerWidth;
const $view = document.querySelector("#view");
const $btns = document.querySelectorAll(".btns__each");

const app = new PIXI.Application({
  //transparent: true,
  width: window.innerWidth,
  height: window.innerHeight,
  antialias: true,
  backgroundAlpha: 0,
  view: $view });


// ___________________________________ GET ASSETS
// ___________________________________ GET ASSETS
const loader = new PIXI.Loader();
const texturesArr = [];
for (let i = 1; i < 12; i++) {
  let path = i;
  if (i < 10) {path = `0${i}`;}
  loader.add('pat' + path, 'https://raw.githubusercontent.com/Efetivos/gallery/master/patts/pat' + path + '.png');

}

loader.load((loader, resources) => {
  initApp(loader);
  console.log(texturesArr);
});
function initApp(loader) {
  //
  // SETUP PIXI ELS
  // ====================================================
  const screen = app.screen;
  const bgSize = new PIXI.Rectangle(0, 0, 1920, 1080);
  const bgContainer = new PIXI.Container();

  app.stage.interactive = true;
  app.stage.filterArea = screen;
  app.stage.addChild(bgContainer);




  //
  // CREATING FILTER
  // ====================================================

  var displacementSprite = new PIXI.Sprite.from('https://farm3.static.flickr.com/2818/32798023203_a64284bd13_b.jpg');
  //displacementSprite.anchor.set(0.5);
  displacementSprite.width = w;
  displacementSprite.height = h;

  var displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
  displacementFilter.scale.x = 0;
  displacementFilter.scale.y = 0;


  const maskRadius = w * 10;
  const bulgeCenter = new PIXI.Point(0.5, 0.5);
  const bulgeFilter = new PIXI.filters.ShockwaveFilter([window.innerWidth / 2, h * 0.9], {
    amplitude: 280,
    wavelength: 1800,
    radius: window.innerWidth * 1.8,
    brightness: 1.2,
    padding: 100 });

  bgContainer.filters = [displacementFilter];
  window.filter = bulgeFilter;


  //
  // CREATING ELEMENTS
  // ====================================================
  const blurFilter = new PIXI.filters.BlurFilter();
  blurFilter.blur = 8;
  var text = ["A", "a"];
  var colors = ["#0bb40f", "#191919", "#88ce04", "#265900"];
  var itemsArray = [];
  var totalitems = 40;
  var padding_bounds = 100;
  var itemsBounds;
  var bounds = {
    width: window.innerWidth + padding_bounds * 2,
    height: window.innerHeight + padding_bounds * 2 };



  for (var i = 0; i < totalitems; i++) {
    let items = new PIXI.Text(text[Math.floor(Math.random() * (1 - 0 + 1) + 0)], {
      fontFamily: "Poppins",
      padding: 500,
      fontWeight: "400",
      fontSize: Math.floor(Math.random() * (60 - 20 + 1) + 20),
      fill: [colors[Math.floor(Math.random() * (3 - 0 + 1) + 0)]],
      wordWrap: false });



    items.blendMode = PIXI.BLEND_MODES.ADD;

    if (items.style.fontSize > 55) {
      items.style.fontSize = 99;
      //items.filters = [blurFilter]
    }
    items.turningSpeed = 0.01;
    itemsArray.push(items);
    bgContainer.addChild(items);
  }




  //
  // CREATING SPRITES
  // ====================================================
  for (let i = 0; i < 40; i++) {
    var texture = texturesArr[Math.floor(Math.random() * (22 - 0 + 1) + 0)];
    let random = Math.floor(Math.random() * (80 - 30 + 1) + 30);
    const sprite = new PIXI.Sprite(texture);
    sprite.width = random;
    sprite.height = random;
    sprite.anchor.set(0.5);
    sprite.x = Math.floor(Math.random() * app.screen.width);
    sprite.y = Math.floor(Math.random() * app.screen.height);

    sprite.blendMode = PIXI.BLEND_MODES.ADD;
    sprite.turningSpeed = 0.01;
    itemsArray.push(sprite);
    bgContainer.addChild(sprite);
  }
  //
  // SET POSITIONS
  // ====================================================

  function setPositions() {
    bounds = {
      width: window.innerWidth + padding_bounds * 2,
      height: window.innerHeight + padding_bounds * 2 };

    for (var i = 0; i < itemsArray.length; i++) {
      var items = itemsArray[i];
      items.x = Math.floor(Math.random() * app.screen.width);
      items.y = Math.floor(Math.random() * app.screen.height);
      items.direction = Math.random() * Math.PI * 2;
    }
  }
  setPositions();

  // SET NEW TEXT
  // ====================================================
  function setNewText() {
    for (var i = 0; i < itemsArray.length; i++) {
      var items = itemsArray[i];
      items.text = text[Math.floor(Math.random() * (1 - 0 + 1) + 0)];
    }
  }

  // SET NEW POSITION
  // ====================================================
  var lastPos = 0;
  var currentPos = 0;
  function newPosition() {
    for (var i = 0; i < itemsArray.length; i++) {
      let items = itemsArray[i];
      let newpos;
      if (currentPos > lastPos) {
        newpos = items.x + Math.floor(Math.random() * (w * 0.5 - w * 0.2 + 1) + w * 0.2);
      } else
      {
        newpos = items.x - Math.floor(Math.random() * (w * 0.5 - w * 0.2 + 1) + w * 0.2);
      }
      //lastPos = currentPos
      gsap.fromTo(items, { x: items.x }, { x: newpos, duration: 6, ease: "expo.inOut" });
    }
  }

  //
  // CHANGE LETTERS
  // ====================================================
  var animating = false;
  $btns.forEach((el, index) => {
    el.addEventListener("click", function () {
      if (!animating) {
        animating = true;
        text[0] = el.dataset.upper;
        text[1] = el.dataset.lower;
        currentPos = index;
        newPosition();
        gsap.delayedCall(3, () => {setNewText();});
        gsap.delayedCall(6.01, () => {lastPos = currentPos;animating = false;});
        gsap.timeline().
        to(displacementFilter.scale, { x: 200, duration: 2.5, ease: 'expo.in' }).
        to(displacementFilter.scale, { delay: 1, x: 0, duration: 2.5, ease: 'expo.out' });
      }
    });
  });

  //
  // MOVER CIRCLES
  // ====================================================

  let speed = 0.2;
  let one = false;
  function moveSprites() {
    for (var i = 0; i < itemsArray.length; i++) {

      var items = itemsArray[i];
      items.direction += 0;
      items.y -= items.direction * speed;
      //items.y += Math.cos(items.direction) * items.speed;
      items.rotation += items.direction * 0.0000 - Math.PI * 0.000000;

      // wrap the itemss by testing their bounds...
      if (items.x < -padding_bounds) {
        items.x += bounds.width;
      } else if (items.x > -padding_bounds + bounds.width) {
        items.x -= bounds.width;
      }

      if (items.y < -padding_bounds) {
        items.y += bounds.height;
      } else if (items.y > -padding_bounds + bounds.height) {
        items.y -= bounds.height;
      }


      if (i == 0) {
        if (!one) {
          one = true;
        }
      }
    } //close FOR
  }

  //
  // ON TICK
  // ===========================================================================
  app.ticker.add(onTick);
  window.addEventListener("resize", () => resized = true);

  function onTick(delta) {
    moveSprites();
    if (resized) {
      onResize();
      updatePosition = true;
      resized = false;
    }
  }

  //
  // ON RESIZE
  // ===========================================================================
  function onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    setPositions();
    app.renderer.resize(w, h);
  }
}
