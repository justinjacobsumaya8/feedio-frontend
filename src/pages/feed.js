import { Link, useParams } from "react-router-dom";
import { PageTitle } from "src/components/common/PageTitle";
import { useEffect } from "react";

import Layout from "src/components/layouts/backend/Layout";
import MeTab from "src/components/feed/MeTab";
import ExploreTab from "src/components/feed/ExploreTab";

const ME_TAB = "me";
const EXPLORE_TAB = "explore";

export default function Feed() {
    const { tab } = useParams();

    useEffect(() => {
        PageTitle({
            title: "Today"
        });
    }, []);

    return (
        <Layout>
            <div className="flex flex-col">
                <h1 className="text-4xl font-bold text-gray-800">Today</h1>
                <div className="text-lg text-gray-500 mt-2">The insights you need to keep ahead</div>
            </div>
            <div className="flex gap-6 mt-8 border-b">
                <Link
                    to="/feed/me"
                    className={`p-2 rounded-sm text-gray-400 hover:border-b-2 ${tab === ME_TAB ? "active-feed-tab" : ""}`}
                >
                    Me
                </Link>
                <Link
                    to="/feed/explore"
                    className={`p-2 rounded-sm text-gray-400 hover:border-b-2 ${tab === EXPLORE_TAB ? "active-feed-tab" : ""}`}
                >
                    Explore
                </Link>
            </div>
            {tab === ME_TAB && (
                <MeTab />
            )}
            {tab === EXPLORE_TAB && (
                <ExploreTab />
            )}
        </Layout>
    );
};