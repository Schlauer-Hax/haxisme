import { serve } from "https://deno.land/x/esbuild_serve@1.3.0/mod.ts";

serve({
    port: 9090,
    assets: {
        "favicon.ico": "./static/favicon.ico",
    },
    pages: {
        "index": "./src/index.ts",
    },
    poylfills: [
        "https://unpkg.com/construct-style-sheets-polyfill@3.1.0",
        "https://unpkg.com/urlpattern-polyfill@8.0.2/"
    ]
});