import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children, socialLinks }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

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
