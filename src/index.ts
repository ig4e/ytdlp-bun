import { getMediaBuffer, getVideoInfo } from "./lib/get-media";

const media = await getVideoInfo({
  url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
});

console.log(media);

const buffer = await getMediaBuffer({
  url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
});

console.log(buffer);
