export type AuthStackParamList = {
  Login: undefined;
};

export type ProtectedStackParamList = {
  Contacts: undefined;
  ContactDetails: {
    contactId: string;
  };
};
