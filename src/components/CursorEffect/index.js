import bubbleCursor from "./bubbleCursor";
import emojiCursor from "./emojiCursor";
import fairyDustCursor from "./fairyDustCursor";
import ghostCursor from "./ghostCursor";
import snowflakeCursor from "./snowflakeCursor";
import springyEmojiCursor from "./springyEmojiCursor";
import { useEffect } from "react";

export default function CursorEffect(props) {
  useEffect(() => {
    const {
      element,
      type = "snow",
      trigger = "click",
      number = [3, 5],
      emoji,
      colors,
    } = props;
    type === "bubble" &&
      bubbleCursor({ element, trigger, number }) &&
      console.log("!!!!!!!!");
    type === "emoji" && emojiCursor({ element, trigger, number, emoji });
    type === "dust" && fairyDustCursor({ element, trigger, number, colors });
    type === "ghost" && ghostCursor({ element });
    type === "snow" && snowflakeCursor({ element, trigger, number });
    type === "springy" && springyEmojiCursor({ element, emoji });
  }, []);
  return <></>;
}
