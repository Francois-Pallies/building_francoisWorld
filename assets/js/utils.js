const utils = {
    withGrid(n) {
        return n * 32;
    },
    asGridCoord(x,y) {
        return `${x*32},${y*32}`;
    },

/*     //Essai mur
    roomWalls(startX, endX, startY, endY) {
        console.log([`StartX:${startX},EndX:${endX}`],[`StartY:${startY},EndY:${endY}`]);
        return [`${startX},${endX}`],[`${startY},${endY}`];
    },
    //Fin Essai mur */
    
    nextPosition(initialX, initialY, direction) {
        let x = initialX;
        let y = initialY;
        const size = 32;
        /*  Vu avec Raph
        const [x,y] = {
            "left": [initialX - size]
            "right": [initialX - size]
            "up": [initialY - size]
            "down": [initialY - size]

            ou plus simple:

            return {
                x: computeDirection(initialX, direction),
                y: computeDirection(initialY, direction)
            }
        }
        */
        if (direction === "left") {
            x -= size;
        } else if (direction === "right") {
            x += size;
        } else if (direction === "up") {
            y -= size;
        } else if (direction === "down") {
            y += size;
        }
        return {x,y};
    },
    emitEvent(name, detail) {
        const event = new CustomEvent(name, {
          detail
        });
        document.dispatchEvent(event);
      }
      
    }