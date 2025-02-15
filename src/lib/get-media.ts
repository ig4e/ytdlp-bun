import { join } from "path";

const ytdlpPath = join(process.cwd(), "bin", "yt-dlp.exe");

interface VideoFormat {
  format?: string;
  type?: "video" | "audio";
  quality?: string;
}

export async function getMediaBuffer({
  url,
  format = "best",
}: { url: string } & VideoFormat): Promise<Buffer> {
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

  const buffer = await new Response(ytdlpProcess.stdout).arrayBuffer();
  return Buffer.from(buffer);
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
