import { useState, useCallback } from 'react';
import { Message } from '@/types';

const generateInitialMessages = (): Message[] => {
  const messages: Message[] = [];
  
  // Conversation templates for each contact
  const conversations = [
    [
      { content: "Hey! Have you checked out the recent updates on the project?", isFromMe: false },
      { content: "I just started going through them. The additions seem really interesting so far!", isFromMe: true },
      { content: "I'm glad you think so! We should definitely go over the details together soon.", isFromMe: false },
      { content: "Absolutely, I'll make sure to gather all the key points before our meeting.", isFromMe: true },
      { content: "Sounds like a plan. Also, let me know if you spot any issues or improvements.", isFromMe: false },
      { content: "Will do! I want to make sure we’re aligned before we move forward.", isFromMe: true },
      { content: "Perfect, thanks! Looking forward to a productive discussion.", isFromMe: false }
    ],
    [
      { content: "Hey! 👋 Just a quick reminder about the team lunch tomorrow! 🍔🍕", isFromMe: false },
      { content: "Thanks for the heads-up! 🙌 What time does it start again? ⏰", isFromMe: true },
      { content: "It’s at 12:30 PM 🕧, same place as usual 📍", isFromMe: false },
      { content: "Got it! See you there! 😄👍 Can’t wait! 🎉", isFromMe: true },
      { content: "Awesome! It’ll be great to hang out with everyone outside work 🍽️😎", isFromMe: false },
      { content: "Totally! Been way too long since our last meetup! 🎊🤗", isFromMe: true }
    ],
    [
       { content: "Hey! Can you help me out with the presentation slides? 🙏", isFromMe: true },
      { content: "Absolutely! Which section are you struggling with? 🤔", isFromMe: false },
      { content: "The market analysis part needs some polishing 📊📈", isFromMe: true },
      { content: "No worries! I’ll send you some ideas and tips shortly ✉️💡", isFromMe: false }
    ],
    [
      { content: "Hey everyone! Just checking in—hope you’re all doing great today! 😊❤️", isFromMe: true },
      { content: "We're good here! Just finished dinner 🍲 How are things on your end?", isFromMe: false },
      { content: "Pretty good! Work's been a bit hectic but I’m managing. 😅", isFromMe: true },
      { content: "Don’t forget to rest and eat well! 🧘‍♀️🍎", isFromMe: false },
      { content: "Aww, thanks! You guys are the best. Miss being home with everyone! 🏡💕", isFromMe: true },
      { content: "We miss you too! Let’s plan a video call this weekend. 📞💬", isFromMe: false }
    ],
    [
      { content: "Great news! The client absolutely loved your design proposal! 👏✨", isFromMe: false },
      { content: "Wow, that’s amazing to hear! 🎉😊 Thanks for letting me know!", isFromMe: true },
      { content: "They’re eager to move forward with the implementation phase 🚀", isFromMe: false },
      { content: "Perfect! I’ll begin planning the sprints and timelines right away 🗓️⚡", isFromMe: true }
    ],
    [
      { content: "Hey, I have a quick question regarding the API endpoints. 🤔", isFromMe: true },
      { content: "Of course! What do you need clarification on? 😊", isFromMe: false },
      { content: "Are we planning to use GraphQL for the upcoming features, or sticking with REST? 🔍", isFromMe: true },
      { content: "Yes, we’re switching to GraphQL. I’ll send over the schema docs shortly so you can review them. 📄✉️", isFromMe: false },
      { content: "Awesome, thanks! That’ll help me plan the frontend integration better. 🚀", isFromMe: true }
    ]
  ];
  
  // Add messages for each contact with realistic timestamps
  const now = Date.now();
  const hourInMs = 3600000; // 1 hour in milliseconds
  
  conversations.forEach((conversation, index) => {
    const contactId = (index + 1).toString();
    
    conversation.forEach((msg, msgIndex) => {
      messages.push({
        id: `msg-${contactId}-${msgIndex}`,
        contactId,
        content: msg.content,
        timestamp: now - (conversation.length - msgIndex) * hourInMs,
        isFromMe: msg.isFromMe
      });
    });
  });
  
  return messages;
};

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>(generateInitialMessages());
  
  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
  }, []);
  
  return {
    messages,
    addMessage,
  };
}