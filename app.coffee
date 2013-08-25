world = []


main = ->
  canvas = document.getElementById 'gameboard'
  painter = new Painter canvas
  snake = new Snake
  world.push snake
  setInterval (->
    game_loop painter, snake), 1000


game_loop = (painter, snake) ->
  painter.clear_all()
  for thing in world
    thing.update_position()
  painter.draw(snake)


class Snake
  constructor: (head) ->
    @head = head or new Pixel 5,5
    @pixels = [@head]
    @direction = 'r'

  update_position: ->
    if @direction is 'r'
      @head.x++
    else if @direction is 'l'
      @head.x--
    else if @direction is 'd'
      @head.y++
    else if @direction is 'u'
      @head.y--


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

  clear_all: ->
    @ctx.clearRect 0,0 , @canvas.width,@canvas.height


main()
