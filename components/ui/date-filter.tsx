import DatePicker from 'react-datepicker';
import { useState } from 'react';

type Props = {
  onChange: (from: Date, to: Date) => void;
};

export function DateFilter({ onChange }: Props) {
  const [fromDate, setFromDate] = useState(() => {
    const sixDaysAgo = new Date();
    sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);
    return sixDaysAgo;
  });
  const [toDate, setToDate] = useState(new Date());

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

      {hiddenButton ? null : (
        <button
          onClick={() => {
            setHiddenButton(true);
            onChange(fromDate, toDate);
          }}
          className="px-4 bg-blue-900 rounded-lg text-slate-200"
        >
          Show
        </button>
      )}
    </main>
  );
}
