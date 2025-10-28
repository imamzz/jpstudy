interface ChartBaseProps {
  type?: "line" | "bar";
  data: { x: string; y: number }[];
  color?: string;
  height?: number;
  maxY?: number;
  yLabel?: string;
}

export default function ChartBase({
  type = "line",
  data,
  color = "#3b82f6",
  height = 200,
  maxY,
  yLabel = "",
}: ChartBaseProps) {
  if (!data.length) return <div className="text-gray-400 text-sm">Tidak ada data</div>;

  // --- Ukuran dasar ---
  const width = 500;
  const padding = 30;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // --- Skala vertikal ---
  const maxValue = maxY || Math.max(...data.map((d) => d.y), 1);
  const stepCount = 5;
  const stepValue = maxValue / stepCount;

  // --- Garis grid horizontal ---
  const renderGrid = () =>
    [...Array(stepCount + 1)].map((_, i) => {
      const y = height - padding - (i / stepCount) * chartHeight;
      const label = (stepValue * i).toFixed(0);
      return (
        <g key={i}>
          <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#eee" strokeWidth="1" />
          <text
            x={padding - 10}
            y={y + 4}
            textAnchor="end"
            fontSize="10"
            fill="#666"
          >
            {label}
          </text>
        </g>
      );
    });

  // --- Line chart ---
  const renderLineChart = () => {
    const points = data.map((d, i) => {
      const x = padding + (i / (data.length - 1)) * chartWidth;
      const y = height - padding - (d.y / maxValue) * chartHeight;
      return `${x},${y}`;
    });

    return (
      <>
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="3"
          points={points.join(" ")}
          strokeLinecap="round"
        />
        {data.map((d, i) => {
          const x = padding + (i / (data.length - 1)) * chartWidth;
          const y = height - padding - (d.y / maxValue) * chartHeight;
          return <circle key={i} cx={x} cy={y} r="3" fill={color} />;
        })}
      </>
    );
  };

  // --- Bar chart ---
  const renderBarChart = () => {
    const barWidth = chartWidth / data.length - 10;
    return data.map((d, i) => {
      const x = padding + i * (chartWidth / data.length) + 5;
      const barHeight = (d.y / maxValue) * chartHeight;
      const y = height - padding - barHeight;
      return (
        <g key={i}>
          <rect x={x} y={y} width={barWidth} height={barHeight} rx="4" fill={color} />
          <text
            x={x + barWidth / 2}
            y={y - 5}
            fontSize="10"
            textAnchor="middle"
            fill="#555"
          >
            {d.y > 0 ? d.y : ""}
          </text>
        </g>
      );
    });
  };

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`}>
      {/* === GRID === */}
      {renderGrid()}

      {/* === Sumbu X & Y === */}
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#ccc" />
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#ccc" />

      {/* === Label satuan === */}
      {yLabel && (
        <text x={15} y={padding - 10} fontSize="12" fill="#555" fontWeight="500">
          {yLabel}
        </text>
      )}

      {/* === Chart Data === */}
      {type === "line" ? renderLineChart() : renderBarChart()}

      {/* === Label Sumbu X === */}
      {data.map((d, i) => {
        const x =
          padding + (i / (data.length - 1)) * chartWidth +
          (type === "bar" ? 5 : 0);
        return (
          <text
            key={i}
            x={x}
            y={height - 8}
            fontSize="10"
            textAnchor="middle"
            fill="#666"
          >
            {d.x}
          </text>
        );
      })}
    </svg>
  );
}
