import openai from "./config/open-ai.js";
import readlineSync from "readline-sync";
import colors from "colors";

async function main() {
  console.log(colors.bold.green("Welcome to the joebot - js"));
  console.log(colors.bold.red("You can start a new chat below:"));

  const chatHistory = [];

  while (true) {
    const userInput = readlineSync.question(colors.bold.yellow("You: "));

    try {
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));

      messages.push({ role: "user", content: userInput });

      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });

      const completionMessage = completion.data.choices[0].message.content;

      if (userInput.toLowerCase() === "exit") {
        console.log(
          colors.bold.red("Bot: ") + colors.bold.green(completionMessage)
        );
        return;
      }
      console.log(
        colors.red.bold("Bot: ") + colors.bold.green(completionMessage)
      );
      chatHistory.push(["user", userInput]);
      chatHistory.push(["assistant", colors.bold.green(completionMessage)]);
    } catch (error) {
      console.log(colors.bold.red(error));
    }
  }
}

main();
