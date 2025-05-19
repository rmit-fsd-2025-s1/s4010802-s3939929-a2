import { gql } from "@apollo/client";
import { client } from "./graphql";
import { Profile, Pet } from "../types/types";

// GraphQL Queries
const GET_PROFILES = gql`
  query GetProfiles {
    profiles {
      profile_id
      email
      first_name
      last_name
      mobile
      street
      city
      state
      postcode
      pets {
        pet_id
        name
      }
    }
  }
`;

const GET_PROFILE = gql`
  query GetProfile($id: ID!) {
    profile(id: $id) {
      profile_id
      email
      first_name
      last_name
      mobile
      street
      city
      state
      postcode
      pets {
        pet_id
        name
      }
    }
  }
`;

const GET_PETS = gql`
  query GetPets {
    pets {
      pet_id
      name
      profiles {
        profile_id
        email
        first_name
        last_name
      }
    }
  }
`;

const GET_PET = gql`
  query GetPet($id: ID!) {
    pet(id: $id) {
      pet_id
      name
      profiles {
        profile_id
        email
        first_name
        last_name
      }
    }
  }
`;

// GraphQL Mutations
const CREATE_PROFILE = gql`
  mutation CreateProfile(
    $email: String!
    $first_name: String!
    $last_name: String!
    $mobile: String
    $street: String
    $city: String
    $state: String
    $postcode: String
  ) {
    createProfile(
      email: $email
      first_name: $first_name
      last_name: $last_name
      mobile: $mobile
      street: $street
      city: $city
      state: $state
      postcode: $postcode
    ) {
      profile_id
      email
      first_name
      last_name
    }
  }
`;

const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $id: ID!
    $email: String
    $first_name: String
    $last_name: String
    $mobile: String
    $street: String
    $city: String
    $state: String
    $postcode: String
  ) {
    updateProfile(
      id: $id
      email: $email
      first_name: $first_name
      last_name: $last_name
      mobile: $mobile
      street: $street
      city: $city
      state: $state
      postcode: $postcode
    ) {
      profile_id
      email
      first_name
      last_name
    }
  }
`;

const DELETE_PROFILE = gql`
  mutation DeleteProfile($id: ID!) {
    deleteProfile(id: $id)
  }
`;

const CREATE_PET = gql`
  mutation CreatePet($name: String!) {
    createPet(name: $name) {
      pet_id
      name
    }
  }
`;

const ADD_PET_TO_PROFILE = gql`
  mutation AddPetToProfile($profileId: ID!, $petId: ID!) {
    addPetToProfile(profileId: $profileId, petId: $petId) {
      profile_id
      pets {
        pet_id
        name
      }
    }
  }
`;

const REMOVE_PET_FROM_PROFILE = gql`
  mutation RemovePetFromProfile($profileId: ID!, $petId: ID!) {
    removePetFromProfile(profileId: $profileId, petId: $petId) {
      profile_id
      pets {
        pet_id
        name
      }
    }
  }
`;

const DELETE_PET = gql`
  mutation DeletePet($id: ID!) {
    deletePet(id: $id)
  }
`;

export const profileService = {
  getAllProfiles: async (): Promise<Profile[]> => {
    const { data } = await client.query({ query: GET_PROFILES });
    return data.profiles;
  },

  createProfile: async (profile: {
    first_name: string;
    last_name: string;
    email: string;
    mobile?: string;
    street?: string;
    city?: string;
    state?: string;
    postcode?: string;
  }): Promise<Profile> => {
    const { data } = await client.mutate({
      mutation: CREATE_PROFILE,
      variables: profile,
    });
    return data.createProfile;
  },

  getProfile: async (id: string): Promise<Profile> => {
    const { data } = await client.query({
      query: GET_PROFILE,
      variables: { id },
    });
    return data.profile;
  },

  deleteProfile: async (id: string): Promise<boolean> => {
    const { data } = await client.mutate({
      mutation: DELETE_PROFILE,
      variables: { id },
    });
    return data.deleteProfile;
  },

  updateProfile: async (
    id: string,
    profile: {
      first_name?: string;
      last_name?: string;
      email?: string;
      mobile?: string;
      street?: string;
      city?: string;
      state?: string;
      postcode?: string;
    }
  ): Promise<Profile> => {
    const { data } = await client.mutate({
      mutation: UPDATE_PROFILE,
      variables: { id, ...profile },
    });
    return data.updateProfile;
  },
};

export const petService = {
  getAllPets: async (): Promise<Pet[]> => {
    const { data } = await client.query({ query: GET_PETS });
    return data.pets;
  },

  getPets: async (profileId: string): Promise<Pet[]> => {
    const { data } = await client.query({
      query: GET_PROFILE,
      variables: { id: profileId },
    });
    return data.profile.pets;
  },

  getPet: async (petId: string): Promise<Pet> => {
    const { data } = await client.query({
      query: GET_PET,
      variables: { id: petId },
    });
    return data.pet;
  },

  createPet: async (name: string): Promise<Pet> => {
    const { data } = await client.mutate({
      mutation: CREATE_PET,
      variables: { name },
    });
    return data.createPet;
  },

  associatePetWithProfile: async (
    petId: string,
    profileId: string
  ): Promise<Profile> => {
    const { data } = await client.mutate({
      mutation: ADD_PET_TO_PROFILE,
      variables: { petId, profileId },
    });
    return data.addPetToProfile;
  },

  getPetProfiles: async (petId: string): Promise<Profile[]> => {
    const { data } = await client.query({
      query: GET_PET,
      variables: { id: petId },
    });
    return data.pet.profiles;
  },

  deletePet: async (petId: string): Promise<boolean> => {
    const { data } = await client.mutate({
      mutation: DELETE_PET,
      variables: { id: petId },
    });
    return data.deletePet;
  },
};
