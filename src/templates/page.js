import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const PageTemplate = ({
  data: { site, markdownRemark: page,  },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`
  const menuLinks = site.siteMetadata.menuLinks
  const socialLinks = site.siteMetadata.socialLinks

  return (
    <Layout location={location} title={siteTitle} menuLinks={menuLinks} socialLinks={socialLinks}>
      <article
        className="page"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h2 itemProp="headline">{page.frontmatter.title}</h2>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: page.html }}
          itemProp="articleBody"
        />
      </article>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: page } }) => {
  return (
    <Seo
      title={page.frontmatter.title}
      description={page.frontmatter.description || page.excerpt}
    />
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query PageBySlug(
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
      }
    }
  }
`
