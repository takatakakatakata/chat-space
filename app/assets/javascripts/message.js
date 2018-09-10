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


  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    console.log(this);
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
      $('.pagefooter__form--button').prop("disabled", false);
    })
    .fail(function(){
      alert('テキストか画像を投稿してください');
      $('.pagefooter__form--button').prop("disabled", false);
    })
    $('.pagebody__main').animate({scrollTop: $('.pagebody__main')[0].scrollHeight}, 'swift');

  })
});
