const withUpcomingHighlight = (Component) => {
  return (props) => {
    const isUpcoming =
      props.job?.date && new Date(props.job.date) > new Date();

    return (
      <div
        className={`${
          isUpcoming
            ? "rounded-2xl border border-green-500 bg-green-50 p-2 transition dark:border-green-400 dark:bg-green-900/20"
            : ""
        }`}
      >
        {isUpcoming && (
          <p className="mb-2 text-xs font-bold text-green-600 dark:text-green-400">
            🚀 Upcoming
          </p>
        )}

        <Component {...props} isUpcoming={isUpcoming} />
      </div>
    );
  };
};

export default withUpcomingHighlight;