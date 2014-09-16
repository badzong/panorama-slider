function PSlider(params, index, element) {
    // defaults
    this.debug = false;
    this.dots = true;
    this.dotActive = 'fa fa-circle';
    this.dotInactive = 'fa fa-circle-o';
    this.dotSize = 0.04;
    this.angles = true;
    this.angleLeft = 'fa fa-angle-left';
    this.angleRight = 'fa fa-angle-right';
    this.angleSize = 0.1;
    this.interval = 8000;
    this.currentSlide = 0;
    this.circularBackground = false;
    this.circularBackgroundOffset = 0;
    this.height = false;

    // Map out own classes to user defined css classes
    this.psliderPrefix = 'pslider-'
    this.psliderSlider = this.psliderPrefix + 'slider';
    this.psliderFrame = this.psliderPrefix + 'frame';
    this.psliderSlide = this.psliderPrefix + 'slide';
    this.psliderDots = this.psliderPrefix + 'dots';
    this.psliderDot = this.psliderPrefix + 'dot';
    this.psliderAngle = this.psliderPrefix + 'angle';
    this.psliderAngleLeft = this.psliderAngle + '-left';
    this.psliderAngleRight = this.psliderAngle + '-right';
    this.psliderActive = this.psliderPrefix + 'active';
    this.psliderInactive = this.psliderPrefix + 'inactive';
    this.psliderHidden = this.psliderPrefix + 'hidden';

    // Set members from params
    if (params) {
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                this[key] = params[key];
            }
        }
    }

    this.index = index;
    this.element = $(element);

    this.frame = $(this.element.children()[0]);
    this.slides = this.frame.children();
    this.slideCount = this.slides.size();

    // Append pslider css classes
    this.element.addClass(this.psliderSlider);
    this.frame.addClass(this.psliderFrame);
    this.slides.addClass(this.psliderSlide);

    // Get background dimensions
    this.backgroundUrl = this.element.css('background-image').replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
    if (this.backgroundUrl == 'none') {
        this.log('Need background-image');
        return;
    }

    this.log('width: ' + this.element.width());
    this.log('slideCount: ' + this.slideCount);

    // Add the dots
    if (this.dots) {
        var html = '<div class="' + this.psliderDots + '">';
        for (i = 0; i < this.slideCount; ++ i) {
            html += '<span class="' + this.psliderInactive + '">';
            html += '<i class="' + this.psliderActive + ' ' + this.dotActive + '"></i>';
            html += '<i class="' + this.psliderInactive + ' ' + this.dotInactive + '"></i>';
            html += '</span>';
        }
        html += '</div>';

        var slider = this;
        this.element.append(html).find('.' + this.psliderDots + ' span').click(function() {
            slider.dotClick($(this));
        });
    };

    // Add the angles
    if (this.angles) {
        this.element.append('<div class="' + this.psliderAngle + ' ' + this.psliderAngleLeft + '"><i class="' + this.angleLeft +'"></i></div>');
        this.element.append('<div class="' + this.psliderAngle + ' ' + this.psliderAngleRight + '"><i class="' + this.angleRight +'"></i></div>');

        var left = this.element.find('.' + this.psliderAngleLeft);
        var right = this.element.find('.' + this.psliderAngleRight);

        var slider = this;
        left.click(function() {
            slider.leftClick();
        });
        right.click(function() {
            slider.rightClick();
        });
    }

    // Add swipe support if touchSwipe is available
    if ($().swipe)
    {
        var slider = this;
        this.element.swipe({
            swipeLeft:function(event, direction, distance, duration, fingerCount) {
                slider.rightClick();
            },
            swipeRight:function(event, direction, distance, duration, fingerCount) {
                slider.leftClick();
            },
        });
    }

    var slider = this;
    // Bind load to resize events
    $(window).resize(function() {
        slider.load();
    });

    // Load background image
    this.backgroundImage = new Image();
    this.backgroundImage.onload = function() {
        slider.load();
    }
    this.backgroundImage.src = this.backgroundUrl;
}

PSlider.prototype.log = function(message) {
    if (this.debug) {
        console.log('pslider[' + this.index +']: ' + message);
    }
}

PSlider.prototype.slide = function(index) {
    this.currentSlide = index % this.slideCount;
    var frameOffset = -this.currentSlide * this.element.width();

    // Passed last frame
    if (index > this.slideCount - 1 && this.circularBackground) {
        this.circularBackgroundOffset -= this.slideCount * this.backgroundOffset;
    }
    var backgroundOffset = (-this.currentSlide * this.backgroundOffset) + this.circularBackgroundOffset;

    this.element.css('background-position', backgroundOffset +'px 0');
    this.frame.css('margin-left', frameOffset +'px');

    if (this.dots)
    {
        this.element.find('.' + this.psliderDots + ' span.' + this.psliderActive).removeClass(this.psliderActive).addClass(this.psliderInactive);
        $(this.element.find('.' + this.psliderDots + ' span')[this.currentSlide]).removeClass(this.psliderInactive).addClass(this.psliderActive);
    }

    if (this.angles)
    {
        this.element.find('.' + this.psliderAngle).removeClass(this.psliderHidden);
        if (this.currentSlide == 0)
        {
            this.element.find('.' + this.psliderAngleLeft).addClass(this.psliderHidden);
        }
        if (this.currentSlide == this.slideCount - 1)
        {
            this.element.find('.' + this.psliderAngleRight).addClass(this.psliderHidden);
        }
    }
}

PSlider.prototype.nextSlide = function() {
    this.slide(this.currentSlide + 1);
}

PSlider.prototype.leftClick = function() {
    if (this.currentSlide > 0) {
        this.slide(this.currentSlide - 1);
    }
    this.play();
}

PSlider.prototype.rightClick = function() {
    if (this.currentSlide < this.slideCount - 1)
    {
        this.slide(this.currentSlide + 1);
    }
    this.play();
}

PSlider.prototype.dotClick = function(dot) {
    var index = dot.index();
    this.slide(index);

    // Reset interval
    this.play();
}

PSlider.prototype.play = function() {
    if(this.windowInterval)
    {
        window.clearInterval(this.windowInterval);
    }

    var slider = this
    this.windowInterval = window.setInterval(function() {
        slider.nextSlide();
    }, this.interval);
}

PSlider.prototype.start = function() {
    this.slide(0);
    this.play();
}

PSlider.prototype.load = function() {
    this.log('load');

    // Calculate the frame width that holds all slides
    this.frameWidth = this.element.width() * this.slideCount;

    this.frame.css('width', this.frameWidth + 'px');
    this.slides.css('width', this.element.width() + 'px');

    this.backgroundWidth = this.backgroundImage.width;
    this.backgroundHeight = this.backgroundImage.height;

    this.log(this.backgroundUrl +'(' + this.backgroundWidth + 'x' + this.backgroundHeight + ')');

    // Calculate background animation offset
    this.backgroundOffset = Math.abs((this.backgroundWidth - this.element.width()) / (this.slideCount - 1));
    this.log('backgroundOffset: ' + this.backgroundOffset);

    // Set dot height
    var dotSize = parseInt(this.backgroundHeight * this.dotSize);
    this.element.find('.' + this.psliderDots).css('font-size', dotSize + 'px');

    // Set angle height
    var angleSize = parseInt(this.backgroundHeight * this.angleSize);
    var angleCss = {
        'font-size': angleSize + 'px',
        'top': parseInt((this.backgroundHeight - angleSize) / 2) + 'px',
    };
    this.element.find('.' + this.psliderAngleLeft).css(angleCss);
    this.element.find('.' + this.psliderAngleRight).css(angleCss);

    // Set height
    if (this.height) {
        this.element.css('height', this.height + 'px');
    } else {
        this.element.css('height', this.backgroundHeight + 'px');
    }

    this.slide(this.currentSlide);
    this.play();
}

$.fn.pslider = function(params) {
    this.each(function(index, element) {
        var pslider = new PSlider(params, index, element);
        pslider.start()
    });
};
