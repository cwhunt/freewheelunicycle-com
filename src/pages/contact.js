import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Contact = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata?.title || `Title`
    const menuLinks = data.site.siteMetadata.menuLinks
    const socialLinks = data.site.siteMetadata.socialLinks

    return (
        <Layout location={location} title={siteTitle}  menuLinks={menuLinks} socialLinks={socialLinks}>
            <div class="container">
                <h2>Contact</h2>
                <p>
                  Let me know if you have any questions or comments on the content on this site.
                </p>
                <form action="https://usebasin.com/f/51d08e33a634" name="contact_form" method="POST">
                    <label htmlFor="name">Name</label>
                    <input name="name" type="text" required placeholder="Jane Doe"/>
                    <br />
                    <label htmlFor="email">Email</label>
                    <input name="email" type="email" required placeholder="you@domain.com"/>
                    <br />
                    <label htmlFor="message">Message</label><br />
                    <textarea name="message" cols="30" rows="10" placeholder="Enter your message here ..." required> </textarea>
                    <div class="center">
                        <button type="submit">Submit</button>
                    </div>
                </form>	
            </div>
        </Layout>
  );
};

export default Contact;

export const Head = () => <Seo title="Contact" />

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
  }
`
