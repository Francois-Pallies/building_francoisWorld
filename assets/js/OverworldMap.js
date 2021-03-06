class OverworldMap {
    constructor(config) {
      this.gameObjects = config.gameObjects;
      this.walls = config.walls || {};

      this.lowerImage = new Image();
      this.lowerImage.src = config.lowerSrc;

      this.upperImage = new Image();
      this.upperImage.src = config.upperSrc;

      this.isCutscenePlaying = false;
    }
  
    drawLowerImage(ctx, cameraPerson) {
      ctx.drawImage(
        this.lowerImage,
        utils.withGrid(10.5) - cameraPerson.x,  //CameraX
        utils.withGrid(6) - cameraPerson.y)     //CameraY
    }
  
    drawUpperImage(ctx, cameraPerson) {
      ctx.drawImage(this.upperImage,
        utils.withGrid(10.5) - cameraPerson.x,  //CameraX
        utils.withGrid(6) - cameraPerson.y)     //CameraY
    }
    
    isSpaceTaken(currentX, currentY, direction) {
      const {x,y} = utils.nextPosition(currentX, currentY, direction);
      console.log(this.walls[`${x},${y}`])
      return this.walls[`${x},${y}`] || false;
    }

    mountObjects() {
      Object.keys(this.gameObjects).forEach(key => {

        let object = this.gameObjects[key];
        object.id = key;

        //A faire: Determiner si l'objet doit être monté
        object.mount(this);
      })
    }

    async startCutscene(events) {
      this.isCutscenePlaying = true;
  
      for (let i=0; i<events.length; i++) {
        const eventHandler = new OverworldEvent({
          event: events[i],
          map: this,
        })
        await eventHandler.init();
      }
  
      this.isCutscenePlaying = false;
    }

    addWall(x,y) {
      this.walls[`${x},${y}`] = true;
    }

    removeWall(x,y) {
      delete this.walls[`${x},${y}`];
    }
    moveWall(wasX, wasY, direction) {
      this.removeWall(wasX, wasY);
      const {x,y} = utils.nextPosition(wasX, wasY, direction);
      this.addWall(x,y);
    }
  }
  
  window.OverworldMaps = {
    
    DemoRoom: {
      lowerSrc: "assets/images/maps/DemoLower.png",
      upperSrc: "assets/images/maps/DemoUpper.png",
      gameObjects: {
        hero: new Person({
            isPlayerControlled: true, 
          x: utils.withGrid(5),
          y: utils.withGrid(6),
        }),
      /*  npc1: new Person({
          x: utils.withGrid(7),
          y: utils.withGrid(9),
          src: "assets/images/characters/people/npc1.png"
        }) */
      }
    },
    
    Museum2: {
      lowerSrc: "assets/images/francois_world/maps/Museum_Lower.png",
      upperSrc: "assets/images/francois_world/maps/Museum_Upper.png",
      gameObjects: {
        hero: new Person({
          useShadow: true,
          isPlayerControlled: true, 
          direction: "up",
      /*     x: utils.withGrid(8),
          y: utils.withGrid(23), */
       x: utils.withGrid(57),
          y: utils.withGrid(36),
        }),
        //Tableau 1
        francoisBebe: new Person({
          useShadow: true,
          x: utils.withGrid(43),
          y: utils.withGrid(30),
          src: "assets/images/characters/people/npc2.png",
          animationFrameLimit: 32,       
          behaviorLoop: [
            {type: "walk", direction: "left"},
            {type: "stand", direction: "down", time: 1000},
            {type: "stand", direction: "up", time: 3000},
            {type: "stand", direction: "left", time: 1500},
            {type: "walk", direction: "right"},
            {type: "walk", direction: "left"},
            {type: "walk", direction: "right"},
            {type: "stand", direction: "down", time: 3000},
            {type: "walk", direction: "down"},
            {type: "stand", direction: "down", time: 3000},
            {type: "stand", direction: "right", time: 3000},
            {type: "stand", direction: "down", time: 3000},
            {type: "walk", direction: "left"},
            {type: "stand", direction: "down", time: 3000},
            {type: "stand", direction: "right", time: 3000},
            {type: "stand", direction: "down", time: 3000},
            {type: "stand", direction: "up", time: 3000},
            {type: "walk", direction: "right"},
            {type: "walk", direction: "up"},
          ]
        }),
        maman: new Person({
          useShadow: true,
          x: utils.withGrid(40),
          y: utils.withGrid(30),
          src: "assets/images/characters/people/1986maman2.png",  
          direction: "playing",
          animationFrameLimit: 32        
        }),
        papa: new Person({
          x: utils.withGrid(47),
          y: utils.withGrid(30),
          src: "assets/images/characters/people/1986papa2.png",
          direction: "playing",
          animationFrameLimit: 64       
        }),
        //Tableau 2
        francoisTrompette: new Person({
          useShadow: true,
          x: utils.withGrid(33),
          y: utils.withGrid(30),
          src: "assets/images/characters/people/francois_trompette.png",
          direction: "playingTrumpet",
          animationFrameLimit: 32
        }),
        //Tableau 3
        lqdrJess: new Person({
          x: utils.withGrid(23),
          y: utils.withGrid(29.5),
          src: "assets/images/characters/people/lqdrJess.png",
          direction: "playing",
          animationFrameLimit: 32
        }),
        lqdrBaptiste: new Person({
          useShadow: true,
          x: utils.withGrid(21),
          y: utils.withGrid(30),
          src: "assets/images/characters/people/lqdrBaptiste.png",
          direction: "playingGuitare",
          animationFrameLimit: 16
        }),
        lqdrFrancois: new Person({
          useShadow: true,
          x: utils.withGrid(23),
          y: utils.withGrid(31),
          src: "assets/images/characters/people/lqdrFrancois.png",
          animationFrameLimit: 16,
          behaviorLoop: [
            {type: "stand", direction: "working", time: 5000},
            {type: "walk", direction: "right"},
            {type: "walk", direction: "right"},
            {type: "walk", direction: "right"},
            {type: "walk", direction: "right"},
            {type: "walk", direction: "right"},
            {type: "walk", direction: "right"},
            {type: "walk", direction: "up"},
            {type: "walk", direction: "left"},
            {type: "walk", direction: "left"},
            {type: "walk", direction: "left"},
            {type: "stand", direction: "bassPlaying", time: 8000},
            {type: "walk", direction: "right"},
            {type: "walk", direction: "right"},
            {type: "walk", direction: "right"},
            {type: "walk", direction: "down"},
            {type: "walk", direction: "left"},
            {type: "walk", direction: "left"},
            {type: "walk", direction: "left"},
            {type: "walk", direction: "left"},
            {type: "walk", direction: "left"},
            {type: "walk", direction: "left"} 
          ]
        }),
        //Tableau 4
        saberFrancois: new Person({
          useShadow: true,
          x: utils.withGrid(13),
          y: utils.withGrid(30),
          src: "assets/images/characters/people/saberFrancois.png",
          direction: "playingSaber",
          animationFrameLimit: 8,
        }),
        //Tableau 5
        celebration1: new Person({
          x: utils.withGrid(6),
          y: utils.withGrid(17),
          src:"assets/images/characters/people/celebrate.png",
          direction: "celebrate",
          animationFrameLimit: 16
        }),
        celebration2: new Person({
          x: utils.withGrid(8),
          y: utils.withGrid(17),
          src:"assets/images/characters/people/celebrate.png",
          direction: "celebrate",
          animationFrameLimit: 16
        }),
        celebration3: new Person({
          x: utils.withGrid(10),
          y: utils.withGrid(17),
          src:"assets/images/characters/people/celebrate.png",
          direction: "celebrate",
          animationFrameLimit: 16
        }),
        celebration4: new Person({
          x: utils.withGrid(6),
          y: utils.withGrid(19),
          src:"assets/images/characters/people/celebrate.png",
          direction: "celebrate",
          animationFrameLimit: 16
        }),
        celebration5: new Person({
          x: utils.withGrid(8),
          y: utils.withGrid(19),
          src:"assets/images/characters/people/celebrate.png",
          direction: "celebrate",
          animationFrameLimit: 16
        }),
        celebration6: new Person({
          x: utils.withGrid(10),
          y: utils.withGrid(19),
          src:"assets/images/characters/people/celebrate.png",
          direction: "celebrate",
          animationFrameLimit: 16
        }),
        celebration7: new Person({
          x: utils.withGrid(6),
          y: utils.withGrid(21),
          src:"assets/images/characters/people/celebrate.png",
          direction: "celebrate",
          animationFrameLimit: 16
        }),
        francoisCelebrate: new Person({
          useShadow: true,
          x: utils.withGrid(8),
          y: utils.withGrid(21),
          src: "assets/images/characters/people/francoisCelebrate.png",
          direction: "celebrate",
          animationFrameLimit: 16
        }),
        celebration8: new Person({
          x: utils.withGrid(10),
          y: utils.withGrid(21),
          src:"assets/images/characters/people/celebrate.png",
          direction: "celebrate",
          animationFrameLimit: 16
        }),
        //Tableau 6
        francoisMPTDM: new Person ({
          useShadow: true,
          x: utils.withGrid(15),
          y: utils.withGrid(21),
          src: "assets/images/characters/people/francoisMPTDM.png",
          direction: "marching",
          animationFrameLimit: 64
        }),
        flag: new Person ({
          x: utils.withGrid(16),
          y: utils.withGrid(19),
          src: "assets/images/francois_world/objects/flag.png",
          direction: "flag",
          animationFrameLimit: 16
        }) 
      },
      walls: {
        //Murs Extérieurs
        ...utils.generateWall(false)(2,52)(22),
        ...utils.generateWall(false)(53,61)(21),
        ...utils.generateWall(false)(62,107)(22),

        ...utils.generateWall(true)(22,35)(108),

        ...utils.generateWall(false)(4,55)(36),
        ...utils.generateWall(false)(55,59)(37),
        ...utils.generateWall(false)(59,107)(36),
        ...utils.generateWall(true)(16,36)(3),

        //Murs intérieurs
          //Gauche
        ...utils.generateWall(false)(10,51)(26),
        ...utils.generateWall(true)(26,32)(51),
        ...utils.generateWall(false)(10,51)(32),
        ...utils.generateWall(true)(32,26)(10),

          //Centre
        ...utils.generateWall(false)(55,59)(26),
        ...utils.generateWall(true)(26,32)(59),
        ...utils.generateWall(false)(55,59)(32),
        ...utils.generateWall(true)(26,32)(55),

          //Droite
        ...utils.generateWall(false)(63,101)(26),
        ...utils.generateWall(true)(26,32)(101),
        ...utils.generateWall(false)(63,101)(32),
        ...utils.generateWall(true)(26,32)(63),
      }
    },
    Museum: {
      lowerSrc: "assets/images/francois_world/maps/whoamiMuseum_lowerLayer.png",
      upperSrc: "assets/images/francois_world/maps/whoamiMuseum_upperLayer.png",
      gameObjects: {
        hero: new Person({
          isPlayerControlled: true, 
          direction: "up",
          x: utils.withGrid(1),
          y: utils.withGrid(11),
        }),
        francoisBebe: new Person({
          x: utils.withGrid(5),
          y: utils.withGrid(4),
          src: "assets/images/characters/people/npc2.png",
          animationFrameLimit: 32,       
          behaviorLoop: [
            {type: "walk", direction: "left"},
            {type: "stand", direction: "down", time: 1000},
            {type: "stand", direction: "up", time: 3000},
            {type: "stand", direction: "left", time: 1500},
            {type: "walk", direction: "right"},
            {type: "walk", direction: "left"},
            {type: "walk", direction: "right"},
            {type: "stand", direction: "down", time: 3000},
            {type: "walk", direction: "down"},
            {type: "stand", direction: "down", time: 3000},
            {type: "stand", direction: "right", time: 3000},
            {type: "stand", direction: "down", time: 3000},
            {type: "walk", direction: "left"},
            {type: "stand", direction: "down", time: 3000},
            {type: "stand", direction: "right", time: 3000},
            {type: "stand", direction: "down", time: 3000},
            {type: "stand", direction: "up", time: 3000},
            {type: "walk", direction: "right"},
            {type: "walk", direction: "up"},
          ]
        }),
        maman: new Person({
          x: utils.withGrid(2),
          y: utils.withGrid(4),
          src: "assets/images/characters/people/1986maman2.png",  
          direction: "playing",
          animationFrameLimit: 32        
        }),
        papa: new Person({
          x: utils.withGrid(9),
          y: utils.withGrid(4),
          src: "assets/images/characters/people/1986papa2.png",
          direction: "playing",
          animationFrameLimit: 64       
        }),

      },
      walls: {
        //Mur Gauche
        [utils.asGridCoord(-1,7)] : true,
        [utils.asGridCoord(-1,8)] : true,
        [utils.asGridCoord(-1,9)] : true,
        [utils.asGridCoord(-1,10)] : true,
        //Mur Droite
        [utils.asGridCoord(39,7)] : true,
        [utils.asGridCoord(39,8)] : true,
        [utils.asGridCoord(39,9)] : true,
        [utils.asGridCoord(39,10)] : true,
        //Mur Bas pièce
        [utils.asGridCoord(0,11)] : true,
        [utils.asGridCoord(1,12)] : true,
        [utils.asGridCoord(2,11)] : true,
        [utils.asGridCoord(3,11)] : true,
        [utils.asGridCoord(4,11)] : true,
        [utils.asGridCoord(5,11)] : true,
        [utils.asGridCoord(6,11)] : true,
        [utils.asGridCoord(7,11)] : true,
        [utils.asGridCoord(8,11)] : true,
        [utils.asGridCoord(9,11)] : true,
        [utils.asGridCoord(10,11)] : true,
        [utils.asGridCoord(11,11)] : true,
        [utils.asGridCoord(12,11)] : true,
        [utils.asGridCoord(13,11)] : true,
        [utils.asGridCoord(14,11)] : true,
        [utils.asGridCoord(15,11)] : true,
        [utils.asGridCoord(16,11)] : true,
        [utils.asGridCoord(17,11)] : true,
        [utils.asGridCoord(18,11)] : true,
        [utils.asGridCoord(19,11)] : true,
        [utils.asGridCoord(20,11)] : true,
        [utils.asGridCoord(21,11)] : true,
        [utils.asGridCoord(22,11)] : true,
        [utils.asGridCoord(23,11)] : true,
        [utils.asGridCoord(24,11)] : true,
        [utils.asGridCoord(25,11)] : true,
        [utils.asGridCoord(26,11)] : true,
        [utils.asGridCoord(27,11)] : true,
        [utils.asGridCoord(28,11)] : true,
        [utils.asGridCoord(29,11)] : true,
        [utils.asGridCoord(30,11)] : true,
        [utils.asGridCoord(31,11)] : true,
        [utils.asGridCoord(32,11)] : true,
        [utils.asGridCoord(33,11)] : true,
        [utils.asGridCoord(34,11)] : true,
        [utils.asGridCoord(35,11)] : true,
        [utils.asGridCoord(36,11)] : true,
        [utils.asGridCoord(37,11)] : true,
        [utils.asGridCoord(38,11)] : true,
        //Mur vitré
        [utils.asGridCoord(0,6)] : true,
        [utils.asGridCoord(1,6)] : true,
        [utils.asGridCoord(2,6)] : true,
        [utils.asGridCoord(3,6)] : true,
        [utils.asGridCoord(4,6)] : true,
        [utils.asGridCoord(5,6)] : true,
        [utils.asGridCoord(6,6)] : true,
        [utils.asGridCoord(7,6)] : true,
        [utils.asGridCoord(8,6)] : true,
        [utils.asGridCoord(9,6)] : true,
        [utils.asGridCoord(10,6)] : true,
        [utils.asGridCoord(11,6)] : true,
        [utils.asGridCoord(12,6)] : true,
        [utils.asGridCoord(13,6)] : true,
        [utils.asGridCoord(14,6)] : true,
        [utils.asGridCoord(15,6)] : true,
        [utils.asGridCoord(16,6)] : true,
        [utils.asGridCoord(17,6)] : true,
        [utils.asGridCoord(18,6)] : true,
        [utils.asGridCoord(19,6)] : true,
        [utils.asGridCoord(20,6)] : true,
        [utils.asGridCoord(21,6)] : true,
        [utils.asGridCoord(22,6)] : true,
        [utils.asGridCoord(23,6)] : true,
        [utils.asGridCoord(24,6)] : true,
        [utils.asGridCoord(25,6)] : true,
        [utils.asGridCoord(26,6)] : true,
        [utils.asGridCoord(27,6)] : true,
        [utils.asGridCoord(28,6)] : true,
        [utils.asGridCoord(29,6)] : true,
        [utils.asGridCoord(30,6)] : true,
        [utils.asGridCoord(31,6)] : true,
        [utils.asGridCoord(32,6)] : true,
        [utils.asGridCoord(33,6)] : true,
        [utils.asGridCoord(34,6)] : true,
        [utils.asGridCoord(35,6)] : true,
        [utils.asGridCoord(36,6)] : true,
        [utils.asGridCoord(38,6)] : true,
        [utils.asGridCoord(37,6)] : true,
        //Colones
        [utils.asGridCoord(11,7)] : true,
        [utils.asGridCoord(12,7)] : true,

        [utils.asGridCoord(24,7)] : true,
        [utils.asGridCoord(25,7)] : true,

        [utils.asGridCoord(37,7)] : true,
        [utils.asGridCoord(38,7)] : true,
      }
    }
  }