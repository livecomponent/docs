import { controller } from "@github/catalyst";
import { TreeViewElement, TreeViewNodeInfo } from "../javascript/primer_view_components";
import { ColorMode } from "./color_mode_toggle";

type FileBrowserView = "code-explorer" | "preview";

@controller
export default class FileBrowserElement extends HTMLElement {
  #contentMap: Map<string, HTMLElement>;
  #navPaneExpanded: boolean = true;
  #currentView: FileBrowserView = "code-explorer";

  connectedCallback() {
    const {signal} = new AbortController();
    this.addEventListener("treeViewNodeActivated", this, {signal});
    this.addEventListener("click", this, {signal});
  }

  handleEvent(event: Event) {
    if (event.type === "treeViewNodeActivated") {
      this.#handleTreeViewNodeActivated(event as CustomEvent<TreeViewNodeInfo>)
    } else if (event.type === "click") {
      const targetElement = event.target as HTMLElement;

      if ((event.target as HTMLElement) === this.#expandFileTreeButton) {
        this.#handleExpandNavPaneClicked();
      } else if (targetElement === this.#collapseFileTreeButton) {
        this.#handleCollapseNavPaneClicked();
      } else {
        const segmentedControl = targetElement.closest("segmented-control") as HTMLElement;

        if (segmentedControl) {
          this.#handleSegmentedControlChanged(segmentedControl);
        }
      }
    }
  }

  // setColorMode(colorMode: ColorMode) {
  //   const src = new URL(this.#previewFrame.src);
  //   src.searchParams.set("colorMode", colorMode);
  //   this.#previewFrame.src = src.toString();
  // }

  #handleExpandNavPaneClicked() {
    this.#navPaneExpanded = true;
    this.#update();
  }

  #handleCollapseNavPaneClicked() {
    this.#navPaneExpanded = false;
    this.#update();
  }

  #handleSegmentedControlChanged(control: HTMLElement) {
    const currentLabel = control.querySelector("[aria-current=true]").textContent.trim().toLowerCase();

    if (currentLabel === "code explorer") {
      this.#currentView = "code-explorer";
    } else if (currentLabel === "preview") {
      this.#currentView = "preview";
    }

    this.#update();
  }

  #update() {
    if (this.#navPaneExpanded) {
      this.#collapseFileTreeButton.removeAttribute("hidden");
      this.#expandFileTreeButton.setAttribute("hidden", "hidden");
      this.#navPane.removeAttribute("hidden");
    } else {
      this.#collapseFileTreeButton.setAttribute("hidden", "hidden");
      this.#expandFileTreeButton.removeAttribute("hidden");
      this.#navPane.setAttribute("hidden", "hidden");
    }

    switch (this.#currentView) {
      case "code-explorer":
        this.#codeExplorerPane.removeAttribute("hidden");
        this.#previewPane.setAttribute("hidden", "hidden");
        return;

      case "preview":
        this.#codeExplorerPane.setAttribute("hidden", "hidden");
        this.#previewPane.removeAttribute("hidden");
        return;
    }
  }

  #handleTreeViewNodeActivated(event: CustomEvent<TreeViewNodeInfo>) {
    const currentPath = JSON.stringify(event.detail.path);
    if (!this.#contentsByPath.has(currentPath)) return;

    this.#treeView.markCurrentAtPath(event.detail.path);

    for (const [path, element] of this.#contentsByPath.entries()) {
      if (path === currentPath) {
        element.removeAttribute("hidden");
      } else {
        element.setAttribute("hidden", "hidden");
      }
    }
  }

  get #treeView(): TreeViewElement {
    return this.querySelector("tree-view");
  }

  get #contentsByPath(): Map<string, HTMLElement> {
    if (!this.#contentMap) {
      this.#contentMap = new Map();
      this.querySelectorAll("[data-targets='file-browser.contents']").forEach((element) => {
        this.#contentMap.set(element.getAttribute("data-path"), element as HTMLElement);
      });
    }

    return this.#contentMap;
  }

  get #expandFileTreeButton(): HTMLButtonElement {
    return this.querySelector("[data-target='file-browser.expandNavPaneButton']");
  }

  get #collapseFileTreeButton(): HTMLButtonElement {
    return this.querySelector("[data-target='file-browser.collapseNavPaneButton']");
  }

  get #navPane(): HTMLButtonElement {
    return this.querySelector("[data-target='file-browser.navPane']");
  }

  get #previewPane(): HTMLIFrameElement {
    return this.querySelector("[data-target='file-browser.previewPane']");
  }

  get #previewFrame(): HTMLIFrameElement {
    return this.querySelector("[data-target='file-browser.previewFrame']");
  }

  get #codeExplorerPane(): HTMLElement {
    return this.querySelector("[data-target='file-browser.codeExplorerPane']");
  }
}
