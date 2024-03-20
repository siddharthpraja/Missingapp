import PocketBase from "pocketbase";
import { useQuery } from "react-query";

const pb = new PocketBase(process.env.NEXT_PUBLIC_API_URL);

//check if user verified
export default function useVerified() {
  const id = pb.authStore.model?.id;

  async function checkVerified() {
    const useData = await pb.collection("users").getOne(id);
    return useData.verified;
  }
  return useQuery({ queryFn: checkVerified, queryKey: ["Check Verified", id] });
}

//check currentUser
export function useCurrentUser() {
  const user = pb.authStore.model;

  async function checkUser() {
    return user;
  }
  return useQuery({ queryFn: checkUser, queryKey: ["Check User", user] });
}

// Sent Email for varification
export async function requestVerified() {
  const email = pb.authStore.model.email;
  const res = await pb.collection("users").requestVerification(email);
  if (res) alert("Verification mail sent check your inbox");
}

//edit user Fuctions
export async function useEditUser() {
  alert("You are already verified");
}

//Delete user Fuctions
export async function useDeleteUser() {
  alert("You are already verified");
}
