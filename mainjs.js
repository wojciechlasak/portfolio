var $=jQuery;

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