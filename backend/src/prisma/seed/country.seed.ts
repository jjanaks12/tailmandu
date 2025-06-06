import type { PrismaClient } from "@prisma/client"

export const countrySeed = async (prisma: PrismaClient) => {
    /* Seeding countries */
    await prisma.country.createMany({
        data: [{
            "name": "ANDORRA",
            "abbr": "ad",
            "code": "376"
        }, {
            "name": "UNITED ARAB EMIRATES",
            "abbr": "ae",
            "code": "971"
        }, {
            "name": "AFGHANISTAN",
            "abbr": "af",
            "code": "93"
        }, {
            "name": "ANTIGUA AND BARBUDA",
            "abbr": "ag",
            "code": "1268"
        }, {
            "name": "ANGUILLA",
            "abbr": "ai",
            "code": "1264"
        }, {
            "name": "ALBANIA",
            "abbr": "al",
            "code": "355"
        }, {
            "name": "ARMENIA",
            "abbr": "am",
            "code": "374"
        }, {
            "name": "NETHERLANDS ANTILLES",
            "abbr": "an",
            "code": "599"
        }, {
            "name": "ANGOLA",
            "abbr": "ao",
            "code": "244"
        }, {
            "name": "ANTARCTICA",
            "abbr": "aq",
            "code": "672"
        }, {
            "name": "ARGENTINA",
            "abbr": "ar",
            "code": "54"
        }, {
            "name": "AMERICAN SAMOA",
            "abbr": "as",
            "code": "1684"
        }, {
            "name": "AUSTRIA",
            "abbr": "at",
            "code": "43"
        }, {
            "name": "AUSTRALIA",
            "abbr": "au",
            "code": "61"
        }, {
            "name": "ARUBA",
            "abbr": "aw",
            "code": "297"
        }, {
            "name": "AZERBAIJAN",
            "abbr": "az",
            "code": "994"
        }, {
            "name": "BOSNIA AND HERZEGOVINA",
            "abbr": "ba",
            "code": "387"
        }, {
            "name": "BARBADOS",
            "abbr": "bb",
            "code": "1246"
        }, {
            "name": "BANGLADESH",
            "abbr": "bd",
            "code": "880"
        }, {
            "name": "BELGIUM",
            "abbr": "be",
            "code": "32"
        }, {
            "name": "BURKINA FASO",
            "abbr": "bf",
            "code": "226"
        }, {
            "name": "BULGARIA",
            "abbr": "bg",
            "code": "359"
        }, {
            "name": "BAHRAIN",
            "abbr": "bh",
            "code": "973"
        }, {
            "name": "BURUNDI",
            "abbr": "bi",
            "code": "257"
        }, {
            "name": "BENIN",
            "abbr": "bj",
            "code": "229"
        }, {
            "name": "SAINT BARTHELEMY",
            "abbr": "bl",
            "code": "590"
        }, {
            "name": "BERMUDA",
            "abbr": "bm",
            "code": "1441"
        }, {
            "name": "BRUNEI DARUSSALAM",
            "abbr": "bn",
            "code": "673"
        }, {
            "name": "BOLIVIA",
            "abbr": "bo",
            "code": "591"
        }, {
            "name": "BRAZIL",
            "abbr": "br",
            "code": "55"
        }, {
            "name": "BAHAMAS",
            "abbr": "bs",
            "code": "1242"
        }, {
            "name": "BHUTAN",
            "abbr": "bt",
            "code": "975"
        }, {
            "name": "BOTSWANA",
            "abbr": "bw",
            "code": "267"
        }, {
            "name": "BELARUS",
            "abbr": "by",
            "code": "375"
        }, {
            "name": "BELIZE",
            "abbr": "bz",
            "code": "501"
        }, {
            "name": "CANADA",
            "abbr": "ca",
            "code": "1"
        }, {
            "name": "COCOS (KEELING) ISLANDS",
            "abbr": "cc",
            "code": "61"
        }, {
            "name": "CONGO, THE DEMOCRATIC REPUBLIC OF THE",
            "abbr": "cd",
            "code": "243"
        }, {
            "name": "CENTRAL AFRICAN REPUBLIC",
            "abbr": "cf",
            "code": "236"
        }, {
            "name": "CONGO",
            "abbr": "cg",
            "code": "242"
        }, {
            "name": "SWITZERLAND",
            "abbr": "ch",
            "code": "41"
        }, {
            "name": "COTE D IVOIRE",
            "abbr": "ci",
            "code": "225"
        }, {
            "name": "COOK ISLANDS",
            "abbr": "ck",
            "code": "682"
        }, {
            "name": "CHILE",
            "abbr": "cl",
            "code": "56"
        }, {
            "name": "CAMEROON",
            "abbr": "cm",
            "code": "237"
        }, {
            "name": "CHINA",
            "abbr": "cn",
            "code": "86"
        }, {
            "name": "COLOMBIA",
            "abbr": "co",
            "code": "57"
        }, {
            "name": "COSTA RICA",
            "abbr": "cr",
            "code": "506"
        }, {
            "name": "CUBA",
            "abbr": "cu",
            "code": "53"
        }, {
            "name": "CAPE VERDE",
            "abbr": "cv",
            "code": "238"
        }, {
            "name": "CHRISTMAS ISLAND",
            "abbr": "cx",
            "code": "61"
        }, {
            "name": "CYPRUS",
            "abbr": "cy",
            "code": "357"
        }, {
            "name": "CZECH REPUBLIC",
            "abbr": "cz",
            "code": "420"
        }, {
            "name": "GERMANY",
            "abbr": "de",
            "code": "49"
        }, {
            "name": "DJIBOUTI",
            "abbr": "dj",
            "code": "253"
        }, {
            "name": "DENMARK",
            "abbr": "dk",
            "code": "45"
        }, {
            "name": "DOMINICA",
            "abbr": "dm",
            "code": "1767"
        }, {
            "name": "DOMINICAN REPUBLIC",
            "abbr": "do",
            "code": "1809"
        }, {
            "name": "ALGERIA",
            "abbr": "dz",
            "code": "213"
        }, {
            "name": "ECUADOR",
            "abbr": "ec",
            "code": "593"
        }, {
            "name": "ESTONIA",
            "abbr": "ee",
            "code": "372"
        }, {
            "name": "EGYPT",
            "abbr": "eg",
            "code": "20"
        }, {
            "name": "ERITREA",
            "abbr": "er",
            "code": "291"
        }, {
            "name": "SPAIN",
            "abbr": "es",
            "code": "34"
        }, {
            "name": "ETHIOPIA",
            "abbr": "et",
            "code": "251"
        }, {
            "name": "FINLAND",
            "abbr": "fi",
            "code": "358"
        }, {
            "name": "FIJI",
            "abbr": "fj",
            "code": "679"
        }, {
            "name": "FALKLAND ISLANDS (MALVINAS)",
            "abbr": "fk",
            "code": "500"
        }, {
            "name": "MICRONESIA, FEDERATED STATES OF",
            "abbr": "fm",
            "code": "691"
        }, {
            "name": "FAROE ISLANDS",
            "abbr": "fo",
            "code": "298"
        }, {
            "name": "FRANCE",
            "abbr": "fr",
            "code": "33"
        }, {
            "name": "GABON",
            "abbr": "ga",
            "code": "241"
        }, {
            "name": "UNITED KINGDOM",
            "abbr": "gb",
            "code": "44"
        }, {
            "name": "GRENADA",
            "abbr": "gd",
            "code": "1473"
        }, {
            "name": "GEORGIA",
            "abbr": "ge",
            "code": "995"
        }, {
            "name": "GHANA",
            "abbr": "gh",
            "code": "233"
        }, {
            "name": "GIBRALTAR",
            "abbr": "gi",
            "code": "350"
        }, {
            "name": "GREENLAND",
            "abbr": "gl",
            "code": "299"
        }, {
            "name": "GAMBIA",
            "abbr": "gm",
            "code": "220"
        }, {
            "name": "GUINEA",
            "abbr": "gn",
            "code": "224"
        }, {
            "name": "EQUATORIAL GUINEA",
            "abbr": "gq",
            "code": "240"
        }, {
            "name": "GREECE",
            "abbr": "gr",
            "code": "30"
        }, {
            "name": "GUATEMALA",
            "abbr": "gt",
            "code": "502"
        }, {
            "name": "GUAM",
            "abbr": "gu",
            "code": "1671"
        }, {
            "name": "GUINEA-BISSAU",
            "abbr": "gw",
            "code": "245"
        }, {
            "name": "GUYANA",
            "abbr": "gy",
            "code": "592"
        }, {
            "name": "HONG KONG",
            "abbr": "hk",
            "code": "852"
        }, {
            "name": "HONDURAS",
            "abbr": "hn",
            "code": "504"
        }, {
            "name": "CROATIA",
            "abbr": "hr",
            "code": "385"
        }, {
            "name": "HAITI",
            "abbr": "ht",
            "code": "509"
        }, {
            "name": "HUNGARY",
            "abbr": "hu",
            "code": "36"
        }, {
            "name": "INDONESIA",
            "abbr": "id",
            "code": "62"
        }, {
            "name": "IRELAND",
            "abbr": "ie",
            "code": "353"
        }, {
            "name": "ISRAEL",
            "abbr": "il",
            "code": "972"
        }, {
            "name": "ISLE OF MAN",
            "abbr": "im",
            "code": "44"
        }, {
            "name": "INDIA",
            "abbr": "in",
            "code": "91"
        }, {
            "name": "IRAQ",
            "abbr": "iq",
            "code": "964"
        }, {
            "name": "IRAN, ISLAMIC REPUBLIC OF",
            "abbr": "ir",
            "code": "98"
        }, {
            "name": "ICELAND",
            "abbr": "is",
            "code": "354"
        }, {
            "name": "ITALY",
            "abbr": "it",
            "code": "39"
        }, {
            "name": "JAMAICA",
            "abbr": "jm",
            "code": "1876"
        }, {
            "name": "JORDAN",
            "abbr": "jo",
            "code": "962"
        }, {
            "name": "JAPAN",
            "abbr": "jp",
            "code": "81"
        }, {
            "name": "KENYA",
            "abbr": "ke",
            "code": "254"
        }, {
            "name": "KYRGYZSTAN",
            "abbr": "kg",
            "code": "996"
        }, {
            "name": "CAMBODIA",
            "abbr": "kh",
            "code": "855"
        }, {
            "name": "KIRIBATI",
            "abbr": "ki",
            "code": "686"
        }, {
            "name": "COMOROS",
            "abbr": "km",
            "code": "269"
        }, {
            "name": "SAINT KITTS AND NEVIS",
            "abbr": "kn",
            "code": "1869"
        }, {
            "name": "KOREA DEMOCRATIC PEOPLES REPUBLIC OF",
            "abbr": "kp",
            "code": "850"
        }, {
            "name": "KOREA REPUBLIC OF",
            "abbr": "kr",
            "code": "82"
        }, {
            "name": "KUWAIT",
            "abbr": "kw",
            "code": "965"
        }, {
            "name": "CAYMAN ISLANDS",
            "abbr": "ky",
            "code": "1345"
        }, {
            "name": "KAZAKSTAN",
            "abbr": "kz",
            "code": "7"
        }, {
            "name": "LAO PEOPLES DEMOCRATIC REPUBLIC",
            "abbr": "la",
            "code": "856"
        }, {
            "name": "LEBANON",
            "abbr": "lb",
            "code": "961"
        }, {
            "name": "SAINT LUCIA",
            "abbr": "lc",
            "code": "1758"
        }, {
            "name": "LIECHTENSTEIN",
            "abbr": "li",
            "code": "423"
        }, {
            "name": "SRI LANKA",
            "abbr": "lk",
            "code": "94"
        }, {
            "name": "LIBERIA",
            "abbr": "lr",
            "code": "231"
        }, {
            "name": "LESOTHO",
            "abbr": "ls",
            "code": "266"
        }, {
            "name": "LITHUANIA",
            "abbr": "lt",
            "code": "370"
        }, {
            "name": "LUXEMBOURG",
            "abbr": "lu",
            "code": "352"
        }, {
            "name": "LATVIA",
            "abbr": "lv",
            "code": "371"
        }, {
            "name": "LIBYAN ARAB JAMAHIRIYA",
            "abbr": "ly",
            "code": "218"
        }, {
            "name": "MOROCCO",
            "abbr": "ma",
            "code": "212"
        }, {
            "name": "MONACO",
            "abbr": "mc",
            "code": "377"
        }, {
            "name": "MOLDOVA, REPUBLIC OF",
            "abbr": "md",
            "code": "373"
        }, {
            "name": "MONTENEGRO",
            "abbr": "me",
            "code": "382"
        }, {
            "name": "SAINT MARTIN",
            "abbr": "mf",
            "code": "1599"
        }, {
            "name": "MADAGASCAR",
            "abbr": "mg",
            "code": "261"
        }, {
            "name": "MARSHALL ISLANDS",
            "abbr": "mh",
            "code": "692"
        }, {
            "name": "MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF",
            "abbr": "mk",
            "code": "389"
        }, {
            "name": "MALI",
            "abbr": "ml",
            "code": "223"
        }, {
            "name": "MYANMAR",
            "abbr": "mm",
            "code": "95"
        }, {
            "name": "MONGOLIA",
            "abbr": "mn",
            "code": "976"
        }, {
            "name": "MACAU",
            "abbr": "mo",
            "code": "853"
        }, {
            "name": "NORTHERN MARIANA ISLANDS",
            "abbr": "mp",
            "code": "1670"
        }, {
            "name": "MAURITANIA",
            "abbr": "mr",
            "code": "222"
        }, {
            "name": "MONTSERRAT",
            "abbr": "ms",
            "code": "1664"
        }, {
            "name": "MALTA",
            "abbr": "mt",
            "code": "356"
        }, {
            "name": "MAURITIUS",
            "abbr": "mu",
            "code": "230"
        }, {
            "name": "MALDIVES",
            "abbr": "mv",
            "code": "960"
        }, {
            "name": "MALAWI",
            "abbr": "mw",
            "code": "265"
        }, {
            "name": "MEXICO",
            "abbr": "mx",
            "code": "52"
        }, {
            "name": "MALAYSIA",
            "abbr": "my",
            "code": "60"
        }, {
            "name": "MOZAMBIQUE",
            "abbr": "mz",
            "code": "258"
        }, {
            "name": "NAMIBIA",
            "abbr": "na",
            "code": "264"
        }, {
            "name": "NEW CALEDONIA",
            "abbr": "nc",
            "code": "687"
        }, {
            "name": "NIGER",
            "abbr": "ne",
            "code": "227"
        }, {
            "name": "NIGERIA",
            "abbr": "ng",
            "code": "234"
        }, {
            "name": "NICARAGUA",
            "abbr": "ni",
            "code": "505"
        }, {
            "name": "NETHERLANDS",
            "abbr": "nl",
            "code": "31"
        }, {
            "name": "NORWAY",
            "abbr": "no",
            "code": "47"
        }, {
            "name": "NEPAL",
            "abbr": "np",
            "code": "977"
        }, {
            "name": "NAURU",
            "abbr": "nr",
            "code": "674"
        }, {
            "name": "NIUE",
            "abbr": "nu",
            "code": "683"
        }, {
            "name": "NEW ZEALAND",
            "abbr": "nz",
            "code": "64"
        }, {
            "name": "OMAN",
            "abbr": "om",
            "code": "968"
        }, {
            "name": "PANAMA",
            "abbr": "pa",
            "code": "507"
        }, {
            "name": "PERU",
            "abbr": "pe",
            "code": "51"
        }, {
            "name": "FRENCH POLYNESIA",
            "abbr": "pf",
            "code": "689"
        }, {
            "name": "PAPUA NEW GUINEA",
            "abbr": "pg",
            "code": "675"
        }, {
            "name": "PHILIPPINES",
            "abbr": "ph",
            "code": "63"
        }, {
            "name": "PAKISTAN",
            "abbr": "pk",
            "code": "92"
        }, {
            "name": "POLAND",
            "abbr": "pl",
            "code": "48"
        }, {
            "name": "SAINT PIERRE AND MIQUELON",
            "abbr": "pm",
            "code": "508"
        }, {
            "name": "PITCAIRN",
            "abbr": "pn",
            "code": "870"
        }, {
            "name": "PUERTO RICO",
            "abbr": "pr",
            "code": "1"
        }, {
            "name": "PORTUGAL",
            "abbr": "pt",
            "code": "351"
        }, {
            "name": "PALAU",
            "abbr": "pw",
            "code": "680"
        }, {
            "name": "PARAGUAY",
            "abbr": "py",
            "code": "595"
        }, {
            "name": "QATAR",
            "abbr": "qa",
            "code": "974"
        }, {
            "name": "ROMANIA",
            "abbr": "ro",
            "code": "40"
        }, {
            "name": "SERBIA",
            "abbr": "rs",
            "code": "381"
        }, {
            "name": "RUSSIAN FEDERATION",
            "abbr": "ru",
            "code": "7"
        }, {
            "name": "RWANDA",
            "abbr": "rw",
            "code": "250"
        }, {
            "name": "SAUDI ARABIA",
            "abbr": "sa",
            "code": "966"
        }, {
            "name": "SOLOMON ISLANDS",
            "abbr": "sb",
            "code": "677"
        }, {
            "name": "SEYCHELLES",
            "abbr": "sc",
            "code": "248"
        }, {
            "name": "SUDAN",
            "abbr": "sd",
            "code": "249"
        }, {
            "name": "SWEDEN",
            "abbr": "se",
            "code": "46"
        }, {
            "name": "SINGAPORE",
            "abbr": "sg",
            "code": "65"
        }, {
            "name": "SAINT HELENA",
            "abbr": "sh",
            "code": "290"
        }, {
            "name": "SLOVENIA",
            "abbr": "si",
            "code": "386"
        }, {
            "name": "SLOVAKIA",
            "abbr": "sk",
            "code": "421"
        }, {
            "name": "SIERRA LEONE",
            "abbr": "sl",
            "code": "232"
        }, {
            "name": "SAN MARINO",
            "abbr": "sm",
            "code": "378"
        }, {
            "name": "SENEGAL",
            "abbr": "sn",
            "code": "221"
        }, {
            "name": "SOMALIA",
            "abbr": "so",
            "code": "252"
        }, {
            "name": "SURINAME",
            "abbr": "sr",
            "code": "597"
        }, {
            "name": "SAO TOME AND PRINCIPE",
            "abbr": "st",
            "code": "239"
        }, {
            "name": "EL SALVADOR",
            "abbr": "sv",
            "code": "503"
        }, {
            "name": "SYRIAN ARAB REPUBLIC",
            "abbr": "sy",
            "code": "963"
        }, {
            "name": "SWAZILAND",
            "abbr": "sz",
            "code": "268"
        }, {
            "name": "TURKS AND CAICOS ISLANDS",
            "abbr": "tc",
            "code": "1649"
        }, {
            "name": "CHAD",
            "abbr": "td",
            "code": "235"
        }, {
            "name": "TOGO",
            "abbr": "tg",
            "code": "228"
        }, {
            "name": "THAILAND",
            "abbr": "th",
            "code": "66"
        }, {
            "name": "TAJIKISTAN",
            "abbr": "tj",
            "code": "992"
        }, {
            "name": "TOKELAU",
            "abbr": "tk",
            "code": "690"
        }, {
            "name": "TIMOR-LESTE",
            "abbr": "tl",
            "code": "670"
        }, {
            "name": "TURKMENISTAN",
            "abbr": "tm",
            "code": "993"
        }, {
            "name": "TUNISIA",
            "abbr": "tn",
            "code": "216"
        }, {
            "name": "TONGA",
            "abbr": "to",
            "code": "676"
        }, {
            "name": "TURKEY",
            "abbr": "tr",
            "code": "90"
        }, {
            "name": "TRINIDAD AND TOBAGO",
            "abbr": "tt",
            "code": "1868"
        }, {
            "name": "TUVALU",
            "abbr": "tv",
            "code": "688"
        }, {
            "name": "TAIWAN, PROVINCE OF CHINA",
            "abbr": "tw",
            "code": "886"
        }, {
            "name": "TANZANIA, UNITED REPUBLIC OF",
            "abbr": "tz",
            "code": "255"
        }, {
            "name": "UKRAINE",
            "abbr": "ua",
            "code": "380"
        }, {
            "name": "UGANDA",
            "abbr": "ug",
            "code": "256"
        }, {
            "name": "UNITED STATES",
            "abbr": "us",
            "code": "1"
        }, {
            "name": "URUGUAY",
            "abbr": "uy",
            "code": "598"
        }, {
            "name": "UZBEKISTAN",
            "abbr": "uz",
            "code": "998"
        }, {
            "name": "HOLY SEE (VATICAN CITY STATE)",
            "abbr": "va",
            "code": "39"
        }, {
            "name": "SAINT VINCENT AND THE GRENADINES",
            "abbr": "vc",
            "code": "1784"
        }, {
            "name": "VENEZUELA",
            "abbr": "ve",
            "code": "58"
        }, {
            "name": "VIRGIN ISLANDS, BRITISH",
            "abbr": "vg",
            "code": "1284"
        }, {
            "name": "VIRGIN ISLANDS, U.S.",
            "abbr": "vi",
            "code": "1340"
        }, {
            "name": "VIET NAM",
            "abbr": "vn",
            "code": "84"
        }, {
            "name": "VANUATU",
            "abbr": "vu",
            "code": "678"
        }, {
            "name": "WALLIS AND FUTUNA",
            "abbr": "wf",
            "code": "681"
        }, {
            "name": "SAMOA",
            "abbr": "ws",
            "code": "685"
        }, {
            "name": "KOSOVO",
            "abbr": "xk",
            "code": "381"
        }, {
            "name": "YEMEN",
            "abbr": "ye",
            "code": "967"
        }, {
            "name": "MAYOTTE",
            "abbr": "yt",
            "code": "262"
        }, {
            "name": "SOUTH AFRICA",
            "abbr": "za",
            "code": "27"
        }, {
            "name": "ZAMBIA",
            "abbr": "zm",
            "code": "260"
        }, {
            "name": "ZIMBABWE",
            "abbr": "zw",
            "code": "263"
        }]
    })
}