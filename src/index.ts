import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/upload', async (c) => {
  console.log(await c.req.header());
  console.log('POST req received');
  console.log(await c.req.formData());
  if (!c.req.header('content-type')?.startsWith('multipart/form-data')){
    c.status(400);
    return c.json({message: 'invalid content'});
  }

  const form = await c.req.formData();

  if (!form || form.length == 0 || !form.get('file') || form.get('file')?.length == 0) {
    c.status(400);
    return c.json({message: 'empty or missing files'})
  }
  
  return c.json({message: "ok"});
});

export default app
