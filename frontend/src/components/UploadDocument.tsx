// "use client";

// import React, { useState } from "react";
// import { uploadDocument, DocumentSource } from "@/lib/api";

// interface UploadDocumentProps {
//   workspaceId: string;
//   onUploadSuccess: (newDoc: DocumentSource) => void;
// }

// export default function UploadDocument({ workspaceId, onUploadSuccess }: UploadDocumentProps) {
//   const [file, setFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const selectedFile = e.target.files[0];
//       if (selectedFile.type !== "application/pdf") {
//         setError("Only PDF files are supported.");
//         setFile(null);
//         return;
//       }
//       setError(null);
//       setFile(selectedFile);
//     }
//   };

//   const handleUpload = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file) return;

//     setUploading(true);
//     setError(null);

//     try {
//       const doc = await uploadDocument(workspaceId, file);
//       onUploadSuccess(doc);
//       setFile(null);
//     } catch (err: any) {
//       setError(err.message || "Something went wrong during upload.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
//       <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Knowledge Document</h3>
//       <p className="text-sm text-gray-500 mb-4">
//         Upload custom PDF manuals or FAQs. The text will be chunked and indexed automatically.
//       </p>

//       <form onSubmit={handleUpload} className="space-y-4">
//         <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
//           <input
//             type="file"
//             accept=".pdf"
//             onChange={handleFileChange}
//             className="hidden"
//             id="pdf-upload-input"
//           />
//           <label htmlFor="pdf-upload-input" className="cursor-pointer block">
//             <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
//               {file ? file.name : "Click to select a PDF file"}
//             </span>
//             <p className="text-xs text-gray-400 mt-1">PDF up to 10MB</p>
//           </label>
//         </div>

//         {error && <p className="text-xs text-red-500">{error}</p>}

//         <button
//           type="submit"
//           disabled={!file || uploading}
//           className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
//             !file || uploading
//               ? "bg-gray-300 cursor-not-allowed"
//               : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           {uploading ? "Processing & Indexing..." : "Upload PDF"}
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { Upload, Link2, Plus, Loader2 } from "lucide-react";
import { uploadDocument, addUrlDocument, DocumentSource } from "@/lib/api"; // Adjust API import paths as needed

interface UploadDocumentProps {
  workspaceId: string;
  onUploadSuccess: (newDoc: DocumentSource) => void;
}

export default function UploadDocument({ workspaceId, onUploadSuccess }: UploadDocumentProps) {
  // PDF Upload States
  const [file, setFile] = useState<File | null>(null);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  // URL Ingest States
  const [url, setUrl] = useState("");
  const [uploadingUrl, setUploadingUrl] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);

  // Handle PDF file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        setPdfError("Only PDF files are supported.");
        setFile(null);
        return;
      }
      setPdfError(null);
      setFile(selectedFile);
    }
  };

  // Submit PDF Upload
  const handlePdfUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploadingPdf(true);
    setPdfError(null);

    try {
      const doc = await uploadDocument(workspaceId, file);
      onUploadSuccess(doc);
      setFile(null);
    } catch (err: any) {
      setPdfError(err.message || "Something went wrong during PDF upload.");
    } finally {
      setUploadingPdf(false);
    }
  };

  // Submit URL Ingestion
  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setUploadingUrl(true);
    setUrlError(null);

    try {
      const doc = await addUrlDocument(workspaceId, url.trim());
      onUploadSuccess(doc);
      setUrl("");
    } catch (err: any) {
      setUrlError(err.message || "Failed to index the URL. Please check the link and try again.");
    } finally {
      setUploadingUrl(false);
    }
  };

  return (
    <div className="">
      <div className="mb-5">
        <h3 className="font-serif text-xl font-semibold text-[#1C1712]">
          Upload Knowledge Document
        </h3>
        <p className="mt-0.5 text-xs text-[#52483E]">
          Upload custom PDF manuals or index web pages. The text will be chunked and indexed automatically.
        </p>
      </div>

      {/* 1. TOP SECTION: PDF UPLOADER */}
      <form onSubmit={handlePdfUpload} className="space-y-3">
        <label
          htmlFor="pdf-upload-input"
          className="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#1C1712]/20 bg-[#FBF7F0]/50 py-4 px-4 hover:border-[#E4572E] hover:bg-[#FBF7F0] transition-all cursor-pointer group"
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            disabled={uploadingPdf}
            className="hidden"
            id="pdf-upload-input"
          />
          <div className="flex flex-col items-center text-center">
            <Upload className="h-5 w-5 text-[#E4572E] mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-semibold text-[#1C1712]">
              {file ? file.name : "Click to select a PDF file"}
            </p>
            <p className="text-xs text-[#52483E] mt-1">PDF up to 10MB</p>
          </div>
        </label>

        {pdfError && <p className="text-xs font-semibold text-red-600 px-1">{pdfError}</p>}

        <button
          type="submit"
          disabled={!file || uploadingPdf}
          className="w-full py-2.5 bg-[#1C1712] text-white text-sm font-semibold rounded-xl hover:bg-[#2C3B32] transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed shadow-[2px_2px_0_0_#1C1712] flex items-center justify-center gap-2"
        >
          {uploadingPdf ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-white" />
              <span>Processing PDF...</span>
            </>
          ) : (
            <span>Upload PDF</span>
          )}
        </button>
      </form>

      {/* DIVIDER */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#1C1712]/10"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-3 font-mono text-[#52483E]/70 font-semibold">
            OR INDEX WEB URL
          </span>
        </div>
      </div>

      {/* 2. BOTTOM SECTION: URL INPUT */}
      <form onSubmit={handleUrlSubmit} className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#52483E]">
              <Link2 className="h-4 w-4" />
            </div>
            <input
              type="url"
              required
              placeholder="https://example.com/documentation"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={uploadingUrl}
              className="w-full pl-10 pr-4 py-2.5 bg-[#FBF7F0] border border-[#1C1712]/15 rounded-xl text-sm text-[#1C1712] placeholder-[#52483E]/60 focus:outline-none focus:ring-2 focus:ring-[#E4572E]/30 focus:border-[#E4572E] transition-all disabled:opacity-60"
            />
          </div>

          <button
            type="submit"
            disabled={uploadingUrl || !url.trim()}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#E4572E] text-white text-sm font-semibold rounded-xl hover:bg-[#d04b23] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[2px_2px_0_0_#1C1712] shrink-0"
          >
            {uploadingUrl ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Indexing...</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span>Add Web Page</span>
              </>
            )}
          </button>
        </div>

        {urlError && <p className="text-xs font-semibold text-red-600 px-1">{urlError}</p>}
      </form>
    </div>
  );
}