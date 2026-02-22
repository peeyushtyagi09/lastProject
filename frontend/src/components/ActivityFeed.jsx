import React, { useCallback, useMemo } from "react";
import { FixedSizeList as List } from "react-window";
import React from "react";
import { FixedSizeList as List } from "react-window";
import { useRealtimeContext } from "../context/RealtimeContext";
import { twMerge } from "tailwind-merge";

const SEVERITY_DETAILS = {
  INFO: { color: "bg-blue-100 text-blue-700", icon: "info" },
  WARN: { color: "bg-yellow-100 text-yellow-800", icon: "warning" },
  ERROR: { color: "bg-red-100 text-red-700", icon: "error" },
  DEBUG: { color: "bg-purple-100 text-purple-700", icon: "bug_report" },
  CRITICAL: { color: "bg-red-200 text-red-900", icon: "report" },
};

const ROW_HEIGHT = 120;

const EventRow = ({ index, style, data }) => {
  const event = data[index];

  const {
    severity = "INFO",
    createdAt,
    message,
    service,
    environment,
    metadata,
  } = event || {};

  const severityProps = SEVERITY_DETAILS[severity] || {
    color: "bg-gray-100 text-gray-700",
    icon: "notifications",
  };

  // Prefer eventTimestamp fallback if present for compatibility
  const displayTime = createdAt
    ? new Date(createdAt)
    : event.eventTimestamp
    ? new Date(event.eventTimestamp)
    : null;

  return (
    <div style={style} className="px-4 focus:outline-none">
      <div
        className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col gap-2 transition hover:shadow-md"
        tabIndex={0}
        aria-label={`Event: ${severity} - ${message}`}
        role="listitem"
      >
        <div className="flex items-center gap-2">
          <span
            className={twMerge(
              "flex items-center gap-1 px-2 py-0.5 rounded font-medium text-xs whitespace-nowrap",
              severityProps.color
            )}
          >
            <span className="material-symbols-outlined text-base align-middle">
              {severityProps.icon}
            </span>
            {severity}
          </span>
          {displayTime && (
            <span className="text-xs text-gray-400 ml-auto">
              {displayTime.toLocaleString()}
            </span>
          )}
        </div>

        <div className="text-gray-800 text-sm break-words">{message}</div>

        <div className="flex flex-wrap gap-2 text-xs text-gray-400 mt-1">
          {service && (
            <div>
              <span className="font-semibold">Service:</span> {service}
            </div>
          )}
          {environment && (
            <div>
              <span className="font-semibold">Env:</span> {environment}
            </div>
          )}
          {metadata && typeof metadata === "object" && (
            <div>
              <span className="font-semibold">Meta:</span>{" "}
              {Object.entries(metadata)
                .map(([k, v]) => `${k}: ${String(v)}`)
                .join(", ")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ROW_HEIGHT = 110;

const ActivityFeed = () => {
  const { events } = useRealtimeContext();

  const itemData = useMemo(() => [...events].reverse(), [events]);
  // Show most recent at the top

  const renderRow = useCallback(
    (props) => <EventRow {...props} data={itemData} />,
    [itemData]
  );

  if (!events || events.length === 0) {
    return (
      <div className="p-8 flex items-center justify-center text-gray-400 h-[70vh]" role="status">
        <div>
          <span className="material-symbols-outlined text-3xl mb-2 block">
            bolt
          </span>
          <p className="text-base">No events yet.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="p-4 h-[70vh] flex flex-col">
      <h3 className="text-lg font-semibold mb-4 text-blue-700 flex items-center gap-2">
        <span className="material-symbols-outlined text-blue-500">bolt</span>
        Live Activity
        <span className="ml-2 text-xs bg-blue-50 text-blue-600 rounded px-2">
          {events.length}
        </span>
      </h3>
      <div className="flex-1 min-h-0">
        <List
          height={500}
          itemCount={itemData.length}
          itemSize={ROW_HEIGHT}
          width={"100%"}
          itemData={itemData}
        >
          {renderRow}
        </List>
      </div>
    </section>
  if (!events || events.length === 0) {
    return (
      <div className="p-4 text-center text-gray-400">
        <p>No events yet.</p>
      </div>
    );
  }

  const Row = ({ index, style }) => {
    const event = events[index];

    return (
      <div style={style} className="px-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 rounded font-medium text-xs ${
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
          {event.service && (
            <div className="text-xs text-gray-400">
              <span className="font-semibold">Service:</span> {event.service}
            </div>
          )}
          {event.environment && (
            <div className="text-xs text-gray-400">
              <span className="font-semibold">Env:</span> {event.environment}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 h-[70vh]">
      <h3 className="text-lg font-semibold mb-4 text-blue-700 flex items-center gap-2">
        <span className="material-symbols-outlined text-blue-500">bolt</span>
        Live Activity
      </h3>

      <List
        height={500}
        itemCount={events.length}
        itemSize={ROW_HEIGHT}
        width="100%"
      >
        {Row}
      </List>
    </div>
  );
};

export default ActivityFeed;