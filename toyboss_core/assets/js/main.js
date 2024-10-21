// main slider

var swiper = new Swiper('.swiper-container', {
    loop: true,
    // autoplay: true,
    speed: 700,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// slider awards

let sli = document.querySelectorAll('.awards__img-block');
console.log(sli.length);

if (sli.length < 4) {
    var swiper3 = new Swiper('.swiper-container2', {
        virtualTranslate: true,
        slidesPerView: 3,
        setWrapperSize: true,
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
} else {
    var swiper4 = new Swiper('.swiper-container2', {
        loop: true,
        autoplay: true,
        speed: 700,
        slidesPerView: 3,
        spaceBetween: 40,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}


// tabs

!function (i) {
    var o, n;
    i(".vacancies__tab-button").on("click", function () {
        o = i(this).parents(".vacancies__tab"), n = o.find(".vacancies__tab-content"),
            o.hasClass("contact-tabs__show") ? (o.removeClass("contact-tabs__show"),
                n.slideUp()) : (o.addClass("contact-tabs__show"), n.stop(!0, !0).slideDown(),
                o.siblings(".contact-tabs__show").removeClass("contact-tabs__show").children(
                    ".vacancies__tab-content").stop(!0, !0).slideUp())
    })
}(jQuery);


// open sertificates


$(document).ready(function () {
    toggleActiveClass();
});

function toggleActiveClass() {
    let boxes = $('.certificates__card');

    $(boxes).each(function (i, obj) {
        var overlay = $(obj).find('.sertificates__modal-content');

        overlay.find('.sertificates__modal-close').unbind('click').bind('click', function (e) {
            e.preventDefault();

            overlay.removeClass('active-modal');
            $('body').removeClass("body-overflow");
        });

        $(obj).find('.certificates__card-inner').unbind('click').bind('click', function (e) {
            e.preventDefault();
            setActive(i);
        });
    });

    var setActive = function (index) {
        $(boxes).each(function (i, obj) {
            var overlay = $(obj).find('.sertificates__modal-content');

            if (i === index) {
                overlay.addClass('active-modal');
            } else {
                overlay.removeClass('active-modal');
            }
        });
        $('body').addClass("body-overflow");
    }

}


// slider sertificates page

var swiper2 = new Swiper('.swiper-container-s2', {
    loop: true,
    spaceBetween: 80,
    pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});


// parallax


window.addEventListener("load", function () {
    SmoothParallax.init();
});


(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory(root));
    } else if (typeof exports === 'object') {
        module.exports = factory(root);
    } else {
        root.SmoothParallax = factory(root);
    }
})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {

    'use strict';

    //
    // Variables
    //

    var window = root; // Map window to root to avoid confusion
    var _container;
    var _width, _height, _scrollHeight, _viewPortHeight;
    var _scrollPercent = 0;
    var _scrollOffset = 0;
    var _movingElements = [];
    var _positions = [];
    var _basePercentageOnOptions = ['containerVisibility', 'pageScroll'];
    var _settings;
    var publicMethods = {}; // Placeholder for public methods

    // Default settings
    var defaults = {
        basePercentageOn: 'pageScroll', // See `_basePercentageOnOptions` for more options
        decimalPrecision: 2
    };


    //
    // Methods
    //

    /**
     * Merge two or more objects. Returns a new object.
     * @private
     * @param {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
     * @param {Object}   objects  The objects to merge together
     * @returns {Object}          Merged values of defaults and options
     */
    var extend = function () {
        // Variables
        var extended = {};
        var deep = false;
        var i = 0;
        var length = arguments.length;

        // Check if a deep merge
        if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
            deep = arguments[0];
            i++;
        }

        // Merge the object into the extended object
        var merge = function (obj) {
            for (var prop in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    // If deep merge and property is an object, merge properties
                    if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                        extended[prop] = extend(true, extended[prop], obj[prop]);
                    } else {
                        extended[prop] = obj[prop];
                    }
                }
            }
        };

        // Loop through each object and conduct a merge
        for (; i < length; i++) {
            var obj = arguments[i];
            merge(obj);
        }

        return extended;
    };


    /**
     * Get movable element container
     * @private
     */
    var getElementContainer = function (element) {
        var containerSelector = element.getAttribute('container');
        _container = element.parentNode;

        if (containerSelector != '' && document.querySelector(containerSelector)) {
            _container = document.querySelector(containerSelector);
        }

        return _container;
    };


    /**
     * Calculate page percent scrolled.
     * @private
     */
    var calculatePageScrollPercent = function () {
        var documentElement = document.documentElement || document.body;
        _height = documentElement.scrollHeight;
        _scrollOffset = window.pageYOffset || documentElement.scrollTop;
        return _scrollOffset / (_height - documentElement.clientHeight);
    };


    /**
     * Calculate variables used to determine elements position
     * @private
     */
    var calculatePercent = function (positionData) {
        _viewPortHeight = window.innerHeight;

        // Based on `containerVisibility`
        if (_settings.basePercentageOn == 'containerVisibility') {
            _height = positionData.container.scrollHeight;
            _scrollOffset = _viewPortHeight - positionData.container.getBoundingClientRect().top;
            _scrollPercent = _scrollOffset / _height;
        }

        // Based on `pageScroll`
        if (_settings.basePercentageOn == 'pageScroll') {
            _scrollPercent = calculatePageScrollPercent();
        }

        // Normalize scrollPercentage from 0 to 1
        if (_scrollPercent < 0) {
            _scrollPercent = 0;
        } else if (_scrollPercent > 1) {
            _scrollPercent = 1;
        }
    };


    /**
     * Get position data object for the element.
     * @returns {Object} Position data object for element or false if not found.
     */
    var getPositionDataByElement = function (el) {
        for (var i = 0; i < _positions.length; i++) {
            if (_positions[i].element == el) {
                return _positions[i];
            }
        }

        // Return false if not found
        return false;
    };


    /**
     * Initializes positions for each moving element.
     * @private
     */
    var initializeMovingElementsPosition = function () {
        var startPercent,
            startX,
            startY,
            endPercent,
            endX,
            endY,
            baseSizeOn,
            baseSizeOnOptions = ['elementsize', 'containerSize'];

        _movingElements = document.querySelectorAll('[smooth-parallax]');

        for (var i = 0; i < _movingElements.length; i++) {
            startPercent = parseFloat(_movingElements[i].getAttribute('start-movement')) || 0;
            startX = parseFloat(_movingElements[i].getAttribute('start-position-x')) || 0;
            startY = parseFloat(_movingElements[i].getAttribute('start-position-y')) || 0;
            endPercent = parseFloat(_movingElements[i].getAttribute('end-movement')) || 1;
            endX = parseFloat(_movingElements[i].getAttribute('end-position-x')) || 0;
            endY = parseFloat(_movingElements[i].getAttribute('end-position-y')) || 0;
            baseSizeOn = _movingElements[i].getAttribute('base-size');

            if (baseSizeOnOptions.indexOf(baseSizeOn) == -1) {
                baseSizeOn = 'elementSize'; // Default value
            }

            var elementPosition = {
                element: _movingElements[i],
                container: getElementContainer(_movingElements[i]),
                baseSizeOn: baseSizeOn,
                start: {
                    percent: startPercent,
                    x: startX,
                    y: startY
                },
                end: {
                    percent: endPercent,
                    x: endX,
                    y: endY
                },
                diff: {
                    percent: endPercent - startPercent,
                    x: endX - startX,
                    y: endY - startY,
                },
                target: {},
                current: {}
            };

            _positions.push(elementPosition);
        }
    };

    /**
     * Updates moving elements position.
     * @private
     */
    var updateElementsPosition = function () {
        for (var i = 0; i < _movingElements.length; i++) {
            var p = _positions[i],
                baseWidth,
                baseHeight,
                transformValue;

            // Try get element's size with `scrollWidth` and `scrollHeight`
            // otherwise use `getComputedStyle` which is more expensive
            if (p.baseSizeOn == 'elementSize') {
                baseWidth = _movingElements[i].scrollWidth || parseFloat(window.getComputedStyle(_movingElements[i]).width);
                baseHeight = _movingElements[i].scrollHeight || parseFloat(window.getComputedStyle(_movingElements[i]).height);
            } else if (p.baseSizeOn == 'containerSize') {
                baseWidth = p.container.scrollWidth - (_movingElements[i].scrollWidth || parseFloat(window.getComputedStyle(_movingElements[i]).width));
                baseHeight = p.container.scrollHeight - (_movingElements[i].scrollHeight || parseFloat(window.getComputedStyle(_movingElements[i]).height));
            }

            // Need to calculate percentage for each element
            // when based on `containerVisibility`
            calculatePercent(p);

            // calculate target position
            if (_scrollPercent <= p.start.percent) {
                p.target.x = p.start.x * baseWidth;
                p.target.y = p.start.y * baseHeight;
            } else if (_scrollPercent >= p.end.percent) {
                p.target.x = p.end.x * baseWidth;
                p.target.y = p.end.y * baseHeight;
            } else {
                p.target.x = p.start.x * baseWidth + (p.diff.x * (_scrollPercent - p.start.percent) / p.diff.percent * baseWidth);
                p.target.y = p.start.y * baseHeight + (p.diff.y * (_scrollPercent - p.start.percent) / p.diff.percent * baseHeight);
            }

            // easing with linear interpolation
            if (!p.current.x || !p.current.y) {
                p.current.x = p.target.x;
                p.current.y = p.target.y;
            } else {
                p.current.x = p.current.x + (p.target.x - p.current.x) * 0.1;
                p.current.y = p.current.y + (p.target.y - p.current.y) * 0.1;
            }

            // Round to decimal precision to prevent
            // too many calculation trips
            p.current.x = parseFloat(p.current.x.toFixed(_settings.decimalPrecision));
            p.current.y = parseFloat(p.current.y.toFixed(_settings.decimalPrecision));

            // update element style
            _movingElements[i].style.transform = 'translate3d(' + p.current.x + 'px, ' + p.current.y + 'px, 0)';
        }
    };

    /**
     * Keep updating elements position infinitelly.
     * @private
     */
    var loopUpdatePositions = function () {
        updateElementsPosition();
        requestAnimationFrame(loopUpdatePositions);
    };

    /**
     * Keep updating elements position infinitelly.
     * @private
     */
    var isSupported = function () {
        var supported = true;

        // Test basePercentageOn settings
        if (_basePercentageOnOptions.indexOf(_settings.basePercentageOn) == -1) {
            supported = false;
            console.error('Value not supported for setting basePercentageOn: ' + _settings.basePercentageOn);
        }

        // TODO: ADD feature test for `querySelector`
        // TODO: ADD feature test for css property `translate3d`

        return supported;
    };

    /**
     * Initializes plugin
     */
    publicMethods.init = function (options) {
        // Merge user options with defaults
        _settings = extend(defaults, options || {});
        _settings.decimalPrecision = parseInt(_settings.decimalPrecision) || defaults.decimalPrecision;

        // Bail early if not supported
        if (!isSupported()) {
            return;
        }

        // Initialize variables
        initializeMovingElementsPosition();
        loopUpdatePositions();
    };

    /**
     * Get scroll percentage for the element or page.
     * @param {string} el Target element css selector.
     * @return {float} Scroll percentage for the element or the page.
     */
    publicMethods.getScrollPercent = function (selector) {
        // Calculate page scroll if no selector was passed
        if (selector == undefined) {
            return calculatePageScrollPercent();
        }

        // Find element
        // Return false if not found
        var el = document.querySelector(selector);
        if (el == null) return false;

        // Calculate element scroll percent
        var positionData = getPositionDataByElement(el);
        if (positionData) {
            calculatePercent(positionData);
            return _scrollPercent;
        }

        // Return false otherwise
        return false;
    };


    //
    // Public APIs
    //
    return publicMethods;

});


// min-max-height

function setHeightAuto() {
    !function (t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery)
    }(function (t) {
        var e = -1, o = -1, n = function (t) {
            return parseFloat(t) || 0
        }, a = function (e) {
            var o = 1, a = t(e), i = null, r = [];
            return a.each(function () {
                var e = t(this), a = e.offset().top - n(e.css("margin-top")), s = r.length > 0 ? r[r.length - 1] : null;
                null === s ? r.push(e) : Math.floor(Math.abs(i - a)) <= o ? r[r.length - 1] = s.add(e) : r.push(e), i = a
            }), r
        }, i = function (e) {
            var o = {
                byRow: !0, property: "height", target: null, remove: !1
            };
            return "object" == typeof e ? t.extend(o, e) : ("boolean" == typeof e ? o.byRow = e : "remove" === e && (o.remove = !0), o)
        }, r = t.fn.matchHeight = function (e) {
            var o = i(e);
            if (o.remove) {
                var n = this;
                return this.css(o.property, ""), t.each(r._groups, function (t, e) {
                    e.elements = e.elements.not(n)
                }), this
            }
            return this.length <= 1 && !o.target ? this : (r._groups.push({
                elements: this,
                options: o
            }), r._apply(this, o), this)
        };
        r.version = "0.7.2", r._groups = [], r._throttle = 80, r._maintainScroll = !1, r._beforeUpdate = null,
            r._afterUpdate = null, r._rows = a, r._parse = n, r._parseOptions = i, r._apply = function (e, o) {
            var s = i(o), h = t(e), l = [h], c = t(window).scrollTop(), p = t("html").outerHeight(!0),
                u = h.parents().filter(":hidden");
            return u.each(function () {
                var e = t(this);
                e.data("style-cache", e.attr("style"))
            }), u.css("display", "block"), s.byRow && !s.target && (h.each(function () {
                var e = t(this), o = e.css("display");
                "inline-block" !== o && "flex" !== o && "inline-flex" !== o && (o = "block"), e.data("style-cache", e.attr("style")), e.css({
                    display: o,
                    "padding-top": "0",
                    "padding-bottom": "0",
                    "margin-top": "0",
                    "margin-bottom": "0",
                    "border-top-width": "0",
                    "border-bottom-width": "0",
                    height: "100px",
                    overflow: "hidden"
                })
            }), l = a(h), h.each(function () {
                var e = t(this);
                e.attr("style", e.data("style-cache") || "")
            })), t.each(l, function (e, o) {
                var a = t(o), i = 0;
                if (s.target) i = s.target.outerHeight(!1); else {
                    if (s.byRow && a.length <= 1) return void a.css(s.property, "");
                    a.each(function () {
                        var e = t(this), o = e.attr("style"), n = e.css("display");
                        "inline-block" !== n && "flex" !== n && "inline-flex" !== n && (n = "block");
                        var a = {
                            display: n
                        };
                        a[s.property] = "", e.css(a), e.outerHeight(!1) > i && (i = e.outerHeight(!1)), o ? e.attr("style", o) : e.css("display", "")
                    })
                }
                a.each(function () {
                    var e = t(this), o = 0;
                    s.target && e.is(s.target) || ("border-box" !== e.css("box-sizing") && (o += n(e.css("border-top-width")) + n(e.css("border-bottom-width")), o += n(e.css("padding-top")) + n(e.css("padding-bottom"))), e.css(s.property, i - o + "px"))
                })
            }), u.each(function () {
                var e = t(this);
                e.attr("style", e.data("style-cache") || null)
            }), r._maintainScroll && t(window).scrollTop(c / p * t("html").outerHeight(!0)),
                this
        }, r._applyDataApi = function () {
            var e = {};
            t("[data-match-height], [data-mh]").each(function () {
                var o = t(this), n = o.attr("data-mh") || o.attr("data-match-height");
                n in e ? e[n] = e[n].add(o) : e[n] = o
            }), t.each(e, function () {
                this.matchHeight(!0)
            })
        };
        var s = function (e) {
            r._beforeUpdate && r._beforeUpdate(e, r._groups), t.each(r._groups, function () {
                r._apply(this.elements, this.options)
            }), r._afterUpdate && r._afterUpdate(e, r._groups)
        };
        r._update = function (n, a) {
            if (a && "resize" === a.type) {
                var i = t(window).width();
                if (i === e) return;
                e = i;
            }
            n ? o === -1 && (o = setTimeout(function () {
                s(a), o = -1
            }, r._throttle)) : s(a)
        }, t(r._applyDataApi);
        var h = t.fn.on ? "on" : "bind";
        t(window)[h]("load", function (t) {
            r._update(!1, t)
        }), t(window)[h]("resize orientationchange", function (t) {
            r._update(!0, t)
        })
    });
}
setHeightAuto();
