/* eslint-disable */
/* global WebImporter */

/**
 * Parser for Hero block
 * Handles: .fme-pageheading--primary .cmp-teaser (main hero)
 *          .fme-teaser--full-width-promo (CTA hero banners)
 * Source: freseniusmedicalcare.com
 */
export default function parse(element, { document }) {
  const cells = [];

  // Extract background image
  const img = element.querySelector('.cmp-teaser__image img, .cmp-image__image');
  if (img) {
    const imgEl = document.createElement('img');
    imgEl.src = img.src;
    imgEl.alt = img.alt || '';
    const picWrapper = document.createElement('div');
    picWrapper.append(imgEl);
    cells.push([picWrapper]);
  }

  // Build foreground content
  const contentDiv = document.createElement('div');

  // Extract pretitle/eyebrow (h4)
  const pretitle = element.querySelector('.cmp-teaser__pretitle h4');
  if (pretitle) {
    const h4 = document.createElement('h4');
    h4.textContent = pretitle.textContent.trim();
    contentDiv.append(h4);
  }

  // Extract main heading (h1 or h2)
  const titleEl = element.querySelector('.cmp-teaser__title h1, .cmp-teaser__title h2');
  if (titleEl) {
    const heading = document.createElement(titleEl.tagName.toLowerCase());
    heading.textContent = titleEl.textContent.trim();
    contentDiv.append(heading);
  }

  // Extract description if present
  const descEl = element.querySelector('.cmp-teaser__description p');
  if (descEl) {
    const p = document.createElement('p');
    p.textContent = descEl.textContent.trim();
    contentDiv.append(p);
  }

  // Extract CTA link
  const ctaLink = element.querySelector('.cmp-teaser__action-link');
  if (ctaLink) {
    const a = document.createElement('a');
    a.href = ctaLink.href;
    a.textContent = ctaLink.textContent.trim();
    contentDiv.append(a);
  }

  cells.push([contentDiv]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'Hero', cells });
  element.replaceWith(block);
}
