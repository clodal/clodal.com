const path = require(`path`)

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  const loadPosts = new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulPost {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
    ).then(result => {
        result.data.allContentfulPost.edges.map(({ node }) => {
        createPage({
          path: `blog/${node.slug}/`,
          component: path.resolve(`./src/templates/post.js`),
          context: {
            slug: node.slug,
          },
        })
      })
      resolve()
    })
  })

  const loadPages = new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulPage {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
    ).then(result => {
        result.data.allContentfulPage.edges.map(({ node }) => {
        createPage({
          path: `${node.slug}/`,
          component: path.resolve(`./src/templates/page.js`),
          context: {
            slug: node.slug,
          },
        })
      })
      resolve()
    })
  })

  const loadCasestudies = new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulCasestudy {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
    ).then(result => {
      result.data.allContentfulCasestudy.edges.map(({ node }) => {
        createPage({
          path: `portfolio/${node.slug}/`,
          component: path.resolve(`./src/templates/casestudy.js`),
          context: {
            slug: node.slug,
          },
        })
      })
      resolve()
    })
  })

  return Promise.all([loadPosts, loadPages, loadCasestudies])
};
