import type { Contact } from "../../types/contact";

export type MockUser = {
  id: string;
  email: string;
  password: string;
  name: string;
};

export const mockUsers: MockUser[] = [
  {
    id: "1",
    email: "demo@coderun.dev",
    password: "password123",
    name: "Demo User",
  },
];

export const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Emily Carter",
    role: "Product Designer",
    company: "CodeRun Studio",
    email: "emily@coderun.dev",
    phone: "+1 415 555 0184",
    city: "San Francisco",
    bio: "Designs thoughtful product flows, design systems, and clean digital calling cards for founders.",
  },
  {
    id: "2",
    name: "James Wilson",
    role: "Frontend Engineer",
    company: "Northstar Apps",
    email: "james@northstar.dev",
    phone: "+1 646 555 0129",
    city: "New York",
    bio: "Builds React Native interfaces, API integrations, and fast mobile prototypes.",
  },
  {
    id: "3",
    name: "Maya Chen",
    role: "Growth Marketer",
    company: "Signal Lane",
    email: "maya@signallane.co",
    phone: "+1 323 555 0155",
    city: "Los Angeles",
    bio: "Helps teams turn profile pages, referrals, and lightweight funnels into measurable growth.",
  },
  {
    id: "4",
    name: "Daniel Brooks",
    role: "Mobile Developer",
    company: "Bright Route",
    email: "daniel@brightroute.app",
    phone: "+1 206 555 0173",
    city: "Seattle",
    bio: "Ships Expo apps with offline-friendly screens, typed APIs, and pragmatic architecture.",
  },
  {
    id: "5",
    name: "Olivia Bennett",
    role: "UX Researcher",
    company: "Clearpath Labs",
    email: "olivia@clearpath.io",
    phone: "+1 312 555 0144",
    city: "Chicago",
    bio: "Turns user interviews, usability tests, and product insights into practical design decisions.",
  },
  {
    id: "6",
    name: "Noah Anderson",
    role: "Backend Engineer",
    company: "Atlas Cloud",
    email: "noah@atlascloud.dev",
    phone: "+1 512 555 0168",
    city: "Austin",
    bio: "Creates reliable APIs, data models, and deployment pipelines for growing product teams.",
  },
  {
    id: "7",
    name: "Sophia Mitchell",
    role: "Project Manager",
    company: "Launch Grid",
    email: "sophia@launchgrid.co",
    phone: "+1 617 555 0197",
    city: "Boston",
    bio: "Coordinates product releases, team planning, and stakeholder updates with a clear delivery rhythm.",
  },
  {
    id: "8",
    name: "Ethan Parker",
    role: "DevOps Engineer",
    company: "Cloud Harbor",
    email: "ethan@cloudharbor.dev",
    phone: "+1 720 555 0112",
    city: "Denver",
    bio: "Improves CI/CD workflows, container deployments, and observability for production applications.",
  },
];
