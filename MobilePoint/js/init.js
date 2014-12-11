$(function () {
    //$(document).foundation();
    displaySlider(1);
    $('.orbit-next').click(function () {
        console.log('next');
        if ($('.orbit-container').data('current') < $('.slide').length)
            displaySlider($('.orbit-container').data('current') + 1);
    });
    $('.orbit-prev').click(function () {
        console.log('prev');
        if ($('.orbit-container').data('current') > 1)
            displaySlider($('.orbit-container').data('current') - 1);
    });
    $(document).bind('keyup', function (e) {
        if (e.which == 32) {
            if (!$('[data-orbit-slide]').is(':visible')) {
                $(".orbit-next").click();
            }
            return false;
        }
        if (e.which == 39) {
            $(".orbit-next").click();
            return false;
        }
        if (e.which == 37) {
            $(".orbit-prev").click();
            return false;
        }
    });

    var hammer = new Hammer($('.orbit-container')[0]);
    var panDirection = false;
    hammer.on('panleft', function (ev) {
        panDirection = false;
    });
    hammer.on('panright', function (ev) {
        panDirection = true;
    });
    hammer.on('panend', function (ev) {
        if (!panDirection) {
            $('.orbit-next').click();
        } else {
            $('.orbit-prev').click();
        }
    });
});

function displaySlider(i) {
    $('.slide:eq(' + ($('.orbit-container').data('current') - 1) + ')').removeClass('active');
    $('.slide:eq(' + ($('.orbit-container').data('current') - 1) + ')').addClass('inactive');
    $('.orbit-container').data('current', i);
    $('.orbit-slide-number span:first').text(i);
    $('.orbit-slide-number span:last').text($('.slide').length);
    $('.slide:eq(' + (i - 1) + ')').addClass('active');
    $('.slide:eq(' + (i - 1) + ')').removeClass('inactive');

    $('.orbit-prev').hide();
    $('.orbit-next').hide();
    if (i > 1) {
        $('.orbit-prev').show();
    }
    if (i < $('.slide').length) {
        $('.orbit-next').show();
    }
}