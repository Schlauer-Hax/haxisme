import { State } from "webgen/mod.ts";

export const state = State(<Root>{
    discord: {
        activities: [],
        status: "offline"
    },
    apple: [],
    spotify: State("loading")
})


export interface Root {
    discord: { activities: Activity[], status: string }
    apple: {
        name: string
        battery: number
        charging: string
        connection: string
        time: number
    }[]
    spotify: Spotify | "loading"
}

export interface Activity {
    type: number
    name: string
    id: string
    emoji?: {
        name: string
    }
    created_at: number
    timestamps?: Timestamps
    state?: string
    session_id?: string
    details?: string
    buttons?: string[]
    assets?: {
        small_text: string
        small_image: string
        large_text: string
        large_image: string
    }
    application_id?: string
}

export interface Timestamps {
    start: number
}

export interface Spotify {
    device: {
        id: string
        is_active: boolean
        is_private_session: boolean
        is_restricted: boolean
        name: string
        type: string
        volume_percent: number
    }
    shuffle_state: boolean
    repeat_state: string
    timestamp: number
    context: Context
    progress_ms: number
    item: Track | Episode
    currently_playing_type: string
    actions: any
    is_playing: boolean
}

export interface Context {
    external_urls: ExternalUrls
    href: string
    type: string
    uri: string
}

export interface ExternalUrls {
    spotify: string
}

export interface Track {
    album: Album
    artists: Artist[]
    available_markets: string[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids: any
    external_urls: any
    href: string
    id: string
    is_local: boolean
    name: string
    popularity: number
    preview_url: string
    track_number: number
    type: string
    uri: string
}

export type Episode = {
    audio_preview_url: string | null;
    description: string;
    duration_ms: number;
    explicit: boolean;
    external_urls: any;
    href: string;
    id: string;
    images: any[];
    is_externally_hosted: boolean;
    is_playable: boolean;
    language?: string;
    languages: string[];
    name: string;
    release_date: string;
    release_date_precision: 'year' | 'month' | 'day';
    resume_point?: any;
    show: any;
    uri: string;
};

export interface Album {
    album_type: string
    artists: Artist[]
    available_markets: string[]
    external_urls: any
    href: string
    id: string
    images: any[]
    name: string
    release_date: string
    release_date_precision: string
    total_tracks: number
    type: string
    uri: string
}

export interface Artist {
    external_urls: any
    href: string
    id: string
    name: string
    type: string
    uri: string
}
