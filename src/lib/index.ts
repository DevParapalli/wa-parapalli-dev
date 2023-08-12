// place files you want to import through the `$lib` alias in this folder.

import { writable } from "@macfja/svelte-persistent-store"
// import { writable } from "svelte/store"

export const IND_PHONE_REGEX = /(\+91|\+91-|0)?(?<tel>[6789]\d{9})/g;

// export const MSG_VAR_REGEX = /{{\s*([a-z0-9_]+)\s*}}/g;

export const MessagingTemplate = writable<string>("MessagingTemplate", "");
export const MessagingVars = writable<string[]>("MessagingTemplateVars", []);
export const MessagingData = writable<string[][]>("MessagingData", []);

// export const MessagingTemplate = writable<string>("");
// export const MessagingVars = writable<string[]>([]);
// export const MessagingData = writable<string[][]>([]);
