import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function LearnMore() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 m-0 h-fit">
          Learn More
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>RULE</DialogTitle>
        </DialogHeader>
        <div className="max-h-[500px] overflow-y-auto w-full">
          <p className="text-justify">
            When the system detected the ticket is not active meaning cancelled
            or closed the comment section will automatically be deactivated. If
            happen you want to comment this ticket or your desired ticket but
            don&apos;t have the authority to do that please request to the
            champion, catalyst or ticket owner to open the ticket.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"ghost"}>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>I understand</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
