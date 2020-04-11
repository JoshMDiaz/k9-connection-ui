class FilterHelperService {
  generateParams = (filter) => {
    let params = {
      name: filter.name || null,
      gender: filter.gender || null,
      papered: filter.papered || null,
      registered: filter.registered || null,
      breed: filter.breed || null,
      eyes: filter.eyes || null,
      favorite: filter.favorite ? true : false,
      start_date:
        filter.useAge && filter.birthdate ? filter.birthdate.startDate : null,
      end_date:
        filter.useAge && filter.birthdate ? filter.birthdate.endDate : null,
      nearest_distance:
        filter.useMilesAway && filter.milesAway ? filter.milesAway.min : null,
      farthest_distance:
        filter.useMilesAway && filter.milesAway ? filter.milesAway.max : null,
    }
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        if (params[key] === null) {
          delete params[key]
        }
      }
    }
    return params
  }
}

export default new FilterHelperService()
