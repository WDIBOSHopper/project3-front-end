var data = {posts: [ {blogTitle: "Lauren's Blog", title: "My first post", content: "I posted a thing!", date: "2015-10-15"}, {blogTitle: "Bill's Blog",title: "My second post", content: "I posted a thing!", date: "2015-10-15"},{blogTitle: "Rachel's blog", title: "My third post", content: "I posted a thing!", date: "2015-10-15"}]};


var bhHandlebars = {
  displayHomepage: function(data){
    var blogPostsTemplate = Handlebars.compile($('#blogPosts').html());
    var newHTML = blogPostsTemplate(data);
    $("#putBlogPosts").html(newHTML);
  }

};

bhHandlebars.displayHomepage(data);
