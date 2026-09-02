export const profile = {
  name: "Łukasz Świerlikowski",
  role: "Fullstack Engineer",
  location: "Gdańsk",
  email: "swierlik@o2.pl",
  github: "https://github.com/Lukas9315",
  intro: [
    "Zaczynałem od szukania cudzych błędów. Dziś buduję aplikacje od pierwszego commita do wdrożenia — i nadal czytam kod jak tester.",
    "React, Next.js, Node. Najbardziej lubię ten moment, w którym coś wolnego zaczyna być szybkie.",
  ],
};

export type Job = {
  company: string;
  role: string;
  period: string;
  description: string;
};

export const jobs: Job[] = [
  {
    company: "LiveChat",
    role: "Fullstack Engineer",
    period: "2024 — teraz",
    description:
      "Firma produktowa — jeden produkt, długi horyzont, własne decyzje. Next.js na froncie, Node i PostgreSQL pod spodem. Pracuję nad panelem agenta i widgetem czatu, czyli kodem, który ląduje na cudzych stronach i musi być szybki oraz lekki.",
  },
  {
    company: "Netguru",
    role: "Frontend Developer",
    period: "2022 — 2024",
    description:
      "Dwa lata w projektach klienckich, głównie duży e-commerce. React, TypeScript, migracja z CRA na Next.js. Tutaj po raz pierwszy odpowiadałem za architekturę stanu w całej aplikacji, a nie tylko za pojedyncze komponenty.",
  },
  {
    company: "intive",
    role: "Manual QA → Junior Frontend Developer",
    period: "2020 — 2022",
    description:
      "Zacząłem od testów manualnych: przypadki testowe, regresja, zgłoszenia w Jirze. Po roku zacząłem sam poprawiać to, co zgłaszałem, i przeszedłem do zespołu frontendowego. Zostało mi z tamtego czasu jedno: zanim napiszesz kod, zastanów się, jak go zepsuć.",
  },
];

export const stack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Tailwind CSS",
  "Playwright",
];

export const hobbies = [
  {
    title: "Rower",
    description: "Weekendy nad Zatoką, latem czasem cała droga do Helu.",
  },
  {
    title: "Kawa",
    description: "Aeropress, waga, timer. Trochę za poważnie jak na napój.",
  },
  {
    title: "Planszówki",
    description: "Euro-gry i wszystko, co ma dużo drewnianych kostek.",
  },
  {
    title: "Bieganie",
    description: "Plaża w Brzeźnie o siódmej rano. Najlepszy debugger, jaki znam.",
  },
];
