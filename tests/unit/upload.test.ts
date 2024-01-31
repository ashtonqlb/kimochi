import { describe, expect, test } from "bun:test";
// import FormData from 'form-data';

import app from '../../src/index';

const file = Bun.file('./tests/unit/test.png', {type: 'image/png'});

describe('Upload test', () => {
  test('Empty upload results in 400', async () => {
    const form = new FormData();
    form.append('file', '');
    const res = await app.request('/upload', {
      method: 'POST',
      body: form,
    });

    expect(res.status).toBe(400);
    expect((await res.json()).message).toBe('empty or missing files')
  });

  test('Valid upload results in 200', async () => {
    const form = new FormData();
    form.append('file', await Bun.readableStreamToBlob(file.stream()));
    const res = await app.request('/upload', {
      method: 'POST',
      body: form,
    });

    expect(res.status).toBe(200);
    expect((await res.json()).message).toBe('ok');
  });
});