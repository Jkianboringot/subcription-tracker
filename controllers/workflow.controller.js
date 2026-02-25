import { createRequire } from "module";
import dayjs from "dayjs";

const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");
import Sub from "../models/sub.model.js";
import { sendReminderEmail } from "../utils/send-email.js";

const Reminders = [7, 5, 2, 1];

export const sendReminders = serve(async (context) => {
  const { subId } = context.requestPayload;
  const sub = await fetchSub(context, subId);

  if (!sub || sub.status !== "active") return;

  const renewalDate = dayjs(sub.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `Renewal date has passed for subscription ${subId}. Stopping Workflow`,
    );
    return;
  }

  for (const daysBefore of Reminders) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");

    // dayjs is today
    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(
        context,
        `Reminder ${daysBefore} days before`,
        reminderDate,
      );
    }

    await triggerReminder(context, `${daysBefore} days before reminder`,sub);
  }
});

const fetchSub = async (context, subId) => {
  return await context.run("get Subscription", async () => {
    return Sub.findById(subId).populate("user", "name email");
  });
};

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label,sub) => {
  return await context.run(label, async () => {
    console.log(`Trigger ${label} reminder`);

    await sendReminderEmail({
      to: sub.user.email,
      type: label,
      sub,
    });
  });
};

// explian all this shit below

// i dont know if i can even do that when i dont get the code fuck hahah

// this is definetely more complicated looking than laravel shit, even filament, like i master
// filamet ina  week aybe becuase i did not stress the funde so  maybe thats why

// i really need ot read all this at the end so that i can understand it ofcourse it will not
// take getPriority over project but still go to try
