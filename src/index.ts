import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'

const app = new Hono()
const prisma = new PrismaClient;

async function prisma_test() {
  await prisma.$connect();
}

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/prisma-test', (c) => {
  prisma_test().catch(async (e) => {
    console.error(e)
    process.exit(1)

  }).finally(async () => {
    await prisma.$disconnect()
  });
  return c.text('Prisma connected')
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
