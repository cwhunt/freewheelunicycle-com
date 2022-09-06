import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const VideosIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const videos = data.allMarkdownRemark.nodes
  const menuLinks = data.site.siteMetadata.menuLinks
  const socialLinks = data.site.siteMetadata.socialLinks

  if (videos.length === 0) {
    return (
      <Layout location={location} title={siteTitle} menuLinks={menuLinks} socialLinks={socialLinks}>
        <Bio />
        <p>
          No videos found. Add markdown videos to "content/videos" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}  menuLinks={menuLinks} socialLinks={socialLinks}>
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {videos.map(video => {
          const title = video.frontmatter.title || video.fields.slug

          return (
            <li key={video.fields.slug}>
              <article
                className="video-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={video.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{video.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: video.frontmatter.description || video.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default VideosIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All videos" />

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        menuLinks {
          name
          link
        }
        socialLinks {
          name
          url
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {fileAbsolutePath: {regex: "//videos//"}}
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
