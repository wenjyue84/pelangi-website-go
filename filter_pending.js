const fs = require('fs');

const prd = JSON.parse(fs.readFileSync('prd.json', 'utf-8'));

const pendingStories = prd.userStories.filter(story => !story.passes);

console.log(JSON.stringify(pendingStories, null, 2));
