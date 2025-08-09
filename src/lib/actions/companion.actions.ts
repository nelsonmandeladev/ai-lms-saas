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