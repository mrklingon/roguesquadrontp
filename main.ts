namespace SpriteKind {
    export const target = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    lift += -1
    dolift(lift)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    zap = sprites.createProjectileFromSprite(assets.image`bolt`, xwing, 300, 0)
    zap.setFlag(SpriteFlag.AutoDestroy, true)
    music.pewPew.play()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    speed += -1
    if (1 > speed) {
        speed = 1
    }
    setSpeed(speed)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.target, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 500)
    music.knock.play()
    info.changeScoreBy(randint(5, 10))
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    speed += 1
    if (5 < speed) {
        speed = 5
    }
    setSpeed(speed)
})
function setSpeed (spd: number) {
    scroller.scrollBackgroundWithSpeed(-10 * spd, 0, scroller.BackgroundLayer.Layer0)
    scroller.scrollBackgroundWithSpeed(-20 * spd, 0, scroller.BackgroundLayer.Layer1)
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    lift += 1
    dolift(lift)
})
function dolift (lft: number) {
    xwing.setVelocity(0, 20 * lft)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.target, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 500)
    music.knock.play()
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
})
let drone: Sprite = null
let zap: Sprite = null
let xwing: Sprite = null
let speed = 0
let lift = 0
game.splash("Rogue Squadron", "Target Practice")
lift = 0
scene.setBackgroundColor(9)
effects.clouds.startScreenEffect()
speed = 1
scroller.setLayerImage(scroller.BackgroundLayer.Layer0, assets.image`mts1`)
scroller.setLayerImage(scroller.BackgroundLayer.Layer1, assets.image`mts2`)
xwing = sprites.create(assets.image`Xwing`, SpriteKind.Player)
xwing.setPosition(71, 50)
xwing.setStayInScreen(true)
info.setLife(10)
forever(function () {
    pause(100 * randint(10, 20))
    drone = sprites.create(assets.image`smallDrone`, SpriteKind.target)
    drone.setPosition(150, randint(-10, 110))
    drone.setVelocity(-50, 0)
    drone.setFlag(SpriteFlag.AutoDestroy, true)
})
forever(function () {
    pause(300 * randint(10, 20))
    drone = sprites.create(assets.image`BigDrone`, SpriteKind.target)
    drone.setPosition(150, randint(-10, 110))
    drone.setVelocity(-50, 0)
    drone.setFlag(SpriteFlag.AutoDestroy, true)
})
