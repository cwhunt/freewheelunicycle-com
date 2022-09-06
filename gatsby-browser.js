// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles
import "./src/style.css"

// Highlighting for code blocks
import "prismjs/themes/prism.css"

export const onRouteUpdate = ({ location }) => {
    if (process.env.NODE_ENV !== 'production') {
      return null;
    }
  
    const pagePath = location ? location.pathname + location.search + location.hash : undefined;
    setTimeout(() => {
      if (typeof gtag === 'function') {
        window.gtag('event', 'page_view', { page_path: pagePath });
      }
    }, 100);
};
  