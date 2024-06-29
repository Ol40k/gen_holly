import './RadialLoader.scss';

export const RadialLoader: React.FC<{
  percentages: number;
  loadingText: string;
}> = ({ percentages, loadingText }) => {
  const diameter = 252;
  const radius = diameter / 2;
  const dashArray = radius * 2 * Math.PI;
  const offsetCorrection = 80;
  const dashOffset = dashArray - ((dashArray - offsetCorrection) * percentages) / 100;
  const strokeWidth = 12;

  return (
    <div className="radial-loader__wrapper">
      <div className="radial-loader">
        <svg
          width={diameter}
          height={diameter}
          viewBox={`0 0 ${diameter} ${diameter}`}
        >
          <circle
            cx={radius}
            cy={radius}
            strokeWidth={strokeWidth}
            r={radius - strokeWidth}
            className="radial-loader__bg"
          />

          <circle
            cx={radius}
            cy={radius}
            strokeWidth={strokeWidth}
            r={radius - strokeWidth}
            className="radial-loader__progress"
            style={{ strokeDasharray: dashArray, strokeDashoffset: dashOffset }}
            transform={`rotate(-90 ${radius} ${radius})`}
          />
        </svg>

        <data value={percentages} className="radial-loader__percentage">
          {percentages}%{' '}
        </data>
      </div>

      {loadingText && <p className="radial-loader__text">{loadingText}</p>}
    </div>
  );
};
