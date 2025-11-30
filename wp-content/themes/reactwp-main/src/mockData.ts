import {
  Article,
  CalendarEvent,
  NavItem,
  NewsItem,
  PageView,
  Researcher,
  UserStatus,
} from "./types";

const NAMES = [
  'ד"ר יעל כהן',
  "פרופ' דוד לוי",
  'ד"ר שרה אברהם',
  "פרופ' מיכאל בן-ארי",
  'ד"ר נעה גולן',
  'ד"ר איתי שלו',
  "פרופ' רבקה צור",
  'ד"ר עומר פרידמן',
  'ד"ר דניאל קורן',
  "פרופ' ענת ברק",
  'ד"ר יוסי לביא',
  'ד"ר מיכל שחר',
];

const SPECIALIZATIONS = [
  "פסיכיאטריה",
  "נוירוביולוגיה",
  "פסיכולוגיה קלינית",
  "פרמקולוגיה",
  "מדעי המוח",
  "פסיכותרפיה",
  "אנתרופולוגיה רפואית",
  "ביוכימיה",
];

const INSTITUTIONS = [
  "אוניברסיטת תל אביב",
  "מכון ויצמן למדע",
  "האוניברסיטה העברית",
  "המרכז הרפואי שיבא",
  "אוניברסיטת בן גוריון",
  "המרכז הבינתחומי הרצליה",
];

const FACULTIES = [
  "מדעי החיים",
  "רפואה",
  "מדעי החברה",
  "פסיכולוגיה",
  "מדעי המוח",
];

const SUB_SPECIALIZATIONS_POOL = [
  "טיפול בטראומה",
  "התמכרויות",
  "פסיכדליה ומדיטציה",
  "נוירופסיכופרמקולוגיה",
  "מודלים חישוביים",
  "טיפול קבוצתי",
  "אתיקה ורגולציה",
];

// Generate 12+ researchers
export const INITIAL_RESEARCHERS: Researcher[] = NAMES.map((name, index) => {
  const nameParts = name.split(" ");
  const title = nameParts[0];
  const firstName = nameParts[1];
  const lastName = nameParts.slice(2).join(" ") || firstName;

  // A simple way to guess gender for mock data
  const femaleNames = ["יעל", "שרה", "נעה", "רבקה", "ענת", "מיכל"];
  const gender = femaleNames.includes(firstName) ? "נקבה" : "זכר";

  return {
    id: `res${index + 1}`,
    username: `researcher${index + 1}`,
    email: `researcher${index + 1}@example.ac.il`,
    institution: INSTITUTIONS[index % INSTITUTIONS.length],
    specialization: SPECIALIZATIONS[index % SPECIALIZATIONS.length],
    subSpecializations: [
      SUB_SPECIALIZATIONS_POOL[index % SUB_SPECIALIZATIONS_POOL.length],
      SUB_SPECIALIZATIONS_POOL[(index + 2) % SUB_SPECIALIZATIONS_POOL.length],
    ],
    bio: `חוקר מוביל בתחום ${
      SPECIALIZATIONS[index % SPECIALIZATIONS.length]
    }. עוסק במחקר קליני ותיאורטי אודות השפעות של חומרים משני תודעה על מערכת העצבים ובריאות הנפש.`,
    status: UserStatus.ACTIVE,
    imageUrl: `https://i.pravatar.cc/400?img=${index + 10}`, // Consistent mock images
    title,
    firstName,
    lastName,
    phone: `052-12345${60 + index}`,
    gender: gender,
    idNumber: `${Math.floor(100000000 + Math.random() * 900000000)}`,
    faculty: FACULTIES[index % FACULTIES.length],
    newsletter: index % 2 === 0,
    // studentYear is omitted as they are researchers
  };
});

export const MOCK_NEWS: NewsItem[] = [
  {
    id: "1",
    title: "נפתח הרישום לכנס השנתי למחקר פסיכדלי 2024",
    date: "21/05/2024",
    link: "#",
  },
  {
    id: "2",
    title: "פרסום הנחיות חדשות של משרד הבריאות לטיפול ב-MDMA",
    date: "18/05/2024",
    link: "#",
  },
  {
    id: "3",
    title: "קול קורא להגשת תקצירים לגיליון מיוחד בנושא פסילוסיבין",
    date: "15/05/2024",
    link: "#",
  },
  {
    id: "4",
    title: "וובינר מיוחד עם פרופ' ריק דובלין - הירשמו עכשיו",
    date: "10/05/2024",
    link: "#",
  },
  {
    id: "5",
    title: "מחקר חדש מישראל פורסם ב-Nature Medicine",
    date: "05/05/2024",
    link: "#",
  },
];

export const MOCK_EVENTS: CalendarEvent[] = [
  {
    id: "1",
    title: "כנס שנתי למחקר פסיכדלי",
    date: "2024-06-15",
    day: "15",
    month: "יוני",
    location: "אוניברסיטת תל אביב",
    type: "כנס",
  },
  {
    id: "2",
    title: "וובינר: טיפול ב-MDMA וטראומה",
    date: "2024-07-02",
    day: "02",
    month: "יולי",
    location: "Online (Zoom)",
    type: "וובינר",
  },
  {
    id: "3",
    title: "סדנת אינטגרציה למטפלים",
    date: "2024-07-20",
    day: "20",
    month: "יולי",
    location: "מרכז בינתחומי הרצליה",
    type: "סדנה",
  },
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: "1",
    title: "העתיד של טיפול בפסילוסיבין בישראל: אתגרים רגולטוריים",
    excerpt:
      "סקירה מקיפה של השינויים הצפויים במדיניות משרד הבריאות לשנת 2025 וההשפעות הקליניות על הטיפול בבריאות הנפש.",
    content: "...",
    authorId: "admin",
    authorName: "מערכת הפורום",
    date: "10/05/2024",
    isEditorial: true,
    tags: ["רגולציה", "פסילוסיבין", "בריאות הנפש"],
    imageUrl:
      "https://images.unsplash.com/photo-1555679427-1f6dfcce943b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    title: "MDMA וטיפול בטראומה עיקשת: ממצאים חדשים",
    excerpt:
      "ניתוח תוצאות מחקר פאזה 3 שבוצע לאחרונה, עם דגש על אוכלוסיות בסיכון והתאמה לקהל הישראלי.",
    content: "...",
    authorId: "res1",
    authorName: 'ד"ר יעל כהן',
    date: "02/04/2024",
    isEditorial: false,
    tags: ["MDMA", "PTSD", "מחקר קליני"],
    imageUrl:
      "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    title: "המוח הפסיכדלי: מיפוי רשתות עצביות תחת השפעת LSD",
    excerpt:
      "כיצד משתנה הקישוריות המוחית בזמן אמת? סקירה של טכנולוגיות fMRI מתקדמות.",
    content: "...",
    authorId: "res2",
    authorName: "פרופ' דוד לוי",
    date: "15/03/2024",
    isEditorial: false,
    tags: ["LSD", "מדעי המוח", "fMRI"],
    imageUrl:
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "4",
    title: "סקירה: הכנס הבינלאומי למדעים פסיכדליים בדנבר",
    excerpt: "רשמים, תובנות ומחקרים פורצי דרך שהוצגו בכנס הגדול ביותר בתחום.",
    content: "...",
    authorId: "admin",
    authorName: "מערכת הפורום",
    date: "01/03/2024",
    isEditorial: true,
    tags: ["כנס", "סקירה", 'חו"ל'],
    imageUrl:
      "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "5",
    title: "השפעת מיקרו-דוזינג על יצירתיות: ניסוי מבוקר",
    excerpt:
      "תוצאות ראשוניות ממחקר שנערך באוניברסיטת חיפה בקרב סטודנטים לאמנות.",
    content: "...",
    authorId: "res5",
    authorName: 'ד"ר נעה גולן',
    date: "20/02/2024",
    isEditorial: false,
    tags: ["מיקרודוזינג", "יצירתיות", "פסיכולוגיה"],
    imageUrl:
      "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "6",
    title: "ראיון בלעדי עם ראש תחום בריאות הנפש",
    excerpt:
      "על השינויים הצפויים בהנגשת טיפולים פסיכדליים בישראל בשנים הקרובות.",
    content: "...",
    authorId: "admin",
    authorName: "מערכת הפורום",
    date: "10/01/2024",
    isEditorial: true,
    tags: ["ראיון", "מדיניות", "בריאות הנפש"],
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
  },
];

export const NAV_ITEMS: NavItem[] = [
  { label: "דף הבית", view: PageView.HOME },
  { label: "אינדקס חוקרים", view: PageView.RESEARCHERS },
  { label: "מאמרים", view: PageView.ARTICLES },
  { label: "הכשרות", view: PageView.TRAINING },
  { label: "אירועים", view: PageView.EVENTS },
  { label: "צור קשר", view: PageView.CONTACT },
];
