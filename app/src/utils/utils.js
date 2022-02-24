const Web3Utils = require('web3-utils');

// compare dateTimestamp with now
// if dateTimestamp(8:00 begin) > now(7:00 now) return true
// if dateTimestamp(8:00 begin) <= now(7:00 now) return false
const before = dateTimestamp => (parseInt(dateTimestamp) * 1000 > Date.now());
// compare dateTimestamp with now
// if dateTimestamp(8:00 end) < now(9:00 now) return true
// if dateTimestamp(8:00 end) >= now(9:00 now) return false
const after = dateTimestamp => (parseInt(dateTimestamp) * 1000 < Date.now());
const toDate = dateTimestamp =>
    (new Date(parseInt(dateTimestamp) * 1000)).toLocaleString();

const toEther = wei =>
    (Web3Utils.fromWei(wei, 'ether'))

const toContestState = state => {
    state = parseInt(state);
    switch (state) {
        case 1 :
            return 'CREATED'
        case 2 :
            return 'STARTED'
        case 3:
            return 'ENDED'
        default :
            return 'ERROR'
    }
}
const toTeamState = state => {
    state = parseInt(state);
    switch (state) {
        case 1 :
            return 'APPLIED'
        case 2 :
            return 'APPROVED'
        case 3:
            return 'REJECTED'
        default :
            return 'ERROR'
    }
}

const toMoveState = state => {
    state = parseInt(state);
    switch (state) {
        case 1 :
            return 'COMMITTED'
        case 2 :
            return 'REVEALED'
        default :
            return 'ERROR'
    }
}

const timeSince = dateTimestamp => {
    function mdiv(dividend, divisor) {
        return [Math.floor(dividend / divisor), dividend % divisor];
    }

    // pass in milliseconds, gained by Date1.getTime() - Date2.getTime()
    // if max_units is two, the result will be, for example
    // 2years 12months ago, or 2hours 38minutes ago
    // return formated period

    function readable_period(ms, max_units=2){
        let [yy, yr] = mdiv(ms, 3.154e10);
        let [mm, mr] = mdiv(yr, 2.628e9);
        let [dd, dr] = mdiv(mr, 8.64e7);
        let [hh, hr] = mdiv(dr, 3.6e6);
        let [tt] = mdiv(hr, 6e4);

        const ymdht = ['year', 'month', 'day', 'hour', 'minute'];
        let res = [];
        [yy, mm, dd, hh, tt].forEach((tis, ii)=>{
            if(res.length === max_units){return}
            if(tis !== 0){
                res.push(tis === 1 ? `${tis}${ymdht[ii]}` : `${tis}${ymdht[ii]}s`);
            }
        });
        return res.length === 0 ? '' : res.join(' ') + ' ago';
    }
    return readable_period(Date.now() - parseInt(dateTimestamp) * 1000);
}

export {
    toDate,
    toEther,
    timeSince,
    before,
    after,
    toContestState,
    toTeamState,
    toMoveState
};