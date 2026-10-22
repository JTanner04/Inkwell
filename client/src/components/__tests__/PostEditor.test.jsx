import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, expect, test, vi } from "vitest";
import { PostEditor } from "../PostEditor.jsx";

beforeEach(() => { global.fetch = vi.fn(); });

test("shows an error message anchored to the form when publishing fails", async () => {
  global.fetch.mockResolvedValue({ ok: false, json: async () => ({ error: { message: "Could not publish the post." } }) });
  const user = userEvent.setup();
  render(<PostEditor />, { wrapper: MemoryRouter });
  await user.type(screen.getByLabelText(/title/i), "A post title");
  await user.type(screen.getByLabelText(/body/i), "Some content");
  await user.click(screen.getByRole("button", { name: /publish/i }));
  expect(await screen.findByRole("alert")).toHaveTextContent("Could not publish the post.");
});
