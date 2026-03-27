export function claudeSettings() {
  return JSON.stringify(
    {
      mcpServers: {
        arxiv: {
          command: "uvx",
          args: ["arxiv-mcp-server", "--storage-path", "./papers"],
        },
      },
    },
    null,
    2
  ) + "\n";
}
