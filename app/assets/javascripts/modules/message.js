$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="list" data-message-id=${message.id}>
          <div class="list-box">
            <div class="list-box__name">
              ${message.user_name}
            </div>
            <div class="list-box__daytime">
              ${message.created_at}
            </div>
          </div>
          <div class="list__tweet">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="list" data-message-id=${message.id}>
        <div class="list-box">
          <div class="list-box__name">
            ${message.user_name}
          </div>
          <div class="list-box__daytime">
            ${message.created_at}
          </div>
        </div>
        <div class="list__tweet">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main-chat__message-list').append(html);      
      $('form')[0].reset();
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $('.form__btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.form__btn').prop('disabled', false);
    });
  });
});