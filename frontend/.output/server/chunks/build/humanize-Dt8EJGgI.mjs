import moment from 'moment';

const humanize = (str) => str.replace(/^[\s_]+|[\s_]+$/g, "").replace(/[_\s]+/g, " ").replace(/^[a-z]/, (m) => m.toUpperCase());
const formatDate = (str, format = "YYYY-MM-DD") => {
  const date = moment.utc(str).local();
  const hours = date.diff(moment(), "hours");
  if (hours <= 24)
    return date.fromNow();
  return date.format(format);
};
const slugify = (text) => text.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, " ").trim().replace(/[\s-]+/g, "-").replace(/^-+|-+$/g, "");

export { formatDate as f, humanize as h, slugify as s };
//# sourceMappingURL=humanize-Dt8EJGgI.mjs.map
