import { Vertical, View, WebGen } from "webgen/mod.ts";
import { DynaNavigation } from "./components/navigation.ts";
import { renderOpener } from "./components/opener.ts";
import { renderSocials } from "./components/socials.ts";
import { renderFooter } from "./components/footer.ts";
import { renderDevices } from "./components/devices.ts";
import { startConnection } from "./data/init.ts";
import { renderCards } from "./components/cards.ts";
import { renderDiscordActivities } from "./components/activities.ts";
import { renderTrainyRow } from "./components/trainy.ts";

WebGen();

View(() => Vertical(
    Vertical(
        DynaNavigation(),
        renderOpener(),
        renderSocials(),
        renderCards(),
        renderDiscordActivities(),
        renderDevices(),
        renderTrainyRow()
    ).setGap("var(--gap)").setMargin("2rem 1rem 0"),
    renderFooter()
))
    .setMaxWidth("75rem")
    .appendOn(document.body);

startConnection();