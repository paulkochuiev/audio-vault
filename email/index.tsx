import { APP_NAME, SENDER_EMAIL } from "@/lib/constants";
import { Order } from "@/types";
import { Resend } from "resend";
import PurchaseReceiptEmail from "./purchase-receipt";

// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const sendPurchaseReceipt = async ({ order }: { order: Order }) => {
  await resend.emails.send({
    from: `${APP_NAME} <${SENDER_EMAIL}>`,
    to: order.user.email,
    subject: "Order Confirmation ${order.id}",
    react: <PurchaseReceiptEmail order={order} />,
  });
};
