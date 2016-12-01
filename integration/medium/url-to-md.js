var utils = require('./utils');

module.exports = {
    parseMediumPostsToMd: parseMediumPosts
}

function parseMediumPosts(mediumURLs, callback) {
    for (var mediumURL of mediumURLs) {
        utils.loadMediumPost(mediumURL, function(err, json) {

            var s = json.payload.value;
            var story = {};

            story.title = s.title;
            story.subtitle = s.content.subtitle;
            story.date = new Date(s.createdAt);
            story.url = s.canonicalUrl;
            story.language = s.detectedLanguage;
            story.license = s.license;

            story.sections = s.content.bodyModel.sections;
            story.paragraphs = s.content.bodyModel.paragraphs;

            var sections = [];
            for (var i = 0; i < story.sections.length; i++) {
                var s = story.sections[i];
                var section = utils.processSection(s);
                sections[s.startIndex] = section;
            }

            story.markdown = [];
            story.markdown.push("\n# " + story.title.replace(/\n/g, '\n# '));
            story.markdown.push("\n## " + story.subtitle.replace(/\n/g, '\n## '));
            for (var i = 0; i < story.paragraphs.length; i++) {

                if (sections[i]) story.markdown.push(sections[i]);

                var p = story.paragraphs[i];
                var text = utils.processParagraph(p);

                // Avoid double title/subtitle
                if (text != story.markdown[i])
                    story.markdown.push(text);
            }

            callback(story.markdown.join('\n'));
        });
    }
}