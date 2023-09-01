import { CardLaunch } from "@/components/launch/Card";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/utils/ModeToggle";
import { Departments } from "@/constants/objects";

export default function Home() {
  return (
    <main className="w-full flex items-center flex-col">
      <div className="fixed top-0 right-0 p-5">
        <ModeToggle />
      </div>
      <div className="flex flex-col items-center gap-y-2 justify-center w-full max-w-6xl my-12 px-8">
        <div className="w-full space-y-8 mt-28 mb-16">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">
              Welcome to <span className="text-[#0B64B9]">OP</span>
              <span className="text-[#99CC68]">PA</span>
            </h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum
              nobis voluptatibus ut quos sint ex. Quibusdam, ut alias, explicabo
              laudantium quos ipsa recusandae vel ad facilis maiores voluptatem
              ipsum numquam!
            </p>
          </div>
          <form>
            <Input
              type="text"
              placeholder="Search department here..."
              className="py-6"
            />
          </form>
        </div>
        <div className="w-full">
          <h2 className="text-2xl font-bold">Departments</h2>
        </div>
        <div className="flex flex-wrap gap-2 items-center justify-center">
          {Departments.map((department, index) => (
            <CardLaunch
              cardTitle={department.value}
              catalyst="Danilo Franco"
              url={department.url}
              key={index}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
