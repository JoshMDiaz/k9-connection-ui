export function generateParams(filter) {
  let params = {
    name: filter.name || null,
    gender: filter.gender || null,
    papered: filter.papered || null,
    registered: filter.registered || null,
    breed: filter.breed || null,
    eyes: filter.eyes || null,
    favorite: filter.favorite ? true : null,
    start_date:
      filter.useAge && filter.birthdate ? filter.birthdate.startDate : null,
    end_date:
      filter.useAge && filter.birthdate ? filter.birthdate.endDate : null,
    distance: filter.distance || null,
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
