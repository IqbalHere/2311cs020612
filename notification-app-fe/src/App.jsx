import { useEffect, useMemo, useState } from "react";
import { Log } from "./api/logger";
import { fetchNotifications } from "./api/notifications";
import "./index.css";

export default function App() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function loadData() {
      await Log("frontend", "info", "page", "notifications page loaded");
      const data = await fetchNotifications();
      setNotifications(data);
      await Log("frontend", "info", "state", "notifications stored in state");
    }

    loadData();
  }, []);

  async function handleFilterChange(e) {
    const value = e.target.value;
    setFilter(value);
    await Log("frontend", "info", "component", `filter changed to ${value}`);
  }

  async function markAsRead(id) {
    const updated = notifications.map((item) =>
      item.id === id ? { ...item, read: true } : item
    );

    setNotifications(updated);
    await Log("frontend", "info", "state", `marked notification ${id} as read`);
  }

  const filteredNotifications = useMemo(() => {
    if (filter === "all") return notifications;
    return notifications.filter((item) => item.type === filter);
  }, [notifications, filter]);

  const topUnread = useMemo(() => {
    return notifications.filter((item) => !item.read).slice(0, 10);
  }, [notifications]);

  return (
    <div className="app">
      <h1>Priority Inbox</h1>
      <p className="subtitle">Simple student notification app</p>

      <div className="section">
        <h2>Top Unread</h2>
        {topUnread.length === 0 ? (
          <p>No unread notifications</p>
        ) : (
          topUnread.map((item) => (
            <div className="card priority" key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.message}</p>
              <span className="tag">{item.type}</span>
            </div>
          ))
        )}
      </div>

      <div className="section">
        <div className="row">
          <h2>All Notifications</h2>
          
        </div>

        {filteredNotifications.map((item) => (
          <div className="card" key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.message}</p>
            <div className="row">
              <span className="tag">{item.type}</span>
              <span className={item.read ? "status read" : "status unread"}>
                {item.read ? "Read" : "Unread"}
              </span>
            </div>
            {!item.read && (
              <button onClick={() => markAsRead(item.id)}>Mark as Read</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}