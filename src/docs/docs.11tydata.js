module.exports = {
  layout: 'docs/layout.njk',
  navGroups: ['Installation', 'Usage', 'Contributing'],
  priority: 20, // default priority
  tags: 'docs',
  eleventyComputed: {
    eleventyNavigation: {
      key: data => data.title,
      parent: data => data.parent,
    },
  },
}
