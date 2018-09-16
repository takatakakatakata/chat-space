$(function(){
  var current_page_url_matching = window.location.href.match(/groups.\d{1,}.messages/);
  function update(){
    if (current_page_url_matching){
    $.ajax({
      url:location.href,
      dataType:'json'
    });
    .done(function(json_messages){
      var id = $('.pagebody__main--partial:last').data('message-id');
      json_messages.messages.forEach(function(message){
        var new_message_id = message.id;
        if (id < new_message_id){
          var new_message = buildHTML(message);
          $('.pagebody__main--message--ajax').append(new_message);
          scroll_Bottom();
        }
      });
    })
    .fail(function(){
      alert('通信に失敗しました');
    });
    } else {
      clearInterval(5000);
    }}
  setInterval(update,5000);
  function buildHTML(message){
    var img = message.image.url ?`<img src="${message.image.url}">` :""
    var html = `<div class="pagebody__main--partial" data-message-id="${ message.id }">
                  <div class="pagebody__main--partial--about clearfix">
                    <p class="pagebody__main--partial--about--membername ">${message.user_name}
                    </p>
                    <p class="pagebody__main--partial--about--date ">${message.date}
                    </p>
                  </div>
                  <p class="pagebody__main--partial--message ">${message.body}
                  </p>
                  <p class="pagebody__main--partial--image ">
                    ${img}
                  </p>
                </div>`
    return html;
  }
  function scroll_Bottom(){
    $('.pagebody__main').animate({scrollTop: $('.pagebody__main')[0].scrollHeight}, 'swift');
  }
  function reset_form(){
    $('.pagefooter__form--button').prop("disabled", false);
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      dataType: 'Json',
      data: formData,
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.pagebody__main--message--ajax').append(html);
      $('#new_message')[0].reset();
      reset_form();
    })
    .fail(function(){
      alert('送信に失敗しました');
      reset_form();
    });
    scroll_Bottom();
  });
});
