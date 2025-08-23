// SPDX-License-Identifier: Apache-2.0

import { describe, it, expect, vi, beforeEach } from "vitest";
import * as runtime from "@midnight-ntwrk/compact-runtime";

import { VoteSimulator } from "./simulators/VoteSimulator.js";
import { createEitherTestUser } from "./utils/address.js";

const Z_OWNER = createEitherTestUser("OWNER");
const Z_OWNER_PUBLIC_KEY = Z_OWNER.left;

let vote: VoteSimulator;

describe("Vote", () => {
  beforeEach(() => {
    vote = new VoteSimulator(Z_OWNER);
  });

  it("properly initializes ledger state", () => {
    const { round } = vote.getLedger();
    expect(round).toEqual(0n);
  });

  it("increments the counter correctly", () => {
    const { round } = vote.increment();
    expect(round).toEqual(1n);
  });

  it("resets the counter when called by the owner", () => {
    vote.increment();
    // Mock the runtime to simulate the owner calling reset
    const spy = vi.spyOn(runtime, "ownPublicKey").mockImplementation(() => Z_OWNER_PUBLIC_KEY);
    const { round } = vote.reset();
    expect(round).toEqual(0n);
    spy.mockRestore();
  });

  it("throws an error when reset is called by a non-owner", () => {
    expect(
      () => vote.reset()
    ).toThrow("Ownable: caller is not the owner");
  });
});
