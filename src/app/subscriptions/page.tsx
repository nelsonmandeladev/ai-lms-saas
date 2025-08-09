import React from 'react';
import {PricingTable} from "@clerk/nextjs";

function SubscriptionPage() {
    return (
        <main className="flex flex-col items-center gap-10">
            <div className="">
                <div className="text-center max-w-2xl space-y-6">
                    <h2 className="text-4xl font-semibold text-gray-900">
                        Choose Your Learning Journey
                    </h2>
                    <p className="text-lg">
                        Start free, upgrade anytime. Unlock smarter Conversations, deeper insights, and unlimited potential with a plan that fits your goals.
                    </p>
                </div>
            </div>
            <section className="home-section">
                <PricingTable />
            </section>
        </main>
    );
}

export default SubscriptionPage;