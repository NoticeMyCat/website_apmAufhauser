export type Testimonial = {
  id: string;
  quote: string;
  person: string;
  context: string;
  sourceLabel: string;
  sourceUrl: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "weg-zur-apm",
    quote:
      "Den Entschluss, mich als APM-Therapeut selbstständig zu machen, fasste ich im Laufe meiner beruflich bedingten Auszeit.",
    person: "René Aufhauser",
    context: "über seinen persönlichen Weg zur APM",
    sourceLabel: "Wirtschaftskammer Salzburg",
    sourceUrl: "https://www.wko.at/sbg/news/hohe-gruenderdynamik-in-salzburg",
  },
  {
    id: "praxisalltag",
    quote:
      "Ich habe mich in letzter Zeit intensiv mit diesem Bereich beschäftigt und fühle mich dort sehr, sehr wohl.",
    person: "René Aufhauser",
    context: "im Interview über seine APM-Praxis",
    sourceLabel: "Österreichische Fußball-Bundesliga",
    sourceUrl:
      "https://www.bundesliga.at/de/news/artikel/liga-legende-rene-aufhauser-brauchte-abstand-vom-fussball",
  },
  {
    id: "ausbildung",
    quote:
      "Ich wollte diese Therapieform vertiefen, wenn ich mal Zeit habe.",
    person: "René Aufhauser",
    context: "über den Entschluss zur Ausbildung",
    sourceLabel: "VdF player’s Magazin",
    sourceUrl:
      "https://www.vdf.at/_default_upload_bucket/-56_Spielermagazin_Sommer_2024_FINAL_DS%20small.pdf",
  },
];
