import { join } from "path";

const ytdlpPath = join(process.cwd(), "bin", "yt-dlp.exe");

interface VideoFormat {
  format?: string;
  type?: "video" | "audio";
  quality?: string;
}

export async function getMediaStream({
  url,
  format = "best",
}: { url: string } & VideoFormat): Promise<ReadableStream<
  Uint8Array<ArrayBufferLike>
> | null> {
  let formatString = format;
  if (!formatString) {
    formatString = "best";
  }

  const ytdlpProcess = Bun.spawn([
    ytdlpPath,
    "-f",
    formatString,
    "-o",
    "-",
    "--no-progress",
    "--quiet",
    url,
  ]);

  return ytdlpProcess.stdout;
}

export async function getVideoInfo({ url }: { url: string }) {
  const ytdlpProcess = Bun.spawn([
    ytdlpPath,
    "--dump-json",
    "--no-progress",
    "--quiet",
    url,
  ]);

  const output = await new Response(ytdlpProcess.stdout).text();
  return JSON.parse(output);
}
