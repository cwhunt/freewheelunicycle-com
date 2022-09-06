import React from "react"
import PropTypes from "prop-types"

// Utilities
import kebabCase from "lodash/kebabCase"

// Components
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"

const TagsPage = ({data, location}) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const menuLinks = data.site.siteMetadata.menuLinks
  const group = data.allMarkdownRemark.group

  return (
    <Layout location={location} title={siteTitle} menuLinks={menuLinks}>
      <article
        className="page"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h2 itemProp="headline">Tags</h2>
        </header>
        <section>
          <ul>
            {group.map(tag => (
              <li key={tag.fieldValue}>
                <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                  {tag.fieldValue} ({tag.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
    </Layout>
  )
}

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

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
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`