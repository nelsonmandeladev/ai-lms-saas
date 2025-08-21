"use server";

import {auth} from "@clerk/nextjs/server";
import {createSupabaseClient} from "@/lib/supabase";
import {revalidatePath} from "next/cache";

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

export async function getAllCompanions({ limit = 10, page = 1, subject, topic }: GetAllCompanions) {
    const db = createSupabaseClient();

    let query = db.from('companions').select();

    if(subject && topic) {
        query = query.ilike('subject', `%${subject}%`)
            .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    } else if(subject) {
        query = query.ilike('subject', `%${subject}%`)
    } else if(topic) {
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }

    query = query.range((page - 1) * limit, page * limit - 1);

    const { data: companions, error } = await query;
    console.log({error});

    if(error) throw new Error(error.message);

    return companions;
}

export async function getCompanion(id: string) {
    const db = createSupabaseClient();

    const { data, error } = await db
        .from('companions')
        .select()
        .eq('id', id);

    if(error) return console.log(error);

    return data[0];
}

export const addToSessionHistory = async (companionId: string) => {
    const { userId } = await auth();
    const db = createSupabaseClient();
    const { data, error } = await db.from('session_history')
        .insert({
            companion_id: companionId,
            user_id: userId,
        })

    if(error) throw new Error(error.message);

    return data;
}


export const addBookmark = async (companionId: string, path: string) => {
    const { userId } = await auth();
    if (!userId) return;
    const db = createSupabaseClient();
    const { data, error } = await db.from("bookmarks").insert({
        companion_id: companionId,
        user_id: userId,
    });
    if (error) {
        throw new Error(error.message);
    }
    // Revalidate the path to force a re-render of the page

    revalidatePath(path);
    return data;
};

export const removeBookmark = async (companionId: string, path: string) => {
    const { userId } = await auth();
    if (!userId) return;
    const db = createSupabaseClient();
    const { data, error } = await db
        .from("bookmarks")
        .delete()
        .eq("companion_id", companionId)
        .eq("user_id", userId);
    if (error) {
        throw new Error(error.message);
    }
    revalidatePath(path);
    return data;
};

export const getRecentSessions = async (limit = 10) => {
    const db = createSupabaseClient();
    const { data, error } = await db
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .order('created_at', { ascending: false })
        .limit(limit)

    if(error) throw new Error(error.message);

    return data.map(({ companions }) => companions);
}

export const getUserSessions = async (userId: string, limit = 10) => {
    const db = createSupabaseClient();
    const { data, error } = await db
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)

    if(error) throw new Error(error.message);

    return data.map(({ companions }) => companions);
}