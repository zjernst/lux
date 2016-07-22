#[LUX IN TENEBRIS][link]
[link]: http://zjernst.github.io

A browser based JavaScript employing the Canvas library

[intro]: ./screenshots/lux_intro.jpg

## Goal

You find yourself in a mysterious surroundings. The land around you seems to
shift without cause. The night is setting in and the light is fading. At least
you brought a flashlight.

Once the screen fades to black, the player has only a small cone of vision.
You move around by pressing W-A-S-D while your flashlight points towards
the mouse. Try to navigate the map to find a Red Portal to take you to the next
area. The only thing that stands between you is a randomly-generated and shifting
terrain and a legion of ghosts that builds as you progress further. How long
can you survive?

## Implementation Details

### Vision

Vision is implemented through an imitation of 'layers' and manipulation of opacity. The first thing drawn is the map, then the exits, player, and ghosts are drawn over top. To create the effect of a fading flashlight, a radial gradient that transitions between transparent to black is centered on the player. Finally, to allow the player to see in only one direction, a solid black rectangle covering the screen with a triangle cut out is drawn and then moved to center on the player.

This final layer is then rotated based on the angle between the mouse and the player's position:

```javascript
ctx.save();
ctx.translate(playerX, playerY);
let angle = Math.atan2((playerY - mouseY), playerX - mouseX);
ctx.rotate(angle + Math.PI/1.33);
ctx.moveTo(-20,-20);
ctx.lineTo(400, 160);
ctx.lineTo(160, 400);
ctx.lineTo(-20,-20);
ctx.fill();
ctx.restore();
```

[vision]: ./screenshots/lux_vision.jpg

### Terrain

### Ghosts
