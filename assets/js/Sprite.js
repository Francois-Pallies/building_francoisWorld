class Sprite {
    constructor(config) {
  
      //Set up the image
      this.image = new Image();
      this.image.src = config.src;
      this.image.onload = () => {
        this.isLoaded = true;
      }
  
      //Shadow
      this.shadow = new Image();
      this.useShadow = true; //config.useShadow || false
      if (this.useShadow) {
        this.shadow.src = "assets/images/characters/shadow64x64.png";
      }
      this.shadow.onload = () => {
        this.isShadowLoaded = true;
      }
  
      //Configure Animation & Initial State
      this.animations = config.animations || {
        "idle-down" :   [ [0,0] ],
        "idle-playing": [ [0,0], [1,0]],
        "idle-right":   [ [0,1] ],
        "idle-up"   :   [ [0,2] ],
        "idle-left" :   [ [0,3] ],
        "walk-down" :   [ [3,0],[4,0],[3,0],[0,0],[1,0],[2,0],[1,0],[0,0] ],
        "walk-right":   [ [1,1],[0,1],[3,1],[0,1] ],
        "walk-up"   :   [ [1,2],[2,2],[1,2],[0,2],[3,2],[4,2],[3,2],[0,2] ],
        "walk-left" :   [ [1,3],[0,3],[3,3],[0,3] ],

      }
      this.currentAnimation =  config.currentAnimation || "playing-music" ;
      this.currentAnimationFrame = 0;
  
      this.animationFrameLimit = config.animationFrameLimit || 4;
      this.animationFrameProgress = this.animationFrameLimit;

      //Reference the game object
      this.gameObject = config.gameObject;
    }

    get frame() {
      return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }

    setAnimation(key) {
      if (this.currentAnimation !== key) {
        this.currentAnimation = key;
        this.currentAnimationFrame = 0;
        this.animationFrameProgress = this.animationFrameLimit;
      }
    }

    updateAnimationProgress() {
      //Donwtick frame progress
      if (this.animationFrameProgress > 0) {
        this.animationFrameProgress -= 1;
        return;
      }

      //reset the counter
      this.animationFrameProgress = this.animationFrameLimit;
      this.currentAnimationFrame += 1;

      if (this.frame === undefined) {
        this.currentAnimationFrame = 0;
      } 
    }
  
    draw(ctx, cameraPerson) {
      const x = this.gameObject.x - 16 + utils.withGrid(10.5) - cameraPerson.x;
      const y = this.gameObject.y - 36 + utils.withGrid(6) - cameraPerson.y;
  
      this.isShadowLoaded && ctx.drawImage(this.shadow, x , y + 1);

      const [frameX, frameY] = this.frame;
  
      this.isLoaded && ctx.drawImage(this.image,
        frameX * 64, frameY * 64,
        64,64,
        x,y,
        64,64
      )

      this.updateAnimationProgress();
    }
  }