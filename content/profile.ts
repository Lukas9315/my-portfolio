export const profile = {
  name: "Łukasz",
  role: "Fullstack Engineer",
  location: "Gdańsk",
  email: "swierlik@o2.pl",
  github: "https://github.com/Lukas9315",
  intro:
    "Zacząłem w 2020 roku od testów manualnych. Klikałem cudze aplikacje tak długo, aż zacząłem je poprawiać sam. Dziś piszę front i back — najczęściej w React, Next.js i Node.",
};

export type Job = {
  company: string;
  role: string;
  period: string;
  description: string;
};

export const jobs: Job[] = [
  {
    company: "Amberline",
    role: "Fullstack Engineer",
    period: "2024 — teraz",
    description:
      "Next.js na froncie, Node i PostgreSQL pod spodem. Platforma SaaS dla firm logistycznych — panel zleceń, integracje z systemami klientów i sporo pracy nad tym, żeby całość działała szybko także na słabym sprzęcie w magazynie.",
  },
  {
    company: "Baltic Apps",
    role: "Frontend Developer",
    period: "2022 — 2024",
    description:
      "Dwa lata przy dużym sklepie internetowym. React, TypeScript, migracja z CRA na Next.js. Tutaj po raz pierwszy odpowiadałem za architekturę stanu w całej aplikacji, a nie tylko za pojedyncze komponenty.",
  },
  {
    company: "Testhouse",
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
