var data = {posts: [ {blogTitle: "Lauren's Blog", title: "My first post", content: "I posted a thing!", date: "2015-10-15"}, {blogTitle: "Bill's Blog",title: "My second post", content: "I posted a thing!", date: "2015-10-15"},{blogTitle: "Rachel's blog", title: "My third post", content: "I posted a thing!", date: "2015-10-15"}]};

var blogData = {blogs: [ {blogName: "My Biking Passion", name: "My first blog", details: "I created a blog!", date: "2015-10-15"}, {blogName: "My Biking Passion", name: "Essential Biking Safety Gear", details: "I created a blog!", date: "2015-10-15"},{blogName: "Rachel's blog", name: "My third blog", details: "I created a thing!", date: "2015-10-15"}]};


var bhHandlebars = {
  displayHomepage: function(data){
    var blogPostsTemplate = Handlebars.compile($('#blogPosts').html());
    var newHTML = blogPostsTemplate(data);
    $("#putBlogPosts").html(newHTML);
  }
};

var blogHandlebars = {
 displayDashboard: function(blogData){
    var blogsTemplate = Handlebars.compile($('#blogLists').html());
    var newHTML = blogsTemplate(blogData);
    $("#putBlogLists").html(newHTML);
  }
};

bhHandlebars.displayHomepage(data);

blogHandlebars.displayDashboard(blogData);


