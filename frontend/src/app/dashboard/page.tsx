"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderPlus,
  Code2,
  FileText,
  Sparkles,
  Plus,
  CheckCircle2,
  Layers,
  ChevronDown,
  Loader2,
  Database,
  ArrowRight, 
  Globe, 
  Trash2, // <-- Added Trash2
} from "lucide-react";
import {
  getWorkspaces,
  createWorkspace,
  getWorkspaceDetails,
  addUrlDocument,
  deleteWorkspace,
  Workspace,
  DocumentSource,
  deleteDocument,
} from "@/lib/api";
import UploadDocument from "@/components/UploadDocument";
import EmbedSnippetModal from "@/components/EmbedSnippetModal";



/* ──────────────────────── Brand Assets Injector ──────────────────────── */

function useBrandAssets() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=IBM+Plex+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      body { background-color: #FBF7F0; color: #1C1712; font-family: 'Instrument Sans', sans-serif; }
      .font-serif { font-family: 'Fraunces', serif; }
      .font-mono { font-family: 'IBM Plex Mono', monospace; }
      ::selection { background: #E4572E; color: #FBF7F0; }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);
}




/* ──────────────────────── Main Dashboard Page ──────────────────────── */

export default function DashboardPage() {
  useBrandAssets();

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>("");
  const [documents, setDocuments] = useState<DocumentSource[]>([]);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // <-- Added state
  const [isModalOpen, setIsModalOpen] = useState(false);


  const [isLoadingDocuments, setIsLoadingDocuments] = useState<boolean>(false);

  const loadWorkspaceData = async (id: string) => {
    setIsLoadingDocuments(true);
    try {
      const details = await getWorkspaceDetails(id);
      setDocuments(details.documents || []);
    } catch (err) {
      console.error("Failed to load workspace details", err);
    } finally {
      setIsLoadingDocuments(false);
    }
  };

  useEffect(() => {
    fetchInitialWorkspaces();
  }, []);

  useEffect(() => {
    if (selectedWorkspaceId) {
      loadWorkspaceData(selectedWorkspaceId);
    }
  }, [selectedWorkspaceId]);

  const fetchInitialWorkspaces = async () => {
    try {
      const data = await getWorkspaces();
      setWorkspaces(data);
      if (data.length > 0) {
        setSelectedWorkspaceId(data[0].id);
      }
    } catch (err) {
      console.error("Failed to load workspaces", err);
    } finally {
      setLoading(false);
    }
  };

  /* Workspace Deletion Handler */
  const handleDeleteWorkspace = async (workspaceId: string) => {
    if (!workspaceId) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this workspace? This will permanently remove all associated documents and vector embeddings."
    );
    if (!confirmed) return;

    try {
      setIsDeleting(true);
      await deleteWorkspace(workspaceId);

      // 1. Remove workspace from local state
      const updatedWorkspaces = workspaces.filter((w) => w.id !== workspaceId);
      setWorkspaces(updatedWorkspaces);

      // 2. Switch selection to the next available workspace or clear documents
      if (selectedWorkspaceId === workspaceId) {
        if (updatedWorkspaces.length > 0) {
          setSelectedWorkspaceId(updatedWorkspaces[0].id);
        } else {
          setSelectedWorkspaceId("");
          setDocuments([]);
        }
      }
    } catch (err) {
      console.error("Failed to delete workspace", err);
      alert("Failed to delete workspace. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (docId: string, docName: string) => {
      if (!confirm(`Are you sure you want to delete "${docName}" and all its vector chunks?`)) {
        return;
      }

      setDeletingId(docId);

      try {
        await deleteDocument(selectedWorkspaceId, docId);
        setDocuments((prev) => prev.filter((d) => d.id !== docId));
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete the document. Please try again.");
      } finally {
        setDeletingId(null);
      }
    };

  // const loadWorkspaceData = async (id: string) => {
  //   try {
  //     const details = await getWorkspaceDetails(id);
  //     setDocuments(details.documents || []);
  //   } catch (err) {
  //     console.error("Failed to load workspace details", err);
  //   }
  // };

  const handleCreateWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkspaceName.trim()) return;

    try {
      setIsCreating(true);
      const ws = await createWorkspace(newWorkspaceName.trim());
      setWorkspaces((prev) => [...prev, ws]);
      setSelectedWorkspaceId(ws.id);
      setNewWorkspaceName("");
    } catch (err) {
      console.error("Error creating workspace", err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleUploadSuccess = (newDoc: DocumentSource) => {
    setDocuments((prev) => [...prev, newDoc]);
  };

  

  /* Loading View */
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FBF7F0] text-[#1C1712]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E4572E] text-[#FBF7F0] shadow-[3px_3px_0_0_#1C1712]"
        >
          <Loader2 className="h-6 w-6 animate-spin" />
        </motion.div>
        <p className="mt-4 font-serif text-lg font-medium text-[#1C1712]">
          Loading Docsy Workspaces...
        </p>
      </div>
    );
  }

  const selectedWorkspace = workspaces.find((w) => w.id === selectedWorkspaceId);

  return (
    <div className="relative min-h-screen bg-[#FBF7F0] text-[#1C1712] selection:bg-[#E4572E] selection:text-[#FBF7F0]">
      {/* Background Dot Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage: "radial-gradient(#1C1712 0.75px, transparent 0.75px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8 space-y-8">
        {/* Navigation Bar / Branding */}
        <header className="flex items-center justify-between border-b border-[#1C1712]/15 pb-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E4572E] font-serif text-xl font-bold text-[#FBF7F0] shadow-[3px_3px_0_0_#1C1712]">
              D
            </span>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#1C1712]">
                Docsy
              </span>
              <span className="ml-2.5 rounded-full border border-[#1C1712]/15 bg-white/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#52483E]">
                Workspace Engine
              </span>
            </div>
          </div>
          </Link>

          {selectedWorkspaceId && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="group inline-flex items-center gap-2 rounded-xl bg-[#E4572E] px-4 py-2.5 text-sm font-semibold text-[#FBF7F0] shadow-[3px_3px_0_0_#1C1712] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_#1C1712]"
            >
              <Code2 className="h-4 w-4" />
              <span>Get Embed Snippet</span>
            </button>
          )}
        </header>

        {/* Dashboard Title & Meta */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#E4572E]">
              <Sparkles className="h-3.5 w-3.5" />
              Knowledge Hub
            </div>
            <h1 className="mt-1 font-serif text-3xl font-semibold tracking-tight text-[#1C1712] sm:text-4xl">
              Chatbot Workspaces
            </h1>
            <p className="mt-1 text-sm text-[#52483E]">
              Manage knowledge bases, index live documents, and generate custom embed widgets.
            </p>
          </div>

          {selectedWorkspace && (
            <div className="inline-flex items-center gap-2 rounded-xl border border-[#1C1712]/15 bg-white/80 px-3.5 py-2 text-xs font-semibold text-[#1C1712] shadow-[2px_2px_0_0_#1C1712]">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Active Context: <span className="font-serif font-bold text-[#E4572E]">{selectedWorkspace.name}</span>
            </div>
          )}
        </div>

        {/* Workspace Controls & Upload Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Workspace Switcher / Creator Card */}
          <div className="rounded-2xl border border-[#1C1712]/15 bg-white p-6 shadow-[5px_5px_0_0_#1C1712] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-lg font-semibold text-[#1C1712] flex items-center gap-2">
                  <Layers className="h-4 w-4 text-[#E4572E]" />
                  Select Workspace
                </h2>
                <span className="text-xs font-mono bg-[#FBF7F0] border border-[#1C1712]/10 px-2 py-0.5 rounded-md font-semibold text-[#52483E]">
                  {workspaces.length} Total
                </span>
              </div>

              <div className="relative">
                <select
                  value={selectedWorkspaceId}
                  onChange={(e) => setSelectedWorkspaceId(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-[#1C1712]/20 bg-[#FBF7F0] py-3 pl-3.5 pr-10 text-sm font-semibold text-[#1C1712] focus:border-[#E4572E] focus:outline-none focus:ring-1 focus:ring-[#E4572E] shadow-[2px_2px_0_0_#1C1712] transition-all cursor-pointer"
                >
                  {workspaces.length === 0 && (
                    <option value="">No workspaces available</option>
                  )}
                  {workspaces.map((ws) => (
                    <option key={ws.id} value={ws.id}>
                      {ws.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-3.5 h-4 w-4 text-[#52483E]" />
              </div>

              <div>
                {selectedWorkspaceId && (
                  <div className="flex items-center gap-3">
                    {/* Delete Workspace Button */}
                    <button
                      onClick={() => handleDeleteWorkspace(selectedWorkspaceId)}
                      disabled={isDeleting}
                      className="mt-2 inline-flex items-center gap-2 rounded-xl border border-[#1C1712]/20 bg-red-100/60 px-3.5 py-2.5 text-sm font-semibold text-red-700 shadow-[3px_3px_0_0_#1C1712] transition-all hover:bg-red-200/80 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_#1C1712] disabled:opacity-50"
                      title="Delete Current Workspace"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="hidden sm:inline">
                        {isDeleting ? "Deleting..." : "Delete Workspace"}
                      </span>
                    </button>

                  </div>
                )}
              </div>

            </div>

            {/* Create New Workspace Subsection */}
            <div className="mt-6 border-t border-[#1C1712]/10 pt-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#52483E] mb-2.5 flex items-center gap-1.5">
                <FolderPlus className="h-3.5 w-3.5 text-[#E4572E]" />
                Create Workspace
              </h3>
              <form onSubmit={handleCreateWorkspace} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Acme Support"
                  value={newWorkspaceName}
                  onChange={(e) => setNewWorkspaceName(e.target.value)}
                  className="flex-1 rounded-xl border border-[#1C1712]/20 bg-white px-3.5 py-2 text-sm font-medium text-[#1C1712] placeholder:text-[#52483E]/50 focus:border-[#E4572E] focus:outline-none focus:ring-1 focus:ring-[#E4572E] transition-all"
                />
                <button
                  type="submit"
                  disabled={isCreating || !newWorkspaceName.trim()}
                  className="inline-flex items-center justify-center rounded-xl bg-[#1C1712] px-3.5 py-2 text-sm font-semibold text-[#FBF7F0] shadow-[2px_2px_0_0_#1C1712] transition-all hover:bg-[#2C3B32] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Upload Card Area */}
          <div className="md:col-span-2">
            {selectedWorkspaceId ? (
              <div className="h-full rounded-2xl border border-[#1C1712]/15 bg-white p-6 shadow-[5px_5px_0_0_#1C1712]">
                <UploadDocument
                  workspaceId={selectedWorkspaceId}
                  onUploadSuccess={handleUploadSuccess}
                />
              </div>
            ) : (
              <div className="flex h-full min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#1C1712]/20 bg-white/50 p-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FBF7F0] border border-[#1C1712]/15 text-[#52483E] shadow-[2px_2px_0_0_#1C1712] mb-3">
                  <Database className="h-5 w-5" />
                </div>
                <p className="font-serif text-lg font-semibold text-[#1C1712]">
                  No Workspace Selected
                </p>
                <p className="mt-1 text-xs text-[#52483E] max-w-xs">
                  Create or select a workspace from the panel on the left to begin indexing sources.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Ingested Documents List */}
{selectedWorkspaceId && (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="rounded-2xl border border-[#1C1712]/15 bg-white p-6 shadow-[5px_5px_0_0_#1C1712]"
  >
    <div className="flex items-center justify-between mb-5 border-b border-[#1C1712]/10 pb-4">
      <div>
        <h3 className="font-serif text-xl font-semibold text-[#1C1712] flex items-center gap-2">
          <FileText className="h-5 w-5 text-[#E4572E]" />
          Indexed Knowledge Documents
        </h3>
        <p className="mt-0.5 text-xs text-[#52483E]">
          Active content indexed into vector storage for immediate response generation.
        </p>
      </div>
      <span className="rounded-full border border-[#1C1712]/15 bg-[#FBF7F0] px-3 py-1 text-xs font-mono font-bold text-[#1C1712] shadow-[1px_1px_0_0_#1C1712]">
        {isLoadingDocuments ? "..." : `${documents.length} File${documents.length === 1 ? "" : "s"}`}
      </span>
    </div>

    {/* 1. LOADING STATE SKELETON */}
    {isLoadingDocuments ? (
      <div className="space-y-3 py-2">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between py-3.5 px-2 rounded-xl bg-[#FBF7F0]/40 animate-pulse"
          >
            <div className="flex items-center gap-3.5 w-full">
              <div className="h-9 w-9 rounded-xl bg-[#1C1712]/10 shrink-0" />
              <div className="space-y-2 w-full max-w-sm">
                <div className="h-4 bg-[#1C1712]/10 rounded w-3/4" />
                <div className="h-3 bg-[#1C1712]/10 rounded w-1/3" />
              </div>
            </div>
            <div className="h-6 w-16 bg-[#1C1712]/10 rounded-full shrink-0" />
          </div>
        ))}
      </div>
    ) : documents.length === 0 ? (
      /* 2. EMPTY STATE */
      <div className="py-10 text-center">
        <p className="font-serif text-base font-medium text-[#1C1712]">
          No documents in this knowledge base yet.
        </p>
        <p className="mt-1 text-xs text-[#52483E]">
          Upload PDFs, text files, or documentation using the uploader above.
        </p>
      </div>
    ) : (
      /* 3. DOCUMENTS LIST */
      <div className="divide-y divide-[#1C1712]/10">
        {documents.map((doc, index) => {
          const isWeb = doc?.filename?.startsWith('http://') || doc?.filename?.startsWith('https://');
          const displayName = doc?.filename;

          return (
            <div
              key={doc?.id || `doc-${index}-${doc?.filename}`}
              className="py-3.5 flex items-center justify-between group hover:bg-[#FBF7F0]/60 px-2 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3.5 min-w-0 pr-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#1C1712]/15 bg-[#FBF7F0] text-[#E4572E] shadow-[2px_2px_0_0_#1C1712]">
                  {isWeb ? (
                    <Globe className="h-4 w-4" />
                  ) : (
                    <FileText className="h-4 w-4" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#1C1712] truncate max-w-xs sm:max-w-md">
                    {displayName}
                  </p>
                  <p className="text-xs font-mono text-[#52483E] mt-0.5">
                    Uploaded: {new Date(doc?.created_at || Date.now()).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex justify-end items-center gap-2.5 shrink-0">
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#2C3B32]/30 bg-[#2C3B32]/10 px-3 py-1 text-xs font-semibold text-[#2C3B32]">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  Indexed
                </span>
                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => handleDelete(doc.id, displayName)}
                  disabled={deletingId === doc.id}
                  title="Delete document and vector chunks"
                  className="p-1.5 rounded-lg border border-[#1C1712]/15 bg-white text-[#52483E] hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                  {deletingId === doc.id ? (
                    <Loader2 className="h-4 w-4 animate-spin text-red-600" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </motion.div>
)}
      </div>

      {/* Embed Code Modal */}
      {selectedWorkspaceId && (
        <EmbedSnippetModal
          workspaceId={selectedWorkspaceId}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}