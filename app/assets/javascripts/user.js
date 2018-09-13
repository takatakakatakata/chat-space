$(function(){
  function build_userlist(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
    return html;
  }

  function add_userlist(user_id, user_name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${ user_id }'>
                  <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
                  <p class='chat-group-user__name'>${ user_name }</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
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
      users.forEach(function(user){
      $('#user-search-result').append(build_userlist(user));
      });
    })
    .fail(function(){
      alert("検索に失敗しました");
    });
  });
  $(document).on("click", ".user-search-add.chat-group-user__btn.chat-group-user__btn--add", function(){
    var user_name = $(this).attr('data-user-name');
    var user_id = $(this).data('user-id');
    var user_list = add_userlist(user_id, user_name);
    $('#chat-group-users').append(user_list);
    $(this).parent().remove();
  });
 $(document).on("click",".user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn",function(){
   $(this).parent().remove();
 });
});
