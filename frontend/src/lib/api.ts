const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

import { User } from "@supabase/supabase-js";

// const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const key =
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
//   process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// Create ONE client instance (Singleton)
// export const supabase = createClient(url, key);


import { supabase } from '@/lib/supabaseClient'; 



export interface Workspace {
  id: string;
  name: string;
  created_at: string;
}

export interface DocumentSource {
  id: string;
  filename: string;
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
// Helper function to extract token and build authenticated headers
async function getAuthHeaders() {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("User not authenticated");
  }

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${session.access_token}`,
  };
}

/**
 * Fetches all workspaces owned by the logged-in user.
 */
export async function getWorkspaces(): Promise<Workspace[]> {
  const headers = await getAuthHeaders();

  const response = await fetch(`${API_BASE_URL}/workspaces`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch workspaces (${response.status})`);
  }

  return response.json();
}

/**
 * Fetches workspace metadata along with uploaded document sources.
 */
export async function getWorkspaceDetails(workspaceId: string): Promise<WorkspaceDetails> {
  const headers = await getAuthHeaders();

  const response = await fetch(`${API_BASE_URL}/workspaces/${workspaceId}`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch workspace details (${response.status})`);
  }

  return response.json();
}





export async function createWorkspace(name: string) {
  // 1. Get current user session
  const { data: { session } } = await supabase.auth.getSession();

  // Debug: Log token to console
  console.log("Supabase Token:", session?.access_token);

  if (!session?.access_token) {
    console.error("No active session token found. User might not be logged in.");
    return;
  }

  // 2. Pass token in Request Headers
  const response = await fetch("http://127.0.0.1:8000/api/v1/workspaces", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session.access_token}`, // MUST be in headers
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const err = await response.json();
    console.error("Error from FastAPI:", err);
    return;
  }

  return await response.json();
}



/**
 * Fetches all workspaces for the current user.
 */
// export async function getWorkspaces(): Promise<Workspace[]> {
//   const response = await fetch(`${API_BASE_URL}/workspaces`, {
//     method: "GET",
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch workspaces");
//   }

//   return response.json();
// }

// /**
//  * Fetches workspace metadata along with uploaded document sources.
//  */
// export async function getWorkspaceDetails(workspaceId: string): Promise<WorkspaceDetails> {
//   const response = await fetch(`${API_BASE_URL}/workspaces/${workspaceId}`, {
//     method: "GET",
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch workspace details");
//   }

//   return response.json();
// }
// lib/fastapi.ts or inside your component


export async function fetchUserWorkspaces() {
  // 1. Get the current user's session token from Supabase Auth
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("User not authenticated");
  }

  // 2. Pass token to FastAPI in the Authorization header
  const response = await fetch('http://localhost:8000/api/v1/workspaces', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`, // <--- Crucial step
    },
  });

  return await response.json();
}




export async function deleteWorkspace(workspaceId: string): Promise<void> {
  // Retrieve bearer token
  const headers = await getAuthHeaders();

  const response = await fetch(`${API_BASE_URL}/workspaces/${workspaceId}`, {
    method: "DELETE",
    headers: headers, // <-- Ensure Authorization header is passed here
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Failed to delete workspace");
  }
}


/**
 * Uploads a PDF document to a workspace for chunking and embedding.
 */
// export async function uploadDocument(workspaceId: string, file: File): Promise<DocumentSource> {
//   const formData = new FormData();
//   formData.append("file", file);

//   const response = await fetch(`${API_BASE_URL}/workspaces/${workspaceId}/upload`, {
//     method: "POST",
//     body: formData,
//   });

//   if (!response.ok) {
//     const error = await response.json().catch(() => ({}));
//     throw new Error(error.detail || "Failed to upload document");
//   }

//   return response.json();
// }
export async function uploadDocument(workspaceId: string, file: File): Promise<DocumentSource> {
  const formData = new FormData();
  formData.append("file", file);

  // 1. Get base headers
  const headers = await getAuthHeaders();
  
  // 2. IMPORTANT: Remove application/json so browser sets multipart boundary automatically
  delete (headers as Record<string, string>)["Content-Type"];

  const response = await fetch(`${API_BASE_URL}/workspaces/${workspaceId}/upload`, {
    method: "POST",
    headers: headers,
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Failed to upload document");
  }

  return response.json();
}

export async function addUrlDocument(workspaceId: string, url: string): Promise<DocumentSource> {
  const headers = await getAuthHeaders();

  // Create form-urlencoded payload for FastAPI Form(...)
  const body = new URLSearchParams();
  body.append("url", url);

  const response = await fetch(`${API_BASE_URL}/workspaces/${workspaceId}/url`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail?.[0]?.msg || error.detail || `Failed to index URL (${response.status})`);
  }

  return response.json();
}


export async function deleteDocument(workspaceId: string, documentId: string): Promise<{ status: string; message: string }> {
  const headers = await getAuthHeaders();

  const response = await fetch(`${API_BASE_URL}/workspaces/${workspaceId}/documents/${documentId}`, {
    method: "DELETE",
    headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to delete document (${response.status})`);
  }

  return response.json();
}


/**
 * Checks if the current user is authenticated.
 */
export async function isUserLoggedIn(): Promise<boolean> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    return Boolean(user && !error);
  } catch (error) {
    console.error("Failed to check auth status:", error);
    return false;
  }
}

/**
 * Signs out the current user.
 */
export async function signOutUser(): Promise<boolean> {
  try {
    const { error } = await supabase.auth.signOut();
    return !error;
  } catch (error) {
    console.error("Sign out error:", error);
    return false;
  }
}

/**
 * Returns the current user object.
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}