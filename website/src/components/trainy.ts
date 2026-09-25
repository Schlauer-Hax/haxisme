import { Custom, createElement } from 'webgen/mod.ts';

function trainyFrame(src: string, height: number) {
    const frame = createElement("iframe") as HTMLIFrameElement;
    frame.src = src;
    frame.width = "600";
    frame.height = String(height);
    frame.style.border = "none";
    frame.style.maxWidth = "100%";
    frame.style.borderRadius = "0.6rem";
    frame.loading = "lazy";
    return frame;
}

export function renderTrainyStats() {
    return Custom(trainyFrame("https://trainy.app/embed/max/stats", 140));
}

export function renderTrainyRow() {
    const container = createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "var(--gap)";

    const title = createElement("h2");
    title.style.margin = "0";
    title.style.fontSize = "1.4rem";
    title.style.fontWeight = "700";

    const titleLink = createElement("a") as HTMLAnchorElement;
    titleLink.href = "https://trainy.app";
    titleLink.target = "_blank";
    titleLink.rel = "noopener";
    titleLink.textContent = "my trainy journeys";
    titleLink.style.color = "var(--on-card-text)";
    titleLink.style.textDecoration = "none";
    title.append(titleLink);

    const wrapper = createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.flexWrap = "wrap";
    wrapper.style.gap = "var(--gap)";

    const journey = trainyFrame("https://trainy.app/embed/max", 450);
    journey.style.width = "100%";
    journey.style.flex = "1";
    journey.style.minWidth = "300px";

    const mapUrl = "https://map.trainy.app/@max";
    const mapWrap = createElement("div");
    mapWrap.style.position = "relative";
    mapWrap.style.flex = "1";
    mapWrap.style.minWidth = "300px";

    const map = trainyFrame(`${mapUrl}?hideSearch`, 450);
    map.width = "100%";
    map.style.width = "100%";

    const openButton = createElement("a") as HTMLAnchorElement;
    openButton.href = mapUrl;
    openButton.target = "_blank";
    openButton.rel = "noopener";
    openButton.textContent = "Open in new tab";
    openButton.style.position = "absolute";
    openButton.style.top = "0.6rem";
    openButton.style.left = "0.6rem";
    openButton.style.padding = "0.4rem 0.7rem";
    openButton.style.borderRadius = "0.5rem";
    openButton.style.background = "rgba(0, 0, 0, 0.6)";
    openButton.style.color = "#fff";
    openButton.style.font = "600 0.85rem sans-serif";
    openButton.style.textDecoration = "none";
    openButton.style.backdropFilter = "blur(4px)";

    mapWrap.append(map, openButton);
    wrapper.append(journey, mapWrap);
    container.append(title, wrapper);
    return Custom(container);
}
