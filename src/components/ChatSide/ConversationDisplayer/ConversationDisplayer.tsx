import React from "react";
import { Message } from "../Message";

// type ConversationDisplayerPropsT = {};

// export function ConversationDisplayer({}: ConversationDisplayerPropsT) {
export function ConversationDisplayer() {
  return (
    <>
      {/* bg image */}
      <div className="bg-chat-bg pointer-events-none absolute inset-0 h-full w-full opacity-5" />

      {/* conversation */}
      <div className="overflow-y-auto py-5">
        <Message
          direction="left"
          message="hello how are you doing"
          status="seen"
          time="11:33 PM"
        />
        <Message
          direction="right"
          message="hello how are you doing"
          status="seen"
          time="11:33 PM"
        />
        <Message
          direction="right"
          message="hello how are you doing"
          status="seen"
          time="11:33 PM"
        />
        <Message
          direction="right"
          message="hello how are you doing"
          status="seen"
          time="11:33 PM"
        />
        <Message
          direction="left"
          message="hello how are you doing"
          status="seen"
          time="11:33 PM"
        />
        <Message
          direction="left"
          message="hello how are you doing"
          status="seen"
          time="11:33 PM"
        />
        <Message
          direction="left"
          message="hello how are you doing"
          status="seen"
          time="11:33 PM"
        />
        <Message
          direction="right"
          message="hello how are you doing"
          status="seen"
          time="11:33 PM"
        />
        <Message
          direction="left"
          message="hello how are you doing"
          status="seen"
          time="11:33 PM"
        />
        <Message
          direction="right"
          message="hello how are you doing"
          status="seen"
          time="11:33 PM"
        />
        <Message
          direction="left"
          message="hello how are you doing"
          status="seen"
          time="11:33 PM"
        />
        <Message
          direction="right"
          message="hello how are you doing"
          status="seen"
          time="11:33 PM"
        />
        <Message
          direction="left"
          message="hello how are you doing"
          status="seen"
          time="11:33 PM"
        />
        <Message
          direction="right"
          message="hello how are you doing"
          status="seen"
          time="11:33 PM"
        />
        <Message
          direction="left"
          message="hello how are you doing"
          status="seen"
          time="11:33 PM"
        />
        <Message
          direction="right"
          message="hello how are you doing"
          status="seen"
          time="11:33 PM"
        />
        <Message
          direction="left"
          message="hello how are you doing"
          status="seen"
          time="11:33 PM"
        />
        <Message
          direction="right"
          message="hello how are you doing"
          status="seen"
          time="11:33 PM"
        />
        <Message
          direction="left"
          message="hello how are you doing"
          status="seen"
          time="11:33 PM"
        />
        <Message
          direction="right"
          message="hello how are you doing"
          status="seen"
          time="11:33 PM"
        />
      </div>
    </>
  );
}
