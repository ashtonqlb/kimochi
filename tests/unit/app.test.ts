import { describe, expect, test } from "bun:test";

import app from '../../src/index';

describe('App test', () => {
  test('invalid route returns 404', async () => {
      const res = await app.request('/invalid');
      expect(res.status).toBe(404);
  });
});