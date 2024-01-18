import { describe, expect, it } from "vitest";
import { parseMidi } from "./lib";
import { getInstrument } from "./";
import fs from "fs/promises";

describe("Dummy test", () => {
  it("should pass CI", () => {
    expect(1).toBe(1);
  });
  it("should parse a midi file", async () => {
    const file = await fs.readFile("./data/blackbird.mid");
    const midi = parseMidi(file);
    const tracks = midi.tracks;
    const instruments = tracks.map((track) =>
      track
        .map((event) => {
          if (event.type === "programChange") {
            return {
              channel: event.channel + 1,
              instrument: event.programNumber + 1,
            };
          } else {
            return null;
          }
        })
        .filter(Boolean)
    );
    console.log(instruments);
  });
});
