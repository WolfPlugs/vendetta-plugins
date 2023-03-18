interface RootObject {
    error: string;
    custom: Custom;
    recent_activity: Recentactivity[];
    avatar_url: string;
    country_code: string;
    default_group: string;
    id: number;
    is_active: boolean;
    is_bot: boolean;
    is_deleted: boolean;
    is_online: boolean;
    is_supporter: boolean;
    last_visit: string;
    pm_friends_only: boolean;
    profile_colour?: any;
    username: string;
    cover_url: string;
    discord: string;
    has_supported: boolean;
    interests?: any;
    join_date: string;
    kudosu: Kudosu;
    location?: any;
    max_blocks: number;
    max_friends: number;
    occupation: string;
    playmode: string;
    playstyle: string[];
    post_count: number;
    profile_order: string[];
    title?: any;
    title_url?: any;
    twitter: string;
    website: string;
    country: Country;
    cover: Cover;
    account_history: any[];
    active_tournament_banner?: any;
    badges: any[];
    beatmap_playcounts_count: number;
    comments_count: number;
    favourite_beatmapset_count: number;
    follower_count: number;
    graveyard_beatmapset_count: number;
    groups: any[];
    guest_beatmapset_count: number;
    loved_beatmapset_count: number;
    mapping_follower_count: number;
    monthly_playcounts: Monthlyplaycount[];
    nominated_beatmapset_count: number;
    page: Page;
    pending_beatmapset_count: number;
    previous_usernames: any[];
    rank_highest: Rankhighest;
    ranked_beatmapset_count: number;
    replays_watched_counts: any[];
    scores_best_count: number;
    scores_first_count: number;
    scores_pinned_count: number;
    scores_recent_count: number;
    statistics: Statistics;
    support_level: number;
    user_achievements: Userachievement[];
    rank_history: Rankhistory;
    rankHistory: Rankhistory;
    ranked_and_approved_beatmapset_count: number;
    unranked_beatmapset_count: number;
  }
  
  interface Rankhistory {
    mode: string;
    data: number[];
  }
  
  interface Userachievement {
    achieved_at: string;
    achievement_id: number;
  }
  
  interface Statistics {
    count_100: number;
    count_300: number;
    count_50: number;
    count_miss: number;
    level: Level;
    global_rank: number;
    global_rank_exp?: any;
    pp: number;
    pp_exp: number;
    ranked_score: number;
    hit_accuracy: number;
    play_count: number;
    play_time: number;
    total_score: number;
    total_hits: number;
    maximum_combo: number;
    replays_watched_by_others: number;
    is_ranked: boolean;
    grade_counts: Gradecounts;
    country_rank: number;
    rank: Rank;
  }
  
  interface Rank {
    country: number;
  }
  
  interface Gradecounts {
    ss: number;
    ssh: number;
    s: number;
    sh: number;
    a: number;
  }
  
  interface Level {
    current: number;
    progress: number;
  }
  
  interface Rankhighest {
    rank: number;
    updated_at: string;
  }
  
  interface Page {
    html: string;
    raw: string;
  }
  
  interface Monthlyplaycount {
    start_date: string;
    count: number;
  }
  
  interface Cover {
    custom_url?: any;
    url: string;
    id: string;
  }
  
  interface Country {
    code: string;
    name: string;
  }
  
  interface Kudosu {
    total: number;
    available: number;
  }
  
  interface Recentactivity {
    beatmap_id: string;
    score: string;
    maxcombo: string;
    count50: string;
    count100: string;
    count300: string;
    countmiss: string;
    countkatu: string;
    countgeki: string;
    perfect: string;
    enabled_mods: string;
    user_id: string;
    date: string;
    rank: string;
    score_id?: string;
  }
  
  interface Custom {
    hit_accuracy: string;
    time_played: string;
    total_score: string;
    playcount: string;
    pp_rank: string;
    pp_country_rank: string;
    pp_raw: string;
    user_profile: string;
    playstyles: string;
    format_join_date: string;
    format_last_visit: string;
    country_code: string;
  }
  
  export {
    RootObject,
    Rankhistory,
    Userachievement,
    Statistics,
    Rank,
    Gradecounts,
    Level,
    Rankhighest,
    Page,
    Monthlyplaycount,
    Cover,
    Country,
    Kudosu,
    Recentactivity,
    Custom
  }