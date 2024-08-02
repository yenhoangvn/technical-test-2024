export default {
    getOrder (id) {
        return {
            id: id,
            title: 'Test Order ' + id,
            type: 'raw', // type of leads this order will buy: raw or qualified
            cpl: 12.5, // cost per lead
            max_devalidation: 10, // represents % value, i.e 10%
            priority: 0, // any integer
            leads_max_age_raw: 0, // integer, >= 0, represents age in days
            leads_max_age_qualified: 0, // integer, >= 0, represents age in days
            country: 'es', // iso-2 codes
            regions: ['B', 'GI'], //iso codes of regions
            excluded_regions: [],
            status: 'active', // active or stopped
            zips: [], // can be long, hundreds of elements
            excluded_zips: ['08870', '08880'],
            timezone: 'Europe/Paris',
            starts_at: '2024-04-30 22:00:00', // date in UTC
            ends_at: '2025-04-30 22:00:00', // date in UTC
            excluded_dates: ['2024-06-12 22:00:00', '2024-07-05 22:00:00'],
            dc1: 10, // integer, >=0, same for other dc fields; stands for daily cap (cap from capacity)
            dc2: 10, // 1 is for monday, 2 for tuesday, etc
            dc3: 10, // it's very common to have the same value in dc1-dc5 and 0s or smaller values in 6 and 7
            dc4: 10, // or same value in all dc fields
            dc5: 10,
            dc6: 0,
            dc7: 0,
            monthly_cap: 100, // integer, can be -1 (which means unlimited) or > 0
            total_cap: 200, // integer, can be -1 (which means unlimited) or > 0
            delivery_type: 'api', // api or email
            delivery_emails: '' // a list of emails, separated by comma; only for delivery type = email
        }
    }
}
