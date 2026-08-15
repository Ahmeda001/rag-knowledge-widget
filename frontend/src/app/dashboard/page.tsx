"use client";

import React, { useState, useEffect } from "react";
import { getWorkspaces, createWorkspace, getWorkspaceDetails, Workspace, DocumentSource } from "@/lib/api";
import UploadDocument from "@/components/UploadDocument";
import EmbedSnippetModal from "@/components/EmbedSnippetModal";

export default function DashboardPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>("");
  const [documents, setDocuments] = useState<DocumentSource[]>([]);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const loadWorkspaceData = async (id: string) => {
    try {
      const details = await getWorkspaceDetails(id);
      setDocuments(details.documents || []);
    } catch (err) {
      console.error("Failed to load workspace details", err);
    }
  };

  const handleCreateWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkspaceName.trim()) return;

    try {
      const ws = await createWorkspace(newWorkspaceName.trim());
      setWorkspaces((prev) => [...prev, ws]);
      setSelectedWorkspaceId(ws.id);
      setNewWorkspaceName("");
    } catch (err) {
      console.error("Error creating workspace", err);
    }
  };

  const handleUploadSuccess = (newDoc: DocumentSource) => {
    setDocuments((prev) => [...prev, newDoc]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Chatbot Workspaces</h1>
            <p className="text-sm text-gray-500">Manage knowledge bases and generate embed code.</p>
          </div>
          {selectedWorkspaceId && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Get Embed Snippet
            </button>
          )}
        </div>

        {/* Workspace Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-md font-semibold text-gray-800 mb-4">Select Workspace</h2>
            <select
              value={selectedWorkspaceId}
              onChange={(e) => setSelectedWorkspaceId(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {workspaces.map((ws) => (
                <option key={ws.id} value={ws.id}>
                  {ws.name}
                </option>
              ))}
            </select>

            <div className="mt-6 border-t pt-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Create New</h3>
              <form onSubmit={handleCreateWorkspace} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Acme Support"
                  value={newWorkspaceName}
                  onChange={(e) => setNewWorkspaceName(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
                >
                  Add
                </button>
              </form>
            </div>
          </div>

          {/* Upload Card */}
          <div className="md:col-span-2">
            {selectedWorkspaceId ? (
              <UploadDocument workspaceId={selectedWorkspaceId} onUploadSuccess={handleUploadSuccess} />
            ) : (
              <div className="bg-white p-6 rounded-xl border border-gray-200 text-center text-gray-400">
                Create or select a workspace to get started.
              </div>
            )}
          </div>
        </div>

        {/* Ingested Documents List */}
        {selectedWorkspaceId && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Indexed Knowledge Documents</h3>
            {documents.length === 0 ? (
              <p className="text-sm text-gray-400">No documents uploaded yet for this workspace.</p>
            ) : (
              <div className="divide-y divide-gray-100">
                {documents.map((doc) => (
                  <div key={doc.id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{doc.file_name}</p>
                      <p className="text-xs text-gray-400">
                        Uploaded: {new Date(doc.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Indexed
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
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