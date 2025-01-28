// import Analysis from "@/components/marketing/analysis";
// import Companies from "@/components/marketing/companies";
// import Features from "@/components/marketing/features";
// import Integration from "@/components/marketing/integration";
// import Pricing from "@/components/marketing/pricing";
import Wrapper from "@/components/global/wrapper";
import CTA from "@/components/marketing/cta";
import Hero from "@/components/marketing/hero";
import LanguageSupport from "@/components/marketing/lang-support";

const HomePage = () => {
  return (
    <Wrapper className="py-20 relative">
      <Hero />
      {/* <Companies /> */}
      {/* <Features /> */}
      {/* <Analysis /> */}
      {/* <Integration /> */}
      {/* <Pricing /> */}
      <LanguageSupport />
      <CTA />
    </Wrapper>
  );
};

export default HomePage;
