import './UsageStats.css'

export default function UsageStats() {
  return (
    <div className="usage-stats">
      <span className="usage-stats__month">July Usage</span>
      <div className="usage-stats__separator"></div>
      <div className="usage-stats__item">
        <span className="usage-stats__title">Short Links</span>
        <span className="usage-stats__num">2/20</span>
      </div>
      <div className="usage-stats__separator"></div>
      <div className="usage-stats__item">
        <span className="usage-stats__title">Stats Tracked</span>
        <span className="usage-stats__num">2/500</span>
      </div>
    </div>
  );
}