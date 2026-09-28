"use client";

import { useId, useState } from "react";
import { formatNumber, type Property } from "@/lib/properties";

const DLD_FEE = 0.04;
const AGENCY_SALE = 0.02;
const AGENCY_RENT = 0.05;
const VAT = 0.05;
const TRUSTEE_FEE = 4_200;
const MORTGAGE_REG = 0.0025;
const EJARI_FEE = 220;

function monthlyPayment(principal: number, annualRate: number, years: number): number {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

function Row({ label, value, strong }: { label: string; value: number; strong?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between gap-4 py-3 ${strong ? "font-medium" : ""}`}>
      <dt className={strong ? "" : "text-fg-muted"}>{label}</dt>
      <dd className="numeric">AED {formatNumber(Math.round(value))}</dd>
    </div>
  );
}

/** Mortgage estimate for sales; move-in costs for rentals and stays. Pure client maths, instant feedback. */
export function CostPanel({ property: p }: { property: Property }) {
  return p.listing === "sale" ? <MortgageCalculator price={p.price} /> : <MoveInCosts property={p} />;
}

function MortgageCalculator({ price }: { price: number }) {
  const id = useId();
  const [downPct, setDownPct] = useState(25);
  const [rate, setRate] = useState(4.49);
  const [years, setYears] = useState(25);

  const loan = price * (1 - downPct / 100);
  const monthly = monthlyPayment(loan, rate, years);
  const upfront = price * (downPct / 100) + price * DLD_FEE + price * AGENCY_SALE * (1 + VAT) + TRUSTEE_FEE + loan * MORTGAGE_REG;

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="grid content-start gap-7">
        <div className="field">
          <div className="flex items-baseline justify-between">
            <label htmlFor={`${id}-down`}>Deposit</label>
            <output htmlFor={`${id}-down`} className="numeric text-sm font-medium">
              {downPct}% · AED {formatNumber(Math.round((price * downPct) / 100))}
            </output>
          </div>
          <input
            id={`${id}-down`}
            type="range"
            min={20}
            max={60}
            step={5}
            value={downPct}
            onChange={(e) => setDownPct(Number(e.target.value))}
            className="range"
          />
        </div>
        <div className="field">
          <div className="flex items-baseline justify-between">
            <label htmlFor={`${id}-rate`}>Interest rate</label>
            <output htmlFor={`${id}-rate`} className="numeric text-sm font-medium">
              {rate.toFixed(2)}%
            </output>
          </div>
          <input
            id={`${id}-rate`}
            type="range"
            min={3}
            max={7}
            step={0.05}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="range"
          />
        </div>
        <div className="field">
          <label htmlFor={`${id}-years`}>Term</label>
          <select id={`${id}-years`} className="input" value={years} onChange={(e) => setYears(Number(e.target.value))}>
            {[15, 20, 25].map((y) => (
              <option key={y} value={y}>
                {y} years
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <p className="text-sm text-fg-muted">Estimated monthly repayment</p>
        <p className="numeric mt-1 font-serif text-[clamp(2.5rem,2rem+2vw,3.5rem)] leading-none">
          AED {formatNumber(Math.round(monthly))}
        </p>
        <dl className="mt-6 divide-y divide-rule border-y border-rule text-sm">
          <Row label="Loan amount" value={loan} />
          <Row label="DLD transfer fee (4%)" value={price * DLD_FEE} />
          <Row label="Agency fee (2% + VAT)" value={price * AGENCY_SALE * (1 + VAT)} />
          <Row label="Trustee and mortgage registration" value={TRUSTEE_FEE + loan * MORTGAGE_REG} />
          <Row label="Cash needed on completion" value={upfront} strong />
        </dl>
        <p className="mt-4 text-xs text-fg-muted">
          An estimate for guidance only. Our mortgage partners can give you a pre-approval within 48 hours.
        </p>
      </div>
    </div>
  );
}

function MoveInCosts({ property: p }: { property: Property }) {
  const isStay = p.listing === "stay";
  const deposit = isStay ? 5_000 : p.price * (p.furnished ? 0.1 : 0.05);
  const agency = isStay ? 0 : p.price * AGENCY_RENT * (1 + VAT);
  const utilities = isStay ? 0 : p.type === "Villa" ? 4_000 : 2_000;
  const firstPayment = isStay ? p.price : p.price / 4;
  const total = firstPayment + deposit + agency + utilities + (isStay ? 0 : EJARI_FEE);

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <p className="text-fg-muted">
        {isStay
          ? "Furnished stays are paid monthly, with one refundable deposit. There is no agency fee, and utilities, internet and housekeeping are included."
          : "Rent is usually paid by post-dated cheques. This assumes four cheques a year; we can often negotiate fewer cheques for a lower rent."}
      </p>
      <dl className="divide-y divide-rule border-y border-rule text-sm">
        <Row label={isStay ? "First month" : "First cheque (of four)"} value={firstPayment} />
        <Row label={isStay ? "Refundable deposit" : `Security deposit (${p.furnished ? "10" : "5"}%)`} value={deposit} />
        {!isStay ? <Row label="Agency fee (5% + VAT)" value={agency} /> : null}
        {!isStay ? <Row label="DEWA deposit and Ejari" value={utilities + EJARI_FEE} /> : null}
        <Row label="Due before you move in" value={total} strong />
      </dl>
    </div>
  );
}
