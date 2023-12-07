import DatePicker from 'react-datepicker';
import { useState } from 'react';

type Props = {
  filterFrom: Date;
  filterTo: Date;
  changeFilter: (from: Date, to: Date) => void;
};

export function DateFilter({ filterFrom, filterTo, changeFilter }: Props) {
  const [fromDate, setFromDate] = useState<Date | null>(filterFrom);
  const [toDate, setToDate] = useState<Date | null>(filterTo);

  const [hiddenButton, setHiddenButton] = useState(true);

  return (
    <main className="flex space-x-5">
      <div className="flex items-baseline">
        Utilization From
        <div className="w-40 ml-3">
          <DatePicker
            selected={fromDate}
            maxDate={toDate}
            onChange={(date) => {
              setHiddenButton(false);
              setFromDate(date!);
            }}
            isClearable
            placeholderText="Date"
            className="w-full rounded-lg"
          />
        </div>
      </div>

      <div className="flex items-baseline">
        To:
        <div className="w-40 ml-3">
          <DatePicker
            selected={toDate}
            minDate={fromDate}
            onChange={(date) => {
              setHiddenButton(false);
              setToDate(date!);
            }}
            isClearable
            placeholderText="Date"
            className="w-full rounded-lg"
          />
        </div>
      </div>

      {hiddenButton || !fromDate || !toDate ? null : (
        <button
          onClick={() => {
            setHiddenButton(true);
            changeFilter(fromDate!, toDate!);
          }}
          className="px-4 bg-blue-900 rounded-lg text-slate-200"
        >
          Show
        </button>
      )}
    </main>
  );
}
