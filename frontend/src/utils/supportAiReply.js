import { shopInfo } from '../data/menuData'

/**
 * Lightweight on-device “AI” assistant: keyword + FAQ matching for STM Salam.
 * No external API keys required. Replace with a hosted LLM later if needed.
 */
export function getSupportAiReply(userText) {
  const q = (userText || '').toLowerCase().trim()
  if (!q) {
    return "Hi! I’m the STM Salam assistant. Try asking about **opening hours**, **delivery**, **minimum order**, **our address**, or **how to track an order**."
  }

  const outlet = `${shopInfo.outletName} — ${shopInfo.outletAddress}`

  if (/hour|open|close|time|when/.test(q)) {
    return `We’re open **${shopInfo.hours}**. Last orders may vary on busy nights — the team will confirm on WhatsApp (${shopInfo.phone}) if needed.`
  }

  if (/where|address|location|find you|outlet|marine|terrace|blk|block|441050/.test(q)) {
    return `You can order for pickup or delivery from our outlet:\n\n**${shopInfo.outletName}**\n${shopInfo.outletAddress}\n\nWe’re the kitchen your delivery or pickup is fulfilled from.`
  }

  if (/deliver|delivery|radius|km|distance|fee|free ship|shipping/.test(q)) {
    return (
      `**Delivery rules (summary):**\n` +
      `• Minimum **SGD ${(shopInfo.minOrderDelivery ?? 10).toFixed(2)}** subtotal for delivery.\n` +
      `• **Free delivery** if your address is within **${shopInfo.freeDeliveryRadiusKm} km** of our outlet and you meet the minimum.\n` +
      `• Otherwise a **SGD ${shopInfo.deliveryFee.toFixed(2)}** delivery fee applies (final amount is confirmed at checkout once your address is checked).\n` +
      `• **Pickup** is always available at the outlet — no delivery fee.`
    )
  }

  if (/minimum|min order|less than|below \$?10/.test(q)) {
    return `For **delivery**, we need at least **SGD ${(shopInfo.minOrderDelivery ?? 10).toFixed(2)}** in your cart. You can still use **pickup** for smaller orders, or add a few more items.`
  }

  if (/track|order status|where is my|stm-/.test(q)) {
    return `Open **Order tracking** from the menu and enter your **order ID** (e.g. STM-…). You’ll see status updates there. If you’re stuck, use **Live team** in this chat or WhatsApp **${shopInfo.phone}**.`
  }

  if (/pay|payment|paynow|qr|stripe|paypal|cash/.test(q)) {
    return `We support **PayNow (SGQR)**, **card / demo checkout**, and **cash** (where available). At checkout you’ll see the exact options. For PayNow help, tap **Payment Help** on the checkout page or WhatsApp us.`
  }

  if (/menu|food|halal|vegetarian|spicy|price/.test(q)) {
    return `Browse the full **Menu** on the site for items and prices. If you need ingredient or halal details, tap **Live team** or WhatsApp **${shopInfo.phone}** and the kitchen will confirm.`
  }

  if (/phone|whatsapp|call|contact/.test(q)) {
    return `Reach us at **${shopInfo.phone}** or WhatsApp **${shopInfo.whatsapp}**. For written follow-up on an existing order, **Live team** in this chat is best.`
  }

  if (/human|agent|staff|real person|admin/.test(q)) {
    return `Switch to the **Live team** tab in this chat — a staff member can read your thread from the admin dashboard and reply when they’re available.`
  }

  if (/thank|thanks|great/.test(q)) {
    return `You’re welcome! Enjoy your meal — and thanks for choosing **${shopInfo.name}**.`
  }

  return (
    `I don’t have a specific answer for that yet. Try rephrasing, or ask about **hours**, **delivery**, **address**, or **tracking**.\n\n` +
    `For anything personal (payments, allergies, special requests), open the **Live team** tab or WhatsApp **${shopInfo.phone}**.\n\n` +
    `_Outlet:_ ${outlet}`
  )
}

export const AI_SUGGESTED_PROMPTS = [
  'Opening hours?',
  'Delivery rules',
  'Outlet address',
  'Track my order',
]
