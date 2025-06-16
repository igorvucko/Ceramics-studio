export async function POST(req: Request) {
  const body = await req.formData();

const res = await fetch('http://localhost:3001/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: body.get('name'),
      price: Number(body.get('price')),
      slug: body.get('slug'),
    }),
  });

  const data = await res.json();

  return Response.redirect(data.url, 303);
}