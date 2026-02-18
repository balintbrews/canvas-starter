import Card from "@/components/card";
import Footer from "@/components/footer";
import Grid from "@/components/grid";
import Header from "@/components/header";
import Heading from "@/components/heading";
import Hero from "@/components/hero";
import Logo from "@/components/logo";
import Navigation from "@/components/navigation";
import Paragraph from "@/components/paragraph";
import PricingTable from "@/components/pricing-table";
import Section from "@/components/section";

import { getComponentExamples } from "../lib/get-examples";

const exampleHeaderArgs = await getComponentExamples("header");
const exampleHeroArgs = await getComponentExamples("hero");
const exampleSectionArgs = await getComponentExamples("section");
const exampleHeadingArgs = await getComponentExamples("heading");
const exampleParagraphArgs = await getComponentExamples("paragraph");
const examplePricingTableArgs = await getComponentExamples("pricing-table");
const exampleCardExamples = await getComponentExamples("card");
const exampleFooterArgs = await getComponentExamples("footer");

const ExampleHomepage = () => {
  return (
    <>
      <Header
        branding={<Logo />}
        navigation={<Navigation />}
        {...exampleHeaderArgs[0]}
      />
      <Hero {...exampleHeroArgs[0]} />

      <Section
        {...exampleSectionArgs[0]}
        backgroundColor="base"
        content={
          <>
            <Heading {...exampleHeadingArgs[1]} />
            <Paragraph {...exampleParagraphArgs[1]} />
            <Grid
              content={
                <>
                  {exampleCardExamples.map((cardProps, index) => (
                    <Card key={index} {...cardProps} />
                  ))}
                </>
              }
            />
          </>
        }
      />
      <Section
        {...exampleSectionArgs[1]}
        content={
          <>
            <Heading {...exampleHeadingArgs[0]} />
            <Paragraph {...exampleParagraphArgs[0]} />
          </>
        }
      />
      <Section
        {...exampleSectionArgs[0]}
        darkVariant={true}
        content={
          <>
            <Heading {...exampleHeadingArgs[2]} />
            <Paragraph {...exampleParagraphArgs[2]} />
            <PricingTable {...examplePricingTableArgs[0]} />
          </>
        }
      />
      <Footer
        {...exampleFooterArgs[0]}
        branding={<Logo linkToFrontPage={false} />}
      />
    </>
  );
};

export default {
  title: "Example pages/Homepage",
  component: ExampleHomepage,
};

export const Homepage = {};
