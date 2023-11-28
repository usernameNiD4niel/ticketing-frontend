export default async function CSRF() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`
  );
  console.log(`csrf ::: ${JSON.stringify(response, null, 2)}`);
}
