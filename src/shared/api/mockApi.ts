import { mockContacts, mockUsers } from "./mockData";

const MOCK_DELAY_MS = 350;

type SignInPayload = {
  email: string;
  password: string;
};

export type AuthSession = {
  token: string;
  user: {
    email: string;
    name: string;
  };
};

function wait(ms = MOCK_DELAY_MS) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function signIn(payload: SignInPayload): Promise<AuthSession> {
  await wait();

  const user = mockUsers.find(
    (mockUser) =>
      mockUser.email === payload.email &&
      mockUser.password === payload.password,
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  return {
    token: `fake-token-${user.id}`,
    user: {
      email: user.email,
      name: user.name,
    },
  };
}

export async function getContacts() {
  await wait();
  return mockContacts;
}

export async function getContactById(contactId: string) {
  await wait();

  const contact = mockContacts.find((item) => item.id === contactId);

  if (!contact) {
    throw new Error("Contact not found");
  }

  return contact;
}
