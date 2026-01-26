export const welcomeMessage = {
    id: 'welcome-1',
    sender: 'Sachin (Portfolio Bot)',
    subject: 'Start Here: Navigation Guide 🗺️',
    body: `
👋 **Welcome to SachinOS!**

I created this interactive desktop to show, not just tell, what I can do as a Full Stack Engineer.

**🚀 How to Navigate:**
1. **The Terminal (Centerpiece):** It's not just for looks!
   - *Natural Language:* Ask "What is Sachin's experience with Python?"
   - *Commands:* Try \`ls\`, \`cat about.txt\`, or \`open projects\`.
   - *AI Powered:* It uses GPT-4 to control the UI.

2. **The Apps:**
   - **Projects:** Interactive cards. **Pro Tip:** Click "View Code" to open the VS Code app and read the actual source!
   - **Resume:** Clean PDF viewer (downloadable).
   - **Finder:** Explore the file system structure.

**📬 Want to chat?**
The input box below is hooked up to my **real phone** via Twilio.
If you leave a message, it comes straight to me.

**Please include:**
- Your Name
- Your Email/Phone
- How I can help you

Type below to start! 👇
  `,
    timestamp: new Date().toISOString(),
    read: false
};
