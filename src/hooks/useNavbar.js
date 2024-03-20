import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_API_URL);

// Login fuction
export async function loginWithEmailAndPassword(email, password) {
  await pb.collection('users').authWithPassword(email, password);
  const currentUser = pb.authStore.model;
  return currentUser;
}

//logout function
export async function handleLogout() {
  try {
    pb.authStore.clear();
    window.location.reload();
  } catch (error) {
    console.error("Logout failed:", error);
  }
}

// for send in login page
export function handleLogin(router) {
  router.push("/login");
}


//for send on profile page
export function handleProfile(router) {
  router.push(`/profile/${pb.authStore.model.id}`);
}
