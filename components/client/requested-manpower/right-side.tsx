import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SideComments from "./side-comments";
import SideCommentForm from "../../client/requested-manpower/side-comment-form";
import SideActivities from "./side-activities";
import { HrActivity } from "@/constants/hr/types";

interface RightSideProps {
  comments: Comment[];
  id: string;
  activities: HrActivity[];
}

export default function RightSide({
  comments,
  id,
  activities,
}: RightSideProps) {
  return (
    <Tabs defaultValue="comments" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="comments">Comments</TabsTrigger>
        <TabsTrigger value="activities">Activities</TabsTrigger>
      </TabsList>
      <TabsContent value="comments" className="w-full space-y-2">
        <div className="w-full space-y-2 md:max-h-[700px] overflow-y-auto">
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <SideComments comment={comment} key={comment.id} />
            ))
          ) : (
            <div className="text-sm w-full py-6 flex items-center justify-center">
              <p>No comments yet</p>
            </div>
          )}
        </div>
        <SideCommentForm id={id} />
      </TabsContent>
      <TabsContent value="activities">
        <div className="w-full space-y-2 md:max-h-[700px] overflow-y-auto px-2 pb-4">
          {activities && activities.length > 0 ? (
            activities.map((activity) => (
              <SideActivities activity={activity} key={activity.id} />
            ))
          ) : (
            <div className="text-sm w-full py-6 flex items-center justify-center">
              <p>No activities yet</p>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
