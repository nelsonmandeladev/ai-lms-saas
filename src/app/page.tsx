import React from 'react'
import {CompanionCard} from "@/components/companion-card";
import {CompanionsList} from "@/components/companions-list";
import {Cta} from "@/components/cta";
import {getAllCompanions, getRecentSessions} from "@/lib/actions/companion.actions";
import {getSubjectColor} from "@/lib/utils";

const HomePage = async () => {

    const companions = await getAllCompanions({ limit: 3 });
    const recentSessionsCompanions = await getRecentSessions(10);

  return (
    <main>
      <h1 className="text-2xl underline">Dashboard</h1>
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {companions.map((companion) => (
            <CompanionCard
              key={companion.id}
              companion={companion}
              color={getSubjectColor(companion.subject)}
            />
        ))}
      </section>
      <section className="home-section">
        <CompanionsList
            title="Recently completed sessions"
            companions={recentSessionsCompanions}
            classNames="w-2/3 max-lg:w-full"
        />
        <Cta />
      </section>
    </main>
  )
}

export default HomePage;