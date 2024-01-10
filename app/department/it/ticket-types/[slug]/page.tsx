import SlugBack from "@/components/client/ticket-types/slug-back";
import TicketTypesSlugForm from "@/components/client/ticket-types/ticket-types-slug-form";

export default function TicketTypesSlug(params: { slug: string }) {
  return (
    <div className="md:container">
      {/* <div className="flex items-center justify-center w-full h-[80vh]">
        <p className="text-center mx-4">
          Please refresh your browser or reset your internet{" "}
          <span className="text-xl">😪</span>
        </p>
      </div> */}
      <div className="mt-4 flex items-center justify-center md:mx-0">
        <div className="w-full relative mx-2 md:mx-0">
          <SlugBack />
          <div className="w-full flex items-center justify-center flex-col">
            <div className="w-full max-w-4xl mt-3 mb-7">
              <h1 className="text-xl font-bold">Update Ticket Types</h1>
              <p className="text-sm">
                All fields are required and ticket type should be unique.
              </p>
            </div>
            <TicketTypesSlugForm />
          </div>
        </div>
      </div>
    </div>
  );
}
