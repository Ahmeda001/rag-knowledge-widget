"use client";

import React, { useState } from "react";
import { uploadDocument, DocumentSource } from "@/lib/api";

interface UploadDocumentProps {
  workspaceId: string;
  onUploadSuccess: (newDoc: DocumentSource) => void;
}

export default function UploadDocument({ workspaceId, onUploadSuccess }: UploadDocumentProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        setError("Only PDF files are supported.");
        setFile(null);
        return;
      }
      setError(null);
      setFile(selectedFile);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const doc = await uploadDocument(workspaceId, file);
      onUploadSuccess(doc);
      setFile(null);
    } catch (err: any) {
      setError(err.message || "Something went wrong during upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Knowledge Document</h3>
      <p className="text-sm text-gray-500 mb-4">
        Upload custom PDF manuals or FAQs. The text will be chunked and indexed automatically.
      </p>

      <form onSubmit={handleUpload} className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            id="pdf-upload-input"
          />
          <label htmlFor="pdf-upload-input" className="cursor-pointer block">
            <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
              {file ? file.name : "Click to select a PDF file"}
            </span>
            <p className="text-xs text-gray-400 mt-1">PDF up to 10MB</p>
          </label>
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={!file || uploading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
            !file || uploading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {uploading ? "Processing & Indexing..." : "Upload PDF"}
        </button>
      </form>
    </div>
  );
}