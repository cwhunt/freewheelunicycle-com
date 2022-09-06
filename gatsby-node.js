const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const tagTemplate = path.resolve("src/templates/tags.js")
  
  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        blogPosts: allMarkdownRemark(
          sort: {fields: [frontmatter___date], order: ASC}
          filter: {fileAbsolutePath: {regex: "//blog//"}}
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
            frontmatter {
              tags
            }
          }
        }
        pages: allMarkdownRemark(
          sort: {fields: [frontmatter___date], order: ASC}
          filter: {fileAbsolutePath: {regex: "//pages//"}}
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
        videos: allMarkdownRemark(
          sort: {fields: [frontmatter___date], order: ASC}
          filter: {fileAbsolutePath: {regex: "//videos//"}}
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
        tagsGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }        
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.blogPosts.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  // Extract tag data from query
  const tags = result.data.tagsGroup.group
  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tags/${tag.fieldValue}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })

  // Define a template for a video
  const videoTemplate = path.resolve(`./src/templates/video.js`)
  const videos = result.data.videos.nodes

  // Create videos pages
  // But only if there's at least one markdown file found at "content/videos" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (videos.length > 0) {
    videos.forEach((video) => {
      createPage({
        path: video.fields.slug,
        component: videoTemplate,
        context: {
          id: video.id
        },
      })
    })
  }

  // Define a template for a page
  const pageTemplate = path.resolve(`./src/templates/page.js`)
  const pages = result.data.pages.nodes

  // Create pages
  // But only if there's at least one markdown file found at "content/pages" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (pages.length > 0) {
    pages.forEach((page) => {
      createPage({
        path: page.fields.slug,
        component: pageTemplate,
        context: {
          id: page.id
        },
      })
    })
  }

}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
    }

    type Author {
      name: String
      summary: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      tags: [String]
    }

    type Fields {
      slug: String
    }
  `)
}
