import React from "react";
import { useRealtimeContext } from "../context/RealtimeContext";

const ActivityFeed = () => {
  const { events } = useRealtimeContext();
  console.log(events);

  if (!events || events.length === 0) {
    return (
      <div style={{ padding: "1rem" }}>
        <p>No events yet.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h3>Live Activity</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {events.map((event) => (
          <li
            key={event._id}
            style={{
              border: "1px solid #ddd",
              padding: "0.75rem",
              marginBottom: "0.5rem",
              borderRadius: "6px",
            }}
          >
            <div style={{ fontWeight: "bold" }}>
              {event.severity}
            </div>

            <div>{event.message}</div>

            <div style={{ fontSize: "0.8rem", color: "#666" }}>
              {new Date(event.createdAt).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;
