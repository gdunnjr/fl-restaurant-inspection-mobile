// Accept date in DD-MMM-YY and return mm/dd/yy
export function getParsedDate(date) {
    var m = {
      Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
      Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12
    };
    formatted_date = '';
    if (date != '') {
      date = String(date).split('-');
      day = String(date[0]);
      month_name = date[1];
      year = String(date[2]);
      formatted_date = m[month_name] + "/" + day + "/" + year;
    }

    return formatted_date;
  }