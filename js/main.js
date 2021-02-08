"use strict";
$(document).ready(() => {
    let reserveContainer = $('#reservation-container');
    let reserveAction = $('#reservation-action');
    let reserveRitual = $('#reservation-select');
    let reserveRitualItem = $('#reservation-ritual-item');
    let reserveFormField = $('#reservation > div > input, #reservation > div > select');
    let reserveFormElementHide = $('#reservation > *').slice(0, 7);
    let reserveMessage = $('#reservation-message');
    let btnCall = $('#btn_call');
    let mistakeValidation = $('.error-input');
    let phoneField = $('#answer_phone');
    let reservePhone = $('#reservation-phone');

    /* wow init */
    new WOW().init();

    /* magnificPopup */
    $('.img-popup').magnificPopup({
        type: 'image'
    });

    /* Location timepicker */
    $.datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        prevText: 'Предыдущий',
        nextText: 'Следующий',
        currentText: 'Сегодня',
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
        dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
        dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        weekHeader: 'Не',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['ru']);
    $.timepicker.regional['ru'] = {
        timeOnlyTitle: 'Выберите время',
        timeText: 'Время',
        hourText: 'Часы',
        minuteText: 'Минуты',
        secondText: 'Секунды',
        millisecText: 'Миллисекунды',
        timezoneText: 'Часовой пояс',
        currentText: 'Сейчас',
        closeText: 'Закрыть',
        timeFormat: 'HH:mm',
        amNames: ['AM', 'A'],
        pmNames: ['PM', 'P'],
        isRTL: false
    };
    $.timepicker.setDefaults($.timepicker.regional['ru']);

    /* Use timepicker */
    $('#reservation-data').datetimepicker();

    /* Maskedinput */
    reservePhone.mask('+375(999) 999-99-99');
    phoneField.mask('+375(999) 999-99-99');

    /* Slick slider */
    $('.master-slick').slick({
        infinite: true,
        dots: true,
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        appendDots: $("#master-container .mg-slick-dots"),
        prevArrow: $("#master-container .mg-slick-prev"),
        nextArrow: $("#master-container .mg-slick-next"),
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
        customPaging: function (slider, i) {
            $(slider.$slides[i]).data();
            return '<a>' + (i + 1) + '</a>';
        }
    });
    $('.gallery-slick').slick({
        infinite: true,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        appendDots: $("#gallery-container .mg-slick-dots"),
        prevArrow: $("#gallery-container .mg-slick-prev"),
        nextArrow: $("#gallery-container .mg-slick-next"),
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
    });

    /* Accordion */
    $('#answer-accordion').accordion({
        heightStyle: "content"
    });

    /* Scroll top */
    let elemRituals = $('#rituals');
    let elemRitualsPosition = elemRituals.offset().top;
    console.log(elemRitualsPosition);
    let winHeight = $(window).height();
    console.log(winHeight);
    let scrollToElem = elemRitualsPosition - winHeight;
    $(window).scroll(() => {
        let winScrollTop = $(this).scrollTop();
        if (winScrollTop > scrollToElem) {
            $('#circle').css('display', 'flex');
        } else {
            $('#circle').css('display', 'none');
        }
    });

    /* Cancel form reservation */
    $('#reservation-cancel ,#reservation-cancel-close, #reservation-container').click((e) => {
        let getElementId = e.target.id;
        if (getElementId === 'reservation-container' || getElementId === 'reservation-cancel-close' || getElementId === 'reservation-cancel') {
            reserveContainer.hide();
            $('#reservation-ritual-item .ritual-item').remove();
            reserveFormField.val("");
        }
    });

    /* prohibit entering numbers input name */
    $('#reservation-name').keypress((e) => {
        if (isNaN(parseInt(e.key)) === false) {
            e.preventDefault();
        }
    });

    $('.reserve-btn').click((e) => {
        reserveMessage.hide();
        mistakeValidation.hide();
        reserveRitualItem.show();
        reserveFormElementHide.show();

        reserveFormField.css({'border-color': 'rgb(114, 17, 99)', 'margin-bottom': '10px'});

        let getButtonId = e.target.id;

        if (getButtonId === 'btn-ritual-1') {
            let cloneRitual_1 = $('.ritual-item:first-child').clone();
            cloneRitual_1.find('.ritual-item-description-action').remove();
            cloneRitual_1.appendTo('#reservation-ritual-item');
            reserveRitual.val("Массаж камнями");
        }
        if (getButtonId === 'btn-ritual-2') {
            let cloneRitual_2 = $('.ritual-item:nth-child(2)').clone();
            cloneRitual_2.find('.ritual-item-description-action').remove();
            cloneRitual_2.appendTo('#reservation-ritual-item');
            reserveRitual.val("Балийский массаж");
        }
        if (getButtonId === 'btn-ritual-3') {
            let cloneRitual_3 = $('.ritual-item:nth-child(3)').clone();
            cloneRitual_3.find('.ritual-item-description-action').remove();
            cloneRitual_3.appendTo('#reservation-ritual-item');
            reserveRitual.val("С травяными мешочками");
        }
        if (getButtonId === 'btn-ritual-4') {
            let cloneRitual_4 = $('.ritual-item:last-child').clone();
            cloneRitual_4.find('.ritual-item-description-action').remove();
            cloneRitual_4.appendTo('#reservation-ritual-item');
            reserveRitual.val("Антицеллюлитный массаж");
        }
        if (e.target.id === 'btn-ritual-5') {
            reserveRitualItem.hide();
            reserveRitual.val(0);
        }
        reserveContainer.css('display', 'flex');

    });

    reserveRitual.change(() => {
        let value = reserveRitual.val();
        let reserveRitualClone = $('#reservation-ritual-item .ritual-item');
        reserveRitualItem.show();
        if (value === 'Массаж камнями') {
            reserveRitualClone.remove();
            let cloneRitual_1 = $('.ritual-item:first-child').clone();
            cloneRitual_1.find('.ritual-item-description-action').remove();
            cloneRitual_1.appendTo('#reservation-ritual-item');
        }
        if (value === 'Балийский массаж') {
            reserveRitualClone.remove();
            let cloneRitual_2 = $('.ritual-item:nth-child(2)').clone();
            cloneRitual_2.find('.ritual-item-description-action').remove();
            cloneRitual_2.appendTo('#reservation-ritual-item');
        }
        if (value === 'С травяными мешочками') {
            reserveRitualClone.remove();
            let cloneRitual_3 = $('.ritual-item:nth-child(3)').clone();
            cloneRitual_3.find('.ritual-item-description-action').remove();
            cloneRitual_3.appendTo('#reservation-ritual-item');
        }
        if (value === 'Антицеллюлитный массаж') {
            reserveRitualClone.remove();
            let cloneRitual_4 = $('.ritual-item:last-child').clone();
            cloneRitual_4.find('.ritual-item-description-action').remove();
            cloneRitual_4.appendTo('#reservation-ritual-item');
        }

    });

    let success = 0;
    reserveAction.click(() => {
        mistakeValidation.hide();

        for (let i = 0; i < reserveFormField.length; i++) {
            $(reserveFormField[i]).css({'border-color': 'rgb(114, 17, 99)', 'margin-bottom': '10px'});
            if (!$(reserveFormField[i]).val()) {
                $(reserveFormField[i]).siblings('.error-input').show();
                $(reserveFormField[i]).css({'border-color': 'red', 'margin-bottom': '5px'});
            } else {
                success += 1;
            }
        }

        if (success === 4) {
            $.ajax({
                type: 'post',
                url: 'mail.php',
                data: 'name=' + $('#reservation-name').val() + '&ritual=' + reserveRitual.val() + '&phone=' + reservePhone.val() + '&time=' + $('#reservation-data').val(),
                success: () => {
                    reserveFormElementHide.hide();
                    $('#reservation-cancel').show();
                    reserveMessage.show();
                },
                error: () => {
                    reserveFormField.hide();
                    $('#reservation-message-title').html('ВНИМАНИЕ!')
                    $('#reservation-message-text').html('Возникла ошибка перезвоните нам по телефону +7 (981) 458-85-96');
                }
            });
        }
    });

    /* Validation form call */
    btnCall.click(() => {
        mistakeValidation.hide();

        phoneField.css({'border-color': 'rgb(114, 17, 99)', 'margin-bottom': '15px'});
        if (!phoneField.val()) {
            phoneField.siblings('.error-input').show();
            phoneField.css({'border-color': 'red', 'margin-bottom': '5px'})
        } else {

            $.ajax({
                type: 'post',
                url: 'mail.php',
                data: 'call=' + phoneField.val(),
                success: () => {
                    phoneField.hide();
                    btnCall.hide();
                    $('#answer-form-message').css('display', 'block');
                },
                error: () => {
                }
            });
        }
    });

    $('#main-burger').click(() => {
        $('#main-header-container').toggleClass('menu-open');
    })

    $('#main-header-menu a, #main-header-menu').click(() => {
        $('#main-header-container').removeClass('menu-open');
    })

})
