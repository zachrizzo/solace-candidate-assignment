export interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  isHtml?: boolean;
}
