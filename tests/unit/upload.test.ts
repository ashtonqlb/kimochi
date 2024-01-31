import { describe, expect, test } from "bun:test";
// import FormData from 'form-data';

import app from '../../src/index';

const imageFile = Bun.file('./tests/unit/files/test.png', {type: 'image/png'});
const textFile = Bun.file('./tests/unit/files/test.txt');
const pdfFile =  Bun.file('./tests/unit/files/test.pdf', {type: 'application/pdf'});

describe('Upload test', () => {
  test('Empty upload results in 400', async () => {
    const form = new FormData();
    form.append('files', '');
    const res = await app.request('/upload', {
      method: 'POST',
      body: form,
    });

    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
    expect(json.errorcode).toBe(400);
    expect(json.description).toBe('No Input file(s)');
  });

  test('Image upload results in 200', async () => {
    const form = new FormData();
    form.append('files', await Bun.readableStreamToBlob(imageFile.stream()));
    const res = await app.request('/upload', {
      method: 'POST',
      body: form,
    });

    const json = await res.json();

    expect(res.status).toBe(200);
    // expect(json.message).toBe('ok');
    expect(json.success).toBe(true);
    expect(json.files.hash).not.toBeEmpty();
    expect(json.files.name).not.toBeEmpty();
    expect(json.files.url).not.toBeEmpty();
    expect(json.files.size).toBeGreaterThan(0);
    expect(json.files.dupe).not.toBeEmpty();
  });

  test('Text upload results in 200', async () => {
    const form = new FormData();
    form.append('files', await Bun.readableStreamToBlob(textFile.stream()));
    const res = await app.request('/upload', {
      method: 'POST',
      body: form,
    });

    const json = await res.json();

    expect(res.status).toBe(200);
    // expect(json.message).toBe('ok');
    expect(json.success).toBe(true);
    expect(json.files.hash).not.toBeEmpty();
    expect(json.files.name).not.toBeEmpty();
    expect(json.files.url).not.toBeEmpty();
    expect(json.files.size).toBeGreaterThan(0);
    expect(json.files.dupe).not.toBeEmpty();
  });

  test('PDF upload results in 200', async () => {
    const form = new FormData();
    form.append('files', await Bun.readableStreamToBlob(pdfFile.stream()));
    const res = await app.request('/upload', {
      method: 'POST',
      body: form,
    });

    const json = await res.json();

    expect(res.status).toBe(200);
    // expect(json.message).toBe('ok');
    expect(json.success).toBe(true);
    expect(json.files.hash).not.toBeEmpty();
    expect(json.files.name).not.toBeEmpty();
    expect(json.files.url).not.toBeEmpty();
    expect(json.files.size).toBeGreaterThan(0);
    expect(json.files.dupe).not.toBeEmpty();
  });
});