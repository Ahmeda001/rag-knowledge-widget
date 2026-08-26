"use client";

import React, { useState } from "react";

interface EmbedSnippetModalProps {
  workspaceId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function EmbedSnippetModal({ workspaceId, isOpen, onClose }: EmbedSnippetModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const embedCode = `<script 
  src="${backendUrl}/widget.js" 
  data-workspace-id="${workspaceId}" 
  defer>
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl relative">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Embed Widget</h3>
        <p className="text-sm text-gray-500 mb-4">
          Paste this snippet inside the <code className="bg-gray-100 px-1 py-0.5 rounded">&lt;head&gt;</code> or <code className="bg-gray-100 px-1 py-0.5 rounded">&lt;body&gt;</code> tag of your website.
        </p>

        <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm relative overflow-x-auto">
          <pre>{embedCode}</pre>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
          >
            {copied ? "Copied to Clipboard!" : "Copy Snippet"}
          </button>
        </div>
      </div>
    </div>
  );
}