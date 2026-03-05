const getMetadata = (el) => [...el.childNodes].reduce((rdx, row) => {
  if (row.children) {
    const key = row.children[0].textContent.trim().toLowerCase();
    const content = row.children[1];
    const text = content?.textContent.trim();
    if (key && text) rdx[key] = text;
  }
  return rdx;
}, {});

export default async function init(el) {
  const metadata = getMetadata(el);

  Object.entries(metadata).forEach(([key, value]) => {
    if (key === 'title') {
      document.title = value;
      return;
    }

    const name = key === 'image' ? 'og:image' : key;
    const attr = name.startsWith('og:') ? 'property' : 'name';
    let meta = document.head.querySelector(`meta[${attr}="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attr, name);
      document.head.append(meta);
    }
    meta.setAttribute('content', value);
  });

  el.remove();
}
