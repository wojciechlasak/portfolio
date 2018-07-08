var $=jQuery;

//nav
$('#burger').focus(function(){
  $("#nav").css({"right": "0"});
  $('#burger').focusout(function(){
    $("#nav").css({"right": "-200px"});
  });
});

$('.nav-link').click(function(e){
	e.preventDefault();
	$('html,body').animate({
		'scrollTop'	:	$($(this).children('a').attr('href')).offset().top
	});
});

/*$('#burger').focus(function(){
  $("#nav").addClass('show');
  $('#burger').focusout(function(){
    $("#nav").removeClass("show");
  });
});*/
//form

$('#message').focus(function(){
    $(this).attr('placeholder','');
  });
  $('#message').focusout(function(){
    $(this).attr('placeholder','Wiadomość');
  });

  $('#name').focus(function(){
    $(this).attr('placeholder','');
  });
  $('#name').focusout(function(){
    $(this).attr('placeholder','Imię');
  });

  $('#mail').focus(function(){
    $(this).attr('placeholder','');
  });
  $('#mail').focusout(function(){
    $(this).attr('placeholder','Email');
  });


//about

$('.about-bold:eq(0)').click(function(){
    $("#about-photo img").attr('src','img/wojtek2.jpg');
    $(".about-bold:eq(0)").css({'color': '#875a31', 'font-weight':'500'})
});