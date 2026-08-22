import { Router } from "express";
import { db, preorders } from "@workspace/db";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const preordersRouter = Router();

function cleanedText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

preordersRouter.post("/preorders", async (request, response) => {
  const name = cleanedText(request.body?.name, 120);
  const email = cleanedText(request.body?.email, 254).toLowerCase();
  const phone = cleanedText(request.body?.phone, 50) || null;
  const country = cleanedText(request.body?.country, 100) || null;

  if (name.length < 2) {
    response.status(400).json({ message: "Please enter your name." });
    return;
  }

  if (!emailPattern.test(email)) {
    response.status(400).json({ message: "Please enter a valid email address." });
    return;
  }

  try {
    const inserted = await db
      .insert(preorders)
      .values({ name, email, phone, country })
      .onConflictDoNothing({ target: preorders.email })
      .returning({ id: preorders.id });

    if (inserted.length === 0) {
      response.status(200).json({
        alreadyRegistered: true,
        message: "You're already on the BeePod pre-order list!",
      });
      return;
    }

    response.status(201).json({
      message: "You're on the BeePod pre-order list!",
    });
  } catch (error) {
    request.log.error({ error }, "Unable to save pre-order submission");
    response.status(500).json({
      message: "We couldn't save your pre-order right now. Please try again.",
    });
  }
});

export default preordersRouter;