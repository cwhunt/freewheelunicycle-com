import * as React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import PostHeroCaption from "./post-hero-caption"

const PostHero = ({ post }) => (
  <>
    {post?.frontmatter?.image?.childImageSharp && (
      <>
        <GatsbyImage
          image={getImage(post.frontmatter.image)}
          alt={post.frontmatter.imageAlt ? post.frontmatter.imageAlt : post.excerpt}
        />
        <PostHeroCaption
          text={post.imageCaptionText}
          url={post.imageCaptionLink}
        />
      </>
    )}
  </>
)

export default PostHero
