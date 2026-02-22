import React, { useEffect, useRef, useState } from "react";
import { List, useListRef } from "react-window";
import { useRealtimeContext } from "../context/RealtimeContext";

const SEVERITY_COLORS = {
  INFO: "bg-blue-100 text-blue-700",
  WARN: "bg-yellow-100 text-yellow-800",
  ERROR: "bg-red-100 text-red-700",
  DEBUG: "bg-purple-100 text-purple-700",
  CRITICAL: "bg-red-200 text-red-900",
};

const ROW_HEIGHT = 110;

const Row = ({ index, style, ariaAttributes, events }) => {
  const event = events[index];

  return (
    <div style={style} {...ariaAttributes} className="px-4">
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

const ActivityFeed = () => {
  const { events } = useRealtimeContext();
  const listRef = useListRef();

  const [isAtBottom, setIsAtBottom] = useState(true);
  const containerRef = useRef(null);

  // 🔹 Detect scroll position
  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    const threshold = 50; // px tolerance
    const atBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < threshold;

    setIsAtBottom(atBottom);
  };

  // 🔹 Auto-scroll when new events arrive (only if at bottom)
  useEffect(() => {
    if (!listRef.current) return;

    if (isAtBottom && events.length > 0) {
      listRef.current.scrollToRow({
        index: events.length - 1,
        align: "end",
        behavior: "smooth",
      });
    }
  }, [events.length, isAtBottom, listRef]);

  if (!events || events.length === 0) {
    return (
      <div className="p-4 text-center text-gray-400">
        <p>No events yet.</p>
      </div>
    );
  }

  return (
    <div className="relative p-4">
      <h3 className="text-lg font-semibold mb-4 text-blue-700 flex items-center gap-2">
        <span className="material-symbols-outlined text-blue-500">bolt</span>
        Live Activity
      </h3>

      {/* Scroll container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-[70vh] overflow-y-auto"
      >
        <List
          listRef={listRef}
          rowComponent={Row}
          rowCount={events.length}
          rowHeight={ROW_HEIGHT}
          rowProps={{ events }}
          style={{ height: "100%" }}
        />
      </div>

      {/* Jump to Latest Button */}
      {!isAtBottom && (
        <button
          onClick={() =>
            listRef.current?.scrollToRow({
              index: events.length - 1,
              align: "end",
              behavior: "smooth",
            })
          }
          className="absolute bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-700 transition"
        >
          Jump to Latest
        </button>
      )}
    </div>
  );
};

export default ActivityFeed;