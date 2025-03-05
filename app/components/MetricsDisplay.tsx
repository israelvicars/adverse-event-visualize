interface Metrics {
  total: number;
  deaths: number;
  hospitalizations: number;
  lifeThreatening: number;
  seriousNonDH: number;
  bySex: {
    male: number;
    female: number;
    unknown: number;
  };
}

interface MetricsDisplayProps {
  metrics: Metrics;
}

export function MetricsDisplay({ metrics }: MetricsDisplayProps) {
  const {
    total = 0,
    deaths = 0,
    hospitalizations = 0,
    lifeThreatening = 0,
    seriousNonDH = 0,
    bySex = { male: 0, female: 0, unknown: 0 }
  } = metrics || {};

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* Primary Metrics */}
      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <p className="text-sm font-medium leading-none text-muted-foreground mb-2">Total Reports</p>
        <p className="text-2xl font-bold">{total.toLocaleString()}</p>
      </div>
      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <p className="text-sm font-medium leading-none text-muted-foreground mb-2">Deaths</p>
        <p className="text-2xl font-bold">{deaths.toLocaleString()}</p>
      </div>
      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <p className="text-sm font-medium leading-none text-muted-foreground mb-2">Hospitalizations</p>
        <p className="text-2xl font-bold">{hospitalizations.toLocaleString()}</p>
      </div>
      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <p className="text-sm font-medium leading-none text-muted-foreground mb-2">Life-Threatening</p>
        <p className="text-2xl font-bold">{lifeThreatening.toLocaleString()}</p>
      </div>
      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <p className="text-sm font-medium leading-none text-muted-foreground mb-2">Serious (Non-DH)</p>
        <p className="text-2xl font-bold">{seriousNonDH.toLocaleString()}</p>
      </div>

      {/* Sex-based Metrics */}
      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <p className="text-sm font-medium leading-none text-muted-foreground mb-2">Male</p>
        <p className="text-2xl font-bold">{bySex.male.toLocaleString()}</p>
      </div>
      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <p className="text-sm font-medium leading-none text-muted-foreground mb-2">Female</p>
        <p className="text-2xl font-bold">{bySex.female.toLocaleString()}</p>
      </div>
      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <p className="text-sm font-medium leading-none text-muted-foreground mb-2">Unknown Sex</p>
        <p className="text-2xl font-bold">{bySex.unknown.toLocaleString()}</p>
      </div>
    </div>
  );
} 