export async function getComments(token: string, id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["requested-manpower-comment"],
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data.comments as Comment[];
  }

  throw new Error("Cannot get the comments");
}

export async function createComment(
  token: string,
  id: string,
  comment: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authentication: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment }),
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data.message as string;
  }

  throw new Error("Cannot create a comment");
}
