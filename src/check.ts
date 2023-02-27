import _ from "lodash";

interface FontDefinition {
  websiteid: number;
  name: string;
  url: string;
}

export async function checkFont(font: FontDefinition) {
  try {
    const fontFace = new FontFace(font.name, `url(${font.url})`);
    await fontFace.load();
  } catch (e) {
    return e;
  }
  return;
}

export async function checkFontList(fontList: FontDefinition[]) {
  const fontChunks = _.chunk(fontList, 10);

  for (let [chunkIndex, chunk] of fontChunks.entries()) {
    const promises = chunk.map(async (font, index) => {
      const result = await checkFont(font);
      console.log(
        `trying with font ${chunkIndex * 10 + index} of ${fontList.length}`
      );
      if (result != null) {
        console.error(`loading font ${font.name} failed`, result);
      }
    });
    await Promise.all(promises);
  }
}
