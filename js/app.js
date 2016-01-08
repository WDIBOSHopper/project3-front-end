var logoutHandler= function(){

  $('#logout').on('click', function(e){
    e.preventDefault();
    bhApi.logout(function(err, data){
      if (err){console.error}
        else {
          userData.userName = null;
          userData.userId = null;
          console.log("You have logged out");
        }
    });
  });
};

var postHandler = function(){
  $('.delete-post').on('click', function(e) {
     e.preventDefault();
     var postId = $(e.target).data('postid');
     console.log("postid" + postId);
     bhApi.deletePost(postId, function (err, data){
      if (err){
        console.error(err);
      } else {
        bhHelpers.refreshPosts();
        console.log("DELTETED");

         }
      });
    });

  $('.edit-post').on('click',function(e) {
     e.preventDefault();
     var postId = $(e.target).data('postid');
     console.log("postid" + postId);
     bhApi.getOnePost(postId, function (err, data){
      if (err){
        console.error(err);
      } else {
        console.log(data);
        bhHandlebars.editPost(data);
        $(document).ready(function(){
          $('#edit-post').on('click', function(e){
              e.preventDefault();
              var postData = bhHelpers.form2object(this);
              var postId = $(e.target).data('postid');

              var callback = function(err, data) {
                if (err){
                  console.log("Flagrant system error.");
                  console.error;
                } else {
                  bhHelpers.refreshPosts();
                  console.log("You updated a Post!");
                  $("#putEditPostHere").html("");
                }
              };
              bhApi.updatePost(postData, postId, callback);
           });
        });
       }
      });
    });

};

var pageHandler = function(){
  $('.delete-page').on('click', function(e) {
     e.preventDefault();
     var pageId = $(e.target).data('pageid');
     console.log("pageid" + pageId);
     bhApi.deletePage(pageId, function (err, data){
      if (err){
        console.error(err);
      } else {
        bhHelpers.refreshPages();
        console.log("DELTETED");

         }
      });
    });

  $('.edit-page').on('click',function(e) {
     e.preventDefault();
     var pageId = $(e.target).data('pageid');
     console.log("pageid" + pageId);
     bhApi.getOnePage(pageId, function (err, data){
      if (err){
        console.error(err);
      } else {
        console.log(data);
        bhHandlebars.editPage(data);
        $(document).ready(function(){
          $('#edit-page').on('click', function(e){
              e.preventDefault();
              var pageData = bhHelpers.form2object(this);
              var pageId = $(e.target).data('pageid');

              var callback = function(err, data) {
                if (err){
                  console.log("Flagrant system error.");
                  console.error;
                } else {
                  bhHelpers.refreshPages();
                  console.log("You updated a page!");
                  $("#putEditPostHere").html("");
                }
              };
              bhApi.updatePage(pageData, pageId, callback);
           });
        });
       }
      });
    });
};


var dashboardHandlers = function(){
  $(document).ready(function(){
    postHandler();
    pageHandler();
    logoutHandler();


    $('#create-post').on('submit', function(e) {
      e.preventDefault();
      var postData = bhHelpers.form2object(this);
      postData.owner = userData.userId;
      console.log(postData);
      var callback = function(err, data) {
        if (err){
          console.error;
          $("#createPostMessage").val("Post created.");
        }
        else {
          console.log("You have created a Post!");
          $("#createPostMessage").html("Post created.");
          setTimeout(function(){
            $('#createPostMessage').html('');
            }, 3000);
          $("#postTitle, #pageEntry").val("");
          bhHelpers.refreshPosts();
        }
      };
      bhApi.createPost(postData, callback);

    });


    $('#create-page').on('submit', function(e) {
      console.log('you have entered the handler');

      e.preventDefault();
      var pageData = bhHelpers.form2object(this);
      pageData.owner = userData.userId;
      console.log(pageData);
      var callback = function(err, data) {
        if (err){console.error}
        else {
          console.log("You have created a Page!");
          $("#createPageMessage").html("Page created.");
          setTimeout(function(){
            $('#createPageMessage').html('');
            }, 3000);
          $("#pageTitle, #pageContent").val("");
          bhHelpers.refreshPages();
        }
      };
      bhApi.createPage(pageData, callback);
    });


  });
};

$(document).ready(function(){
  logoutHandler();

  

  // initial rendering of posts onto homepage
  bhApi.getPosts(function (err, data) {
  if (err){
    console.error(err);
    } else {
    console.log('successful return of get Post request', data);
    bhHandlebars.displayHomepage(data);
    };
  });
  // end of get posts for homepage rendering
});
