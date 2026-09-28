import { createHash, randomUUID } from "node:crypto";

export type User = { id: string; name: string; email: string; passwordHash: string; createdAt: string };
export type SocialClub = { id: string; ownerId: string; name: string; description: string; createdAt: string };

const globalStore = globalThis as typeof globalThis & { socialclubStore?: { users: User[]; clubs: SocialClub[] } };
const store = globalStore.socialclubStore ?? { users: [], clubs: [] };
globalStore.socialclubStore = store;

export function createUser(name: string, email: string, password: string) {
  const user: User = { id: randomUUID(), name, email, passwordHash: createHash("sha256").update(password).digest("hex"), createdAt: new Date().toISOString() };
  store.users.push(user);
  return user;
}

export function findUserByEmail(email: string) { return store.users.find((user) => user.email === email); }
export function userExists(id: string) { return store.users.some((user) => user.id === id); }
export function createSocialClub(ownerId: string, name: string, description: string) {
  const club: SocialClub = { id: randomUUID(), ownerId, name, description, createdAt: new Date().toISOString() };
  store.clubs.push(club);
  return club;
}