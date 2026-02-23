const axios = require("axios");

/* ============================
   CONFIGURATION
============================ */

const PROJECT_ID = "6995d7619519560c10436ec8";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OThjM2FlODg1MDgwMTNmYWI5NDIwZmUiLCJ0diI6NywiaWF0IjoxNzcxODI5NTQyLCJleHAiOjE3NzE4MzA0NDJ9.sCNDu-5J5fUSZY8afeHVxAhPAkFaDRhK_izXuXyuG0U";

const BASE_URL = "http://localhost:3000/api/events/ingest";
const TOTAL_EVENTS = 2000;
const DELAY_MS = 10;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function randomSeverity() {
  const levels = ["INFO", "WARN", "ERROR", "CRITICAL"]; // MUST MATCH ENUM
  return levels[Math.floor(Math.random() * levels.length)];
}

async function runLoadTest() {
  console.log("Starting load test...");

  for (let i = 0; i < TOTAL_EVENTS; i++) {
    try {
      await axios.post(
        `${BASE_URL}/${PROJECT_ID}`,
        {
          service: "load-test-service",
          severity: randomSeverity(),
          message: `Load test event ${i}`,
          eventTimestamp: new Date().toISOString(),
          metadata: {
            batch: "phase5",
            iteration: i
          },
          environment: "production"
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`
          }
        }
      );

      if (i % 500 === 0) {
        console.log(`Sent ${i} events`);
      }

      await sleep(DELAY_MS);

    } catch (err) {
      if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Error:", err.response.data);
      } else {
        console.log("No response from server");
      }
    }
  }

  console.log("Load test complete");
}

runLoadTest();