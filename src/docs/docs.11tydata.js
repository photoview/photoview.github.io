module.exports = {
  layout: 'docs/layout.njk',
  eleventyComputed: {
    eleventyNavigation: {
      key: data => data.title,
      parent: data => data.parent,
    },
  },
}
