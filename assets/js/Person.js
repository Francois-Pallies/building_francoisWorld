class Person extends GameObject {
    constructor(config) {
      super(config);
      this.movingProgressRemaining = 0;
  
      this.isPlayerControlled = config.isPlayerControlled || false;
  
      this.directionUpdate = {
        "up": ["y", -1],
        "down": ["y", 1],
        "left": ["x", -1],
        "right": ["x", 1],
      }
    }
  
    update(state) {
      if (this.movingProgressRemaining > 0) {
        this.updatePosition();
      } else {
  
        //More cases for starting to walk will come here
        //
        //
  
        //Case: We're keyboard ready and have an arrow pressed
        if (!state.map.isCutscenePlaying && this.isPlayerControlled && state.arrow) {
          this.startBehavior(state, {
            type: "walk",
            direction: state.arrow
          })
        }
        this.updateSprite(state);
      }
    }

    startBehavior(state, behavior) {
      //Définir la direction en fonction du "behavior"
      this.direction = behavior.direction;

      if (behavior.type === "walk") {

        //S'arréter là si destination non libre
        if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {

          behavior.retry && setTimeout(() => {
            this.startBehavior(state, behavior)
          }, 10);

          return;
        }

        //Prêt à marcher
        state.map.moveWall(this.x, this.y, this.direction)
        this.movingProgressRemaining = 32;
        this.updateSprite(state);
      }

      if (behavior.type === "stand") {
        setTimeout(() => {
          utils.emitEvent("PersonStandComplete", {
            whoId: this.id
          })
        }, behavior.time)
      }

      if (behavior.type === "playing-music") {
        setTimeout(() => {
          utils.emitEvent("PersonPlayingComplete", {
            whoId: this.id
          })
        }, behavior.time)
        this.updateSprite();
      }

    }
  
    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction];
        this[property] += change;
        this.movingProgressRemaining -= 1;

        if (this.movingProgressRemaining === 0) {
          //We finished the walk!
          utils.emitEvent("PersonWalkingComplete", {
            whoId: this.id
          })
        }

    }


     updateSprite() {
      if (this.movingProgressRemaining > 0) {
        this.sprite.setAnimation("walk-"+this.direction);
        return;
      } 
    
      this.sprite.setAnimation("idle-"+this.direction);
    }  

    /*updateSprite() {
      if (this.movingProgressRemaining > 0) {
        this.sprite.setAnimation("walk-"+this.direction);
        return;
      } else if (behavior.type === "playing-music") {
        this.sprite.setAnimation("playing-music");
      }
    
      this.sprite.setAnimation("idle-"+this.direction);
       this.sprite.setAnimation("playing-music"); 
    } */
  }