import { Copy, ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import UserAvatar from "./user-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Message } from "ai";

export default function ChatMessages({ messages }: { messages: Message[] }) {
  // Sort messages by date
  // if (messages.length > 1) {
  //   console.warn("Sorting messages by date");
  //   console.warn(messages);
  //   messages.sort((a, b) => a.createdAt!.getTime() - b.createdAt!.getTime());
  // }

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {messages.map((message, index) => (
          <div key={index} className="flex gap-4">
            {/* {!message.isMine && <div className="w-12" />} */}
            {message.role === "user" && <UserAvatar />}
            {message.role === "assistant" && (
              <Avatar>
                <AvatarImage
                  src="/brainwave-avatar.jpg"
                  alt="Brainwave Avatar"
                />
                <AvatarFallback>BW</AvatarFallback>
              </Avatar>
            )}
            <div className="space-y-2 flex-1">
              <div className="font-semibold">
                {message.role === "user" ? "You" : "Brainwave"}
              </div>
              <div className="prose dark:prose-invert">
                {message.content.split("\n").map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              {message.role === "assistant" && (
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
