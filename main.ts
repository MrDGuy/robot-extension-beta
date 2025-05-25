//% color="#6d5ba5" icon="\uf124"

namespace robot {
    let count = 0
    let direction = 0
    let score = 0
    let hasBegun = false
    let coins = [sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.Food)]
    coins.pop()
    let robotUp = img`
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
  let robotLeft = img`
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

  let robotDown = img`
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

  let robotRight = img`
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

        
    let robotSprite = sprites.create(robotUp, SpriteKind.Player)
    scene.cameraFollowSprite(robotSprite)

    function checkInit() {
        if (!hasBegun) {
            game.showLongText("You must call 'robot.begin screen()' at the start of your program.", DialogLayout.Full)
            game.reset()
        }
    }

    function checkForTilePresence(requiredTile: Image, tileName: string) {
        for (let y = 0; y < tiles.tilemapRows(); y++) {
            for (let x = 0; x < tiles.tilemapColumns(); x++) {
                let loc = tiles.getTileLocation(x, y)
                if (tiles.tileIs(loc, requiredTile)) {
                    return true
                }
            }
        }
        game.showLongText(`⚠️ Tile "${tileName}" is missing from the current tilemap.`, DialogLayout.Full)
        return false
    }
    
    //%block
    export function detectCoin(): boolean {
        checkInit()
        info.setScore(score)
        for (let i = 0; i < coins.length; i++){
            if (robotSprite.overlapsWith(coins[i])) {
                return true
            }
        }
        return false
    }

    //%block
    export function moveRobotWithButtons() {
        checkInit()
        controller.up.onEvent(ControllerButtonEvent.Pressed, function on_event_pressed() {
            robotSprite.setImage(robotUp)
            if (!(tiles.tileIsWall(tiles.locationInDirection(tiles.locationOfSprite(robotSprite), CollisionDirection.Top))))
                grid.move(robotSprite, 0, -1)
        })
        controller.down.onEvent(ControllerButtonEvent.Pressed, function on_event_pressed() {
            robotSprite.setImage(robotDown)
            if (!(tiles.tileIsWall(tiles.locationInDirection(tiles.locationOfSprite(robotSprite), CollisionDirection.Bottom))))
                grid.move(robotSprite, 0, 1)
        })
        controller.left.onEvent(ControllerButtonEvent.Pressed, function on_event_pressed() {
            robotSprite.setImage(robotLeft)
            if (!(tiles.tileIsWall(tiles.locationInDirection(tiles.locationOfSprite(robotSprite), CollisionDirection.Left))))
                grid.move(robotSprite, -1, 0)
        })
        controller.right.onEvent(ControllerButtonEvent.Pressed, function on_event_pressed() {
            robotSprite.setImage(robotRight)
            if (!(tiles.tileIsWall(tiles.locationInDirection(tiles.locationOfSprite(robotSprite), CollisionDirection.Right))))
                grid.move(robotSprite, 1, 0)
        })
    }
    
    //%block
    export function detectNumberOfCoins(): number{
        checkInit()
        info.setScore(score)
        let count = 0
        for (let i = 0; i < coins.length; i++){
            if (robotSprite.overlapsWith(coins[i])) {
                count++
            }
        }
        return count
    }
    
    function addCoin(x: number, y: number) {
        checkInit()
        info.setScore(score)
        if (!tiles.tileIsWall(tiles.getTileLocation(x, y))) {
            let coin = sprites.create(img`
                . . b b b b . . 
                        . b 5 5 5 5 b . 
                        b 5 d 3 3 d 5 b 
                        b 5 3 5 5 1 5 b 
                        c 5 3 5 5 1 d c 
                        c d d 1 1 d d c 
                        . f d d d d f . 
                        . . f f f f . .
            `, SpriteKind.Food)
            animation.runImageAnimation(coin, [img`
                . . b b b b . . 
                            . b 5 5 5 5 b . 
                            b 5 d 3 3 d 5 b 
                            b 5 3 5 5 1 5 b 
                            c 5 3 5 5 1 d c 
                            c d d 1 1 d d c 
                            . f d d d d f . 
                            . . f f f f . .
                `, img`
                    . . b b b . . . 
                            . b 5 5 5 b . . 
                            b 5 d 3 d 5 b . 
                            b 5 3 5 1 5 b . 
                            c 5 3 5 1 d c . 
                            c 5 d 1 d d c . 
                            . f d d d f . . 
                            . . f f f . . .
                `, img`
                    . . . b b . . . 
                            . . b 5 5 b . . 
                            . b 5 d 1 5 b . 
                            . b 5 3 1 5 b . 
                            . c 5 3 1 d c . 
                            . c 5 1 d d c . 
                            . . f d d f . . 
                            . . . f f . . .
                `, img`
                    . . . b b . . . 
                            . . b 5 5 b . . 
                            . . b 1 1 b . . 
                            . . b 5 5 b . . 
                            . . b d d b . . 
                            . . c d d c . . 
                            . . c 3 3 c . . 
                            . . . f f . . .
                `, img`
                    . . . b b . . . 
                            . . b 5 5 b . . 
                            . b 5 1 d 5 b . 
                            . b 5 1 3 5 b . 
                            . c d 1 3 5 c . 
                            . c d d 1 5 c . 
                            . . f d d f . . 
                            . . . f f . . .
                `, img`
                    . . . b b b . . 
                            . . b 5 5 5 b . 
                            . b 5 d 3 d 5 b 
                            . b 5 1 5 3 5 b 
                            . c d 1 5 3 5 c 
                            . c d d 1 d 5 c 
                            . . f d d d f . 
                            . . . f f f . .
                `], 100, true)
            tiles.placeOnTile(coin, tiles.getTileLocation(x, y))
            coins.push(coin)
        } else {
            game.splash("Cannot put coin at (" + x + "," + y +")")
        }
            
    }   
    

    

    //%block
    export function collectAllCoins() {
        checkInit()
        info.setScore(score)
        let coinFound = false
       for (let i = 0; i < coins.length; i++){
            if (robotSprite.overlapsWith(coins[i])) {
                music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
                sprites.destroy(coins[i])
                let temp = coins[i]
                coins[i] = coins[coins.length-1]
                coins[coins.length-1]=temp
                coins.pop()
                coinFound = true
                i--
                score++
                info.setScore(score)
            } 
        }
        if(coinFound == false){
            game.splash("No coin present")
            game.reset()
        }

    }

    //%block
    export function collectCoin() {
        checkInit()
        info.setScore(score)
        let coinFound = false
       for (let i = 0; i < coins.length; i++){
            if (robotSprite.overlapsWith(coins[i])) {
                music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
                sprites.destroy(coins[i])
                let temp = coins[i]
                coins[i] = coins[coins.length-1]
                coins[coins.length-1]=temp
                coins.pop()
                coinFound = true
                i = coins.length
                score++
                info.setScore(score)
            } 
        }
        if(coinFound == false){
            game.splash("No coin present")
            game.reset()
        }

    }

    //%block
    export function placeCoin(){
        checkInit()
        info.setScore(score)
            let coin = sprites.create(img`
                . . b b b b . . 
                        . b 5 5 5 5 b . 
                        b 5 d 3 3 d 5 b 
                        b 5 3 5 5 1 5 b 
                        c 5 3 5 5 1 d c 
                        c d d 1 1 d d c 
                        . f d d d d f . 
                        . . f f f f . .
            `, SpriteKind.Food)
            animation.runImageAnimation(coin, [img`
                . . b b b b . . 
                            . b 5 5 5 5 b . 
                            b 5 d 3 3 d 5 b 
                            b 5 3 5 5 1 5 b 
                            c 5 3 5 5 1 d c 
                            c d d 1 1 d d c 
                            . f d d d d f . 
                            . . f f f f . .
                `, img`
                    . . b b b . . . 
                            . b 5 5 5 b . . 
                            b 5 d 3 d 5 b . 
                            b 5 3 5 1 5 b . 
                            c 5 3 5 1 d c . 
                            c 5 d 1 d d c . 
                            . f d d d f . . 
                            . . f f f . . .
                `, img`
                    . . . b b . . . 
                            . . b 5 5 b . . 
                            . b 5 d 1 5 b . 
                            . b 5 3 1 5 b . 
                            . c 5 3 1 d c . 
                            . c 5 1 d d c . 
                            . . f d d f . . 
                            . . . f f . . .
                `, img`
                    . . . b b . . . 
                            . . b 5 5 b . . 
                            . . b 1 1 b . . 
                            . . b 5 5 b . . 
                            . . b d d b . . 
                            . . c d d c . . 
                            . . c 3 3 c . . 
                            . . . f f . . .
                `, img`
                    . . . b b . . . 
                            . . b 5 5 b . . 
                            . b 5 1 d 5 b . 
                            . b 5 1 3 5 b . 
                            . c d 1 3 5 c . 
                            . c d d 1 5 c . 
                            . . f d d f . . 
                            . . . f f . . .
                `, img`
                    . . . b b b . . 
                            . . b 5 5 5 b . 
                            . b 5 d 3 d 5 b 
                            . b 5 1 5 3 5 b 
                            . c d 1 5 3 5 c 
                            . c d d 1 d 5 c 
                            . . f d d d f . 
                            . . . f f f . .
                `], 100, true)
            tiles.placeOnTile(coin, tiles.locationOfSprite(robotSprite))
            coins.push(coin)
        }
            
 
    //%block
    export function beginScreen() {
        hasBegun = true
        info.setScore(score)
        count = 8000
        direction = count % 4 
        robotSprite.setImage(robotUp)
        // Check for missing tilemap
        if (tiles.tilemapRows() === 0 || tiles.tilemapColumns() === 0) {
            game.showLongText("No tilemap found in the project. Please create one in the Assets and load it using the 'set current tilemap' block", DialogLayout.Full)
            return
        }
        for (let i = 0; i < coins.length; i++){
                sprites.destroy(coins[i])
                let temp = coins[i]
                coins[i] = coins[coins.length-1]
                coins[coins.length-1]=temp
                coins.pop()
                i--
        }

        let coinTile: Image = null
        let startTile: Image = null
    
        try {
            coinTile = assets.tile`coinTile`
        } catch (e) {
            game.showLongText("Missing tile asset: coinTile", DialogLayout.Full)
        }
    
        try {
            startTile = assets.tile`startTile`
        } catch (e) {
            game.showLongText("Missing tile asset: startTile", DialogLayout.Full)
        }
        for (let j = 0; j < tiles.tilemapRows(); j++){
            for(let k = 0; k < tiles.tilemapColumns(); k++){
                if (tiles.tileIs(tiles.getTileLocation(k, j), assets.tile`coinTile`)) {
                    addCoin(k,j)
                }
                if (tiles.tileIs(tiles.getTileLocation(k, j), assets.tile`startTile`)) {
                    grid.place(robotSprite, tiles.getTileLocation(k, j))
                }
            }
        }
        
    }

    //%block
    export function changeRobot(up: Image, down: Image, left: Image, right: Image){
        robotUp = up
        robotDown = down
        robotLeft = left
        robotRight = right
    }

    //%block
    export function getDirection(): string{
        info.setScore(score)
        if (direction == 0) {
            return "north";
        }
        else if (direction == 1){
            return "east";
        }
        else if (direction == 2){
            return "south";
        }
        else{
            return "west";
        }
    }
  
    //% block
    export function moveForward() {
        checkInit()
        info.setScore(score)
            
        direction = count % 4
        pause(100)
        if (direction == 0) {
            if (tiles.tileIsWall(grid.add(grid.getLocation(robotSprite), 0, -1))) {
                game.splash("Robot ran into a wall.")
                game.reset()
            } else {
                grid.move(robotSprite, 0, -1)
            }
            
        } else if (direction == 1) {
            if (tiles.tileIsWall(grid.add(grid.getLocation(robotSprite), 1, 0))) {
                game.splash("Robot ran into a wall.")
                game.reset()
            } else {
                grid.move(robotSprite, 1, 0)
            }
            
        } else if (direction == 2) {
            if (tiles.tileIsWall(grid.add(grid.getLocation(robotSprite), 0, 1))) {
                game.splash("Robot ran into a wall.")
                game.reset()
            } else {
                grid.move(robotSprite, 0, 1)
            }
            
        } else if (tiles.tileIsWall(grid.add(grid.getLocation(robotSprite), -1, 0))) {
                game.splash("Robot ran into a wall.")
                game.reset()
        } else {
            grid.move(robotSprite, -1, 0)
        }
        
    }
       
        //% block
    export function  turnLeft() {
        checkInit()
        info.setScore(score)
    
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
        checkInit()
        info.setScore(score)
    
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
        checkInit()
        info.setScore(score)
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
        checkInit()
        try {
            return tiles.tileIs(grid.getLocation(robotSprite), assets.tile`goalTile`)
        } catch (e) {
            game.showLongText("Missing tile asset: goalTile", DialogLayout.Full)
            return false
        }
    }
    

    control.runInParallel(function () {
        pause(1000)
        if (tiles.tilemapRows() === 0 && !hasBegun) {
            game.showLongText("Project includes 'robot' extension but is missing 'robot.begin screen()'", DialogLayout.Full)
        }
    })
    
    
}
