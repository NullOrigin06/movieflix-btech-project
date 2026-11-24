import { SORT_OPTIONS } from "../catalogUtils.js";

// A small "Sort by" dropdown shared by the catalog and search pages.
// `extra` adds page-specific options in front, such as "Best match" on search.
function SortSelect({ value, onChange, id = "sort-select", extra = [] }) {
  return (
    <div className="sort-control">
      <label htmlFor={id}>Sort by</label>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
        {[...extra, ...SORT_OPTIONS].map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </div>
  );
}

export default SortSelect;
