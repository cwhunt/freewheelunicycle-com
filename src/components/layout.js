import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children, menuLinks, socialLinks }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  header = (
    <>
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
      <div>
      { menuLinks ? 
      <nav>
        <ul style={{ display: "flex", flex: 1 }}>
          {menuLinks.map(link => (
            <li
              key={link.name}
              style={{
                listStyleType: `none`,
                padding: `1rem`,
              }}
            >
              <Link style={{ color: `black` }} to={link.link}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav> : <span />
      }
    </div>
    </>
  )

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        {socialLinks
        ? socialLinks.map((platform, i, arr) => (
            <React.Fragment key={platform.url}>
              <a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {platform.name}
              </a>
              {arr.length - 1 !== i && (
                <React.Fragment>
                  {` `}&bull;{` `}
                </React.Fragment>
              )}
            </React.Fragment>
          ))
        : null}
      </footer>
    </div>
  )
}

export default Layout
