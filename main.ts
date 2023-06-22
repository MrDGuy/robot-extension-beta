namespace robot {
    let count = 0
    let direction = 0
    const robotUp = img`
        . . . . . . . . . . . . . . . 
        . . . . . . . a . . . . . . . 
        . . . . . . . a . . . . . . . 
        . . . . . . a a a . . . . . . 
        . . . . . . a a a . . . . . . 
        . . . . . a a a a a . . . . . 
        . . . . . a a a a a . . . . . 
        . . . . a a a a a a a . . . . 
        . . . . a a a a a a a . . . . 
        . . . a a a a a a a a a . . . 
        . . . a a a a a a a a a . . . 
        . . a a a a a a a a a a a . . 
        . . a a a a a a a a a a a . . 
        . a a a a a a a a a a a a a . 
        . . . . . . . . . . . . . . . 
        `;
  const robotLeft = img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . a . . 
        . . . . . . . . . . a a a . . 
        . . . . . . . . a a a a a . . 
        . . . . . . a a a a a a a . . 
        . . . . a a a a a a a a a . . 
        . . a a a a a a a a a a a . . 
        . a a a a a a a a a a a a . . 
        . . a a a a a a a a a a a . . 
        . . . . a a a a a a a a a . . 
        . . . . . . a a a a a a a . . 
        . . . . . . . . a a a a a . . 
        . . . . . . . . . . a a a . . 
        . . . . . . . . . . . . a . . 
        . . . . . . . . . . . . . . . 
        `;

  const robotDown = img`
        . . . . . . . . . . . . . . . 
        . a a a a a a a a a a a a a . 
        . . a a a a a a a a a a a . . 
        . . a a a a a a a a a a a . . 
        . . . a a a a a a a a a . . . 
        . . . a a a a a a a a a . . . 
        . . . . a a a a a a a . . . . 
        . . . . a a a a a a a . . . . 
        . . . . . a a a a a . . . . . 
        . . . . . a a a a a . . . . . 
        . . . . . . a a a . . . . . . 
        . . . . . . a a a . . . . . . 
        . . . . . . . a . . . . . . . 
        . . . . . . . a . . . . . . . 
        . . . . . . . . . . . . . . . 
        `;

  const robotRight = img`
        . . . . . . . . . . . . . . . 
        . a a . . . . . . . . . . . . 
        . a a a a . . . . . . . . . . 
        . a a a a a a . . . . . . . . 
        . a a a a a a a a . . . . . . 
        . a a a a a a a a a a . . . . 
        . a a a a a a a a a a a a . . 
        . a a a a a a a a a a a a a . 
        . a a a a a a a a a a a a . . 
        . a a a a a a a a a a . . . . 
        . a a a a a a a a . . . . . . 
        . a a a a a a . . . . . . . . 
        . a a a a . . . . . . . . . . 
        . a a . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `;

        
    const robotSprite = sprites.create(robotUp, SpriteKind.Player)
    
    //%block
    export function beginScreen() {
        count = 8000
        grid.place(robotSprite, tiles.getTileLocation(1, tiles.tilemapRows()-1))
    }
  
    //% block
    export function moveForward() {
            
        direction = count % 4
        pause(100)
        if (direction == 0) {
            if (tiles.tileIsWall(grid.add(grid.getLocation(robotSprite), 0, -1))) {
                
            } else {
                grid.move(robotSprite, 0, -1)
            }
            
        } else if (direction == 1) {
            if (tiles.tileIsWall(grid.add(grid.getLocation(robotSprite), 1, 0))) {
                
            } else {
                grid.move(robotSprite, 1, 0)
            }
            
        } else if (direction == 2) {
            if (tiles.tileIsWall(grid.add(grid.getLocation(robotSprite), 0, 1))) {
                
            } else {
                grid.move(robotSprite, 0, 1)
            }
            
        } else if (tiles.tileIsWall(grid.add(grid.getLocation(robotSprite), -1, 0))) {
            
        } else {
            grid.move(robotSprite, -1, 0)
        }
        
    }
       
        //% block
    export function  turnLeft() {
    
        direction = count % 4
        pause(500)
        if (direction == 0) {
            robotSprite.setImage(robotLeft)
        } else if (direction == 1) {
            robotSprite.setImage(robotUp)
        } else if (direction == 2) {
            robotSprite.setImage(robotRight)
        } else {
            robotSprite.setImage(robotDown)
        }
        
        count += -1
        direction = count % 4
    }
    //%block
    export function turnRight() {
    
        direction = count % 4
        pause(500)
        if (direction == 0) {
            robotSprite.setImage(robotRight)
        } else if (direction == 1) {
            robotSprite.setImage(robotDown)
        } else if (direction == 2) {
            robotSprite.setImage(robotLeft)
        } else {
            robotSprite.setImage(robotUp)
        }
        
        count += 1
        direction = count % 4
    }

    //%block
    export function canMove(inputDir: string): boolean {
        if (inputDir == "left") {
            if (direction == 0) {
                if (tiles.tileIsWall(grid.add(grid.getLocation(robotSprite), -1, 0))) {
                    return false
                } else {
                    return true
                }
                
            } else if (direction == 1) {
                if (tiles.tileIsWall(grid.add(grid.getLocation(robotSprite), 0, -1))) {
                    return false
                } else {
                    return true
                }
                
            } else if (direction == 2) {
                if (tiles.tileIsWall(grid.add(grid.getLocation(robotSprite), 1, 0))) {
                    return false
                } else {
                    return true
                }
                
            } else if (tiles.tileIsWall(grid.add(grid.getLocation(robotSprite), 0, 1))) {
                return false
            } else {
                return true
            }
            
        } else if (inputDir == "right") {
            if (direction == 0) {
                if (tiles.tileIsWall(grid.add(grid.getLocation(robotSprite), 1, 0))) {
                    return false
                } else {
                    return true
                }
                
            } else if (direction == 1) {
                if (tiles.tileIsWall(grid.add(grid.getLocation(robotSprite), 0, 1))) {
                    return false
                } else {
                    return true
                }
                
            } else if (direction == 2) {
                if (tiles.tileIsWall(grid.add(grid.getLocation(robotSprite), -1, 0))) {
                    return false
                } else {
                    return true
                }
                
            } else if (tiles.tileIsWall(grid.add(grid.getLocation(robotSprite), 0, -1))) {
                return false
            } else {
                return true
            }
            
        } else if (inputDir == "forward") {
            if (direction == 0) {
                if (tiles.tileIsWall(grid.add(grid.getLocation(robotSprite), 0, -1))) {
                    return false
                } else {
                    return true
                }
                
            } else if (direction == 1) {
                if (tiles.tileIsWall(grid.add(grid.getLocation(robotSprite), 1, 0))) {
                    return false
                } else {
                    return true
                }
                
            } else if (direction == 2) {
                if (tiles.tileIsWall(grid.add(grid.getLocation(robotSprite), 0, 1))) {
                    return false
                } else {
                    return true
                }
                
            } else if (tiles.tileIsWall(grid.add(grid.getLocation(robotSprite), -1, 0))) {
                return false
            } else {
                return true
            }
            
        } else if (inputDir == "backward") {
            if (direction == 0) {
                if (tiles.tileIsWall(grid.add(grid.getLocation(robotSprite), 0, 0))) {
                    return false
                } else {
                    return true
                }
                
            } else if (direction == 1) {
                if (tiles.tileIsWall(grid.add(grid.getLocation(robotSprite), -1, 0))) {
                    return false
                } else {
                    return true
                }
                
            } else if (direction == 2) {
                if (tiles.tileIsWall(grid.add(grid.getLocation(robotSprite), 0, -1))) {
                    return false
                } else {
                    return true
                }
                
            } else if (tiles.tileIsWall(grid.add(grid.getLocation(robotSprite), 1, 0))) {
                return false
            } else {
                return true
            }
            
        } else {
            return false
        }
        
    }
    //%block
    export function goalReached(): boolean {
        if (tiles.tileIs(grid.getLocation(robotSprite), assets.tile`
            myTile1
        `)) {
            return true
        } else {
            return false
        }
    
    }
    
    
}
