import dotenv from 'dotenv'
import { Telegraf } from "telegraf";
dotenv.config();
const bot = new Telegraf(process.env.TG_BOT_TOKEN || "");
bot.start((ctx) => ctx.reply("Welcome to our food delivery app!", {
    reply_markup: {
        keyboard: [
            ["Order Food"],
            ["My order"]
        ]
    }
}))

bot.hears("Order Food", (ctx) => {
    ctx.reply("*Let's get started 🍟 *\n Please tap the button below to order your perfect meal!", {
        parse_mode: "Markdown",
        reply_markup: {
           inline_keyboard:[
            [
                {
                    text: "Order Food",
                    web_app: { url: "https://vocongbinh.github.io/food-delivery-TMA/" }
                }
            ]
           ],
           
        }
    }
);
})

bot.hears("My order", (ctx) => {
    ctx.reply("Hello");
})
bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

