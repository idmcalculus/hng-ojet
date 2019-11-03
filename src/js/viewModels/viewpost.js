define(["knockout", "jquery", "../ckeditor", "./api"], function(
  ko,
  $,
  ClassicEditor,
  api
) {
  function viewPost(params) {
    let self = this;
    let data = params.post._latestValue;
    self.category = ko.observable(data.category.title);
    self.title = ko.observable(data.post_title);
    self.post = ko.observable(data.post_body);
    self.time = ko.observable(data.created_at);
    self.author = ko.observable(`${data.user.firstname} ${data.user.lastname}`);
    self.editor = ko.observable();
    let RESTurl = `${api}/api/post-comment`;
    let userToken = sessionStorage.getItem("user_token");
    let user = sessionStorage.getItem("user");
    user = JSON.parse(user);
    self.close = () => {
      params.fullpost(false);
      params.postpg("d-block");
    };
    self.toggle_comment_box = () => {
      $("#commentBox").slideToggle();
    };

    self.post_comment = () => {
      let id = data.id;
      let comment = self.editor().getData();
      console.log(id, comment);
      $.ajax({
        url: `${RESTurl}/${id}/comment`,
        headers: {
          Authorization: "Bearer " + userToken
        },
        method: "POST",
        data: { comment },
        success: ({ status, data }) => {
          if (status == true) {
            console.log(data);
          }
        },
        error: err => console.log(err)
      });
    };

    self.handleAttached = () => {
      $("#fp").html(self.post());
      ClassicEditor.create(document.querySelector("#replypost"), {
        toolbar: ["bold", "link", "underline"]
      }).then(editor => self.editor(editor));
    };
  }
  return viewPost;
});
