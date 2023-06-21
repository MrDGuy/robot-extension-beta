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

  const level1 = tiles.createTilemap(hex`0a000700050607090607060609020e0101010101010110080e0101010101010101080f01010101010101010a0e0101010101010101080d010101010101010108040c0c0b0c0c0c0c0b03`, img`
2 2 2 2 2 2 2 2 2 2 
2 . . . . . . . . 2 
2 . . . . . . . . 2 
2 . . . . . . . . 2 
2 . . . . . . . . 2 
2 . . . . . . . . 2 
2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency16,myTiles.tile1,sprites.dungeon.greenOuterNorthEast,sprites.dungeon.greenOuterSouthWest,sprites.dungeon.greenOuterSouthEast,sprites.dungeon.greenOuterNorthWest,sprites.dungeon.greenOuterNorth0,sprites.dungeon.greenOuterNorth1,sprites.dungeon.greenOuterEast0,sprites.dungeon.greenOuterNorth2,sprites.dungeon.greenOuterEast2,sprites.dungeon.greenOuterSouth2,sprites.dungeon.greenOuterSouth1,sprites.dungeon.greenOuterWest1,sprites.dungeon.greenOuterWest0,sprites.dungeon.greenOuterWest2,myTiles.tile3], TileScale.Sixteen);
        
    const robotSprite = sprites.create(robotUp), SpriteKind.player)
    //%block
    export function beginScreen() {
        count = 8000
        grid.place(robot, tiles.getTileLocation(1, 5))
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
