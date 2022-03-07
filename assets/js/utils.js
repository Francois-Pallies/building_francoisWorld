const utils = {
    withGrid(n) {
        return n * 32;
    },
    
    asGridCoord(x,y) {
        return `${x*32},${y*32}`;
    },

    generateWall(vertical){
        return (start, end) => (staticCoord, acc = {}) => {
            const x = vertical ? staticCoord : start
            const y = vertical ? start : staticCoord
          
            const newAcc = {
              ...acc,
              [utils.asGridCoord(x, y)]: true
            }
          
            if (start === end) {
                return newAcc
            }
          
            const newCoord = start < end ? start + 1 : start - 1
            
            return utils.generateWall(vertical)(newCoord, end)(staticCoord, newAcc)
          }
    },
    
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