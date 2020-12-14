module.exports = {
  layout: 'docs/layout.njk',
  navGroups: ['Installation', 'Usage', 'Contributing'],
  eleventyComputed: {
    eleventyNavigation: {
      key: data => data.title,
      parent: data => data.parent,
    },
  },
}
