export function getXLabel(dateString: string, range: "week" | "month" | "year") {
  const date = new Date(dateString);
  
  if (range === "year") {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    return monthNames[date.getMonth()];
  } else {
    // untuk week dan month → tampilkan tanggal 2 digit
    const day = date.getDate();
    return day < 10 ? `0${day}` : `${day}`;
  }
}
