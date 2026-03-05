/* eslint-disable */
/* global WebImporter */

/**
 * Parser for Cards block
 * Handles: .fme-pagelist--insights-hub (page list card grids)
 * Source: freseniusmedicalcare.com
 */
export default function parse(element, { document }) {
  const cells = [];
  const items = element.querySelectorAll('.cmp-pageList__item');

  items.forEach((item) => {
    // Extract card image
    const img = item.querySelector('.cmp-pageList__image');
    const imgCell = document.createElement('div');
    if (img) {
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt || '';
      imgCell.append(imgEl);
    }

    // Build card content
    const contentCell = document.createElement('div');

    // Category/pretitle
    const pretitle = item.querySelector('.cmp-pagelist__item-pretitle');
    if (pretitle) {
      const strong = document.createElement('strong');
      strong.textContent = pretitle.textContent.trim();
      contentCell.append(strong);
      contentCell.append(document.createElement('br'));
    }

    // Title
    const title = item.querySelector('.cmp-pageList__item-title');
    if (title && title.textContent.trim()) {
      contentCell.append(document.createTextNode(title.textContent.trim()));
      contentCell.append(document.createElement('br'));
    }

    // Description
    const desc = item.querySelector('.cmp-pageList__item-description');
    if (desc && desc.textContent.trim()) {
      contentCell.append(document.createTextNode(desc.textContent.trim()));
      contentCell.append(document.createElement('br'));
    }

    // CTA link
    const link = item.querySelector('.cmp-pageList__item-details .cmp-pageList__item-link');
    if (link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.textContent.trim();
      contentCell.append(a);
    }

    cells.push([imgCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards', cells });
  element.replaceWith(block);
}
