import React from "react";
import CustomNavbar from "./CustomNavbar";
import HeroSection from "../HeroSection/HeroSection";
import RecipeCategories from "../RecipeCategory/RecipeCategories";
import RecipeSkill from "../RecipeSkill/RecipeSkill";
import Quote from "../QuoteSection/Quote";
import Comment from "../Comment/Comment";
import FAQ from "../FAQs/FAQ";
import SampleCard from "../Cards/SampleCard";

function Main() {
  return (
    <div>
      <CustomNavbar />
      <HeroSection />
      <RecipeCategories />
      <SampleCard />
      <RecipeSkill />
      <Quote />
      <Comment />
      <FAQ />
    </div>
  );
}

export default Main;
