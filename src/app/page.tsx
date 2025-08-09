import React from 'react'
import {CompanionCard} from "@/components/companion-card";
import {CompanionsList} from "@/components/companions-list";
import {Cta} from "@/components/cta";
import {recentSessions} from "@/constants";

const HomePage = () => {
  return (
    <main>
      <h1 className="text-2xl underline">Dashboard</h1>
      <section className="home-section">
        {recentSessions.slice(0,3).map((session) => (
            <CompanionCard
              key={session.id}
              companion={session}
            />
        ))}
      </section>
      <section className="home-section">
        <CompanionsList
            title="Recently completed sessions"
            companions={recentSessions}
            classNames="w-2/3 max-lg:w-full"
        />
        <Cta />
      </section>
    </main>
  )
}

export default HomePage;