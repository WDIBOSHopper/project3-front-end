

var userData = {userName: null, userId: null};

var bhHelpers = {
  wrap: function (root, formData) {
    var wrapper = {};
    wrapper[root] = formData;
    return wrapper;
  },

  form2object: function(form) {
    var data = {};
    $(form).find('input').each(function(index, element) {
      var type = $(this).attr('type');
      if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
        data[$(this).attr('name')] = $(this).val();
      }
    });
    return data;
  },

  refreshPosts: function(){
    bhApi.getPosts(function (err, data) {
      if (err){
      console.error(err);
      } else {
      console.log('successful return of get Post request', data);
      bhHandlebars.refreshPosts(data);
      $(document).ready(function(){
        postHandler();
      });
      }
    });
  },

  refreshPages: function(){
    bhApi.getPages(function (err, data) {
      if (err){
      console.error(err);
      } else {
      console.log('successful return of get pages request', data);
      bhHandlebars.refreshPages(data);
      $(document).ready(function(){
        pageHandler();
      });
      }
    });
  }

};


var bhApi = {

  //bh: 'https://lit-brook-2992.herokuapp.com',
  bh: 'http://localhost:3000',

  ajax: function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  },

  register: function (credentials, callback) {
    this.ajax({
      method: 'POST',
      // url: 'http://httpbin.org/post',
      url: this.bh + '/signup',
      data: credentials,
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      }
    }, callback);
  },

  login: function (credentials, callback) {
    this.ajax({
      method: 'POST',
      // url: 'http://httpbin.org/post',
      url: this.bh + '/login',
      data: credentials,
      xhrFields: {
        withCredentials: true
      }
    }, function() {
        $.ajaxSetup({
            xhrFields : {
                withCredentials : true
            }
        });
        callback.apply(this, arguments);
    });
  },

  logout: function(callback) {
    this.ajax({
      method: 'DELETE',
      url: this.bh + '/logout/',
    }, callback);
  },

  dashboard: function(callback){
    this.ajax({
      method: 'GET',
      url: this.bh + '/dashboard',
      xhrFields: {
        withCredentials: true
      },
      dataType: 'json',
    }, callback);
  },

  // retrieve all posts
  getPosts: function (callback) {
    this.ajax({
      method: 'GET',
      url: this.bh + '/post',
      dataType: 'json',
    }, callback);
  },

  getOnePost: function(postId, callback) {
    this.ajax({
      method: 'GET',
      url: this.bh + '/post/' + postId,
      dataType: 'json',
    }, callback);
  },

  createPost: function(data, callback) {
   this.ajax({
        method: 'POST',
        // url: 'http://httpbin.org/post',
        url: this.bh + '/post',
        xhrFields: {
          withCredentials: true
        },
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        dataType: 'json',
      }, callback);
  },

  updatePost: function(data, postId, callback) {
   this.ajax({
        method: 'PATCH',
        // url: 'http://httpbin.org/post',
        url: this.bh + '/post/' + postId,
        xhrFields: {
          withCredentials: true
        },
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        dataType: 'json',
      }, callback);
  },

  deletePost: function(postId, callback) {
    this.ajax({
      method: 'DELETE',
      // url: 'http://httpbin.org/post',
      url: this.bh + '/post/' + postId,
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      }
    }, callback);
  },

  getPages: function (callback) {
    this.ajax({
      method: 'GET',
      url: this.bh + '/page',
      dataType: 'json',
    }, callback);
  },

  getOnePage: function(pageId, callback) {
    this.ajax({
      method: 'GET',
      url: this.bh + '/page/' + pageId,
      dataType: 'json',
    }, callback);
  },

  createPage: function(data, callback) {
    this.ajax({
      method: 'POST',
      // url: 'http://httpbin.org/post',
      url: this.bh + '/page',
      xhrFields: {
          withCredentials: true
        },
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        dataType: 'json',
      }, callback);
  },

  updatePage: function(data, pageId, callback) {
   this.ajax({
        method: 'PATCH',
        // url: 'http://httpbin.org/page',
        url: this.bh + '/page/' + pageId,
        xhrFields: {
          withCredentials: true
        },
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        dataType: 'json',
      }, callback);
  },

  deletePage: function(pageId, callback) {
    this.ajax({
      method: 'DELETE',
      // url: 'http://httpbin.org/page',
      url: this.bh + '/page/' + pageId,
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      }
    }, callback);
  }


};

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
