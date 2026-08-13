import { BuilderProfile, HomeownerProject, ConnectionRequest } from '../types';
import { INITIAL_BUILDERS, INITIAL_PROJECTS } from '../data/initialData';

const BUILDERS_KEY = 'cobuilder_builders_v1';
const PROJECTS_KEY = 'cobuilder_projects_v1';
const CONNECTIONS_KEY = 'cobuilder_connections_v1';

export function getStoredBuilders(): BuilderProfile[] {
  try {
    const data = localStorage.getItem(BUILDERS_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to parse builders from local storage', e);
  }
  // Initialize default
  saveBuilders(INITIAL_BUILDERS);
  return INITIAL_BUILDERS;
}

export function saveBuilders(builders: BuilderProfile[]) {
  try {
    localStorage.setItem(BUILDERS_KEY, JSON.stringify(builders));
  } catch (e) {
    console.error('Failed to save builders', e);
  }
}

export function saveSingleBuilder(newBuilder: BuilderProfile): BuilderProfile[] {
  const current = getStoredBuilders();
  const existingIdx = current.findIndex(b => b.id === newBuilder.id);
  let updated: BuilderProfile[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = newBuilder;
  } else {
    updated = [newBuilder, ...current];
  }
  saveBuilders(updated);
  return updated;
}

export function getStoredProjects(): HomeownerProject[] {
  try {
    const data = localStorage.getItem(PROJECTS_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to parse projects', e);
  }
  saveProjects(INITIAL_PROJECTS);
  return INITIAL_PROJECTS;
}

export function saveProjects(projects: HomeownerProject[]) {
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error('Failed to save projects', e);
  }
}

export function saveSingleProject(newProject: HomeownerProject): HomeownerProject[] {
  const current = getStoredProjects();
  const updated = [newProject, ...current];
  saveProjects(updated);
  return updated;
}

export function getStoredConnections(): ConnectionRequest[] {
  try {
    const data = localStorage.getItem(CONNECTIONS_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to load connections', e);
  }
  return [];
}

export function saveConnectionRequest(req: ConnectionRequest): ConnectionRequest[] {
  const current = getStoredConnections();
  const updated = [req, ...current];
  try {
    localStorage.setItem(CONNECTIONS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save connection request', e);
  }
  return updated;
}
