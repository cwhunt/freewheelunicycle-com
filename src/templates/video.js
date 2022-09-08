import * as React from "react"
import { Link, graphql } from "gatsby"

// Utilities
import kebabCase from "lodash/kebabCase"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const VideoTemplate = ({
  data: { site, markdownRemark: video, },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`
  const menuLinks = site.siteMetadata.menuLinks
  const socialLinks = site.siteMetadata.socialLinks

  return (
    <Layout location={location} title={siteTitle} menuLinks={menuLinks} socialLinks={socialLinks}>
      <article
        className="video"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h2 itemProp="headline">{video.frontmatter.title}</h2>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: video.html }}
          itemProp="articleBody"
        />
        <section>
          <iframe width="560" height="315" src={`https://www.youtube.com/embed/${video.frontmatter.id}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </section>
        {video.frontmatter.tags.length &&
          <div style={{ fontWeight: 'bold' }}>
            <p>Tags: {video.frontmatter.tags.map((tag, i, arr) => (<>
              <Link to={`/tags/${kebabCase(tag)}/`}>
                {tag}
              </Link>
              <span>
                {arr.length === i + 1 ? `` : `, `}
              </span>
            </>))} </p>
          </div>
        }
      </article>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: video } }) => {
  return (
    <Seo
      title={video.frontmatter.title}
      description={video.frontmatter.description || video.excerpt}
    />
  )
}

export default VideoTemplate

export const pageQuery = graphql`
  query VideoBySlug(
    $id: String!
  ) {
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
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        image {
          childImageSharp {
            gatsbyImageData(width: 1380)
          }
        }
        imageAlt
        id
        tags
      }
    }
  }
`
