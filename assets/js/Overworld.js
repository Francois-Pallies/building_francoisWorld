class Overworld {
    constructor(config) {
      this.element = config.element;
      this.canvas = this.element.querySelector(".game-canvas");
      this.ctx = this.canvas.getContext("2d");
      this.map = null;
    }
   
    startGameLoop() {
      const step = () => {
   
        //Clear off the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
   
        //Définition de la caméra sur Person
        const cameraPerson = this.map.gameObjects.hero; //Changer hero en pnj/npc pour fixer la caméra sur autre sujet

        //Mise à jour de tous les objets
        Object.values(this.map.gameObjects).forEach(object => {
          object.update({
            arrow: this.directionInput.direction,
            map: this.map,
          });
        })

        //Draw Lower layer
        this.map.drawLowerImage(this.ctx, cameraPerson);

   
        //Draw Game Objects
        Object.values(this.map.gameObjects).sort((a,b) => {
          return a.y - b.y;
        }).forEach(object => {
          object.sprite.draw(this.ctx, cameraPerson);
        })
   
        //Draw Upper layer
        this.map.drawUpperImage(this.ctx, cameraPerson);
   
   
        window.setTimeout(step, 10)
      }
      step();
    }
   
    init() {
      this.map = new OverworldMap(window.OverworldMaps.Museum2);
      this.map.mountObjects();

/*         console.log(this.map.walls);
      console.log(this.map.roomWalls); */

      this.directionInput = new DirectionInput();
      this.directionInput.init();
      this.directionInput.direction;

      this.startGameLoop();
     
   /*    this.map.startCutscene([
        {who: "hero", type: "walk", direction: "up" },
        {who: "hero", type: "walk", direction: "up" },
        {who: "hero", type: "walk", direction: "right" },
        {who: "hero", type: "walk", direction: "right" },
        {who: "hero", type: "walk", direction: "right" },
        {who: "hero", type: "walk", direction: "right" },
        {who: "hero", type: "walk", direction: "right" }
      ]); */
   
    }
   
   }