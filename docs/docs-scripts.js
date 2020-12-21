// Table of Contents
;(() => {
  const content = document.querySelector('#primary-content')
  const contentToc = document.querySelector('#content-toc')

  const headings = content.querySelectorAll('h2, h3, h4, h5, h6')
  const headingLinks = Array.from(contentToc.querySelectorAll('li a'))

  let currentHeading

  findCurrentHeading()
  document.addEventListener('scroll', findCurrentHeading)

  function headingChanged() {
    headingLinks.forEach(link => link.classList.remove('active'))
    const newActiveLink = headingLinks.find(
      link => new URL(link).hash.substr(1) == currentHeading.id
    )
    newActiveLink.classList.add('active')
  }

  function findCurrentHeading() {
    let newHeading = null

    for (let i = 0; i < headings.length; i++) {
      if (headings[i].getBoundingClientRect().top >= 10) {
        if (i == 0) {
          newHeading = headings[i]
        } else {
          newHeading = headings[i - 1]
        }
        break
      }
    }

    if (newHeading == null && headings.length > 0) {
      newHeading = headings[headings.length - 1]
    }

    if (newHeading != currentHeading) {
      currentHeading = newHeading
      headingChanged()
    }
  }
})()
