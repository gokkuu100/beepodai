import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  BarChart3,
  CalendarDays,
  Eye,
  Globe2,
  LoaderCircle,
  LockKeyhole,
  LogOut,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  RefreshCw,
  Search,
  Users,
} from "lucide-react";

const ESPRESSO = "#1A0F00";
const BEE_ORANGE = "#FF9A00";
const AMBER_GLOW = "#F57C00";
const WARM_WHITE = "#FFF8F0";
const CARD_LIGHT = "#FFF8EC";

type DashboardData = {
  metrics: {
    total: number;
    newToday: number;
    newThisWeek: number;
    countriesTracked: number;
  };
  daily: Array<{ date: string; label: string; count: number }>;
  countries: Array<{ country: string; count: number }>;
  visitors: {
    today: number;
    thisWeek: number;
    daily: Array<{ date: string; label: string; count: number }>;
    pages: Array<{ pagePath: string; count: number }>;
  };
  messages: Array<{
    id: number;
    name: string;
    email: string;
    phone: string | null;
    country: string | null;
    createdAt: string;
  }>;
};

function apiUrl(path: string) {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${basePath}/api${path}`;
}

async function getErrorMessage(response: Response, fallback: string) {
  try {
    const body = await response.json();
    return typeof body.message === "string" ? body.message : fallback;
  } catch {
    return fallback;
  }
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function MetricCard({
  label,
  value,
  icon: Icon,
  note,
}: {
  label: string;
  value: number;
  icon: typeof Users;
  note: string;
}) {
  return (
    <div
      className="rounded-3xl p-5 sm:p-6 border"
      style={{ background: CARD_LIGHT, borderColor: "rgba(26,15,0,0.08)" }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className="text-[11px] font-bold tracking-[0.14em] uppercase"
            style={{ color: "rgba(26,15,0,0.5)" }}
          >
            {label}
          </p>
          <p className="mt-2 font-display text-4xl font-black" style={{ color: ESPRESSO }}>
            {value.toLocaleString()}
          </p>
          <p className="mt-2 text-xs" style={{ color: "rgba(26,15,0,0.55)" }}>
            {note}
          </p>
        </div>
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
          style={{ background: "rgba(255,154,0,0.14)", color: AMBER_GLOW }}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function LoginScreen({ onSignedIn }: { onSignedIn: () => Promise<void> }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(apiUrl("/admin/login"), {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        throw new Error(await getErrorMessage(response, "Unable to sign in."));
      }

      await onSignedIn();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main
      className="min-h-screen px-5 py-10 sm:px-8 flex items-center justify-center"
      style={{ background: ESPRESSO }}
    >
      <section className="w-full max-w-md">
        <p className="text-center font-display text-2xl font-black tracking-tight" style={{ color: WARM_WHITE }}>
          BEE<span style={{ color: BEE_ORANGE }}>POD</span> ADMIN
        </p>
        <div
          className="mt-7 rounded-[2rem] p-7 sm:p-10 border"
          style={{ background: WARM_WHITE, borderColor: "rgba(255,154,0,0.25)" }}
        >
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ background: "rgba(255,154,0,0.12)", color: AMBER_GLOW }}
          >
            <LockKeyhole className="h-7 w-7" />
          </div>
          <h1 className="mt-6 font-display text-4xl font-black tracking-tight" style={{ color: ESPRESSO }}>
            Welcome back.
          </h1>
          <p className="mt-3 leading-relaxed" style={{ color: "rgba(26,15,0,0.58)" }}>
            Sign in to view BeePod pre-orders and launch interest.
          </p>

          <form className="mt-8 space-y-4" onSubmit={submit}>
            <input
              aria-hidden="true"
              autoComplete="username"
              className="sr-only"
              defaultValue="BeePod owner"
              name="username"
              readOnly
              tabIndex={-1}
              type="text"
            />
            <label className="block">
              <span
                className="mb-2 block text-[11px] font-bold tracking-[0.14em] uppercase"
                style={{ color: "rgba(26,15,0,0.6)" }}
              >
                Admin password
              </span>
              <input
                autoComplete="current-password"
                className="w-full rounded-2xl border px-4 py-3.5 outline-none transition focus:border-amber-500"
                style={{ borderColor: "rgba(26,15,0,0.14)", color: ESPRESSO }}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>

            {error && (
              <p
                className="flex items-start gap-2 rounded-2xl px-3 py-3 text-sm"
                style={{ background: "rgba(190, 30, 30, 0.08)", color: "#9E1E1E" }}
                role="alert"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {error}
              </p>
            )}

            <button
              className="flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 font-display font-bold text-black disabled:cursor-not-allowed disabled:opacity-60"
              style={{ background: `linear-gradient(135deg, ${AMBER_GLOW}, ${BEE_ORANGE})` }}
              type="submit"
              disabled={submitting}
            >
              {submitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <LockKeyhole className="h-4 w-4" />}
              {submitting ? "SIGNING IN…" : "ENTER ADMIN"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default function Admin() {
  const [authState, setAuthState] = useState<"checking" | "signed-out" | "signed-in">("checking");
  const [data, setData] = useState<DashboardData | null>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  async function loadDashboard(query = activeSearch) {
    setLoadingData(true);
    setError("");

    try {
      const response = await fetch(apiUrl(`/admin/dashboard?q=${encodeURIComponent(query)}`), {
        credentials: "include",
      });

      if (response.status === 401) {
        setAuthState("signed-out");
        setData(null);
        return;
      }

      if (!response.ok) {
        throw new Error(await getErrorMessage(response, "Unable to load the dashboard."));
      }

      setData((await response.json()) as DashboardData);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to load the dashboard.");
    } finally {
      setLoadingData(false);
    }
  }

  async function checkSession() {
    try {
      const response = await fetch(apiUrl("/admin/session"), { credentials: "include" });
      const body = (await response.json()) as { authenticated?: boolean };
      if (body.authenticated) {
        setAuthState("signed-in");
        await loadDashboard("");
      } else {
        setAuthState("signed-out");
      }
    } catch {
      setAuthState("signed-out");
    }
  }

  useEffect(() => {
    void checkSession();
  }, []);

  const maxDailyCount = useMemo(
    () => Math.max(...(data?.daily.map((item) => item.count) ?? [0]), 1),
    [data?.daily],
  );
  const maxVisitorDailyCount = useMemo(
    () => Math.max(...(data?.visitors.daily.map((item) => item.count) ?? [0]), 1),
    [data?.visitors.daily],
  );

  async function signOut() {
    await fetch(apiUrl("/admin/logout"), { method: "POST", credentials: "include" });
    setAuthState("signed-out");
    setData(null);
    setSearch("");
    setActiveSearch("");
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = search.trim();
    setActiveSearch(query);
    void loadDashboard(query);
  }

  if (authState === "checking") {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: ESPRESSO }}>
        <LoaderCircle className="h-7 w-7 animate-spin" style={{ color: BEE_ORANGE }} />
      </main>
    );
  }

  if (authState === "signed-out") {
    return <LoginScreen onSignedIn={async () => {
      setAuthState("signed-in");
      await loadDashboard("");
    }} />;
  }

  return (
    <main className="min-h-screen pb-12" style={{ background: "#FFFCF7", color: ESPRESSO }}>
      <header className="border-b px-5 py-5 sm:px-8 lg:px-12" style={{ background: ESPRESSO, borderColor: "rgba(255,154,0,0.14)" }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
          <div>
            <p className="font-display text-xl font-black tracking-tight" style={{ color: WARM_WHITE }}>
              BEE<span style={{ color: BEE_ORANGE }}>POD</span> ADMIN
            </p>
            <p className="mt-1 text-xs" style={{ color: "rgba(255,248,240,0.56)" }}>
              Pre-orders, messages & launch interest
            </p>
          </div>
          <button
            className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold tracking-wide transition hover:border-amber-400"
            style={{ color: WARM_WHITE, borderColor: "rgba(255,248,240,0.16)" }}
            onClick={() => void signOut()}
          >
            <LogOut className="h-4 w-4" />
            SIGN OUT
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 pt-9 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase" style={{ color: AMBER_GLOW }}>
              Launch readiness
            </p>
            <h1 className="mt-2 font-display text-4xl font-black tracking-tight sm:text-5xl">
              Your BeePod interest.
            </h1>
            <p className="mt-3 max-w-xl leading-relaxed" style={{ color: "rgba(26,15,0,0.56)" }}>
              Watch sign-ups arrive, see where families are joining from, and follow up with every pre-order message.
            </p>
          </div>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold disabled:opacity-60"
            style={{ borderColor: "rgba(26,15,0,0.12)", background: "white" }}
            onClick={() => void loadDashboard()}
            disabled={loadingData}
          >
            <RefreshCw className={`h-4 w-4 ${loadingData ? "animate-spin" : ""}`} />
            REFRESH
          </button>
        </div>

        {error && (
          <div
            className="mt-7 flex items-start gap-3 rounded-2xl px-4 py-4 text-sm"
            style={{ background: "rgba(190,30,30,0.08)", color: "#9E1E1E" }}
            role="alert"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p>{error}</p>
              <button className="mt-2 font-bold underline" onClick={() => void loadDashboard()}>
                Try again
              </button>
            </div>
          </div>
        )}

        {!data && !error ? (
          <div className="flex min-h-80 items-center justify-center">
            <LoaderCircle className="h-7 w-7 animate-spin" style={{ color: AMBER_GLOW }} />
          </div>
        ) : data ? (
          <>
            <section className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard label="All pre-orders" value={data.metrics.total} icon={Users} note="Everyone on the launch list" />
              <MetricCard label="Today" value={data.metrics.newToday} icon={CalendarDays} note="New messages since midnight UTC" />
              <MetricCard label="This week" value={data.metrics.newThisWeek} icon={MessageSquare} note="Last seven days including today" />
              <MetricCard label="Countries" value={data.metrics.countriesTracked} icon={Globe2} note="Places families have joined from" />
            </section>

            <section className="mt-7 grid gap-6 xl:grid-cols-[1.65fr_0.9fr]">
              <div className="rounded-[2rem] border bg-white p-5 sm:p-7" style={{ borderColor: "rgba(26,15,0,0.08)" }}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: AMBER_GLOW }}>
                      Interest over time
                    </p>
                    <h2 className="mt-1 font-display text-2xl font-black">Last 14 days</h2>
                  </div>
                  <BarChart3 className="h-6 w-6" style={{ color: BEE_ORANGE }} />
                </div>
                <div className="mt-8 flex h-44 items-end gap-1.5 sm:gap-2">
                  {data.daily.map((item) => (
                    <div className="group flex h-full min-w-0 flex-1 flex-col justify-end" key={item.date}>
                      <div className="relative flex flex-1 items-end">
                        <div
                          className="w-full min-h-1 rounded-t-md transition-all duration-500 group-hover:brightness-95"
                          style={{
                            height: `${Math.max((item.count / maxDailyCount) * 100, item.count ? 8 : 1)}%`,
                            background: `linear-gradient(180deg, ${BEE_ORANGE}, ${AMBER_GLOW})`,
                          }}
                          title={`${item.label}: ${item.count} sign-up${item.count === 1 ? "" : "s"}`}
                        />
                      </div>
                      <span className="mt-2 truncate text-center text-[9px] sm:text-[10px]" style={{ color: "rgba(26,15,0,0.45)" }}>
                        {item.label.split(" ")[1] ?? item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border bg-white p-5 sm:p-7" style={{ borderColor: "rgba(26,15,0,0.08)" }}>
                <p className="text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: AMBER_GLOW }}>
                  Where interest is growing
                </p>
                <h2 className="mt-1 font-display text-2xl font-black">Top countries</h2>
                <div className="mt-6 space-y-4">
                  {data.countries.length ? data.countries.map((item) => (
                    <div key={item.country}>
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="flex min-w-0 items-center gap-2 font-semibold">
                          <MapPin className="h-3.5 w-3.5 shrink-0" style={{ color: BEE_ORANGE }} />
                          <span className="truncate">{item.country}</span>
                        </span>
                        <span style={{ color: "rgba(26,15,0,0.55)" }}>{item.count}</span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full" style={{ background: "rgba(26,15,0,0.07)" }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.max((item.count / Math.max(data.metrics.total, 1)) * 100, 4)}%`,
                            background: BEE_ORANGE,
                          }}
                        />
                      </div>
                    </div>
                  )) : (
                    <p className="py-7 text-sm leading-relaxed" style={{ color: "rgba(26,15,0,0.5)" }}>
                      Country insights will appear after the first sign-up.
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section className="mt-7 rounded-[2rem] border bg-white p-5 sm:p-7" style={{ borderColor: "rgba(26,15,0,0.08)" }}>
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: AMBER_GLOW }}>
                    Private visitor analytics
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-black">How families find BeePod.</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: "rgba(26,15,0,0.54)" }}>
                    Anonymous browser sessions only—no Google, IP addresses, or personal visitor profiles.
                  </p>
                </div>
                <Eye className="h-7 w-7 shrink-0" style={{ color: BEE_ORANGE }} />
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <MetricCard label="Visitors today" value={data.visitors.today} icon={Eye} note="Anonymous sessions since midnight UTC" />
                <MetricCard label="Visitors this week" value={data.visitors.thisWeek} icon={Users} note="Anonymous sessions over the last seven days" />
              </div>

              <div className="mt-6 grid gap-6 xl:grid-cols-[1.65fr_0.9fr]">
                <div className="rounded-3xl p-5 sm:p-6" style={{ background: CARD_LIGHT }}>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: AMBER_GLOW }}>
                        Visitor activity
                      </p>
                      <h3 className="mt-1 font-display text-xl font-black">Last 14 days</h3>
                    </div>
                    <BarChart3 className="h-5 w-5" style={{ color: BEE_ORANGE }} />
                  </div>
                  <div className="mt-7 flex h-36 items-end gap-1.5 sm:gap-2">
                    {data.visitors.daily.map((item) => (
                      <div className="group flex h-full min-w-0 flex-1 flex-col justify-end" key={item.date}>
                        <div className="relative flex flex-1 items-end">
                          <div
                            className="w-full min-h-1 rounded-t-md transition-all duration-500 group-hover:brightness-95"
                            style={{
                              height: `${Math.max((item.count / maxVisitorDailyCount) * 100, item.count ? 8 : 1)}%`,
                              background: ESPRESSO,
                            }}
                            title={`${item.label}: ${item.count} anonymous visitor${item.count === 1 ? "" : "s"}`}
                          />
                        </div>
                        <span className="mt-2 truncate text-center text-[9px] sm:text-[10px]" style={{ color: "rgba(26,15,0,0.45)" }}>
                          {item.label.split(" ")[1] ?? item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl p-5 sm:p-6" style={{ background: CARD_LIGHT }}>
                  <p className="text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: AMBER_GLOW }}>
                    Most visited
                  </p>
                  <h3 className="mt-1 font-display text-xl font-black">Top pages</h3>
                  <div className="mt-5 space-y-4">
                    {data.visitors.pages.length ? data.visitors.pages.map((page) => (
                      <div className="flex items-center justify-between gap-4" key={page.pagePath}>
                        <span className="min-w-0 truncate rounded-lg px-2.5 py-1.5 text-sm font-semibold" style={{ background: "rgba(255,255,255,0.72)" }}>
                          {page.pagePath}
                        </span>
                        <span className="shrink-0 text-sm font-bold" style={{ color: AMBER_GLOW }}>
                          {page.count}
                        </span>
                      </div>
                    )) : (
                      <p className="py-5 text-sm leading-relaxed" style={{ color: "rgba(26,15,0,0.52)" }}>
                        Visitor activity will appear after the first public page load.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-7 rounded-[2rem] border bg-white p-5 sm:p-7" style={{ borderColor: "rgba(26,15,0,0.08)" }}>
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: AMBER_GLOW }}>
                    Pre-order messages
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-black">
                    {activeSearch ? "Matching messages" : "All messages"}
                  </h2>
                  <p className="mt-1 text-sm" style={{ color: "rgba(26,15,0,0.5)" }}>
                    Showing the most recent 250 submissions.
                  </p>
                </div>
                <form className="flex w-full gap-2 md:max-w-sm" onSubmit={submitSearch}>
                  <label className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "rgba(26,15,0,0.4)" }} />
                    <input
                      className="w-full rounded-xl border py-3 pl-9 pr-3 text-sm outline-none focus:border-amber-500"
                      style={{ borderColor: "rgba(26,15,0,0.13)" }}
                      placeholder="Search name, email, country"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                    />
                  </label>
                  <button
                    className="rounded-xl px-4 text-xs font-bold text-black disabled:opacity-60"
                    style={{ background: BEE_ORANGE }}
                    type="submit"
                    disabled={loadingData}
                  >
                    FIND
                  </button>
                </form>
              </div>

              {data.messages.length ? (
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full min-w-[720px] text-left">
                    <thead>
                      <tr className="border-b" style={{ borderColor: "rgba(26,15,0,0.08)" }}>
                        {["Family", "Contact", "Country", "Joined"].map((heading) => (
                          <th
                            className="px-3 py-3 text-[10px] font-bold tracking-[0.14em] uppercase first:pl-0 last:pr-0"
                            style={{ color: "rgba(26,15,0,0.45)" }}
                            key={heading}
                          >
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.messages.map((message) => (
                        <tr className="border-b last:border-0" style={{ borderColor: "rgba(26,15,0,0.06)" }} key={message.id}>
                          <td className="px-3 py-4 text-sm font-bold first:pl-0">{message.name}</td>
                          <td className="px-3 py-4">
                            <a className="flex items-center gap-2 text-sm hover:underline" style={{ color: AMBER_GLOW }} href={`mailto:${message.email}`}>
                              <Mail className="h-3.5 w-3.5" />
                              {message.email}
                            </a>
                            {message.phone && (
                              <a className="mt-1 flex items-center gap-2 text-xs hover:underline" style={{ color: "rgba(26,15,0,0.54)" }} href={`tel:${message.phone}`}>
                                <Phone className="h-3 w-3" />
                                {message.phone}
                              </a>
                            )}
                          </td>
                          <td className="px-3 py-4 text-sm" style={{ color: "rgba(26,15,0,0.6)" }}>
                            {message.country || "—"}
                          </td>
                          <td className="px-3 py-4 pr-0 text-sm" style={{ color: "rgba(26,15,0,0.6)" }}>
                            {formatDate(message.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="mt-8 rounded-2xl px-5 py-12 text-center" style={{ background: CARD_LIGHT }}>
                  <MessageSquare className="mx-auto h-7 w-7" style={{ color: BEE_ORANGE }} />
                  <p className="mt-3 font-display text-xl font-black">No messages yet.</p>
                  <p className="mt-2 text-sm" style={{ color: "rgba(26,15,0,0.55)" }}>
                    New BeePod pre-orders will show up here.
                  </p>
                </div>
              )}
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}