interface HoneypotFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/** Hidden anti-spam field (`HONEYPOT_FIELD` on the server): only robots fill it in. */
export default function HoneypotField({ value, onChange }: HoneypotFieldProps) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="website">Website</label>
      <input
        type="text"
        id="website"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
