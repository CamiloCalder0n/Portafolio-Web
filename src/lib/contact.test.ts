import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { validateContactPayload } from "./contact.ts";

describe("validateContactPayload", () => {
  it("trims and accepts a valid contact payload", () => {
    assert.deepEqual(
      validateContactPayload({
        name: "  Juan Camilo  ",
        email: "  juan@example.com ",
        message: "  I would like to discuss a project.  ",
      }),
      {
        ok: true,
        data: {
          name: "Juan Camilo",
          email: "juan@example.com",
          message: "I would like to discuss a project.",
        },
      }
    );
  });

  it("rejects invalid input before sending email", () => {
    assert.deepEqual(
      validateContactPayload({
        name: "",
        email: "invalid",
        message: "short",
      }),
      {
        ok: false,
        error: "Complete the form with a valid name, email, and message.",
      }
    );
  });
});
