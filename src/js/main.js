$(function() {

    function animate(element_ID, animation) {
        $(element_ID).addClass(animation);
        var wait = window.setTimeout( function(){
            $(element_ID).removeClass(animation)}, 1300
        );
    }

    $('.box input').hover(function(){
        $('.icon', $(this).parent()).transition({opacity: 0.8});
    },function(){
        $('.icon', $(this).parent()).transition({opacity: 0.4});
    });

    $('.box input').blur(function(){
        if( !$(this).val() ) {
            $('.icon', $(this).parent()).transition({opacity: 1});
        }
    });

    $('.input').tooltipster({ contentAsHTML: 'true', theme: '.tip-warning', animation: 'grow',
      content:  'Заполните поле', position: 'top', maxWidth: 400, trigger: 'custom' });
    $('.tip-info').tooltipster({ contentAsHTML: 'true', theme: '.tip-information',
      animation: 'grow', content:  '', position: 'bottom', maxWidth: 400, trigger: 'custom' });

    $('.input').hover(function(){
        $(this).tooltipster('hide');
    });

    $('.tt').tooltipster();

  $('#button-send').click( function(){
    // $.removeCookie('sent');
    if($.cookie('sent') != '1'){
      var isOk = 0;
      var name = $('#name').val();
      var email = $('#email').val();
      var birth = $('#birth').val();
      var email = $('#email').val();
      var mobile = $('#mobile').val();
      var home = $('#home').val();

      if(!$.trim($('#name').val()).length) {
           $('#name').tooltipster('update', 'Введите своё имя и фамилию.');
           $('#name').tooltipster('show');
           isOk = 1;
      }

      if(!$.trim($('#email').val()).length) {
           $('#email').tooltipster('update', 'Введите адрес Вашей электронной почты.');
           $('#email').tooltipster('show');
           isOk = 1;
      }

      if(!$.trim($('#mobile').val()).length) {
           $('#mobile').tooltipster('update', 'Введите номер Вашего мобильного телефона.');
           $('#mobile').tooltipster('show');
           isOk = 1;
      }

      if(!$.trim($('#birth').val()).length) {
           $('#birth').tooltipster('update', 'Введите дату Вашего рождения.');
           $('#birth').tooltipster('show');
           isOk = 1;
      }

      if(!$.trim($('#home').val()).length) {
           $('#home').tooltipster('update', 'Введите Ваш адрес.');
           $('#home').tooltipster('show');
           isOk = 1;
      }

      if( isOk == 1 ){
           animate("#button-send", 'shake');
      }

      if( isOk < 1 ){
        $('.box-form').removeClass('animated bounceInDown');
        $.ajax({
          type: 'POST',
          url: 'mail.php',
          data: {
            'name': name,
            'birth': birth,
            'mobile': mobile,
            'home': home,
            'email': email
          },
          beforeSend: function(){
              $('#button-send').html('Отправка...');
          },
          success: function(msg){
             var date = new Date();
             var minutes = 5;
             date.setTime(date.getTime() + (minutes * 60 * 1000));
             $.cookie('sent', '1',{ expires: date });
            $('#button-send').animate({ color: 'rgba(255,255,255,0)'}, function(){
                $('#button-send').html('Ваша заявка принята');
                $('#button-send').animate({color: 'rgba(255,255,255,1)'});
                $('.box-form').addClass('animated bounceOutUp');
                  var wait = window.setTimeout( function(){
                      $('.box-card').css({display: 'block'}).addClass('visible animated bounceInUp');
                      $('.form-container').slideUp();
                  }, 2200);
            });
          }
        });
      }
    } else {
      animate("#button-send", 'shake');
      $('#button-send').html('Ваша заявка уже принята.');
       $('#button-send').tooltipster('update', '<span class="ico icon-bulb"></span> Вы только что отправили заявку. Наш менеджер перезвонит вам в ближайшее время. Что бы отправить ещё одну заявку &mdash; подождите несколько минут.');
       $('#button-send').tooltipster('show');
    }
  });

});