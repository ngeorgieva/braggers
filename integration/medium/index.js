var getUserPosts = require('./get-user-posts');
var mdParser = require('./url-to-md');

getUserPosts('patti.mulligan', mdParser.parseMediumPostsToMd, console.log);