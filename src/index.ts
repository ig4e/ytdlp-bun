import { getMediaStream, getVideoInfo } from "./lib/get-media";

const media = await getVideoInfo({
  url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
});

console.log(media);

const stream = await getMediaStream({
  url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
});

stream?.pipeTo(
  new WritableStream({
    write(chunk) {
      console.log(chunk);
    },
  })
);