import React from "react";
import { useRealtimeContext } from "../context/RealtimeContext";

const SEVERITY_COLORS = {
  INFO: "bg-blue-100 text-blue-700",
  WARN: "bg-yellow-100 text-yellow-800",
  ERROR: "bg-red-100 text-red-700",
  DEBUG: "bg-purple-100 text-purple-700",
  CRITICAL: "bg-red-200 text-red-900",
};

const ActivityFeed = () => {
  const { events } = useRealtimeContext();

  if (!events || events.length === 0) {
    return (
      <div className="p-4 text-center text-gray-400">
        <p>No events yet.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4 text-blue-700 flex items-center gap-2">
        <span className="material-symbols-outlined text-blue-500">bolt</span>
        Live Activity
      </h3>

      <ul className="space-y-3">
        {events.map((event) => (
          <li
            key={event._id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col gap-2 transition hover:shadow-md"
          >
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-0.5 rounded font-medium text-xs capitalize ${
                  SEVERITY_COLORS[event.severity] || "bg-gray-100 text-gray-700"
                }`}
              >
                {event.severity}
              </span>
              <span className="text-xs text-gray-400 ml-auto">
                {new Date(event.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="text-gray-800 text-sm">{event.message}</div>
            {event.service ? (
              <div className="text-xs text-gray-400 mt-1">
                <span className="font-semibold">Service:</span> {event.service}
              </div>
            ) : null}
            {event.environment ? (
              <div className="text-xs text-gray-400">
                <span className="font-semibold">Env:</span> {event.environment}
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;
