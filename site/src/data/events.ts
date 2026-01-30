export interface Event {
    id: string;
    title: string;
    date: string; // YYYY-MM-DD
    time: string;
    description: string;
    category: 'Holiday';
    location?: string;
    source: 'public';
}

// REAL Malaysia Public Holidays 2026
// Source: https://publicholidays.com.my/2026-dates/
export const events: Event[] = [
    {
        id: 'ph-thaipusam',
        title: 'Thaipusam',
        date: '2026-02-01',
        time: 'All Day',
        description: 'Hindu festival celebrating Lord Murugan. Expect colorful processions.',
        category: 'Holiday',
        location: 'Nationwide',
        source: 'public'
    },
    {
        id: 'ph-cny-1',
        title: 'Chinese New Year',
        date: '2026-02-17',
        time: 'All Day',
        description: 'Year of the Horse. Gong Xi Fa Cai! Expect lion dances and red decorations.',
        category: 'Holiday',
        location: 'Nationwide',
        source: 'public'
    },
    {
        id: 'ph-cny-2',
        title: 'Chinese New Year (Day 2)',
        date: '2026-02-18',
        time: 'All Day',
        description: 'The celebration continues. Many shops may be closed.',
        category: 'Holiday',
        location: 'Nationwide',
        source: 'public'
    },
    {
        id: 'ph-raya-1',
        title: 'Hari Raya Aidilfitri',
        date: '2026-03-20',
        time: 'All Day',
        description: 'End of Ramadan. Selamat Hari Raya! Open houses are common.',
        category: 'Holiday',
        location: 'Nationwide',
        source: 'public'
    },
    {
        id: 'ph-raya-2',
        title: 'Hari Raya Aidilfitri (Day 2)',
        date: '2026-03-21',
        time: 'All Day',
        description: 'The celebration continues.',
        category: 'Holiday',
        location: 'Nationwide',
        source: 'public'
    },
    {
        id: 'ph-labour',
        title: 'Labour Day',
        date: '2026-05-01',
        time: 'All Day',
        description: 'Public Holiday. Most businesses closed.',
        category: 'Holiday',
        location: 'Nationwide',
        source: 'public'
    },
    {
        id: 'ph-wesak',
        title: 'Wesak Day',
        date: '2026-05-31',
        time: 'All Day',
        description: 'Buddhist holiday commemorating Buddha\'s birth, enlightenment, and death.',
        category: 'Holiday',
        location: 'Nationwide',
        source: 'public'
    },
    {
        id: 'ph-agong',
        title: 'Birthday of Yang di-Pertuan Agong',
        date: '2026-06-01',
        time: 'All Day',
        description: 'Official birthday of the King of Malaysia.',
        category: 'Holiday',
        location: 'Nationwide',
        source: 'public'
    },
    {
        id: 'ph-haji',
        title: 'Hari Raya Haji',
        date: '2026-05-27',
        time: 'All Day',
        description: 'Feast of the Sacrifice. Important Islamic holiday.',
        category: 'Holiday',
        location: 'Nationwide',
        source: 'public'
    },
    {
        id: 'ph-merdeka',
        title: 'Merdeka Day',
        date: '2026-08-31',
        time: 'All Day',
        description: 'Malaysia\'s Independence Day. Parades and celebrations nationwide.',
        category: 'Holiday',
        location: 'Nationwide',
        source: 'public'
    },
    {
        id: 'ph-malaysia',
        title: 'Malaysia Day',
        date: '2026-09-16',
        time: 'All Day',
        description: 'Formation of Malaysia anniversary.',
        category: 'Holiday',
        location: 'Nationwide',
        source: 'public'
    },
    {
        id: 'ph-deepavali',
        title: 'Deepavali',
        date: '2026-10-20',
        time: 'All Day',
        description: 'Festival of Lights. Hindu celebration with oil lamps and sweets.',
        category: 'Holiday',
        location: 'Nationwide',
        source: 'public'
    },
    {
        id: 'ph-christmas',
        title: 'Christmas Day',
        date: '2026-12-25',
        time: 'All Day',
        description: 'Merry Christmas! Decorations in malls and celebrations.',
        category: 'Holiday',
        location: 'Nationwide',
        source: 'public'
    }
];
