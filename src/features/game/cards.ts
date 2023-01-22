const PlayableCardTypes = [
    // 都市計画道路
    "CityRoad",
    // ショッピングセンターの誘致
    "ShoppingCenter",
    // 原発
    "Atom",
    // 幼児・児童の一時預かり体制
    "Nursery",
    // 総合型地域スポーツクラブ
    "SportsClub",
    // キャリア教育
    "CareerEducation",
    // 保険指導強化
    "HealthGuidance",
    // 消防団
    "FireDepartment",
    // 子供食堂
    "ChildrenRestaurant",
    // 関係人口創出
    "PopulationCreating",
    // 宝くじ
    "Lottery",
    // 事業仕分け
    "BusinessSorting",
    // 所得
    "Income",
    // 健康
    "Health",
    // いきがい
    "LifeMotivation",
    // 交付金
    "Subsidy",
    // 個人税
    "IndivisualTax",
    // 法人税
    "CorporateTax"
] as const;

export type PlayableCardType = typeof PlayableCardTypes[number];

export type PlayableCard = {
    type: PlayableCardType
    jpName: string;
    color: "red" | "yellow" | "green" | "blue"
    drawCards: number;
    resolveIssues: boolean;
    increasePopulation: number;
    happiness: number;
    addCoins: number;
    addGetNum: number;
    addActions: number;
    cost: number;
} | {
    type: "Subsidy" | "IndivisualTax" | "CorporateTax";
    jpName: string;
    coin: number;
    cost: number;
} | {
    type: "Income" | "Health" | "LifeMotivation";
    happiness: number;
    jpName: string,
    cost: number;
};

const PoliticalCards: PlayableCard[] = [
    {
        type: "CityRoad",
        jpName: "都市計画道路",
        color: "red",
        drawCards: 4,
        resolveIssues: true,
        increasePopulation: 0,
        addCoins: 0,
        addGetNum: 1,
        addActions: 0,
        happiness: 0,
        cost: 5,
        // 全プレイヤーに+1
    },
    {
        type: "ShoppingCenter",
        jpName: "ショッピングセンターの誘致",
        color: "red",
        drawCards: 2,
        resolveIssues: true,
        increasePopulation: 1,
        addCoins: 1,
        addGetNum: 0,
        addActions: 0,
        happiness: -2,
        cost: 4,
    },
    {
        type: "Atom",
        jpName: "原子力発電所",
        color: "red",
        drawCards: 0,
        resolveIssues: false,
        increasePopulation: 0,
        addCoins: 3,
        addGetNum: 0,
        addActions: 1,
        happiness: -4,
        cost: 2,
    },
    {
        type: "Nursery",
        jpName: "幼児・児童の一時預かり体制",
        color: "yellow",
        drawCards: 0,
        resolveIssues: false,
        increasePopulation: 0,
        addCoins: 1,
        addGetNum: 1,
        addActions: 2,
        happiness: 0,
        cost: 5,
    },
    {
        type: "SportsClub",
        jpName: "総合型地域スポーツクラブ",
        color: "yellow",
        drawCards: 1,
        resolveIssues: true,
        increasePopulation: 0,
        addCoins: 0,
        addGetNum: 2,
        addActions: 0,
        happiness: -4,
        cost: 4,
    },
    {
        type: "CareerEducation",
        jpName: "キャリア教育",
        color: "yellow",
        drawCards: 1,
        addActions: 2,
        resolveIssues: false,
        increasePopulation: 0,
        happiness: 0,
        addCoins: 0,
        addGetNum: 0,
        cost: 3,
    },
    {
        type: "HealthGuidance",
        jpName: "保険指導強化",
        color: "green",
        drawCards: 2,
        addActions: 0,
        resolveIssues: true,
        increasePopulation: 1,
        happiness: 0,
        addCoins: 0,
        addGetNum: 0,
        cost: 5,
    },
    {
        type: "FireDepartment",
        jpName: "消防団",
        color: "green",
        drawCards: 1,
        addActions: 1,
        resolveIssues: true,
        increasePopulation: 0,
        happiness: 0,
        addCoins: 0,
        addGetNum: 0,
        cost: 4,
    },
    {
        type: "ChildrenRestaurant",
        jpName: "子供食堂",
        color: "green",
        drawCards: 2,
        addActions: 1,
        resolveIssues: false,
        increasePopulation: 0,
        happiness: 0,
        addCoins: 0,
        addGetNum: 0,
        cost: 3,
    },
    {
        type: "PopulationCreating",
        jpName: "関係人口の創出",
        color: "blue",
        drawCards: 1,
        resolveIssues: true,
        addCoins: 1,
        increasePopulation: 1,
        addActions: 0,
        addGetNum: 0,
        happiness: 0,
        cost: 5,
    },
    {
        type: "Lottery",
        jpName: "宝くじ",
        color: "blue",
        drawCards: 1,
        resolveIssues: true,
        addCoins: 1,
        increasePopulation: 0,
        addActions: 0,
        addGetNum: 0,
        happiness: 0,
        cost: 3,
    },
    {
        type: "BusinessSorting",
        jpName: "事業仕分け",
        color: "blue",
        drawCards: 0,
        addActions: 1,
        increasePopulation: 0,
        addCoins: 1,
        addGetNum: 0,
        happiness: -1,
        resolveIssues: false,
        // 捨てた数だけ引く
        cost: 2
    }
]

const ScoreCards: PlayableCard[] = [
    {
        type: "Income",
        jpName: "所得",
        happiness: 1,
        cost: 2,
    },
    {
        type: "Health",
        jpName: "健康",
        happiness: 2,
        cost: 5,
    },
    {
        type: "LifeMotivation",
        jpName: "生きがい",
        happiness: 4,
        cost: 8,
    }
]

const CoinCards: PlayableCard[] = [
    {
        type: "Subsidy",
        jpName: "交付金",
        coin: 1,
        cost: 0,
    },
    {
        type: "IndivisualTax",
        jpName: "個人税",
        coin: 2,
        cost: 3,
    },
    {
        type: "CorporateTax",
        jpName: "法人税",
        coin: 3,
        cost: 6,
    }
]

export const PlayableCards: PlayableCard[] = [
    ...PoliticalCards,
    ...ScoreCards,
    ...CoinCards,
]