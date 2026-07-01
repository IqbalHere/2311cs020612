import { Log } from "./logger";

const sampleNotifications = [
  {
    id: 1,
    type: "placement",
    title: "Google placement drive announced",
    message: "Online test is scheduled for Friday.",
    read: false,
    time: "2026-07-01T09:30:00"
  },
  {
    id: 2,
    type: "event",
    title: "AI workshop today",
    message: "Workshop starts at 4 PM in Seminar Hall.",
    read: false,
    time: "2026-07-01T08:00:00"
  },
  {
    id: 3,
    type: "result",
    title: "Mid exam results published",
    message: "Check the portal for updated marks.",
    read: false,
    time: "2026-06-30T18:00:00"
  },
  {
    id: 4,
    type: "event",
    title: "Hackathon registration open",
    message: "Register before tonight.",
    read: true,
    time: "2026-06-30T10:00:00"
  },
  {
    id: 5,
    type: "placement",
    title: "Resume shortlist released",
    message: "Selected students can prepare for interviews.",
    read: false,
    time: "2026-06-29T15:00:00"
  }
];

const priorityOrder = {
  placement: 1,
  result: 2,
  event: 3
};

export async function fetchNotifications() {
  await Log("frontend", "info", "api", "fetching notifications");

  return [...sampleNotifications].sort((a, b) => {
    if (priorityOrder[a.type] !== priorityOrder[b.type]) {
      return priorityOrder[a.type] - priorityOrder[b.type];
    }
    return new Date(b.time) - new Date(a.time);
  });
}