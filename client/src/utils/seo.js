export const setMetaTags = (title, description, image = null) => {
  // Set page title
  document.title = title ? `${title} | Blog App` : 'Blog App';

  // Remove existing meta tags (except charset, viewport, etc)
  const existingMeta = document.querySelectorAll('meta[property="og:"], meta[name="description"], meta[property="og:image"]');
  existingMeta.forEach(tag => tag.remove());

  // Set description meta tag
  if (description) {
    const descriptionMeta = document.createElement('meta');
    descriptionMeta.name = 'description';
    descriptionMeta.content = description;
    document.head.appendChild(descriptionMeta);
  }

  // Set Open Graph tags for social sharing
  const ogTitle = document.createElement('meta');
  ogTitle.setAttribute('property', 'og:title');
  ogTitle.content = title || 'Blog App';
  document.head.appendChild(ogTitle);

  if (description) {
    const ogDescription = document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    ogDescription.content = description;
    document.head.appendChild(ogDescription);
  }

  if (image) {
    const ogImage = document.createElement('meta');
    ogImage.setAttribute('property', 'og:image');
    ogImage.content = image;
    document.head.appendChild(ogImage);
  }

  // Set URL
  const ogUrl = document.createElement('meta');
  ogUrl.setAttribute('property', 'og:url');
  ogUrl.content = window.location.href;
  document.head.appendChild(ogUrl);
};

export const clearMetaTags = () => {
  document.title = 'Blog App';
  const metaTags = document.querySelectorAll('meta[property="og:"], meta[name="description"]');
  metaTags.forEach(tag => tag.remove());
};
