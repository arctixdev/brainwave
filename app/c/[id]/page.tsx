import ChatUi from "@/components/chat-ui";
import { convertToUIMessages } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";

export default async function ChatPage({
  params,
  searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: { isNew: string };
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  } else if (!id) {
    return notFound();
  }

  const messages = (await supabase.from("messages").select().eq("chat_id", id)).data;

  if (!messages || messages?.length === 0) {
    console.error("Failed to fetch messages");
    console.log(messages);
    return notFound();
  }

  return (
    <ChatUi id={Number(id)} initialMessages={convertToUIMessages(messages)} isNew={searchParams.isNew === "yes"} />
  );
}
