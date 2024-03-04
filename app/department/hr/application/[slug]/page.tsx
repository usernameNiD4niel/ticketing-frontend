import Content from "@/components/server/hr/application/Content";
import Back from "@/components/server/hr/application/back";
import { SlugTypes } from "@/constants/hr/types";

export async function generateStaticParams() {
  const applications = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/applications/ids`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((data) => data.json());

  const data: SlugTypes = applications;

  return data.slug.map((slug) => ({ slug: slug.toString() }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return (
    <div className="mt-20 md:mt-8 px-4 flex items-center justify-center w-full flex-col">
      <div className="w-full max-w-3xl">
        <Back />
        <Content id={Number(slug)} />
      </div>
    </div>
  );
}
