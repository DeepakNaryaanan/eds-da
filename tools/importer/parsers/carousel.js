/* eslint-disable */
/* global WebImporter */

/**
 * Parser for Carousel block (stats carousel)
 * Handles: .fme-freseniuscontainer--promo-carousel .cmp-carousel
 * Source: freseniusmedicalcare.com
 */
export default function parse(element, { document }) {
  const cells = [];
  const slides = element.querySelectorAll('.cmp-carousel__item');

  slides.forEach((slide) => {
    // Extract slide image/icon
    const img = slide.querySelector('.cmp-image__image');
    const imgCell = document.createElement('div');
    if (img) {
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt || '';
      imgCell.append(imgEl);
    }

    // Build slide content
    const contentCell = document.createElement('div');

    // Stat number (h2)
    const titleEl = slide.querySelector('.cmp-teaser__title h2');
    if (titleEl) {
      const h2 = document.createElement('h2');
      h2.textContent = titleEl.textContent.trim();
      contentCell.append(h2);
    }

    // Stat label (p)
    const descEl = slide.querySelector('.cmp-teaser__description p');
    if (descEl) {
      const p = document.createElement('p');
      p.textContent = descEl.textContent.trim();
      contentCell.append(p);
    }

    cells.push([imgCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'Carousel', cells });
  element.replaceWith(block);
}
