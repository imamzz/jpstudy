interface ChartBaseProps {
  type?: "line" | "bar" | "circle";
  data: { x: string; y: number; total?: number }[];
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
  if (!data.length)
    return <div className="text-gray-400 text-sm">Tidak ada data</div>;

  // === Jika tipe circle, langsung render circle chart tanpa SVG grid ===
  // === CIRCLE CHART (multi-ring radial) ===
  if (type === "circle") {
    const size = height;
    const center = size / 2;
    const baseRadius = 70; // radius terkecil
    const ringGap = 55; // jarak antar ring
    const strokeWidth = 16;
    const colors = ["#ef4444", "#f59e0b", "#3b82f6"]; // contoh 3 kategori
    const levelText = "N5";

    return (
      <div className="flex gap-8 items-center">
        <div className="relative flex flex-col items-center justify-center">
          {/* SVG utama */}
          <svg width={size} height={size} className="overflow-visible">
            {data.map((d, i) => {
              const radius = baseRadius + i * ringGap;
              const circumference = 2 * Math.PI * radius;
              const progress = Math.min(d.y / (d.total || 1), 1);
              const dashOffset = circumference * (1 - progress);
              const color = colors[i % colors.length];

              return (
                <g key={d.x}>
                  {/* background ring */}
                  <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke="#e5e7eb"
                    strokeWidth={strokeWidth}
                    fill="none"
                  />
                  {/* progress ring */}
                  <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${center} ${center})`}
                    style={{ transition: "stroke-dashoffset 0.6s ease" }}
                  />
                </g>
              );
            })}
          </svg>

          {/* lingkaran level di tengah */}
          <div
            className="absolute flex flex-col items-center justify-center rounded-full bg-white shadow-sm"
            style={{
              width: "60px",
              height: "60px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -52%)", // sedikit ke atas secara optik
            }}
          >
            <p className="text-2xl font-bold text-gray-800">{levelText}</p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {data.map((d, i) => (
            <div
              key={d.x}
              className="flex items-center gap-1 text-sm text-gray-700"
            >
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[i % colors.length] }}
              />
              {d.x}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // === CONFIG (untuk line dan bar chart) ===
  const width = 500;
  const padding = 30;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const maxValue = maxY || Math.max(...data.map((d) => d.y), 1);
  const stepCount = 5;
  const stepValue = maxValue / stepCount;

  // === GRID ===
  const renderGrid = () =>
    [...Array(stepCount + 1)].map((_, i) => {
      const y = height - padding - (i / stepCount) * chartHeight;
      const label = (stepValue * i).toFixed(0);
      return (
        <g key={i}>
          <line
            x1={padding}
            y1={y}
            x2={width - padding}
            y2={y}
            stroke="#eee"
            strokeWidth="1"
          />
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

  // === LINE CHART ===
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

  // === BAR CHART ===
  const renderBarChart = () => {
    const barWidth = chartWidth / data.length - 10;
    return data.map((d, i) => {
      const x = padding + i * (chartWidth / data.length) + 5;
      const barHeight = (d.y / maxValue) * chartHeight;
      const y = height - padding - barHeight;
      return (
        <g key={i}>
          <rect
            x={x}
            y={y}
            width={barWidth}
            height={barHeight}
            rx="4"
            fill={color}
          />
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

  // === RETURN (untuk line & bar) ===
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`}>
      {/* === GRID === */}
      {renderGrid()}

      {/* === AXIS === */}
      <line
        x1={padding}
        y1={padding}
        x2={padding}
        y2={height - padding}
        stroke="#ccc"
      />
      <line
        x1={padding}
        y1={height - padding}
        x2={width - padding}
        y2={height - padding}
        stroke="#ccc"
      />

      {/* === LABEL === */}
      {yLabel && (
        <text
          x={15}
          y={padding - 10}
          fontSize="12"
          fill="#555"
          fontWeight="500"
        >
          {yLabel}
        </text>
      )}

      {/* === CHART DATA === */}
      {type === "line" ? renderLineChart() : renderBarChart()}

      {/* === X AXIS LABEL === */}
      {data.map((d, i) => {
        const x =
          padding +
          (i / (data.length - 1)) * chartWidth +
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
