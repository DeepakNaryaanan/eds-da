/* eslint-disable */
/* global WebImporter */

/**
 * Transformer for Fresenius Medical Care page cleanup
 * Purpose: Remove non-content elements (header, footer, navigation, cookie consent, share bar)
 * Applies to: All pages from freseniusmedicalcare.com
 * Generated: 2026-03-05
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform',
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove header/navigation elements
    WebImporter.DOMUtils.remove(element, [
      '.fme-freseniuscontainer--header',
      '.fme-freseniuscontainer--menu',
      '.fme-freseniuscontainer--language',
    ]);

    // Remove footer experience fragment
    WebImporter.DOMUtils.remove(element, [
      '.cmp-experiencefragment--footer',
      '.fme-freseniuscontainer--footer-primary',
      '.fme-ctalist--top-footer',
      '.fme-pagelist--footer-list',
    ]);

    // Remove cookie consent and tracking elements
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '#onetrust-banner-sdk',
      '.optanon-alert-box-wrapper',
    ]);

    // Remove breadcrumb
    WebImporter.DOMUtils.remove(element, [
      '.fme-breadcrumb--default',
    ]);

    // Remove share bar
    WebImporter.DOMUtils.remove(element, [
      '.fme-ctalist--top-footer',
    ]);

    // Remove sort/search/pagination from pagelists (not authorable)
    WebImporter.DOMUtils.remove(element, [
      '.cmp-pageList__sort-search-wrapper',
      '.cmp-pageList__pagination-wrapper',
      '.cmp-pageList__noresults',
    ]);

    // Remove empty AEM clientlib link tags
    const clientLibLinks = element.querySelectorAll('link[href*="clientlibs"]');
    clientLibLinks.forEach((link) => link.remove());
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove any remaining empty divs
    const emptyDivs = element.querySelectorAll('div:empty');
    emptyDivs.forEach((div) => {
      if (!div.className && !div.id) div.remove();
    });
  }
}
