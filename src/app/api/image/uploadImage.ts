export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

const res = await fetch('http://localhost:3001/upload', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Greška prilikom slanja slike');
  }

  const data = await res.json();
  return data.url;
}