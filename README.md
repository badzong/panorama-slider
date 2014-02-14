panorama-slider
===============

Slide content and images across beautiful panorama images.


Getting started
---------------

The panorama-slider uses Jquery, so first of all you need to include a recent
version of JQuery into your Webpage. If you want nice icons for the dots, the
forward and the reverse button, you also need to include font awesome.

The other thing you need is a wide panorama image. The wider the better. If you
don't have an image at hand, you can find very beautiful panoramas
[here]("http://commons.wikimedia.org/wiki/Commons:Featured_pictures/Places/Panoramas").

Basic page structure:

    <!doctype html>
    <html>
      <head>
        <title>Slider Example</title>
        <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
        <link href="http://panorama-slider.com/panorama-slider.min.css" rel="stylesheet">
      </head>
      <body>
        <div id="slider" style="background-image: url('panorama.jpg');">
          <div>
            <h1>Slide 1</h1>
          </div>
          <div>
            <h1>Slide 2</h1>
          </div>
          <div>
            <h1>Slide 3</h1>
          </div>
        </div>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <script src="http://panorama-slider.com/panorama-slider.min.js"></script>
        <script>
          $('#slider').pslider();
        </script>
      </body>
    </html>

The div with the id *slider* holds all slides and has the panorama image set as
background. Within that div you have three divs, the slides. The result looks
like [this]("http://panorama-slider.com/example/basic.html").


Options
-------

  + debug (default: false)

    Log debugging information to the JavaScript Console.


  + dots (default: true)

    Display navigation dots at the bottom of the slider.


  + dotActive (default: 'fa fa-circle')

    CSS class for active and hovered dots.

   
  + dotInactive (default: 'fa fa-circle-o')

    CSS class for inactive dots.


  + dotSize (default: 0.04)

    Size of the navigation dots. dotSize is multiplied by the panorama image
    height. If your panorama image is 100 pixel in height and your dotSize is
    0.04 the dots height would be 4 pixels.


  + angles (default: true)

    Display left and right navigation angles.


  + angleLeft (default: 'fa fa-angle-left')

    CSS class for the left navigation angle.


  + angleRight (default: 'fa fa-angle-right')

    CSS class for the right navigation angle.


  + angleSize (default: 0.1)

    Size of the navigation angles. angleSize is multiplied by the panorama
    image height. If your panorama image is 100 pixel in height and your
    angleSize is 0.1 the angles height would be 10 pixels.


  + interval (default: 8000)

    Slide interval in miliseconds.


  + currentSlide (default: 0)

    Select start slide.


  + circularBackground (default: false)

    If set to true, the background infinitely slides to the left. This is nice
    if you have a 360 degree panorama background.


  + height (default: false)

    Be default the slider uses the height of the background image. The height
    overrides this behaviour.


Option Example
--------------

    <script>
      $('#slider').pslider({
        dotActive: 'fa fa-star',
        dotInactive: 'fa fa-star-o',
      });
    </script>

