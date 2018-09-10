$(function(){
  function buildHTML(message){
    var img = message.image.url ? `<img src=${message.image.url} class="img__js">`: ""
    var html = `<div class="pagebody__main--partial">
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
// メッセージの投稿の後一番下までスクロール
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
    })
    scroll_Bottom();
  })
});
