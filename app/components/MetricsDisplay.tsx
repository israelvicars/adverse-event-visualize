interface Metrics {
  total: number;
  deaths: number;
  hospitalizations: number;
}

interface MetricsDisplayProps {
  metrics: Metrics;
}

export function MetricsDisplay({ metrics }: MetricsDisplayProps) {
  const { total = 0, deaths = 0, hospitalizations = 0 } = metrics || {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
    </div>
  );
} 