export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; text: string };

export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readingTime: string;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "context-api-nie-jest-state-managerem",
    title: "Context API nie jest state managerem",
    summary:
      "Najczęstsze nieporozumienie w Reakcie. Context świetnie przekazuje dane w dół drzewa, ale nie zarządza nimi za ciebie.",
    date: "2025-11-18",
    readingTime: "4 min",
    body: [
      {
        type: "p",
        text: "Co drugi projekt, do którego wchodzę, ma jeden wielki AppContext. Siedzi w nim user, motyw, koszyk, ustawienia i jeszcze kilka rzeczy, których nikt już nie pamięta. Działa. Do momentu, w którym przestaje.",
      },
      {
        type: "p",
        text: "Problem nie leży w Contextcie. Context robi dokładnie to, co obiecuje: przenosi wartość z góry drzewa na dół, bez przekazywania propsów przez dziesięć komponentów po drodze. Tyle. Nie ma selektorów, nie ma porównywania, nie ma optymalizacji.",
      },
      { type: "h2", text: "Co się psuje" },
      {
        type: "p",
        text: "Kiedy zmieni się cokolwiek w wartości providera, każdy komponent używający tego kontekstu renderuje się na nowo. Nawet jeśli czyta z niego tylko jedno pole, którego zmiana nie dotyczyła.",
      },
      {
        type: "code",
        text: `// jeden setUser i przerenderuje się wszystko,
// co woła useContext(AppContext)
<AppContext.Provider value={{ user, theme, cart, setUser }}>
  {children}
</AppContext.Provider>`,
      },
      {
        type: "p",
        text: "Dochodzi jeszcze druga pułapka: obiekt przekazany do value tworzy się od nowa przy każdym renderze rodzica. Nawet jeśli nic się w nim nie zmieniło, referencja jest inna, więc React uznaje wartość za nową.",
      },
      { type: "h2", text: "Co z tym robię" },
      {
        type: "ul",
        items: [
          "Dzielę jeden duży kontekst na kilka małych. Motyw osobno, użytkownik osobno, koszyk osobno.",
          "Rozdzielam stan od akcji. Funkcje setState są stabilne, więc kontekst z samymi akcjami praktycznie nigdy nie powoduje przerenderowania.",
          "Owijam wartość w useMemo, jeśli faktycznie jest obiektem.",
          "Nie wkładam do kontekstu danych z serwera. Od tego jest cache biblioteki do fetchowania.",
        ],
      },
      {
        type: "code",
        text: `const CartStateContext = createContext<Cart | null>(null);
const CartActionsContext = createContext<CartActions | null>(null);

// komponent, który tylko dodaje do koszyka,
// nie przerenderuje się, gdy koszyk się zmieni
const { addItem } = useCartActions();`,
      },
      { type: "h2", text: "Kiedy Context wystarcza" },
      {
        type: "p",
        text: "Kiedy dane zmieniają się rzadko i czyta je dużo komponentów. Motyw, język, zalogowany użytkownik, konfiguracja aplikacji. To są idealni kandydaci i nie ma sensu instalować do nich niczego więcej.",
      },
      {
        type: "p",
        text: "Jeśli natomiast wartość zmienia się przy każdym wciśnięciu klawisza, a subskrybentów są dziesiątki — to jest moment na bibliotekę, która potrafi w selektory.",
      },
    ],
  },
  {
    slug: "kiedy-siegam-po-zustand",
    title: "Kiedy sięgam po Zustand, a kiedy zostaję przy useState",
    summary:
      "Prosta ścieżka decyzyjna zamiast dyskusji o tym, która biblioteka jest lepsza.",
    date: "2025-12-09",
    readingTime: "4 min",
    body: [
      {
        type: "p",
        text: "Pytanie o state management pada na każdej rekrutacji i prawie zawsze zmienia się w wyliczankę bibliotek. A w praktyce podejmuję tę decyzję w kilkanaście sekund, odpowiadając sobie na trzy pytania.",
      },
      { type: "h2", text: "1. Czy ten stan jest tylko tego komponentu?" },
      {
        type: "p",
        text: "Otwarty modal, tekst w inpucie, aktywna zakładka. Jeśli nikt poza tym komponentem tego nie potrzebuje, zostaje useState i temat jest zamknięty. Naprawdę duża część stanu w aplikacji nigdy nie musi nigdzie wyjeżdżać.",
      },
      { type: "h2", text: "2. Czy te dane pochodzą z serwera?" },
      {
        type: "p",
        text: "Jeśli tak, to nie jest stan aplikacji, tylko cache. Wrzucanie odpowiedzi z API do globalnego store'a oznacza, że od tej chwili sam odpowiadasz za odświeżanie, unieważnianie i stany ładowania. Do tego są gotowe narzędzia i szkoda na to czasu.",
      },
      { type: "h2", text: "3. Czy potrzebuję tego w kilku miejscach naraz?" },
      {
        type: "p",
        text: "Dopiero tutaj wchodzi globalny store. U mnie najczęściej Zustand, bo jest po prostu małą funkcją, którą się woła — bez providerów, bez reducerów, bez ceremonii.",
      },
      {
        type: "code",
        text: `import { create } from "zustand";

export const useCart = create<CartStore>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({ items: [...state.items, item] })),
  clear: () => set({ items: [] }),
}));

// w komponencie — subskrybuję tylko to, czego używam
const count = useCart((s) => s.items.length);`,
      },
      {
        type: "p",
        text: "Ten selektor to cała różnica względem Contextu. Komponent przerenderuje się tylko wtedy, gdy zmieni się liczba pozycji — a nie za każdym razem, gdy ktoś ruszy cokolwiek w koszyku.",
      },
      { type: "h2", text: "A Redux?" },
      {
        type: "p",
        text: "Redux Toolkit nadal ma sens i nie uważam go za przeżytek. W dużym zespole, przy skomplikowanych przepływach i realnej potrzebie prześledzenia każdej akcji w devtoolsach, ta struktura zaczyna się opłacać. W projekcie na cztery osoby zwykle jest to koszt bez zwrotu.",
      },
      {
        type: "p",
        text: "Najgorszy wybór to zdecydować z góry, zanim w ogóle pojawi się problem. Zaczynam od useState i przesuwam stan wyżej dopiero wtedy, gdy naprawdę zaczyna uwierać.",
      },
    ],
  },
  {
    slug: "server-state-to-nie-twoj-stan",
    title: "Server state to nie jest twój stan",
    summary:
      "Dlaczego połowa problemów ze state managementem znika, kiedy przestaniesz trzymać dane z API w store.",
    date: "2026-01-22",
    readingTime: "3 min",
    body: [
      {
        type: "p",
        text: "Klasyk, który widziałem w kilku projektach: useEffect, fetch, setState, do tego osobny isLoading i osobny error. Pomnożone przez czterdzieści komponentów.",
      },
      {
        type: "code",
        text: `useEffect(() => {
  setLoading(true);
  fetch("/api/orders")
    .then((r) => r.json())
    .then(setOrders)
    .catch(setError)
    .finally(() => setLoading(false));
}, []);`,
      },
      {
        type: "p",
        text: "Ten kod nie jest zły. Jest tylko niekompletny. Nie obsługuje wyścigu, gdy odpowiedzi wrócą w innej kolejności. Nie anuluje zapytania po odmontowaniu komponentu. Nie odświeża danych po powrocie do zakładki. I nie współdzieli wyniku z sąsiednim komponentem, który potrzebuje dokładnie tego samego.",
      },
      { type: "h2", text: "Inne dane, inne zasady" },
      {
        type: "p",
        text: "Dane z serwera różnią się od stanu UI jedną fundamentalną rzeczą: nie jesteś ich właścicielem. Ktoś inny może je w każdej chwili zmienić, a to, co masz na ekranie, jest tylko kopią sprzed chwili. Dlatego potrzebują cache'u i strategii odświeżania, a nie zwykłego setState.",
      },
      {
        type: "ul",
        items: [
          "Stan UI: modale, formularze, filtry, motyw. Twój, synchroniczny, żyje tak długo jak komponent.",
          "Stan serwera: zamówienia, użytkownicy, produkty. Cudzy, asynchroniczny, z natury nieaktualny.",
        ],
      },
      { type: "h2", text: "Jak to wygląda u mnie" },
      {
        type: "p",
        text: "W Next.js większość danych pobieram w Server Components — wtedy problem po prostu nie istnieje, bo dane przychodzą razem z HTML-em. Tam gdzie potrzebuję interaktywności po stronie klienta, wchodzi TanStack Query.",
      },
      {
        type: "code",
        text: `const { data, isPending } = useQuery({
  queryKey: ["orders"],
  queryFn: getOrders,
});`,
      },
      {
        type: "p",
        text: "Trzy linijki zamiast dwudziestu, a przy okazji deduplikacja zapytań, ponawianie po błędzie i odświeżanie w tle. Store zostaje wtedy pusty na dane z API — i nagle okazuje się, że globalnego stanu prawie nie ma.",
      },
    ],
  },
  {
    slug: "zaczynam-pisac",
    title: "Zaczynam pisać",
    summary:
      "Pierwszy wpis, więc krótko: po co mi blog i czego się tu można spodziewać.",
    date: "2025-09-15",
    readingTime: "2 min",
    body: [
      {
        type: "p",
        text: "Od kilku lat mam ten sam nawyk: rozwiązuję problem, cieszę się dwie minuty i idę dalej. Pół roku później trafiam na dokładnie to samo i zaczynam od zera, bo nic z tamtej wiedzy nie zostało zapisane.",
      },
      {
        type: "p",
        text: "Ten blog jest lekarstwem na to. Nie planuję tu wielkich teorii ani rankingów bibliotek. Chcę zapisywać rzeczy, które sam bym chciał znaleźć, kiedy szukałem odpowiedzi na Stack Overflow o pierwszej w nocy.",
      },
      { type: "h2", text: "Czego się spodziewać" },
      {
        type: "ul",
        items: [
          "Krótkich wpisów. Jeden problem, jedno rozwiązanie, konkretny kod.",
          "Reacta i Next.js, bo w tym siedzę na co dzień.",
          "Zarządzania stanem, bo tam najczęściej widzę te same błędy.",
          "Perspektywy testera, której nie zamierzam się pozbywać.",
        ],
      },
      { type: "h2", text: "Dlaczego w ogóle publicznie" },
      {
        type: "p",
        text: "Bo notatki w szufladzie pozwalają na skróty. Kiedy wiem, że ktoś to przeczyta, sprawdzam kod, zanim go wkleję, i muszę zrozumieć temat na tyle, żeby wytłumaczyć go prosto. To sam w sobie jest niezły test tego, czy naprawdę coś umiem.",
      },
      {
        type: "p",
        text: "Jeśli w którymś wpisie napiszę bzdurę — pisz śmiało na maila. Poprawię i dopiszę, co było nie tak.",
      },
    ],
  },
  {
    slug: "ai-zmienilo-jak-pisze-next",
    title: "AI zmieniło sposób, w jaki piszę Next.js",
    summary:
      "Po roku pracy z agentami w codziennym kodzie: co realnie przyspieszyło, a co nadal muszę robić sam.",
    date: "2026-05-14",
    readingTime: "5 min",
    body: [
      {
        type: "p",
        text: "Rok temu byłem sceptyczny. Dziś nie pamiętam, kiedy ostatnio pisałem formularz z walidacją od zera. To nie znaczy, że praca stała się łatwiejsza — przesunęła się w inne miejsce.",
      },
      { type: "h2", text: "Co faktycznie przyspieszyło" },
      {
        type: "p",
        text: "Wszystko, co jest przewidywalne. Route handlery, Server Actions z walidacją, typy z odpowiedzi API, testy do gotowego komponentu, migracje z Pages Routera na App Router. To jest robota, którą kiedyś robiłem przez godzinę, a teraz przeglądam przez pięć minut.",
      },
      {
        type: "code",
        text: `// tego typu kod opisuję zdaniem i tylko czytam wynik
export async function updateOrder(formData: FormData) {
  const parsed = orderSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.flatten() };

  await db.order.update({ where: { id: parsed.data.id }, data: parsed.data });
  revalidatePath("/orders");
}`,
      },
      {
        type: "p",
        text: "Druga rzecz to wejście w nieznany kod. Zamiast czytać dwadzieścia plików, pytam o przepływ danych i dostaję mapę, którą potem weryfikuję. Onboarding do projektu skrócił się z tygodnia do dnia.",
      },
      { type: "h2", text: "Czego nadal nie oddaję" },
      {
        type: "ul",
        items: [
          "Decyzji, co ma być Server Component, a co Client Component. Model chętnie dopisze use client wszędzie, bo wtedy zawsze działa.",
          "Strategii cache'owania i revalidacji. Tu błąd nie wywala buildu, tylko cicho pokazuje użytkownikom stare dane.",
          "Architektury stanu. Zapytany o globalny store dostanę globalny store, nawet jeśli wystarczył useState.",
          "Granic między pakietami i modułami. Model optymalizuje pojedynczy plik, nie kształt całego projektu.",
        ],
      },
      { type: "h2", text: "Największa zmiana jest gdzie indziej" },
      {
        type: "p",
        text: "Kod jest teraz tani, a jego przeczytanie kosztuje tyle samo co wcześniej. Wąskim gardłem przestało być pisanie, a stało się sprawdzanie. I tutaj cztery lata w QA okazały się najlepszą inwestycją w mojej karierze — bo dokładnie tym się teraz zajmuję przez pół dnia.",
      },
      {
        type: "p",
        text: "Praktycznie oznacza to jedno: nie przyjmuję diffa, którego nie rozumiem. Jeśli nie potrafię wyjaśnić, dlaczego ta linijka tam jest, nie wchodzi do repo — nawet jeśli testy są zielone.",
      },
      {
        type: "p",
        text: "I jeszcze jedno, mniej oczywiste: opłaciło się w końcu porządnie opisać projekt. Konwencje, struktura folderów, sposób pobierania danych. Kiedyś to była dokumentacja, której nikt nie czytał. Teraz to kontekst, który realnie zmienia jakość tego, co dostaję.",
      },
    ],
  },
  {
    slug: "workflow-z-agentami",
    title: "Workflow z agentami — co u mnie działa",
    summary:
      "Jeden agent do wszystkiego szybko przestaje wystarczać. Kilka wniosków z rozbijania pracy na kroki.",
    date: "2026-08-20",
    readingTime: "5 min",
    body: [
      {
        type: "p",
        text: "Najpierw miałem jeden długi prompt: napraw buga, dopisz testy, zaktualizuj dokumentację. Działało przy małych zmianach, a przy większych rozsypywało się zawsze w tym samym miejscu — agent gubił początek zadania, zanim doszedł do końca.",
      },
      { type: "h2", text: "Krok pierwszy: rozbicie na etapy" },
      {
        type: "p",
        text: "Zamiast jednego zadania mam teraz kilka mniejszych, każde z jasnym wejściem i wyjściem. Rozpoznanie kodu, plan, implementacja, weryfikacja. Każdy etap dostaje tylko to, czego potrzebuje.",
      },
      {
        type: "code",
        text: `1. research  → gdzie w repo żyje ten problem?
2. plan      → co dokładnie zmieniamy, plik po pliku
3. implement → tylko to, co jest w planie
4. verify    → czy da się to zepsuć?`,
      },
      {
        type: "p",
        text: "Największy zysk daje krok drugi. Plan to kilkanaście linijek, które czytam w minutę — i w tej minucie wyłapuję nieporozumienie, które inaczej kosztowałoby mnie pół godziny czytania gotowego diffa.",
      },
      { type: "h2", text: "Krok drugi: osobny agent do sprawdzania" },
      {
        type: "p",
        text: "Ten sam agent, który napisał kod, jest wobec niego bezkrytyczny. Dlatego weryfikację odpala osobno, bez historii wcześniejszej rozmowy, z jednym zadaniem: znajdź przypadek, w którym to nie zadziała.",
      },
      {
        type: "p",
        text: "To najbliższa rzecz do code review, jaką udało mi się zautomatyzować. Nie wyłapie wszystkiego, ale głupie błędy — pominiętą obsługę błędu, brak stanu ładowania, założenie że tablica nigdy nie jest pusta — łapie zaskakująco skutecznie.",
      },
      { type: "h2", text: "Co idzie równolegle, a co nie" },
      {
        type: "ul",
        items: [
          "Równolegle: przegląd kodu w kilku wymiarach, sprawdzenie kilku hipotez naraz, przeszukiwanie dużego repo.",
          "Po kolei: wszystko, co dotyka tych samych plików. Dwóch agentów edytujących ten sam moduł to gwarantowany konflikt.",
        ],
      },
      { type: "h2", text: "Trzy rzeczy, których się nauczyłem" },
      {
        type: "ul",
        items: [
          "Wąskie zadanie bije szczegółową instrukcję. Krótki, konkretny cel działa lepiej niż strona wytycznych.",
          "Kontekst to koszt. Im więcej wrzucę, tym więcej agent gubi. Mniej znaczy więcej.",
          "Człowiek zostaje przy decyzjach. Automatyzuję szukanie i pisanie, nie zgodę na merge.",
        ],
      },
      {
        type: "p",
        text: "I na koniec zdrowa dawka realizmu: to nie jest darmowe. Cztery kroki to cztery razy więcej zapytań, a bywają zadania, przy których szybciej otworzę plik i poprawię trzy linijki sam. Rozbijanie na etapy zaczyna się opłacać dopiero wtedy, gdy zadanie nie mieści mi się w głowie na raz.",
      },
    ],
  },
];

posts.sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
