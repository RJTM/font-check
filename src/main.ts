import { checkFontList } from "./check";

declare global {
  interface Window {
    runChecks: () => Promise<void>;
  }
}

window.runChecks = async () => {
  // pass the array of fonts after getting them from the db
  await checkFontList([]);
};
