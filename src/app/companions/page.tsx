import React from 'react';
import {getAllCompanions} from "@/lib/actions/companion.actions";
import {CompanionCard} from "@/components/companion-card";
import {getSubjectColor} from "@/lib/utils";
import {SearchInput} from "@/components/search-input";
import {SubjectFilter} from "@/components/subject-filter";

async function CompanionsPage({searchParams}: SearchParams) {

    const {topic, subject} = await searchParams;

    const companions = await getAllCompanions({
        topic,
        subject
    });

    return (
        <main>
            <section className="flex justify-between gap-4 max-sm:flex-col">
                <h1>Companion Library</h1>
                <div className="flex gap-4">
                    <SearchInput />
                    <SubjectFilter />
                </div>
            </section>
            <section className="companions-grid">
                {companions.map((companion) => (
                    <CompanionCard
                        key={companion.id}
                        companion={companion}
                        color={getSubjectColor(companion.subject)}
                    />
                ))}
            </section>
        </main>
    );
}

export default CompanionsPage;