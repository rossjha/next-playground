/* eslint-disable no-console */
// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
import 'whatwg-fetch'

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

class MockInteractionObserver {
  constructor() {
    this.root = null
    this.rootMargin = ''
    this.thresholds = []
  }

  disconnect() {}
  observe() {}
  unobserve() {}

  takeRecords() {
    return []
  }
}

class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
}

const nodeCrypto = require('crypto')

beforeAll(() => {
  window.IntersectionObserver = MockInteractionObserver
  window.ResizeObserver = ResizeObserver
  window.crypto = nodeCrypto
})
