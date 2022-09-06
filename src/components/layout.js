import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children, menuLinks, socialLinks }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  header = (
    <>
      <nav class="navbar">
        <h1 class="nav-brand main-heading">{title}</h1>
        <ul class="nav-links">
          {menuLinks.map(link => (
            <li
              key={link.name}
              class="nav-item"
            >
              <Link class="nav-link" to={link.link}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
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
