const { Bot, webhookCallback, InlineKeyboard } = require("grammy");

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const bot = new Bot(process.env.BOT_TOKEN || "");

const PRICES = {
    PACKAGE_01: 150,
    PACKAGE_02: 250,
    PACKAGE_03: 200,
};

const WALLET_ADDRESS = "UQBjfe2bFUbV6vxH-Jxs6SnvyfgFR67q9zQQQ25VuTDrSE4g";

bot.command("start", async (ctx) => {
    await ctx.reply(
        "⚡️ *Welcome to Zero Point Demo Bot*\n\n" +
        "I can automate your TON/USDT payments and group operations.\n\n" +
        "Select a package to see how the automation flow works:",
        {
            parse_mode: "Markdown",
            reply_markup: new InlineKeyboard()
                .text("📦 Payment Bot (150 USDT)", "pkg_01").row()
                .text("📡 Wallet Monitor (250 USDT)", "pkg_02").row()
                .text("🛡 Security Audit (200 USDT)", "pkg_03").row()
                .url("🌐 Visit Website", "https://faridkanaani.vercel.app/")
        }
    );
});

bot.callbackQuery(/^pkg_/, async (ctx) => {
    const pkgId = ctx.callbackQuery.data;
    let title = "";
    let price = 0;

    if (pkgId === "pkg_01") { title = "Payment Confirmation Bot"; price = PRICES.PACKAGE_01; }
    else if (pkgId === "pkg_02") { title = "Wallet Monitor / Alerts"; price = PRICES.PACKAGE_02; }
    else { title = "Security Hardening Review"; price = PRICES.PACKAGE_03; }

    await ctx.answerCallbackQuery();
    await ctx.reply(
        `🛠 *Demo: ${title}*\n\n` +
        `This flow simulates a direct USDT-on-TON payment.\n\n` +
        `💰 *Amount:* ${price} USDT\n` +
        `📥 *Address:* \`${WALLET_ADDRESS}\`\n\n` +
        "Steps in real automation:\n" +
        "1️⃣ User sends transaction\n" +
        "2️⃣ Bot detects TX on-chain via TON API\n" +
        "3️⃣ Bot verifies amount & comment\n" +
        "4️⃣ Bot unlocks service/notifies group",
        {
            parse_mode: "Markdown",
            reply_markup: new InlineKeyboard()
                .text("🔄 Simulate Verification", "verify_mock").row()
                .text("⬅️ Back", "start_over")
        }
    );
});

bot.callbackQuery("verify_mock", async (ctx) => {
    await ctx.answerCallbackQuery("Searching for transaction...");
    await ctx.reply("🔍 *Searching for transaction on-chain...*");
    
    setTimeout(async () => {
        await ctx.reply(
            "✅ *Transaction Confirmed!*\n\n" +
            "Simulation complete. In a real scenario, I would have triggered a webhook, added the user to a group, or logged this to your database.",
            { parse_mode: "Markdown" }
        );
    }, 2000);
});

bot.callbackQuery("start_over", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply(
        "Select a package to see the flow:",
        {
            reply_markup: new InlineKeyboard()
                .text("📦 Payment Bot (150 USDT)", "pkg_01").row()
                .text("📡 Wallet Monitor (250 USDT)", "pkg_02").row()
                .text("🛡 Security Audit (200 USDT)", "pkg_03").row()
        }
    );
});

export const POST = webhookCallback(bot, "std/http");

