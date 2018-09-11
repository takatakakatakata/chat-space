$(function(){
  function builduserlist(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id}" data-user-name="${ user.name }">追加</a>
                </div>`
    return html;
  }

  $('#user-search-field').on('keyup',function(){
    $("#user-search-result").empty();
    var input = $('#user-search-field').val();
    $.ajax({
      type:"GET",
      data: {keyword: input},
      dataType: 'json',
      url: "/users"
    })

    .done(function(users){
      if(users.length !== 0){
        users.forEach(function(user){
        $('#user-search-result').append(builduserlist(user));
        });
      }
    })
    .fail(function(){
      alert("検索に失敗しました");
    });
  });
});
