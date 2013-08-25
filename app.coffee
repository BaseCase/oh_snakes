main = ->
  canvas = document.getElementById 'gameboard'
  painter = new Painter canvas
  snake = new Snake
  painter.draw(snake)


class Snake
  constructor: (head) ->
    @head = head or new Pixel 5,5
    @pixels = [@head]


class Pixel
  constructor: (@x, @y) ->


class Painter
  constructor: (@canvas) ->
    @ctx = @canvas.getContext '2d'
    @ctx.fillStyle = "rgb(0,0,0)"
    @pixel_size = 10

  draw: (thing) ->
    for pixel in thing.pixels
      left = pixel.x * @pixel_size
      top = pixel.y * @pixel_size
      right = @pixel_size
      bottom = @pixel_size
      @ctx.fillRect left,top , right,bottom


main()
