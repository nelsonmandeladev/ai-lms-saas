"use server";

import {auth} from "@clerk/nextjs/server";
import {createSupabaseClient} from "@/lib/supabase";

export async function createCompanionAction(companion: CreateCompanion) {
    const { userId: author} = await auth();
    const db = createSupabaseClient();

    const {data, error } = await db
        .from("companions")
        .insert({...companion, author})
        .select();

    if (error || !data) {
        throw new Error(error?.message || "Could not create companion");
    }

    return data[0];
}