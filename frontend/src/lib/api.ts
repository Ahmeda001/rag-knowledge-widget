const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface Workspace {
  id: string;
  name: string;
  created_at: string;
}

export interface DocumentSource {
  id: string;
  file_name: string;
  created_at: string;
}

export interface WorkspaceDetails {
  id: string;
  name: string;
  documents: DocumentSource[];
}

/**
 * Creates a new workspace.
 */
export async function createWorkspace(name: string): Promise<Workspace> {
  const response = await fetch(`${API_BASE_URL}/workspaces`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Failed to create workspace");
  }

  return response.json();
}

/**
 * Fetches all workspaces for the current user.
 */
export async function getWorkspaces(): Promise<Workspace[]> {
  const response = await fetch(`${API_BASE_URL}/workspaces`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch workspaces");
  }

  return response.json();
}

/**
 * Fetches workspace metadata along with uploaded document sources.
 */
export async function getWorkspaceDetails(workspaceId: string): Promise<WorkspaceDetails> {
  const response = await fetch(`${API_BASE_URL}/workspaces/${workspaceId}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch workspace details");
  }

  return response.json();
}

/**
 * Uploads a PDF document to a workspace for chunking and embedding.
 */
export async function uploadDocument(workspaceId: string, file: File): Promise<DocumentSource> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/workspaces/${workspaceId}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Failed to upload document");
  }

  return response.json();
}