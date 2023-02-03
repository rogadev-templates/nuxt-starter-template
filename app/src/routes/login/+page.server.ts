import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import type { Provider } from "@supabase/supabase-js";
import { supabase } from "$lib/db";
import devMode from "$lib/server/mode";

export const actions: Actions = {
  login: async ({ url }) => {
    const provider = url.searchParams.get("provider") satisfies Provider;
    const { data, error } = await supabase.auth.signInWithOAuth({ provider }, { redirectTo: "http://localhost:3000/dashboard" });
    if (error) {
      if (devMode) console.error(`Error logging in with Supabase. Provider: ${provider}. Error: ${error}`);
      return fail(400, "Something went wrong");
    }
    throw redirect(303, data.url);
  },
};