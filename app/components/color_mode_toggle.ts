import { controller } from "@github/catalyst";
import { observeMutationsUntilConditionMet } from "../javascript/utils";
import type FileBrowserElement from "./file_browser";

declare class ToggleSwitchElement extends HTMLElement {
  get switch(): HTMLElement;
  isOn(): boolean;
  turnOn(): void;
  turnOff(): void;
}

export type ColorMode = "light" | "dark";

@controller
export default class ColorModeToggleElement extends HTMLElement {
  #colorMode: ColorMode;

  connectedCallback() {
    const {signal} = new AbortController();
    this.addEventListener("click", this, {signal});

    const pref = window.localStorage.getItem("colorModePreference");

    if (pref === "light" || pref === "dark") {
      this.#colorMode = pref;
    } else {
      this.#colorMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    }

    this.#updateState();

    window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", event => {
      this.#colorMode = event.matches ? "light" : "dark";
      this.#updateState();
    });
  }

  handleEvent(event: Event) {
    if (
      event.type === "click" && (
        event.target === this.#toggleSwitch.switch ||
        this.#toggleSwitch.switch.contains(event.target as HTMLElement)
    )) {
      this.#handleToggleSwitchClicked();
    }
  }

  get #toggleSwitch(): ToggleSwitchElement {
    return this.querySelector("toggle-switch");
  }

  #handleToggleSwitchClicked() {
    this.#colorMode = this.#toggleSwitch.isOn() ? "light" : "dark";
    this.#updateState();
  }

  #updateState() {
    observeMutationsUntilConditionMet(
      document.getRootNode() as HTMLElement,
      () => Boolean(document.querySelector("body")),
      () => {
        if (this.#colorMode === "light") {
          this.#toggleSwitch.turnOn();
        } else {
          this.#toggleSwitch.turnOff();
        }

        document.querySelector("body").setAttribute("data-color-mode", this.#colorMode);
        window.localStorage.setItem("colorModePreference", this.#colorMode);

        // document.querySelectorAll("file-browser").forEach((fileBrowser: FileBrowserElement) => {
        //   fileBrowser.setColorMode(this.#colorMode);
        // });
      }
    );
  }
}
