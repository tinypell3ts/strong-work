const nextTranslate = require('next-translate');

module.exports = nextTranslate({
    images: {
        domains: ['secure.gravatar.com', 'avatars.slack-edge.com'],
    },
});
