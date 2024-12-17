import React from "react";

// Next imports
import { unstable_cache } from "next/cache";

// UI components
import Header from "./components/layout/Header";
import Carousel from "./components/UI/Carousel";
import ScrollContainer from "./components/layout/ScrollContainer";
import Footer from "./components/layout/Footer";

// Services
import { fetchPackages } from "./lib/services";
import Card from "./components/UI/Card";

export const getFeaturedPackages = unstable_cache(
  async () => {
    const packages = await fetchPackages({ limit: 50 });
    const filtered = packages?.tourPackages.filter((pkg) => pkg.price > 100);

    // return packages?.tourPackages;
    return filtered;
  },
  { key: "featured-packages" }
);

export const mostPopularPackages = unstable_cache(async () => {
  const packages = await fetchPackages({ limit: 50 });
  const filtered = packages?.tourPackages.filter(
    (pkg) => pkg.price > 100 && pkg.availableDates.length >= 2
  );

  return filtered;
});

export const getBudgetPackages = unstable_cache(async () => {
  const packages = await fetchPackages({ limit: 50 });
  const filtered = packages?.tourPackages.filter((pkg) => pkg.price <= 100);

  return filtered;
});

export const trending = unstable_cache(async () => {
  const packages = await fetchPackages({ limit: 50 });
  const filtered = packages?.tourPackages.filter(
    (pkg) => pkg.price > 100 && pkg.availableDates.length >= 2
  );

  return filtered.slice(0, 4);
});

const Home = async () => {
  const featuredPackages = await getFeaturedPackages();
  const popularPackages = await mostPopularPackages();
  const budgetPackages = await getBudgetPackages();
  const trendingPackages = await trending();

  return (
    <div className="space-y-4 p-2">
      <Header />
      <main className="w-5/6 mx-auto space-y-8">
        <Carousel />
        <div className="w-full p-2 space-y-2 bg-gray-200 rounded-md">
          <h2 className="text-xl font-semibold">Trending</h2>
          <div className="w-full whitespace-nowrap grid grid-cols-2 gap-4 place-content-center justify-items-center">
            {trendingPackages.map((pkg, idx) => (
              <Card key={idx} {...pkg} />
            ))}
          </div>
        </div>
        <hr />
        <ScrollContainer title="Featured" items={featuredPackages} />
        <hr />
        <ScrollContainer title="Most Popular" items={popularPackages} />
        <hr />
        <ScrollContainer title="Budget-Friendly" items={budgetPackages} />
        <hr />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
