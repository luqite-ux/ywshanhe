import assert from 'node:assert/strict'
import test from 'node:test'

import { contactDetails } from '../lib/data/contact.ts'
import { getProduct } from '../lib/data/catalog.ts'

const expectedGallery = {
  'fireproof-certificate-bag': [
    '/images/products/fireproof-certificate-bag/01.jpg',
    '/images/products/fireproof-certificate-bag/02.jpg',
    '/images/products/fireproof-certificate-bag/03.jpg',
  ],
  'fire-proof-organ-bag-portable': [
    '/images/products/fire-proof-organ-bag-portable/01.jpg',
    '/images/products/fire-proof-organ-bag-portable/02.jpg',
  ],
  'fireproof-coin-purse': [
    '/images/products/fireproof-coin-purse/01.jpg',
    '/images/products/fireproof-coin-purse/02.jpg',
    '/images/products/fireproof-coin-purse/03.jpg',
  ],
  'double-opening-makeup-bag': [
    '/images/products/double-opening-makeup-bag/01.jpg',
    '/images/products/double-opening-makeup-bag/03.png',
    '/images/products/double-opening-makeup-bag/04.png',
  ],
  'drawstring-insulated-lunch-tote': [
    '/images/products/drawstring-insulated-lunch-tote/01.jpg',
    '/images/products/drawstring-insulated-lunch-tote/02.jpg',
  ],
  'passport-organizer-bag': [
    '/images/products/passport-organizer-bag/01.jpg',
    '/images/products/passport-organizer-bag/02.jpg',
  ],
  'digital-gadget-storage-pouch': [
    '/images/products/digital-gadget-storage-pouch/01.jpg',
    '/images/products/digital-gadget-storage-pouch/02.jpg',
  ],
}

test('customer-approved products expose only the retained gallery images', () => {
  for (const [slug, expected] of Object.entries(expectedGallery)) {
    const product = getProduct(slug)
    assert.ok(product, `missing product ${slug}`)
    assert.deepEqual(product.gallery.map((image) => image.src), expected, slug)
  }
})

test('contact details expose the verified company address and useful inquiry guidance', () => {
  assert.equal(
    contactDetails.address,
    '1/F, Building 4, within Yiwu Yunxing Color Printing & Packaging Co., Ltd., Xialuozhai Shangjing Industrial Zone, Futian Subdistrict, Yiwu, Jinhua, Zhejiang, China.',
  )
  assert.match(contactDetails.summary, /functional bags/i)
  assert.match(contactDetails.guidance, /product|quantity|material|logo/i)
})
